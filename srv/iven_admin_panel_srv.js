// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
const lib_admin_panel = require('./LIB/iven_library_admin_panel')
const lib_common = require('./LIB/iven_library')
const lib_email = require('./LIB/iven_library_email')
const lib_mdg = require('./LIB/iven_library_mdg')
const connect = require('passport/lib/framework/connect')

// const { results } = require('@sap/cds/lib_admin_panel/utils/cds-utils')

module.exports = cds.service.impl(function () {
  this.on('GetAdminPanelData', async (req) => {
    try {
  
      // local variables
      const { action, tableCode, requestNo } = req.data;
      var sQueryResult = null, sTableName = null

      var connection = await cds.connect.to('db');

      if (action === "MASTER_TABLES") {
        //Fetch Table Name from Input Table Code
        sTableName = await lib_admin_panel.getTableNameFromTableCode(connection, tableCode)

        //Fetch Data based on Table Name
        sQueryResult = await lib_admin_panel.getDataFromTableName(connection, sTableName)
        console.log(sQueryResult)
        return sQueryResult
      }
      else if (action === "DASHBOARD") {
        // Get dashboard data from admin panel library
        var oResponse = await lib_admin_panel.getDashboardData(connection);
        return oResponse
      }
      else if (action === 'MASTER_FORMS') {

        var responseObj = {
          "Results": await lib_admin_panel.getMasterFormsData(connection),
          "ProgressBar": await lib_admin_panel.getPercentOfConfig(connection)
        };
        // iVen_Content.responseInfo(JSON.stringify(responseObj), "application/json", 200);
        return responseObj;
      }
      else if (action === "MDG_PAYLOAD") { 
		    responseObj = {};
    		responseObj.MDGPayload =await lib_mdg.getActiveDataPayload(connection, parseInt(requestNo, 10));
		    // responseInfo(JSON.stringify(responseObj), "application/json", 200);
		    req.reply(responseObj)
		}
      // else if(action === 'TEST_CONNECTION'){
      //   try{
      //       //   set connection to ZIVN_VENDOR_REG_SRV Destination
      //       var iVenVendorConnection = await cds.connect.to('ZIVN_VENDOR_REG_SRV');
      //       var response = await iVenVendorConnection.send({
      //         method: 'GET',
      //         path: '/GetCitySet',
      //         headers: { 'Content-Type': 'application/json' }
      //       })
      //       if( response.length >= 0)
      //         req.reply("Test Connection Successful");   
      //   }
      //   catch(error)
      //   {
      //     throw error;
      //   }
      // }

    } catch (error) {
      req.error({ code: "500", message: error.message ? error.message : error});
    }
  })

  this.on('TestOnPremiseConnection',async(req) =>{
    try{
      var {sapClient,destFileName} = req.data;
      //   set connection to ZIVN_VENDOR_REG_SRV Destination
      var iVenVendorConnection = await cds.connect.to('ZIVN_VENDOR_REG_SRV');
      var response = await iVenVendorConnection.send({
        method: 'GET',
        path: '/GetCitySet',
        headers: { 'Content-Type': 'application/json',
                    "sap-client":sapClient }
      })
      if( response.length >= 0)
        req.reply("Test Connection Successful");   
  }
  catch(error)
  {
    throw error;
  }
  })

  //Action to insert and delete data for Admin Panel
  this.on('PostAdminPanelData', async (req) => {
    try {

      //local Variables
      var oReqData = JSON.parse(req.data.input);
      var sAction = oReqData.ACTION ;
      var sTableName = oReqData.TABLE_NAME;
      var sTableDesc = oReqData.TABLE_DESCRIPTION;
      var aInputData = oReqData.INPUT_DATA || null;
      var sResponse = null;

      // get connection
      var client = await dbClass.createConnectionFromEnv();
      let dbConn = new dbClass(client);
      // load procedure
      const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'ADMINPANEL_POSTDATA')

      //connect to db
      let conn = await cds.connect.to('db');

      //Refactor payload for Import CSV
      // if(sAction === "IMPORT_CSV")
      // {
      //   aInputData =await lib_admin_panel.removeMetadata(aInputData);
      //   if(sTableName === 'Mandatory' || sTableName === 'Visible'){
      //       aInputData = await lib_admin_panel.getUpdatedFieldsData(aInputData,conn);
      //   }
      //   else if(sTableName === 'EntityCode')
      //   {
      //     aInputData = await lib_admin_panel.convertIntegerToString(aInputData);
      //   }
      // }

      if (sAction === "CREATE" || sAction === "IMPORT_CSV") {
        //Refactor payload for Import CSV
        if(sAction === "IMPORT_CSV")
          aInputData =await lib_admin_panel.removeMetadata(aInputData);

        // excute procedure for requested master table
        if (sTableName === 'Country') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", aInputData, [], [], [], [], [], [], [], [], [], [], [], [], [], [],[],[],[],[]]);
        }
        else if (sTableName === 'Currency') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], aInputData, [], [], [], [], [], [], [], [], [], [], [], [], [],[],[],[],[]]);
        } else if (sTableName === 'EntityCode') {
        //Refactor payload for Import CSV
        if(sAction === "IMPORT_CSV")
          aInputData = await lib_admin_panel.convertIntegerToString(aInputData);

          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], aInputData, [], [], [], [], [], [], [], [], [], [], [], [],[],[],[],[]]);
        } else if (sTableName === 'IBANCountry') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], aInputData, [], [], [], [], [], [], [], [], [], [], [],[],[],[],[]]);
        } else if (sTableName === 'MasterTableNames') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], aInputData, [], [], [], [], [], [], [], [], [], [],[],[],[],[]]);
        } else if (sTableName === 'RegexPostalCode') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], aInputData, [], [], [], [], [], [], [], [], [],[],[],[],[]]);
        } else if (sTableName === 'Region') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], aInputData, [], [], [], [], [], [], [], [],[],[],[],[]]);
        } else if (sTableName === 'UserRole') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], aInputData, [], [], [], [], [], [], [],[],[],[],[]]);
        } else if (sTableName === 'Status') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], aInputData, [], [], [], [], [], [],[],[],[],[]]);
        } else if (sTableName === 'Telecode') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], aInputData, [], [], [], [], [],[],[],[],[]]);
        } else if (sTableName === 'RequestType') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], aInputData, [], [], [], [],[],[],[],[]]);
        } else if (sTableName === 'AttachmentTypes') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], [], aInputData, [], [], [],[],[],[],[]]);
        } else if (sTableName === 'IvenAttachments') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], [], [], aInputData, [], [],[],[],[],[]]);
        } else if (sTableName === 'FormFields') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], [], [], [], aInputData, [],[],[],[],[]]);
        } else if (sTableName === 'iVenSettings') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], [], [], [], [], aInputData,[],[],[],[]]);
        }
        else if(sTableName === 'Mandatory') {
            //Refactor payload for Import CSV
        if(sAction === "IMPORT_CSV")
          aInputData = await lib_admin_panel.getUpdatedFieldsData(aInputData,conn);

          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], [], [], [], [],[],aInputData,[],[],[]]);
        }
        else if(sTableName === 'Visible') {
            //Refactor payload for Import CSV
        if(sAction === "IMPORT_CSV")
          aInputData = await lib_admin_panel.getUpdatedFieldsData(aInputData,conn);
          
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], [], [], [], [] ,[],[],aInputData,[],[]]);
        }
        else if(sTableName === 'Events') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], [], [], [], [] ,[],[],[],aInputData,[]]);
        }
        else if(sTableName === 'IVENUsers') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], [], [], [], [] ,[],[],[],[],aInputData]);
        }
        return sResponse

      }
      else if (sAction === "DELETE") {
        var ID = oReqData.ID;
        sResponse = await dbConn.callProcedurePromisified(loadProc,
          [sAction, sTableName, sTableDesc, ID, "", "", [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],[],[],[],[]]);
        return sResponse;
      }
      else if (sAction === "TEST_EMAIl") {
        let connection = await cds.connect.to('db');
        var sEmailBody = aInputData[0].EMAIL_BODY;
        var sEmailSubject = aInputData[0].EMAIL_SUBJECT;
        var aEmailTo = aInputData[0].EMAIL_TO;
        var aEmailCC = aInputData[0].EMAIL_CC;
        var sEmailSender = aInputData[0].EMAIL_SENDER;
        // sResponse = await lib_email.sendEmail(connection, sEmailBody, sEmailSubject, aEmailTo, aEmailCC, sEmailSender)
        var sCCEmail = await lib_email.setSampleCC( [aEmailCC]);
        await  lib_email.sendivenEmail(aEmailTo,sCCEmail,'html', sEmailSubject,sEmailBody)
    
        return sResponse
      }


    } catch (error) {
      req.error({ code: "500", message: error.message });
      // lib_common.responseInfo(req,'error','500',error,null)
    }
  })

  //Action to Edit data for Admin Panel
  this.on('EditAdminPanelData', async (req) => {
    try {
      //local Variables
      var oReqData = JSON.parse(req.data.input);
      var sEditType = oReqData.EDIT_TYPE || null;
      var sTableName = oReqData.VALUE[0].TABLE_NAME || null;
      var sTableDesc = oReqData.VALUE[0].TABLE_DESCRIPTION || null;
      var aMasterData = oReqData.VALUE[0].TABLE_DATA || [];
      var sResponse = null;

      // Edit Forms Fields
      var sEntityCode = oReqData.CCODE || null;
      var iType = oReqData.TYPE || null;
      aData = oReqData.VALUE[0].TABLE_DATA;

      //Local Variable for edit forms
      var masterName, masterData, tableDescription, editType;
      // get connection
      var client = await dbClass.createConnectionFromEnv();
      let dbConn = new dbClass(client);
      // load procedure
      const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'ADMINPANEL_EDITDATA')
      if (sEditType === 'EDIT_MASTERS') {
        if (sTableName === 'Country') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, aMasterData, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],[] ]);
        } else if (sTableName === 'Currency') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, [], aMasterData, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],[] ]);
        } else if (sTableName === 'EntityCode') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, [], [], aMasterData, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],[] ]);
        } else if (sTableName === 'IBANCountry') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, [], [], [], aMasterData, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],[] ]);
        } else if (sTableName === 'MasterTableNames') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, [], [], [], [], aMasterData, [], [], [], [], [], [], [], [], [], [], [], [], [], [],[] ]);
        } else if (sTableName === 'RegexPostalCode') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, [], [], [], [], [], aMasterData, [], [], [], [], [], [], [], [], [], [], [], [], [],[] ]);
        } else if (sTableName === 'Region') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], aMasterData, [], [], [], [], [], [], [], [], [], [], [], [],[] ]);
        } else if (sTableName === 'UserRole') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], aMasterData, [], [], [], [], [], [], [], [], [], [], [],[] ]);
        } else if (sTableName === 'Status') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], [], aMasterData, [], [], [], [], [], [], [], [], [], [],[] ]);
        } else if (sTableName === 'Telecode') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], [], [], aMasterData, [], [], [], [], [], [], [], [], [],[] ]);
        } else if (sTableName === 'RequestType') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], [], [], [], aMasterData, [], [], [], [], [], [], [], [],[] ]);
        } else if (sTableName === 'AttachmentTypes') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], [], [], [], [], aMasterData, [], [], [], [], [], [], [],[] ]);
        } else if (sTableName === 'OTFolderId') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], [], [], [], [], [], aMasterData, [], [], [], [], [], [],[] ]);
        } else if (sTableName === 'iVenSettings') {
          sResponse = await dbConn.callProcedurePromisified(loadProc,
            [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], [], [], [], [], [], [], aMasterData, [], [], [], [], [],[] ]);
        }
        return sResponse;
      }
      else if (sEditType === 'EDIT_FORMS') {
        var successMsg = '',
          aTableDesc = [],
          iChangeCount = 0,
          aSuccessArray = [];

        for (var i = 0; i < oReqData.VALUE.length; i++) {

          if (oReqData.VALUE[i].CHANGE_FLAG === "YES") {
            iChangeCount = iChangeCount + 1;
            masterName = oReqData.VALUE[i].TABLE_NAME;
            editType = oReqData.EDIT_TYPE;
            masterData = oReqData.VALUE[i].TABLE_DATA;
            tableDescription = oReqData.VALUE[i].TABLE_DESCRIPTION;
            aTableDesc.push(tableDescription)

            if (masterName === 'Client_Info') {
              sResponse = await dbConn.callProcedurePromisified(loadProc,
                [editType, masterName, tableDescription, [], [], [], [], [], [], [], [], [], [], [], [], 
                [], [], masterData, [], [], [], [],[]]);
            } else if (masterName === 'Sap_Info') {
              sResponse = await dbConn.callProcedurePromisified(loadProc,
                [editType, masterName, tableDescription, [], [], [], [], [], [], [], [], [], [], [], [], 
                [], [], [], masterData, [], [], [],[]]);
            } else if (masterName === 'SubAccount_Info') {
              sResponse = await dbConn.callProcedurePromisified(loadProc,
                [editType, masterName, tableDescription, [], [], [], [], [], [], [], [], [], [], [], [], 
                [], [], [], [], masterData, [], [],[] ]);
            } else if (masterName === 'MasterCredential_Info') {
              sResponse = await dbConn.callProcedurePromisified(loadProc,
                [editType, masterName, tableDescription, [], [], [], [], [], [], [], [], [], [], [], [], 
                [], [], [], [], [], masterData, [],[] ]);
            } else if (masterName === 'IvenAttachments') {
              sResponse = await dbConn.callProcedurePromisified(loadProc,
                [editType, masterName, tableDescription, [], [], [], [], [], [], [], [], [], [], [], [], 
                [], [], [], [], [], [], masterData,[] ]);
            }
            else if (masterName === 'Smtp_Config') {
              sResponse = await dbConn.callProcedurePromisified(loadProc,
                [editType, masterName, tableDescription, [], [], [], [], [], [], [], [], [], [], [], [], 
                [], [], [], [], [], [], [],masterData]);
            }
            // iVen_Content.postErrorLog(conn, Result, null, null, "System Configuration", "PROCEDURE");
            if (sResponse !== null) {
              if (sResponse.outputScalar.OUT_SUCCESS_FLAG === 'Y') {
                aSuccessArray.push(sResponse.outputScalar.OUT_SUCCESS_FLAG);
              }
            }

          }
        }
        // if (aSuccessArray.length === iChangeCount) {
        //   // conn.commit();

        // }
        // Created Success Msg Dynamically Cause Needed Both Master Or One Master at a Time With The Help Change Flag
        successMsg = await lib_common.generateSuccessMessage(aTableDesc);
        return successMsg
      }
      else if (sEditType === "FORM_FIELDS") {
        // conn = $.hdb.getConnection();
        let conn = await cds.connect.to('db');
  
        // var sEntityCode = oPayload.VALUE.CCODE;
        // var iType = oPayload.VALUE.TYPE;
        // aData = oPayload.VALUE.DATA;
  
        var obj = {};
        var oVisibilityObj = {};
        var oMandatoryObj = {};
        var oFieldDescObj = {};
        var oVisibilityObjTemp = {};
        var oMandatoryObjTemp = {};
        var oFieldDescTemp = {};
        var aVisibilityArr = [];
        var aMandatoryArr = [];
        var aFieldDescArr = [];
  
        for (var i = 0; i < aData.length; i++) {
          obj = aData[i];
          if (i === 0) {
            oVisibilityObj.CCODE = sEntityCode;
            oVisibilityObj.TYPE = iType;
            oMandatoryObj.CCODE = sEntityCode;
            oMandatoryObj.TYPE = iType;
            oFieldDescObj.CCODE = sEntityCode;
            oFieldDescObj.TYPE = iType;
          }
  
          oVisibilityObjTemp[obj.FIELDS.toString()] = obj.VISIBILITY;
          oMandatoryObjTemp[obj.FIELDS.toString()] = obj.MANDATORY;
          oFieldDescTemp[obj.FIELDS.toString()] = obj.DESCRIPTION;
          aVisibilityArr.push(oVisibilityObjTemp);
          aMandatoryArr.push(oMandatoryObjTemp);
          aFieldDescArr.push(oFieldDescTemp);
        }
  
        oVisibilityObj.FIELDS = aVisibilityArr;
        oMandatoryObj.FIELDS = aMandatoryArr;
        oFieldDescObj.FIELDS = aFieldDescArr;
  
     var   results = await lib_admin_panel.updateData(conn, oVisibilityObj, oMandatoryObj, oFieldDescObj);
  return results;
        // responseInfo(JSON.stringify(results), "text/plain", 200);
      }
      else if (sEditType === "FORM_SETTINGS") {
        sResponse = await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], [], [], [], [], [], [], aData, [], [], [], [], [],[] ]);
     
        // aData = oPayload.VALUE.DATA || [];
        // results = updateSettings(conn, aData);
return sResponse
    }

    } catch (error) {
      req.error({ code: "500", message: error.message });
    }
  })

  //Function to get all Registraion Form Mandatory & Visible fields
  this.on('GetVisbleMandatoryFields', async (req) => {

    try {
      // local variables
      const { requestType, entityCode } = req.data;

      let conn = await cds.connect.to('db');
      var aVisiMandatArrFields = [], responseObj = {};

      var columnTemplate = await lib_common.getTemplateColumns(conn);
      var aFieldDescData = await lib_admin_panel.getFieldsDescData(conn);
      var aFieldDescObj = {};

      var aTemplateKeys = Object.keys(columnTemplate[0]);
      var sTempCcode = null, iTempType = null, obj = {};

      if (entityCode === "TEMPLATE") {

        for (var i = 0; i < aTemplateKeys.length; i++) {
          if (aTemplateKeys[i] === "CCODE") {
            sTempCcode = entityCode;
          } else if ((aTemplateKeys[i] === "TYPE")) {
            iTempType = 1;
          } else {
            obj["SRNO"] = i - 1;
            obj["FIELDS"] = aTemplateKeys[i];
            obj["VISIBILITY"] = null;
            obj["MANDATORY"] = null;
            obj["DESCRIPTION"] = null;
            obj["SECTION"] = null;
            aVisiMandatArrFields.push(JSON.parse(JSON.stringify(obj)));
          }
        }

      } else {
        var aVisibleFieldsData = await lib_admin_panel.getVisibleFieldsData(conn, entityCode, requestType);
        var aMandatoryFieldsData = await lib_admin_panel.getMandatoryFieldsData(conn, entityCode, requestType);

        for (var i = 0; i < aTemplateKeys.length; i++) {
          if (aTemplateKeys[i] === "CCODE") {
            sTempCcode = aVisibleFieldsData[0][aTemplateKeys[i].toString()];
          } else if ((aTemplateKeys[i] === "TYPE")) {
            iTempType = parseInt(aVisibleFieldsData[0][aTemplateKeys[i].toString()], 10);
          } else {
            aFieldDescObj = await lib_admin_panel.getFieldsDesc(aTemplateKeys[i], aFieldDescData);
            obj["SRNO"] = i - 1;
            obj["FIELDS"] = aTemplateKeys[i];
            obj["VISIBILITY"] = aVisibleFieldsData[0][aTemplateKeys[i].toString()];
            obj["MANDATORY"] = aMandatoryFieldsData[0][aTemplateKeys[i].toString()];
            obj["DESCRIPTION"] = aFieldDescObj.DESCRIPTION || "NA";
            obj["SECTION"] = aFieldDescObj.SECTION || "NA";
            obj["CATEGORY"] = aFieldDescObj.CATEGORY || "NA";
            aVisiMandatArrFields.push(JSON.parse(JSON.stringify(obj)));
          }
        }
      }

      responseObj = {
        "CCODE": sTempCcode,
        "TYPE": iTempType,
        "DATA": aVisiMandatArrFields.length > 0 ? aVisiMandatArrFields : []
      };

      req.reply(responseObj)

    } catch (error) {
      req.error({ code: "500", message: error.message });
    }

  })


})