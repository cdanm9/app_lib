// get libraries/modules
const cds = require('@sap/cds')
const lib = require('./LIB/iven_library_admin_panel')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")

module.exports = cds.service.impl(function () {
  this.on('GetAdminPanelData', async (req) => {
    try {

      // local variables
      var oReqData = req.data.input
      oReqData = JSON.parse(oReqData);
      var sAction = oReqData.ACTION
      var sTableCode = oReqData.TABLE_CODE
      var iRequestNo = oReqData.REQUEST_NO
      var sQueryResult = null, sTableName = null

      if(sAction === "MASTER_TABLES"){
        //Fetch Table Name from Input Table Code
        sTableName =await  lib.getTableNameFromTableCode(sTableCode)

        //Fetch Data based on Table Name
        sQueryResult =await lib.getDataFromTableName(sTableName)
        console.log(sQueryResult)
        return sQueryResult
      }
      else if(sAction === "DASHBOARD")
      {
         // Get dashboard data from admin panel library
        var oResponse = await lib.getDashboardData();
           return oResponse
      }
      // else if (sAction === 'MASTER_FORMS') {

        // responseObj = {
        //   "Results": getMasterFormsData(conn),
        //   "ProgressBar" : ADMIN_LIBRARY.getPercentOfConfig(conn)
        // };
        // iVen_Content.responseInfo(JSON.stringify(responseObj), "application/json", 200);
  
      // }
     
    } catch (error) {
      console.error(error)
      // return error.messsage
      req.error({code:"500", message: error.message});
    }
  })

  //Action to insert and delete data for Admin Panel
  this.on('PostAdminPanelData',async (req) =>{
    try{
      //local Variables
      var oReqData = JSON.parse(req.data.input);
      var sAction = oReqData.ACTION;
      var sTableName =oReqData.TABLE_NAME;
      var sTableDesc = oReqData.TABLE_DESCRIPTION;
      var aInputData = oReqData.INPUT_DATA;
      var sResponse =null;

         // get connection
         var client = await dbClass.createConnectionFromEnv();
         let dbConn = new dbClass(client);
          // load procedure
          const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'ADMINPANEL_POSTDATA')
     
     if(sAction === "CREATE")
     {
        
         // excute procedure for requested master table
         if (sTableName === 'Country') {
        sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", aInputData, [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
       }
       else if (sTableName === 'Currency') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], aInputData, [], [], [], [], [], [], [], [], [], [], [], [], []]);
			} else if (sTableName === 'EntityCode') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], [], aInputData, [], [], [], [], [], [], [], [], [], [], [], []]);
			} else if (sTableName === 'IBANCountry') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], [], [], aInputData, [], [], [], [], [], [], [], [], [], [], []]);
			} else if (sTableName === 'MasterTableNames') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], aInputData, [], [], [], [], [], [], [], [], [], []]);
			} else if (sTableName === 'RegexPostalCode') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], aInputData, [], [], [], [], [], [], [], [], []]);
			} else if (sTableName === 'Region') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], aInputData, [], [], [], [], [], [], [], []]);
			} else if (sTableName === 'UserRole') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], aInputData, [], [], [], [], [], [], []]);
			} else if (sTableName === 'Status') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], aInputData, [], [], [], [], [], []]);
			} else if (sTableName === 'Telecode') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], aInputData, [], [], [], [], []]);
			} else if (sTableName === 'RequestType') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], aInputData, [], [], [], []]);
			} else if (sTableName === 'AttachmentTypes') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], [], aInputData, [], [], []]);
			} else if (sTableName === 'IvenAttachments') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], [], [], aInputData, [], []]);
			} else if (sTableName === 'FormFields') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], [], [], [], aInputData, []]);
			} else if (sTableName === 'iVenSettings') {
				    sResponse= await dbConn.callProcedurePromisified(loadProc,
        [sAction, sTableName, sTableDesc, "", "", "", [], [], [], [], [], [], [], [], [], [], [], [], [], [], aInputData]);
			}

        return sResponse

     }
     else if(sAction === "DELETE")
     {
        var ID = oReqData.ID;
        sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sAction, sTableName, sTableDesc, ID,"", "", [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
      return sResponse;
     }
    } catch (error) {
      req.error({code:"500", message: error.message});
    }
  })

    //Action to Edit data for Admin Panel
    this.on('EditAdminPanelData',async (req) =>{
      try{
        //local Variables
      var oReqData = JSON.parse(req.data.input);
      var sEditType = oReqData.EDIT_TYPE;
      var sTableName =oReqData.VALUE[0].TABLE_NAME;
      var sTableDesc = oReqData.VALUE[0].TABLE_DESCRIPTION;
      var aMasterData = oReqData.VALUE[0].TABLE_DATA;
      var sResponse =null;
        //Local Variable for edit forms
      var masterName, masterData, tableDescription, editType;


         // get connection
         var client = await dbClass.createConnectionFromEnv();
         let dbConn = new dbClass(client);
          // load procedure
          const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'ADMINPANEL_POSTDATA')
          if (sEditType === 'EDIT_MASTERS') {
          if (sTableName === 'Country') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, aMasterData, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
          } else if (sTableName === 'Currency') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], aMasterData, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
          } else if (sTableName === 'EntityCode') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], [], aMasterData, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
          } else if (sTableName === 'IBANCountry') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], [], [], aMasterData, [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
          } else if (sTableName === 'MasterTableNames') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], [], [], [], aMasterData, [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
          } else if (sTableName === 'RegexPostalCode') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], [], [], [], [], aMasterData, [], [], [], [], [], [], [], [], [], [], [], [], []]);
          } else if (sTableName === 'Region') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], aMasterData, [], [], [], [], [], [], [], [], [], [], [], []]);
          } else if (sTableName === 'UserRole') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], aMasterData, [], [], [], [], [], [], [], [], [], [], []]);
          } else if (sTableName === 'Status') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], [], aMasterData, [], [], [], [], [], [], [], [], [], []]);
          } else if (sTableName === 'Telecode') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], [], [], aMasterData, [], [], [], [], [], [], [], [], []]);
          } else if (sTableName === 'RequestType') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], [], [], [], aMasterData, [], [], [], [], [], [], [], []]);
          } else if (sTableName === 'AttachmentTypes') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], [], [], [], [], aMasterData, [], [], [], [], [], [], []]);
          } else if (sTableName === 'OTFolderId') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], [], [], [], [], [], aMasterData, [], [], [], [], [], []]);
          } else if (sTableName === 'iVenSettings') {
             sResponse= await dbConn.callProcedurePromisified(loadProc,
          [sEditType, sTableName, sTableDesc, [], [], [], [], [], [], [], [], [], [], [], [], [], aMasterData, [], [], [], [], []]);
          }
          return sResponse;
        }
        else if(sEditType === 'EDIT_FORMS'){
          var successMsg = '',
          aTableDesc = [],
          iChangeCount = 0,
          aSuccessArray = [];
        for (var i = 0; i < oReqData.VALUE.length; i++) {
          if (oReqData.VALUE[i].CHANGE_FLAG === "YES") {
            iChangeCount = iChangeCount + 1;
            masterName =oReqData.VALUE[i].TABLE_NAME;
            editType = oReqData.EDIT_TYPE;
            masterData = oReqData.VALUE[i].TABLE_DATA;
            tableDescription =oReqData.VALUE[i].TABLE_DESCRIPTION;
            aTableDesc.push(tableDescription)
            if (masterName === 'Client_Info') {
              sResponse= await dbConn.callProcedurePromisified(loadProc,
          [editType, masterName, tableDescription, [], [], [], [], [], [], [], [], [], [], [], [], [], [], masterData, [], [], [],[]]);
            } else if (masterName === 'Sap_Info') {
              sResponse= await dbConn.callProcedurePromisified(loadProc,
          [editType, masterName, tableDescription, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], masterData, [], [],[]]);
            } else if (masterName === 'SubAccount_Info') {
              sResponse= await dbConn.callProcedurePromisified(loadProc,
          [editType, masterName, tableDescription, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
                masterData, [],[]]);
            } else if (masterName === 'MasterCredential_Info') {
              sResponse= await dbConn.callProcedurePromisified(loadProc,
          [editType, masterName, tableDescription, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
                masterData,[]]);
            } else if (masterName === 'IvenAttachments') {
              sResponse= await dbConn.callProcedurePromisified(loadProc,
          [editType, masterName, tableDescription, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
                masterData]);
            }
            // iVen_Content.postErrorLog(conn, Result, null, null, "System Configuration", "PROCEDURE");
            if (sResponse.OUT_SUCCESS_FLAG === 'Y') {
              aSuccessArray.push(sResponse.OUT_SUCCESS_FLAG);
            }
  
          }
        }
        if (aSuccessArray.length === iChangeCount) {
          conn.commit();
  
        }
        // Created Success Msg Dynamically Cause Needed Both Master Or One Master at a Time With The Help Change Flag
        successMsg = await lib.generateSuccessMessage(aTableDesc);
        return successMsg
        }
      } catch (error) {
        req.error({code:"500", message: error.message});
      }
    })

})