// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
const lib_common = require('./LIB/iven_library')
const lib_email = require('./LIB/iven_library_email')
const lib_email_content = require('./LIB/iven_library_email_content')
// const lib = require('./LIB/EMPLOYEE_LIB')

module.exports = cds.service.impl(function () {
  this.on('VendorInternalRequest', async (req) => {
    // get connection
    var client = await dbClass.createConnectionFromEnv();
       var dbConn = new dbClass(client); 
    try {
      // local variables
      var {
        action,
        stepNo,
        comment,
        srNo,
        attachCode,
        ndaStatus,
        reqHeader,
        addressData,
        contactsData,
        bankData,
        financeData,
        ownersData,
        prodServData,
        capacityData,
        customerData,
        oemData,
        discFieldsData,
        discRelativesData,
        discQaCertiData,
        attachmentFieldsData,
        attachmentData,
        updatedFields,
        eventsData,
        supplierLogData,
        userDetails
    } = req.data;
      //intialize connection to database
      var sUserId=userDetails.USER_ID || null;
      var sUserRole=userDetails.USER_ROLE || null;   

      let connection = await cds.connect.to('db');
      var isEmailNotificationEnabled = false;
       //Check if email notification is enabled
       isEmailNotificationEnabled = await lib_email.isiVenSettingEnabled(connection, "VM_EMAIL_NOTIFICATION");

       
      //  var client = await dbClass.createConnectionFromEnv();
      //  let dbConn = new dbClass(client);

    if (action === "EDIT") { //-----------------------------------------------------------------------------

			// execProcedure = conn.loadProcedure('VENDOR_PORTAL', 'VENDOR_PORTAL.Procedure::ONBOARDING_EDIT');

			// var iReqNo = oPayload.VALUE.REQUEST_NO;
			// var iStatus = oPayload.VALUE.STATUS;

			// var iCurrentStatus = getCurrentRequestStatus(conn, iReqNo);

			// if (iCurrentStatus !== iStatus) {
			// 	responseObj = {
			// 		"Message": "Status of current Request No:" + iReqNo + " doesn't match with our data.",
			// 		"Status": "Warning"
			// 	};
			// 	statusCode = 200;
			// } else if (iCurrentStatus === 11) {
			// 	var iIvenCode = oPayload.VALUE.IVEN_VENDOR_CODE;

			// 	var oActiveData = getActiveData(conn, iIvenCode) || null;

			// 	if (oActiveData !== null) {
			// 		var iActiveReqNo = oActiveData.REQ_NO_ACTIVE;

			// 		if (iReqNo !== iActiveReqNo) {
			// 			iReqNo = iActiveReqNo;
			// 		}
			// 	}

			// 	var sSAPCode = oPayload.VALUE.SAP_VENDOR_CODE;
			// 	var iSupplierEmail = oPayload.VALUE.REGISTERED_ID;
			// 	var sSupplierName = oPayload.VALUE.SUPPLIER_NAME;
			// 	var sEntityCode = oPayload.VALUE.ENTITY_CODE;
			// 	// 			var iReqType = oPayload.VALUE.REQUEST_TYPE;
			// 	var iCreateType = oPayload.VALUE.CREATION_TYPE;
			// 	var aEventObj = getEventObjects();

			// 	Result = execProcedure(iReqNo, iIvenCode, sSAPCode, sEntityCode, iSupplierEmail, sSupplierName, iCreateType, aEventObj);

			// 	responseObj = {
			// 		"Message": Result.OUT_SUCCESS !== null ? "Update Request No." + Result.OUT_SUCCESS + " generated." : "Update request generation failed!",
			// 		"Status": Result.OUT_SUCCESS !== null ? "Success" : "Error"
			// 	};

			// 	if (Result.OUT_SUCCESS !== null) {
			// 		responseObj.LoginData = Result.OUT_VENDOR_INVITE[0];
			// 	}

			// 	statusCode = Result.OUT_SUCCESS !== null ? 200 : 400;

			// } else {
			// 	responseObj = {
			// 		"Message": "Form cannot be edited as current Request No:" + iReqNo + " is in-process.",
			// 		"Status": "Warning"
			// 	};
			// 	statusCode = 200;
			// }

			// responseInfo(JSON.stringify(responseObj), "text/plain", statusCode);

		} else if (action === "INTERNAL_REQUEST") {

			// execProcedure = conn.loadProcedure('VENDOR_PORTAL', 'VENDOR_PORTAL.Procedure::SUPPLIER_INTERNAL_REQUEST');
			var iReqNo = reqHeader[0].REQUEST_NO;
			// var iStep = oPayload.VALUE.STEP_NO;
			// var iComment = oPayload.VALUE.COMMENT;
			// var iNDAStatus = oPayload.VALUE.NDASTATUS;

			// --Section 2--
			// var aMainObj = oPayload.VALUE.MAIN;
			if (reqHeader.length > 0) {
				reqHeader[0].REQUEST_NO = 0;
			} else {
				throw "Invalid Payload";
			}

			// var sUserId = reqHeader[0].REGISTERED_ID || null; 
			var sSupplerName = reqHeader[0].VENDOR_NAME1;
			var sEntityCode = reqHeader[0].ENTITY_CODE;
			var sIsResend = reqHeader[0].REQUEST_RESENT;
			var iStatus = reqHeader[0].STATUS;
			var sVendorNo = reqHeader[0].IVEN_VENDOR_CODE;
			var sSAPVendorCode = reqHeader[0].SAP_VENDOR_CODE;

			// 			// Get Invite Data
			var inviteData =await  getInviteUpdateReqData(connection, iReqNo);

			// var aSupplierLogs = oPayload.VALUE.SUPPLIER_LOGS;
			// 			inviteData[0].CREATED_BY=aSupplierLogs[0].USER_ID;
			// 			inviteData[0].CREATED_BY_NAME=aSupplierLogs[0].USER_NAME;
			var aEventObj =await getEventObjects(supplierLogData);
			var oActiveData =await getActiveData(connection, sVendorNo) || null;

			var aAddressObj =await getidForArr(addressData, "SR_NO") || [];
			var aContactObj =await getidForArr(contactsData, "SR_NO") || [];

			// 			// --Section 2--
			var aPaymentObj =await getidForArr(bankData, "SR_NO") || [];
			var aFinanceObj = await getidForArr(financeData, "SR_NO") || [];
			var aOwnerObj =await getidForArr(ownersData, "SR_NO") || [];

			// 			// --Section 3--
			var aProdServPayloadObj =await getProdServData(prodServData, "SR_NO") || [];
			var aProductObj = aProdServPayloadObj.Products || [];
			var aServiceObj = aProdServPayloadObj.Service || [];
			var aProdServbj = [...aProductObj, ...aServiceObj];

			var aCapacityObj = await getidForArr(capacityData, "SR_NO") || [];
			var aCustomerObj =await getidForArr(customerData, "SR_NO") || [];
			var aOEMObj =await getidForArr(oemData, "SR_NO") || [];

			// 			// --Section 4--
			var aDiscFieldsObj = discFieldsData || [];
			if (aDiscFieldsObj.length > 0) {
				aDiscFieldsObj[0].REQUEST_NO = 0;
			}
			var aRelativeObj =await getidForArr(discRelativesData, "SR_NO") || [];
			var aQaCertiObj =await getidForArr(discQaCertiData, "SR_NO") || [];

			// 			// --Section 5--
			var aAttachFieldsObj =attachmentFieldsData || [];
			if (aAttachFieldsObj.length > 0) {
				aAttachFieldsObj[0].REQUEST_NO = 0;
			}
			var aAttachmentsObj =await getidForArr(attachmentData, "SR_NO") || [];

			var aUpdatedFieldsIDs = updatedFields;
			var aUpdatedFieldsObj = [];

			if (aUpdatedFieldsIDs.length > 0) {
				aUpdatedFieldsObj =await   lib_common.getUpdatedFieldsDataForEdit(iReqNo, aUpdatedFieldsIDs, connection) || [];
			}

			var aLogsTable =await getLogsCount(connection, supplierLogData);
			var onbEvents =await getEventObj(supplierLogData, comment);

			// var iNDAAttach = oPayload.VALUE.NDA_ATTACH;
      var iNDAAttach = attachmentData;
			// 			if (iNDAAttach.length) {
			// 				var srNo = iNDAAttach[0].SR_NO
			// 				var attachCode = iNDAAttach[0].ATTACH_CODE
			// 			} else {
			// var srNo = oPayload.VALUE./SR_NO;
			// var attachCode = oPayload.VALUE.ATTACH_CODE;
			// 			}
			// 			Result = execProcedure(iReqNo, iStep, sEntityCode, sVendorNo, sSAPVendorCode);

			// Result = execProcedure(iReqNo, iStep, iNDAStatus, sEntityCode, sVendorNo, sSAPVendorCode, sUserId, sIsResend, iStatus, oActiveData.REQ_NO_ACTIVE,
			// 	oActiveData.REQUEST_TYPE, oActiveData.CREATION_TYPE,
			// 	inviteData, [aEventObj[0]], [aEventObj[1]],
			// 	aMainObj, aAddressObj, aContactObj,
			// 	aPaymentObj, aFinanceObj, aOwnerObj,
			// 	aProdServbj, aCapacityObj, aCustomerObj, aOEMObj,
			// 	aDiscFieldsObj, aRelativeObj, aQaCertiObj,
			// 	aAttachFieldsObj, aAttachmentsObj,
			// 	aUpdatedFieldsObj, onbEvents, aLogsTable,
			// 	iNDAAttach, srNo, attachCode);
      var aEventObj0 =  [aEventObj[0]];
     var  aEventObj1 =  [aEventObj[1]]
      const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'VENDOR_INTERNAL_REQUEST')
      sResponse = await dbConn.callProcedurePromisified(loadProc,
       [iReqNo, stepNo, ndaStatus, sEntityCode, sVendorNo, sSAPVendorCode, sUserId, sIsResend, iStatus, oActiveData.REQ_NO_ACTIVE,
        	oActiveData.REQUEST_TYPE, oActiveData.CREATION_TYPE,'IR',
        	inviteData, aEventObj0, aEventObj1,
        	reqHeader, aAddressObj, aContactObj,
        	aPaymentObj, aFinanceObj, aOwnerObj,
        	aProdServbj, aCapacityObj, aCustomerObj, aOEMObj,
        	aDiscFieldsObj, aRelativeObj, aQaCertiObj,
        	aAttachFieldsObj, aAttachmentsObj,
        	aUpdatedFieldsObj, onbEvents, aLogsTable, srNo, attachCode]
        );
			responseObj = {
				"Edit_Success": sResponse.outputScalar.OUT_SUCCESS !== null ? 'X' : '',
				"REQUEST_NO": sResponse.outputScalar.OUT_SUCCESS !== null ? sResponse.outputScalar.OUT_SUCCESS : 0,
				"Message": sResponse.outputScalar.OUT_SUCCESS !== null ? "Internal Vendor request created successfully" : "Internal Vendor request creation failed"
			};
			if (sResponse.outputScalar.OUT_SUCCESS !== null) {
				var oEmailData = {
					"ReqNo": responseObj.REQUEST_NO,
					"ReqType": 5,
					"SupplierName": sSupplerName,
					"SupplerEmail": sUserId,
					"Approver_Email": null,
					"Approver_Level": 1,
					"Next_Approver": sResponse.outputScalar.OUT_SUCCESS2, // Proc Manager
					"Buyer": null
				};
				if(isEmailNotificationEnabled) {
				    // var oEmaiContent = EMAIL_LIBRARY.getEmailData("INTERNALREQ", "REGISTER", oEmailData, null);
            oEmaiContent = await lib_email_content.getEmailContent(connection, "INTERNALREQ", "REGISTER", oEmailData, null)
            // EMAIL_LIBRARY._sendEmailV2(oEmaiContent.emailBody, oEmaiContent.subject, [oEmailData.Next_Approver], null);
            // await lib_email.sendEmail(connection, oEmaiContent.emailBody, oEmaiContent.subject, [oEmailData.Next_Approver], null, null)
            var sCCEmail = await lib_email.setSampleCC( null);
            await  lib_email.sendivenEmail(oEmailData.Next_Approver,sCCEmail,'html', oEmaiContent.subject, oEmaiContent.emailBody)
        
          }
			}

			// responseInfo(JSON.stringify(responseObj), "text/plain", 200);
      req.reply(responseObj)
		} else {
			// responseObj = {
			// 	"Message": "Invalid Action",
			// 	"Status": "Error"
			// };
      throw {"message":"Invalid Action"}
			// responseInfo(JSON.stringify(responseObj), "text/plain", 400);
		}

    } catch (error) {

      var sType=error.code?"Procedure":"Node Js";    
      var iErrorCode=error.code??500;     
      // let Result2 = {
      //   OUT_SUCCESS: error.message || ""
      // };
      let Result = {
          OUT_ERROR_CODE: iErrorCode,
          OUT_ERROR_MESSAGE:  error.message ? error.message : error
      }
      lib_common.postErrorLog(Result,iReqNo,sUserId,sUserRole,"Vendor Profile",sType,dbConn,hdbext);
      console.error(error)     
      // return error.messsage     
      req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
    }
  })

this.on('VendorDataMigration',async (req) =>{
  //Changes by Chandan M 20/11 Start
  var client = await dbClass.createConnectionFromEnv();
  var dbConn = new dbClass(client);
  //Changes by Chandan M 20/11 End

  try{
      // local variables
      var {
        action,
        reqHeader,
        addressData,
        contactsData,
        bankData,
        sapCodeData,
        userDetails
    } = req.data;
      //intialize connection to database
      let connection = await cds.connect.to('db');
      var isEmailNotificationEnabled = false;
       //Check if email notification is enabled
       isEmailNotificationEnabled = await lib_email.isiVenSettingEnabled(connection, "VM_EMAIL_NOTIFICATION");
       var sUserID=userDetails.USER_ID || null;
      var sUserRole=userDetails.USER_ROLE || null; 

       // get connection
      //  var client = await dbClass.createConnectionFromEnv();
      //  let dbConn = new dbClass(client);

// load procedure
const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'VENDOR_DATA_MIGRATION')


     if (action === "DATA_MIGRATION")
		{
      var sEntityDesc = await lib_common.getEntityDesc(connection, reqHeader[0].ENTITY_CODE);
		// try {
			// 			var checkOnbForm = reqHeader;
			var valid =await checkVendor(connection,reqHeader);
			// var userDetails = oPayload.VALUE.USERDETAILS;
			if (valid === 0) {
				var count = 0;
				// execProcedure = conn.loadProcedure('VENDOR_PORTAL', 'VENDOR_PORTAL.Procedure::SUPPLIER_DATA_MIGRATION');
				for (var i = 0; i < reqHeader.length; i++) {
					// conn = $.hdb.getConnection();
					// execProcedure = conn.loadProcedure('VENDOR_PORTAL', 'VENDOR_PORTAL.Procedure::SUPPLIER_DATA_MIGRATION');
					var sapVendorCode = reqHeader[i].SAP_VENDOR_CODE;
					var reqType = reqHeader[i].REQUEST_TYPE;
          contactsData[i].SAP_VENDOR_CODE = sapCodeData[i].CONTACTS_CODE;
          addressData[i].SAP_VENDOR_CODE = sapCodeData[i].ADDRESS_CODE;
          bankData[i].SAP_VENDOR_CODE = sapCodeData[i].BANK_CODE;
					var onbContact =await getONBContacts(contactsData, sapVendorCode);
					var onbAddress =await getONBAddress(addressData, sapVendorCode);
					var onbBank =await getONBBank(bankData, sapVendorCode);
					// Added on 02jul2023 by InderSingh to remove Extra zeros
					sapVendorCode = parseInt(sapVendorCode, 10).toString();
					reqHeader[i].SAP_VENDOR_CODE = sapVendorCode;
					
					var supplierReq = [reqHeader[i]];
					
					if (reqHeader.length > 0) {
						if (reqHeader[i].TRADE_LIC_NO === "NA" && reqHeader[i].BP_TYPE_CODE === "B") {
							reqHeader[i].TRADE_LIC_NO = "0000";
						}
					}
					reqHeader[i].SAP_VENDOR_CODE = sapVendorCode; // Added on 02jul2023 by InderSingh to remove Extra zeros
					
					// var onbForm = [reqHeader[i]];
					var supplierEvents =await getCreateEvents(reqHeader[i].REQUESTER_ID);
					// sUserID = reqHeader[i].REQUESTER_ID || null; //Commented By Chandan M 22/11/23
					// Result = execProcedure(reqHeader[0].REQUESTER_ID, supplierReq[0].VEMAIL, supplierReq[0].SUPPLIERTYPE_CODE, sapVendorCode, reqType,
					// 	supplierReq, onbForm, onbAddress, onbContact, onbBank, supplierEvents);
					sResponse = await dbConn.callProcedurePromisified(loadProc,
           [reqHeader[i].REQUESTER_ID, supplierReq[0].REGISTERED_ID, supplierReq[0].SUPPL_TYPE_CODE, sapVendorCode, reqType,
           	supplierReq, onbAddress, onbContact, onbBank, supplierEvents]);
            // iVen_Content.postErrorLog(conn, Result, null, sUserID, "Supplier Data Migration", "PROCEDURE");
					
          
          if (sResponse.outputScalar.OUT_SUCCESS !== null) {
						count = count + 1;
						//Function to trigger mails
						if(isEmailNotificationEnabled) {
              oEmailData = {
                "SupplierName": reqHeader[i].VENDOR_NAME1,
                "EntityDesc": sEntityDesc,
                "MailTo":reqHeader[i].REGISTERED_ID
            }
						    // setEmailData(supplierReq);
                oEmaiContent = await lib_email_content.getEmailContent(connection, "DATA_MIGRATION", "DATA_MIGRATION", oEmailData, null)
                // EMAIL_LIBRARY._sendEmailV2(oEmaiContent.emailBody, oEmaiContent.subject, [oEmailData.Next_Approver], null);
                // await lib_email.sendEmail(connection, oEmaiContent.emailBody, oEmaiContent.subject, [oEmailData.MailTo], null, null)
                var sCCEmail = await lib_email.setSampleCC(null );
                await  lib_email.sendivenEmail(oEmailData.MailTo,sCCEmail,'html',  oEmaiContent.subject, oEmaiContent.emailBody)
            
						}
					}
					// conn.close();
					// Result = execProcedure(supplierReq, onbForm, onbAddress, onbContact, onbBank, onbFinance, supplierEvents);
				}
				// $.response.setBody(JSON.stringify("Data Migration successful. " + count + " suppliers added."));
				// $.response.contentType = "application/json";
				// $.response.status = 200;
				// $.response.contentType = "text/plain";
        req.reply("Data Migration successful. " + count + " suppliers added.");
			} else {
				// $.response.setBody(JSON.stringify(valid));
				// $.response.contentType = "application/json";
				// $.response.status = 301;
				// $.response.contentType = "text/plain";
        throw JSON.stringify(valid);
			}

		// } catch (e) {
		// 	conn.rollback();
		// 	Result2 = {
		// 		OUT_SUCCESS: e.message || ""
		// 	};

		// 	Result = {
		// 		OUT_ERROR_CODE: null,
		// 		OUT_ERROR_MESSAGE: e.message || ""
		// 	}
		// 	iVen_Content.postErrorLog(conn, Result, null, sUserID, "Supplier Data Migration", "PROCEDURE");
		// 	iVen_Content.responseInfo(JSON.stringify(Result2), "application/json", 400);
		// } finally {
		// 	conn.close();
		// }
	}
  }
  catch(error){
    var sType=error.code?"Procedure":"Node Js";    
      var iErrorCode=error.code??500;     
      // let Result2 = {
      //   OUT_SUCCESS: error.message || ""
      // };
      let Result = {
          OUT_ERROR_CODE: iErrorCode,
          OUT_ERROR_MESSAGE:  error.message ? error.message : error
      }
      lib_common.postErrorLog(Result,null,sUserID,sUserRole,"Data Migration",sType,dbConn,hdbext);
      console.error(error)     
      // return error.messsage     
      req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
  }

})

this.on('getDataMigrationConfiguration',async(req) =>{
   //Changes by Chandan M 20/11 Start
   var client = await dbClass.createConnectionFromEnv();
   var dbConn = new dbClass(client);
   //Changes by Chandan M 20/11 End
 
  try{
   
 //intialize connection to database
 let connection = await cds.connect.to('db');
    var response = {
      "FieldConfiguration" : await getDMFieldData(connection),
      "DMLimit": await getDMLimit(connection)
    }
    return JSON.stringify(response);
  }
  catch(error){
    req.error({ code: "500", message:  error.message ? error.message : error });
  }
})
this.on('DataMigrationConfiguration',async(req) =>{
   //Changes by Chandan M 20/11 Start
   var client = await dbClass.createConnectionFromEnv();
   var dbConn = new dbClass(client);
   //Changes by Chandan M 20/11 End
 
  try{
    var {action,DMFieldConfiguration,DMLimit,userDetails} = req.data;
   var sUserID=userDetails.USER_ID || null;
   var sUserRole=userDetails.USER_ROLE || null;
   
 //intialize connection to database
 let connection = await cds.connect.to('db');
 if(action === "GET"){
  var response = {
    "FieldConfiguration" : await getDMFieldData(connection),
    "DMLimit": await getDMLimit(connection),
    "AllMandatoryFieldID" : await AllMandatoryFieldID(connection)
  }
  return JSON.stringify(response);
 }else if(action === "POST")
 {
  var fieldResponse =null,limitResponse = null;
    if(DMFieldConfiguration.length > 0 )
    {
       fieldResponse = await updateDMField(DMFieldConfiguration,connection);
    }
    if(DMLimit !== 0)
    {
       limitResponse = await updateDMLimit(DMLimit,connection);
    }
    // if(fieldResponse === 1 || limitResponse === 1)
    //   req.reply("Data Updated Successfully");
    // else
    //   req.reply("No Change Made");
    (fieldResponse === 1 || limitResponse === 1)?req.reply("Data Updated Successfully"):req.reply("No Change Made");
 }
 else{
  throw  { message: "The value for action is invalid" };
 }
    
  }
  catch(error){
    var sType=error.code?"Procedure":"Node Js";    
    var iErrorCode=error.code??500;     
    // let Result2 = {
    //   OUT_SUCCESS: error.message || ""
    // };
    let Result = {
        OUT_ERROR_CODE: iErrorCode,
        OUT_ERROR_MESSAGE:  error.message ? error.message : error
    }
    lib_common.postErrorLog(Result,null,sUserID,sUserRole,"Data Migration",sType,dbConn,hdbext);
    console.error(error)     
    // return error.messsage     
    req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
  }
})
this.on('getBackendAvailability',async(req)=>{
  var client = await dbClass.createConnectionFromEnv();
  var dbConn = new dbClass(client);
  try{
    // var {sapClient,destFileName} = req.data;
    var response = {"onPremise":null,"Cloud":null};
    var sapClient ='';
    //   set connection to ZIVN_VENDOR_REG_SRV Destination
    var iVenVendorConnection = await cds.connect.to('ZIVN_VENDOR_REG_SRV');
    var onPremResponse = await iVenVendorConnection.send({
      method: 'GET',
      // path: '/GetCitySet',
      path:'/BPTypeSet',
      // path:'/',
      headers: { 'Content-Type': 'application/json' ,
      "sap-client":sapClient 
    }
    })
    if( onPremResponse.length >= 0)
      response.onPremise = "Loaded"

    let connection = await cds.connect.to('db');
    let cloudResponse =  await connection.run(SELECT
      .from`${connection.entities['VENDOR_PORTAL.MASTER_SUBACCOUNT']}`);

      if( cloudResponse.length >= 0)
      response.Cloud = "Loaded"
 req.reply(response);   
}
catch(error)
{
  req.error({ code: "500", message:  error.message ? error.message : error });  
  // throw error;
}    
})

async function AllMandatoryFieldID(connection){
  try{
    var aResult = null,oObj = {},aResponse =[];
   aResult = await connection.run(
    SELECT `FIELD_ID`
        .from`${connection.entities['VENDOR_PORTAL.DATA_MIGRATION_FIELD_CONFIGURATION']}`
        .where `IS_MANDATORY = 'X'`
       );
       if(aResult.length > 0)
         {
          aResult.map(function(record){
            // oObj = {}
            // oObj[record.FIELD_ID]  = record.IS_MANDATORY
            aResponse.push( record.FIELD_ID);
          })
         }
      return aResponse;

  }catch(error){throw error;}
}
async function updateDMField(oPayload,connection){
  try{
    let aResult = await connection.run(UPDATE
      .entity(`${connection.entities['VENDOR_PORTAL.DATA_MIGRATION_FIELD_CONFIGURATION']}`)
      .set({IS_MANDATORY : oPayload[0].IS_MANDATORY})
      .where({ FIELD_ID:  oPayload[0].FIELD_ID, GROUP:  oPayload[0].GROUP }))
return aResult;
  }catch(error){throw error;}
}
async function updateDMLimit(DMLimit,connection){
  try{
    let aResult = await connection.run(UPDATE
      .entity(`${connection.entities['VENDOR_PORTAL.MASTER_IVEN_SETTINGS']}`)
      .set({SETTING : DMLimit})
      .where({ CODE: 'DM_UPLOAD_LIMIT' }))
return aResult;
  }catch(error){throw error;}
}
async function getDMFieldData(connection){
  try{
    var aResult = await connection.run(
      SELECT
          .from`${connection.entities['VIEW_DATA_MIGRATION_FIELDS']}` 
         );
  // var aResult = await connection.run(
  //   SELECT 
  //       .from`VENDOR_PORTAL.DATA_MIGRATION_FIELD_CONFIGURATION AS A` 
  //       .join`VENDOR_PORTAL.MASTER_DATA_MIGRATION_FIELDS_ID_DESC AS B`
  //       .on('A.FIELD_ID','=','B.FIELD_ID')
  //      );
return aResult;
  }catch(error){throw error;}
}
async function getDMLimit(connection){
  try{
    var aResult = null;
   aResult = await connection.run(
    SELECT `SETTING`
        .from`${connection.entities['VENDOR_PORTAL.MASTER_IVEN_SETTINGS']}`
        .where(`CODE='DM_UPLOAD_LIMIT'`)
       );
       if(aResult.length > 0)
          return aResult[0].SETTING;

  }catch(error){throw error;}
}

  async function getInviteUpdateReqData(connection, iRequestNo) {
    var sSupplierName = "";
  
    if (iRequestNo !== "" || iRequestNo !== null) {
      // var sQuery =
      //   'SELECT * FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::VENDOR_INVITATION" WHERE REG_NO = ?';
      // var aResult = conn.executeQuery(sQuery, iRequestNo);
      var aResult = await connection.run(
        SELECT
            .from`${connection.entities['VENDOR_PORTAL.REQUEST_INFO']}`
            .where`REQUEST_NO=${iRequestNo}`);
    }
    // 	if (aResult.length) {
    // 		aResult[0].VCODE = "IR";
    // 	}
    return aResult;
  }
  async function getEventObjects(oPayloadValue) {
    var oEventObj = [{
        "REQUEST_NO": 1,
        "EVENT_NO": 1,
        "EVENT_CODE": 1,
        "EVENT_TYPE": "REG",
        "USER_ID": oPayloadValue[0].USER_ID,
        "USER_NAME": oPayloadValue[0].USER_NAME,
        "REMARK": "Update Request Created",
        "COMMENT": "Update Request is auto-generated for Supplier Internal request",
        "CREATED_ON": null
          },
      {
        "REQUEST_NO": 2,
        "EVENT_NO": 2,
        "EVENT_CODE": 2,
        "EVENT_TYPE": "REG",
        "USER_ID": oPayloadValue[0].USER_ID,
        "USER_NAME": oPayloadValue[0].USER_NAME,
        "REMARK": "Update Request Approved",
        "COMMENT": "Update Request is auto-approved for Supplier Internal request",
        "CREATED_ON": null
          }
  
      ];
  
    return oEventObj;
  }
  async function getActiveData(connection, iIvenVendorNo) {
    var oActiveObj = null;
  
    // var sQuery = 'SELECT * FROM \"_SYS_BIC\".\"VENDOR_PORTAL.View/INVITE_ACTIVE_STATUS\"';
    // sQuery += 'WHERE IVEN_VENDOR_CODE=? AND ACTIVE=? AND STATUS=?';
    // var aResult = conn.executeQuery(sQuery, iIvenVendorNo, 'A', 11);
    var aResult = await connection.run(
      SELECT
          .from`${connection.entities['VIEW_REQUEST_ACTIVE_STATUS']}`
          .where`IVEN_VENDOR_CODE=${iIvenVendorNo} and ACTIVE = 'A' and status = 11`);
  
    if (aResult.length > 0) {
      oActiveObj = {
        "REQ_NO_ACTIVE": aResult[0].REQUEST_NO,
        "REQUEST_TYPE": aResult[0].REQUEST_TYPE,
        "CREATION_TYPE": aResult[0].CREATION_TYPE,
        "STATUS": aResult[0].STATUS
      };
    }
  
    return oActiveObj;
  }
  async function getidForArr(array, propertyName) {
    if (array.length > 0) {
      if (propertyName !== "" && propertyName !== null && propertyName !== undefined) {
        for (var i = 0; i < array.length; i++) {
          array[i].REQUEST_NO = 0;
          array[i][propertyName] = i + 1;
        }
      } else {
        throw "Property Name missing for id's"
      }
    }
  
    return array;
  }
 async function getProdServData(arrayPrdSrv, propertyName) {
    var aProductsArr = [];
    var aServiceArr = [];
  
    if (arrayPrdSrv.length > 0) {
      var dataObj = null;
      var iProdCount = 0;
      var iServCount = 0;
  
      for (var i = 0; i < arrayPrdSrv.length; i++) {
        arrayPrdSrv[i].REQUEST_NO = 0;
        if (arrayPrdSrv[i].TYPE === "PROD") {
          arrayPrdSrv[i][propertyName] = ++iProdCount;
          aProductsArr.push(JSON.parse(JSON.stringify(arrayPrdSrv[i])));
        } else if (arrayPrdSrv[i].TYPE === "SERV") {
          arrayPrdSrv[i][propertyName] = ++iServCount;
          aServiceArr.push(JSON.parse(JSON.stringify(arrayPrdSrv[i])));
        }
      }
    }
  
    var oDataObjects = {
      "Products": aProductsArr,
      "Service": aServiceArr
    };
  
    return oDataObjects;
  }
  async function getLogsCount(connection, oPayloadValue) {
    var iCount = 0;
    // var sQuery =
    //   'SELECT MAX("EVENT_NO") AS COUNT FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::SUPPLIER_PROFILE_LOG" WHERE SAP_VENDOR_CODE = ?';
    // var aResult = conn.executeQuery(sQuery, oPayloadValue[0].SAP_VENDOR_CODE);
    var aResult = await connection.run(
      SELECT` MAX(EVENT_NO) AS COUNT`
      .from`${connection.entities['VENDOR_PORTAL.SUPPLIER_PROFILE_LOG']}`
      .where`SAP_VENDOR_CODE =${oPayloadValue[0].SAP_VENDOR_CODE}`);

    if (aResult.length > 0) {
      iCount = aResult[0].COUNT + 1;
    } else {
      iCount = iCount + 1;
    }
    for (var i = 0; i < oPayloadValue.length; i++) {
      var no = iCount + i;
      oPayloadValue[i].EVENT_NO = no;
    }
  
    return oPayloadValue;
  }
  function getEventObj(oPayloadValue, comment) {

    var eventArr = [];
  
    if (oPayloadValue !== null) {
      eventArr = [{
        "REQUEST_NO": 0,
        "EVENT_NO": 3,
        "EVENT_CODE": 4,
        "USER_ID": oPayloadValue[0].USER_ID,
        "USER_NAME": oPayloadValue[0].USER_NAME,
        "REMARK": "Form submitted - Internal request",
        "COMMENT": comment,
        "CREATED_ON": null,
        "EVENT_TYPE": "ONB"
      }];
  
    } else {
      throw "Incorrect Data format for posting";
    }
  
    return eventArr;
  }

 async function checkVendor(connection , data) {
    // 		data = [{
    // 			"VEMAIL": "accura@gmail.com",
    // 			"VNAME": "TEST NEW 22"
    // 					    }];
    var arr = [];
    // var con = $.hdb.getConnection();
    for (var j = 0; j < data.length; j++) {
  
      // var sQuery1 =
      //   'SELECT * FROM \"VENDOR_PORTAL\".\"VENDOR_PORTAL.Table::VENDOR_INVITATION\" WHERE STATUS != ? AND STATUS != ? AND VEMAIL=?';
      // var sResult = con.executeQuery(sQuery1, 3, 8, data[j].VEMAIL);
      var sResult = await connection.run(
        SELECT
        .from`${connection.entities['VENDOR_PORTAL.REQUEST_INFO']}`
        .where`STATUS NOT IN (3,8) AND REGISTERED_ID = ${ data[j].REGISTERED_ID}`);
  
      // var sQuery2 =
      //   'SELECT * FROM \"VENDOR_PORTAL\".\"VENDOR_PORTAL.Table::VENDOR_INVITATION\" WHERE STATUS != ? AND STATUS != ? AND SAP_VENDOR_CODE=?';
      // var vResult = con.executeQuery(sQuery2, 3, 8, data[j].SAP_VENDOR_CODE);
      var vResult = await connection.run(
        SELECT
        .from`${connection.entities['VENDOR_PORTAL.REQUEST_INFO']}`
        .where`STATUS NOT IN (3,8) AND SAP_VENDOR_CODE = ${ data[j].SAP_VENDOR_CODE}`);
  
      if (sResult.length !== 0) {
        arr.push({
          "VAL": "Email",
          "VEMAIL": data[j].REGISTERED_ID,
          "VNAME": data[j].VENDOR_NAME1,
          "SAP_VENDOR_CODE": data[j].SAP_VENDOR_CODE
        });
      }
      if (vResult.length !== 0) {
        arr.push({
          "VAL": "Supplier",
          "VEMAIL": data[j].REGISTERED_ID,
          "VNAME": data[j].VENDOR_NAME1,
          "SAP_VENDOR_CODE": data[j].SAP_VENDOR_CODE
        });
      }
    }
  
    if (arr.length !== 0) {
      return arr;
    } else {
      return 0;
    }
  }
  async function getONBContacts(array, sapvendorcode) {
    var contactData = [],
      count = 0;
  
    for (var j = 0; j < array.length; j++) {
      if (array[j].SAP_VENDOR_CODE === sapvendorcode) {
        count = count + 1;
        array[j].SR_NO = count;
        delete(array[j].SAP_VENDOR_CODE);
        contactData.push(array[j]);
      }
    }
    return contactData;
  }
  async function getONBAddress(array, sapvendorcode) {
    var addData = [],
      count = 0;
    for (var j = 0; j < array.length; j++) {
      if (array[j].SAP_VENDOR_CODE === sapvendorcode) {
        count = count + 1;
        array[j].SR_NO = count;
        delete(array[j].SAP_VENDOR_CODE);
        addData.push(array[j]);
      }
    }
    return addData;
  }
  
  async function getONBBank(array, sapvendorcode) {
    var payData = [],
      count = 0;
    for (var j = 0; j < array.length; j++) {
      if (array[j].SAP_VENDOR_CODE === sapvendorcode) {
        count = count + 1;
        array[j].SR_NO = count;
        delete(array[j].SAP_VENDOR_CODE);
        payData.push(array[j]);
      }
    }
    return payData;
  }
  
  function getCreateEvents(User_Id) {
    var objData = [{
      "REQUEST_NO": 0,
      "EVENT_NO": 1,
      "EVENT_CODE": 16,
      "EVENT_TYPE": "Auto",
      "USER_ID": User_Id,
      "USER_NAME": "Auto Generated",
      "REMARK": "Auto Generated",
      "COMMENT": "Request auto completed.",
      "CREATED_ON": null
          }];
    return objData;
  }
  
  
})