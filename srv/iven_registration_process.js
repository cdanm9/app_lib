const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")

const lib_common = require('./LIB/iven_library')
const lib_email = require('./LIB/iven_library_email')
const lib_email_content = require('./LIB/iven_library_email_content')
const connect = require('passport/lib/framework/connect')
const lib_mdg = require('./LIB/iven_library_mdg')   
const lib_ias = require('./LIB/iven_library_ias') 
        
module.exports = cds.service.impl(function () {   

    this.on('PostRegFormData', async (req) => {
        //Changes By Chandan M 23/11/23 Start
        var client = await dbClass.createConnectionFromEnv();
        var dbConn = new dbClass(client);
        //Changes By Chandan M 23/11/23 End     
        try {
            var {
                action,
                stepNo,
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
                userDetails
            } = req.data;

            var sAction = action;
            var Result = null;


 //intialize connection to database
 var connection = await cds.connect.to('db');
//  var client = await dbClass.createConnectionFromEnv();
//  var dbConn = new dbClass(client);
 var isEmailNotificationEnabled = false;
 var sUserIdentity=userDetails.USER_ID || null;
  var sUserRole=userDetails.USER_ROLE || null;  
  var statusCode; 
   //Check if email notification is enabled
   isEmailNotificationEnabled = await lib_common.isiVenSettingEnabled(connection, "VM_EMAIL_NOTIFICATION");

            if (sAction === "DRAFT" || sAction === "CREATE" || sAction === "RESEND") { //-----------------------------------------------------------------------------
                // APP_NAME = "Supplier Registration Form";
                // execProcedure = conn.loadProcedure('VENDOR_PORTAL', 'VENDOR_PORTAL.Procedure::ONBOARDING_DRAFT');
                     
                var iReqNo = reqHeader[0].REQUEST_NO;
                var iReqType = reqHeader[0].REQUEST_TYPE;
                var iStep = stepNo;
                
                
                // --Section 2--
                var aMainObj = reqHeader,checkApprover=[];
                if (aMainObj.length > 0) {
                    reqHeader[0].REQUEST_NO = 0;
                } else {
                    throw "Invalid Payload";
                }
                var sUserId = reqHeader[0].REGISTERED_ID;
                var sEntityCode = reqHeader[0].ENTITY_CODE;
                var sIsResend = reqHeader[0].REQUEST_RESENT;
                var iStatus = 4; // Draft - in progress
                var vendorName = reqHeader[0].VENDOR_NAME1;
                

                // iREG_NO = iReqNo || null;
                // sUser_ID = aMainObj[0].REGISTERED_ID || null;

                var aAddressObj = await getidForArr(addressData, "SR_NO") || [];
                var aContactObj = await getidForArr(contactsData, "SR_NO") || [];

                // --Section 2--
                var aPaymentObj = await getidForArr(bankData, "SR_NO") || [];
                var aFinanceObj = await getidForArr(financeData, "SR_NO") || [];
                var aOwnerObj = await getidForArr(ownersData, "SR_NO") || [];

                // --Section 3--
                var aProdServPayloadObj = await getProdServiceData(prodServData, "SR_NO") || [];
                var aProductObj = aProdServPayloadObj.Products || [];
                var aServiceObj = aProdServPayloadObj.Service || [];
                var aProdServbj = [...aProductObj, ...aServiceObj];

                var aCapacityObj = await getidForArr(capacityData, "SR_NO") || [];
                var aCustomerObj = await getidForArr(customerData, "SR_NO") || [];
                var aOEMObj = await getidForArr(oemData, "SR_NO") || [];

                // --Section 4--
                var aDiscFieldsObj = discFieldsData || [];
                if (aDiscFieldsObj.length > 0) {
                    aDiscFieldsObj[0].REQUEST_NO = 0;
                }
                var aRelativeObj = await getidForArr(discRelativesData, "SR_NO") || [];
                var aQaCertiObj = await getidForArr(discQaCertiData, "SR_NO") || [];

                // --Section 5--
                var aAttachFieldsObj = attachmentFieldsData || [];
                if (aAttachFieldsObj.length > 0) {
                    aAttachFieldsObj[0].REQUEST_NO = 0;
                }
                var aAttachmentsObj = await getidForArr(attachmentData, "SR_NO") || [];

                var aUpdatedFieldsIDs = updatedFields;
                var aUpdatedFieldsObj = [];
                if (aUpdatedFieldsIDs.length > 0) {
                    aUpdatedFieldsObj = await lib_common.getUpdatedFieldsDataForEdit(iReqNo, aUpdatedFieldsIDs, connection) || [];
                }

                var aEventsObj = eventsData || [];

                // Result = execProcedure(iReqNo, iStep, sEntityCode, sUserId, sIsResend, iStatus,
                //     aMainObj, aAddressObj, aContactObj,
                //     aPaymentObj, aFinanceObj, aOwnerObj,
                //     aProdServbj, aCapacityObj, aCustomerObj, aOEMObj,
                //     aDiscFieldsObj, aRelativeObj, aQaCertiObj,
                //     aAttachFieldsObj, aAttachmentsObj);
                // iVen_Content.postErrorLog(conn, Result, iReqNo, aMainObj[0].REGISTERED_ID, APP_NAME, "PROCEDURE");

                // get connection              
             

                const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'REGFORM_DRAFT_SUBMIT');
                sResponse = await dbConn.callProcedurePromisified(loadProc,
                    [iReqNo, iReqType, iStep, sEntityCode, sUserId, sIsResend, iStatus,null,
                        aMainObj, aAddressObj, aContactObj,
                        aPaymentObj, aFinanceObj, aOwnerObj,
                        aProdServbj, aCapacityObj, aCustomerObj, aOEMObj,
                        aDiscFieldsObj, aRelativeObj, aQaCertiObj,
                        aAttachFieldsObj, aAttachmentsObj,aUpdatedFieldsObj, aEventsObj
                    ]
                );
                    
                Result = sResponse.outputScalar;
                //Create response message
                var Message =null;
                if(Result.OUT_SUCCESS !== null){
                if(sAction === "DRAFT")
                    Message = "Draft saved successfully";    
                else if(sAction === "CREATE"){
                    var bApproveWithoutMatrix=false;
                    Message = "Registration Form Submitted for Request: "+ iReqNo +". Your form will be forwarded for verification.";    
                    checkApprover = await lib_common.getHierarchyApproverForEntity(connection, sEntityCode,'MASTER_APPROVAL_HIERARCHY_FE',1,'REG')||[];  

                    var aRegisterCheck=await SELECT`SETTING`
                    .from('VENDOR_PORTAL_MASTER_IVEN_SETTINGS')
                    .where({CODE:'REGAPPR_MATRIX_CHK'})
                    if(aRegisterCheck[0].SETTING&&checkApprover.length==0){
                        bApproveWithoutMatrix=true
                    }else{
                        bApproveWithoutMatrix=false   
                    }

                    if(bApproveWithoutMatrix){ 
                        var sSapVendorCode = null;      
                        // ------------- MDG Posting Start------------------
                        // var iMaxLevelCount = await getMaxApproverCount(connection, sEntityCode);
    
                        var iVenVendorCode = null;
                        var oMDGResponse = null;
                        var iMDGStatus = null;
                        var oMDGPayload = null;
                        var bMDGComparison = null;
                        var bAttachmentComparison = null;
                        var oActiveData = null;
                        var CurrAttachment = null;
                        var bNoChange = false;
                        var oDataStatus = null;
                        var ODataResponse = null;
                        var sCompareValue = 'A';  
                        var ResultApprove;       
                            oMDGPayload =await lib_mdg.getMDGPayload(reqHeader,addressData,contactsData,bankData, connection);
                            iVenVendorCode = reqHeader[0].IVEN_VENDOR_CODE || null;
    
                            // ------------------------START: Direct MDG Call for testing-------------------------
                            var MDGResult =await  lib_mdg.PostToMDG(oMDGPayload,connection);
                        
                            iMDGStatus = MDGResult.iStatusCode;
                            oMDGResponse = MDGResult.oResponse;
    
                            sChangeRequestNo =oMDGResponse.changerequestNo;
                            sSapVendorCode = parseInt(oMDGResponse.d.Lifnr, 10) || "";

                            var iRequestType = reqHeader[0].REQUEST_TYPE || null;
                            var sSupplierEmail = reqHeader[0].REGISTERED_ID || null;
                            var sUserId = "System";
                            var iLevel = null     
                            var sBuyerEmail = reqHeader[0].REQUESTER_ID || null;
                            var sSupplerName = reqHeader[0].VENDOR_NAME1 || null;
                            var sChangeRequestNo = null;
                            var iVenVendorCode = reqHeader[0].IVEN_VENDOR_CODE||null;   
                            var sCompareValue = "A";
                            var sVendorCode=reqHeader[0].VENDOR_CODE||null;
                            eventsData=await getApproveEventsObj(reqHeader[0])   
    
                        // ------------- MDG Posting End------------------
                            const loadProcApprove = await dbConn.loadProcedurePromisified(hdbext, null, 'REGFORM_APPROVAL')
    
                            ResultApprove = await dbConn.callProcedurePromisified(loadProcApprove,
                                [iReqNo, sEntityCode, iRequestType,
                                    sSupplierEmail, sBuyerEmail, sUserId, iLevel, eventsData, 
                                    sChangeRequestNo, iVenVendorCode, sSapVendorCode, sSupplerName,
                                    sCompareValue]);
                            var responseObj = {
                                "Message": ResultApprove.outputScalar.OUT_SUCCESS !== null ? ResultApprove.outputScalar.OUT_SUCCESS : "Approval failed!",
                                "MDG_status": iMDGStatus,
                                "MDG_Payload": oMDGPayload,
                                "ODataResponse": oMDGResponse,
                                "bMDGComparison": bMDGComparison,
                                "bAttachmentComparison": bAttachmentComparison,
                                "CurrAttachment": CurrAttachment,            
                                "sChangeRequestNo": sChangeRequestNo,
                                "sChangeRequestNo1": sChangeRequestNo       
                                // "MDG_Response":oMDGResponse    
                            };
    
                            if (ResultApprove.outputScalar.OUT_SUCCESS !== null) {
    
                                var oEmailData = {
                                    "ReqNo": iReqNo,
                                    "ReqType": iRequestType,
                                    "SupplierName": sSupplerName,
                                    "SupplerEmail": sSupplierEmail,
                                    "Approver_Email": sUserId,
                                    "Approver_Level": iLevel,
                                    "Next_Approver": ResultApprove?.outputScalar?.OUT_EMAIL_TO||null, // Proc Manager
                                    "Buyer": sBuyerEmail,
                                    "NextApproverRole":checkApprover[0]?.USER_ROLE||null       
                                };        
    
                                action = "FINAL_APPROVAL";            
    
                                    // Approval done - notification to Buyer & Proc Manager
                                    if (isEmailNotificationEnabled) {
                                        // var oEmaiContent2 = EMAIL_LIBRARY.getEmailData(action, "BUYER_NOTIFICATION", oEmailData, null);
                                        // EMAIL_LIBRARY._sendEmailV2(oEmaiContent2.emailBody, oEmaiContent2.subject, [oEmailData.Buyer, oEmailData.Approver_Email], null);
                                        oEmaiContent = await lib_email_content.getEmailContent(connection, action, "BUYER_NOTIFICATION", oEmailData, null)
                                        // await lib_email.sendEmail(connection, oEmaiContent.emailBody, oEmaiContent.subject, [oEmailData.Buyer, oEmailData.Approver_Email], null, null)
                                        var sCCEmail = await lib_email.setDynamicCC( null);
                                        var sToEmail = [oEmailData.Buyer, oEmailData.SupplerEmail].toString();    
                                        await  lib_email.sendivenEmail(sToEmail,sCCEmail,'html', oEmaiContent.subject, oEmaiContent.emailBody)
                                    }
                                    //Post to IAS for Create Normal Request
                                    // if(iRequestType == 1)     
    
                                    var aIASSetting=await SELECT .from('VENDOR_PORTAL_MASTER_IVEN_SETTINGS') .where({CODE:'REGAPPR_IAS_ENABLE'});
                                    if(aIASSetting[0].SETTING=='X')
                                        await lib_ias.CreateVendorIdIAS(sSapVendorCode,sSupplerName,null,sSupplierEmail);    
        
                                statusCode = 200;
                            } 
                            // return responseObj;
                            responseObj = {
                                "Draft_Success": Result.OUT_SUCCESS !== null ? 'X' : '',
                                "REQUEST_NO": Result.OUT_SUCCESS !== null ? iReqNo : 0,
                                // "Message": Result.OUT_SUCCESS !== null ? "Draft saved successfully" : "Draft saving failed!",
                                "Message":ResultApprove.outputScalar.OUT_SUCCESS,
                                "ERROR_CODE": Result?.OUT_ERROR_CODE,
                                "ERROR_DESC": Result?.OUT_ERROR_MESSAGE           
                            };
                            return req.reply(responseObj);   
                         
                    }
                }     
                else if(sAction === "RESEND")
                    Message ="Form resent successfully";
                    
               
                    var oEmailData = {
                        "ReqNo": iReqNo,
                        "SupplierName": vendorName,
                        "To_Email": Result.OUT_EMAIL_TO, // Approver
                        "NextApproverRole":checkApprover[0]?.USER_ROLE||null  
                    };
                    var checkSupplier =await fnCheckSupplier(connection, oEmailData.ReqNo);
                    if (checkSupplier === null) {    
                        var sPMId = await lib_common.getHierarchyApproverForEntity(connection, sEntityCode,'MASTER_APPROVAL_HIERARCHY_FE',1,'REG');               
                        // var sPMId = await lib_common.getApproverForEntity(connection, sEntityCode, 'PM', 'MATRIX_REGISTRATION_APPR') || "";
                               
                        if (sPMId) sPMId = sPMId[0].USER_ID;
                        oEmailData.To_Email = sPMId;   
    
                        if (isEmailNotificationEnabled && sAction !== 'DRAFT' && sPMId !== null ) {
                            // var oEmaiContent = EMAIL_LIBRARY.getEmailData("SELFREG", "REGISTER", oEmailData, status);
                            // EMAIL_LIBRARY._sendEmailV2(oEmaiContent.emailBody, oEmaiContent.subject, [sPMId], null);
                            var oEmaiContent = await lib_email_content.getEmailContent(connection, "SELFREG", "REGISTER", oEmailData, iStatus);  
                            var sCCEmail = await lib_email.setDynamicCC( null);       
                            await  lib_email.sendivenEmail(sPMId,sCCEmail,'html', oEmaiContent.subject, oEmaiContent.emailBody)   
                            
                        }
                    } else {
                        if (isEmailNotificationEnabled && sAction !== 'DRAFT' && oEmailData.To_Email !== null) {
                            // var oEmaiContent = EMAIL_LIBRARY.getEmailData(sAction, "REGISTER", oEmailData, null);
                            // EMAIL_LIBRARY._sendEmailV2(oEmaiContent.emailBody, oEmaiContent.subject, [oEmailData.To_Email], null);
                            var oEmaiContent = await lib_email_content.getEmailContent(connection,sAction, "REGISTER", oEmailData, null);
                            var sCCEmail = await lib_email.setDynamicCC( null);
                            await  lib_email.sendivenEmail(oEmailData.To_Email,sCCEmail,'html', oEmaiContent.subject, oEmaiContent.emailBody)
                      
                        }
                    }
                    responseObj = {
                        "Draft_Success": Result.OUT_SUCCESS !== null ? 'X' : '',
                        "REQUEST_NO": Result.OUT_SUCCESS !== null ? iReqNo : 0,
                        // "Message": Result.OUT_SUCCESS !== null ? "Draft saved successfully" : "Draft saving failed!",
                        "Message":Message,
                        "ERROR_CODE": Result.OUT_ERROR_CODE,
                        "ERROR_DESC": Result.OUT_ERROR_MESSAGE
                    };
                    req.reply(responseObj);
                } 
                else{
                    Message = "Process Failed"
                }
               
                

                // iVen_Content.responseInfo(JSON.stringify(responseObj), "text/plain", 200);

            }
            else {
                throw { message: "The value for action is invalid" };
            }

           

        } catch (error) {
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;   
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }
            lib_common.postErrorLog(Result,iReqNo,sUserIdentity,sUserRole,"Vendor Registration Form",sType,dbConn,hdbext);   
            // return error.messsage     
            req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
        }
    })

    this.on('CheckSecurityPin', async (req) => {
        var client = await dbClass.createConnectionFromEnv();
        let dbConn = new dbClass(client);
        try {
           
            var { vendorEmail,securityPin,userId,userRole,self} = req.data;
            var response ={};
            //intialize connection to database
            // var connection = await cds.connect.to('db');
             // get connection

            if (vendorEmail !== "" && vendorEmail !== null && vendorEmail !== undefined) {
                let connection = await cds.connect.to('db');//form connection to database
                
                
                let sEmailCheck = await connection.run(SELECT
                    .from(`${connection.entities['VENDOR_PORTAL.REQUEST_INFO']}`)
                    .where({ REGISTERED_ID: vendorEmail }));

                if(self==true){
                    sEmailCheck=[{}];     
                }   
                if(sEmailCheck.length > 0)
                {   
                    let sResult =await checkRegisteredIdExists(connection, vendorEmail)
                   
                    
                    if (sResult.length > 0) {
						if(securityPin === null)
							return;
                         //Check if user entered pin matched with generated pin
                         if(sResult[0].SEC_CODE === securityPin)
                         {
                            response["CREATED_ON"]= new Date(sResult[0].CREATED_ON);
                            response["IS_MATCH"] = true;
                            response["RESPONSE_MESSAGE"]= "Valid Security Pin";
                            req.reply(response);    
                        //     sResult[0].CREATED_ON = new Date(sResult[0].CREATED_ON);
                        // req.reply(sResult[0]);
                         }
                         else{
                            //  throw {"message": "Invalid Security Pin entered",
                            //    "errorType":"Warning"};
                          
                            
                            response["CREATED_ON"]= new Date(sResult[0].CREATED_ON);
                            response["IS_MATCH"] = false;
                            response["RESPONSE_MESSAGE"]= "Invalid Security Pin entered";
                            req.reply(response);
                         }
                        
                    }
                    else{
                        throw {"message": "Generate Security Pin against email id",
                               "errorType":"Warning"};
                    }
                }
                else{
                    throw  {"message":"Please enter Registered Email Id",
                    "errorType":"Warning"};
                }
            } else throw {"message": "Vendor email id is missing for security pin check.",
                            "errorType":"Warning"}

        } catch (error) {
           
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;   
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }

            if(error.errorType !== "Warning")  
            lib_common.postErrorLog(Result,null,userId,userRole,"Vendor Registration Form",sType,dbConn,hdbext);   
              
            req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
        }

    })

    this.on('GetSecurityPin', async (req) => {
        var client = await dbClass.createConnectionFromEnv();
        var dbConn = new dbClass(client);
        try {       
            var { vendorName, vendorEmail, requesterId,userId,userRole } = req.data;
            var isEmailNotificationEnabled = false;
                                                          
            if (vendorName === null || vendorEmail === null) {
                throw "Invalid Payload";  
            }

            var sSupplierName = vendorName.toUpperCase().trim() || "";
            var sSupplierEmail = vendorEmail.toLowerCase().trim() || "";
            var sBuyerEmail = requesterId || "";

            var sSecurityPin = await getRandomNumber();

            //Encrypt Security Pin
            // var encryptedPin = await lib_common.getEncryptedSecurityPin(sSecurityPin);

            var client = await dbClass.createConnectionFromEnv();
            let dbConn = new dbClass(client);

            //intialize connection to database
            let connection = await cds.connect.to('db');

            //Check if email notification is enabled
            isEmailNotificationEnabled = await lib_common.isiVenSettingEnabled(connection, "VM_EMAIL_NOTIFICATION");

            // load procedure
            // execProcedure = conn.loadProcedure('VENDOR_PORTAL', 'VENDOR_PORTAL.Procedure::REQUEST_SECURITY_CODE');
            // Result = execProcedure(sSupplierEmail, sSecurityPin);
            const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'REGFORM_SECURITY_PIN')
            sResponse = await dbConn.callProcedurePromisified(loadProc, [sSupplierEmail, sSecurityPin]);


            if (sResponse.outputScalar.OUT_SUCCESS !== null) {

                var oPinEmailData = {
                    "SupplierName": sSupplierName,
                    "SupplierId": sSupplierEmail,
                    "sSecurityPin": sSecurityPin,
                    "sBuyerId": sBuyerEmail
                };

                if (isEmailNotificationEnabled) {
                    var oEmaiContent = await lib_email_content.getEmailContent(connection, null, "SEC_PIN", oPinEmailData, null);
                    // await lib_email.sendEmail(connection, oEmaiContent.emailBody, oEmaiContent.subject, [sSupplierEmail], [sBuyerEmail], null);
                    var sCCEmail = await lib_email.setDynamicCC(null);      
                    await  lib_email.sendivenEmail(sSupplierEmail,sCCEmail,'html', oEmaiContent.subject, oEmaiContent.emailBody)
              
                }

                req.reply({ "SUCCESS": 'Yes' });

            }

        } catch (error) {
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;   
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }
 
            lib_common.postErrorLog(Result,null,userId,userRole,"Vendor Registration Form",sType,dbConn,hdbext);   
              
            req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
        }


    })
//test sec pin
// this.on('getEncryptedSecurityPin',async(req) =>{
//       //Encrypt Security Pin
//       var {pin} = req.data;
//             var encryptedPin = await lib_common.getEncryptedSecurityPin(pin);
//             console.log(encryptedPin);

// })    

    this.on('GetDraftData', async (req) => {
        try {
            //local Variables   
            // var { requestNo, entityCode, creationType,userRole,userId } = req.data;
            var inputData = JSON.parse(req.data.input);
            var requestNo = inputData.requestNo;
            // var entityCode = inputData.entityCode;
            // var creationType = inputData.creationType;
            var entityCode,creationType;
            var userRole = inputData.userRole;
            var userId = inputData.userId;
            var oCcodeRType = null,
                Result2 = {},
                Result = {},
                sUserID = null,
                sTypeDesc = null,
                responseObj ={};
              //intialize connection to database
               let connection = await cds.connect.to('db');
            var client = await dbClass.createConnectionFromEnv();
            var dbConn = new dbClass(client);

            //fetch registered id against request no
            var registeredUser =await  lib_common.getRegisteredId(requestNo,connection);

          
            // try {
            // if (entityCode === undefined || entityCode === null || entityCode === "" || creationType === undefined || creationType === null || creationType === "") {

                oCcodeRType = await getCcodeRType(connection, requestNo, "REQUEST_INFO") || [];
                //Changes by Chandan M 8/2/24 Start
                if(oCcodeRType.length==0){
                    var response=[];
                    return response    
                }
                //Changes by Chandan M 8/2/24 End
                

                entityCode = oCcodeRType.EntityCode;
                // requestType = oCcodeRType.RequestType;
                creationType = oCcodeRType.CreationType;
                sTypeDesc = oCcodeRType.RequestTypeDesc;
            // }

            // if (entityCode === null || entityCode === "" || entityCode === undefined) {
            //     throw "Entity Code missing";
              

            // }
            // else if(creationType === null || creationType === "" || creationType === undefined){
            //     throw "Creation Type Missing"
             
            // }
            // else {
                if(inputData.draftData){
                var aDraftData = await getDraftData(connection, requestNo);
                if (aDraftData.MAIN.length > 0) {
                    sUserID = aDraftData.MAIN[0].REGISTERED_ID || null;
                }
                responseObj.DRAFT = (aDraftData.MAIN.length || aDraftData.ADDRESS.length) > 0 ? aDraftData : [];
                }
                if(inputData.visibility){
                var aVisibleFieldsData = await getVisibleFieldsData(connection, entityCode, creationType);
                responseObj.VISIBLE =  aVisibleFieldsData.length > 0 ? aVisibleFieldsData : [];
                }

                if(inputData.mandatory){
                var aMandatoryFieldsData = await getMandatoryFieldsData(connection, entityCode, creationType);
                    responseObj.MANDATORY = aMandatoryFieldsData.length > 0 ? aMandatoryFieldsData : []
            }

                if(inputData.updated){
                var aUpdatedFieldsData = await getUpdatedFieldsData(connection, requestNo);
                responseObj.UPDATED = aUpdatedFieldsData.length > 0 ? aUpdatedFieldsData : []
                }

                if(inputData.settings){
                var aSettings = await getObjectFromRows(await getiVenSettings(connection));
                    responseObj.SETTINGS = aSettings;
            }

                if(inputData.totalCount){
                // Total Count of Mandatory Fields For Progress Bar
                var obj1 = aMandatoryFieldsData[0] || {};
                var totalCount = 0;
                var key;
                if (Object.keys(obj1).length) {
                    for (key in obj1) {
                        if (obj1[key] === "X") {
                            totalCount = totalCount + 1;
                        }
                    }
                }
                responseObj.TOTALCOUNT = totalCount
            }
            if(inputData.openText)
            {
                var openTextResponse = await getOpenTextCredentials(connection);
                responseObj.OPENTEXT = openTextResponse
            }
            if(inputData.clientInfo)
            {
                var clientInfoResponse =await getClientDetails(connection);
                responseObj.CLIENT_INFO = clientInfoResponse
            }

            if(inputData.labels)
            {
                var labelsResponse =await getLabelsForFormID(connection);
                responseObj.LABELS = labelsResponse
            }
                //  responseObj = {
                //     "DRAFT": (aDraftData.MAIN.length || aDraftData.ADDRESS.length) > 0 ? aDraftData : [], // changes to save country from registration form 10/04/2023
                //     // "DRAFT": aDraftData.MAIN.length > 0 ? aDraftData : [],
                //     "VISIBLE": aVisibleFieldsData.length > 0 ? aVisibleFieldsData : [],
                //     "MANDATORY": aMandatoryFieldsData.length > 0 ? aMandatoryFieldsData : [],
                //     "UPDATED": aUpdatedFieldsData.length > 0 ? aUpdatedFieldsData : [],
                //     "OPENTEXT": await getOpenTextCredentials(connection),
                //     "CLIENT_INFO": await getClientDetails(connection),
                //     "TOTALCOUNT": totalCount,
                //     "SETTINGS": aSettings,
                //     "LABELS": await getLabelsForFormID(connection)
                // };
                // iVen_Content.responseInfo(JSON.stringify(responseObj), "text/plain", 200);
                return responseObj;
            // }

            // } catch (e) {
            //     Result2 = {
            // 			OUT_SUCCESS: e.message || ""
            // 		};

            // 		Result = {
            // 			OUT_ERROR_CODE: null,
            // 			OUT_ERROR_MESSAGE: e.message || ""
            // 		}

            // 		iVen_Content.postErrorLog(connection, Result, requestNo, sUserID, "Supplier Request Creation", "XSJS");
            // 		iVen_Content.responseInfo(JSON.stringify(Result2), "application/json", 400);
            // 	connection.rollback();
            // } 



        } catch (error) {
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;   
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }
 
            if(error.errorType !== "Warning")
            lib_common.postErrorLog(Result,requestNo,userId,userRole,"Vendor Registration Form",sType,dbConn,hdbext);  //New  
                   // lib_common.postErrorLog(Result,null,userId,userRole,"Vendor Registration Form",sType,dbConn,hdbext);   // Old   
            req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
        }
    })
    //Registration Approval Process
    this.on('RegFormDataApproval', async (req) => {
        try {
            var { action, inputData,addressData,contactsData,bankData, eventsData,userDetails } = req.data;

            var isEmailNotificationEnabled = false;
            // get connection
            var client = await dbClass.createConnectionFromEnv();
            let dbConn = new dbClass(client);
            // execProcedure = conn.loadProcedure('VENDOR_PORTAL', 'VENDOR_PORTAL.Procedure::ONBOARDING_REJECT');
            var sUserIdentity=userDetails.USER_ID || null;
            var sUserRole=userDetails.USER_ROLE || null;
            //intialize connection to database
            var connection = await cds.connect.to('db');

            //Check if email notification is enabled
            isEmailNotificationEnabled = await lib_email.isiVenSettingEnabled(connection, "VM_EMAIL_NOTIFICATION");

            var iReqNo = inputData[0].REQUEST_NO || null;
            var sEntityCode = inputData[0].ENTITY_CODE || null;
            var iRequestType = inputData[0].REQUEST_TYPE || null;
            var sSupplierEmail = inputData[0].REGISTERED_ID || null;
            var sUserId = eventsData[0].USER_ID || null;
            var iLevel = Number(inputData[0].APPROVER_LEVEL) || 0;      
            var sBuyerEmail = inputData[0].REQUESTER_ID || null;
            var sIvenNo = inputData[0].IVEN_VENDOR_CODE || null;
            var sSupplerName = inputData[0].VENDOR_NAME1 || null;
            var sChangeRequestNo = null;
            var iVenVendorCode = inputData[0].IVEN_VENDOR_CODE||null;   
            var sCompareValue = "A";
            var sVendorCode=inputData[0].VENDOR_CODE||null;

            if (action === "REJECT" || action === "SENDBACK") { //-----------------------------------------------------------------------------
                try{

                // APP_NAME = "Supplier Registration Approval";


                //     iREG_NO = iReqNo || null;
                //     sUser_ID = sUserId || null;
                //     var sComment = inputData[0].COMMENT;

                // Result = execProcedure(iReqNo, sEntityCode, iRequestType, sSupplierEmail, sUserId, iLevel, aEventObj);
                var lowerCaseAction = action.toLowerCase();
                const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'REGFORM_REJECT_SENDBACK');
                Result = await dbConn.callProcedurePromisified(loadProc,
                    [lowerCaseAction, iReqNo, sEntityCode, iRequestType, sSupplierEmail, sUserId, iLevel, eventsData]);
                responseObj = {
                    // "Message": Result.outputScalar.OUT_SUCCESS !== null ? Result.outputScalar.OUT_SUCCESS : "Rejection failed!"
                    "Message": Result.outputScalar.OUT_SUCCESS !== null ? Result.outputScalar.OUT_SUCCESS : lowerCaseAction + " failed!"

                };
                  
                if (Result.outputScalar.OUT_SUCCESS !== null) {

                    var oEmailData = {
                        "ReqNo": iReqNo,
                        "SupplierName": sSupplerName,
                        "Approver_Email": sUserId,
                        "Approver_Level": iLevel,
                        "To_Email": Result.OUT_EMAIL_TO,
                        "ReqType": iRequestType,
                        "Reason": eventsData[0].COMMENT
                    };

                    if (isEmailNotificationEnabled) {
                        // var oEmaiContent = EMAIL_LIBRARY.getEmailData(action, "REGISTER", oEmailData, null);
                        // EMAIL_LIBRARY._sendEmailV2(oEmaiContent.emailBody, oEmaiContent.subject, [sSupplierEmail], null);
                        oEmaiContent = await lib_email_content.getEmailContent(connection, action, "REGISTER", oEmailData, null)
                        // await lib_email.sendEmail(connection, oEmaiContent.emailBody, oEmaiContent.subject, [sSupplierEmail], null, null)

                        var sCCEmail = await lib_email.setDynamicCC( null);
                        await  lib_email.sendivenEmail(sSupplierEmail,sCCEmail,'html', oEmaiContent.subject, oEmaiContent.emailBody)
                  
                        // var oEmaiContent2 = EMAIL_LIBRARY.getEmailData(action, "BUYER_NOTIFICATION", oEmailData, null);
                        // EMAIL_LIBRARY._sendEmailV2(oEmaiContent2.emailBody, oEmaiContent2.subject, [sBuyerEmail], null);
                        if(sVendorCode!="SR"){              
                            oEmaiContent = await lib_email_content.getEmailContent(connection, action, "BUYER_NOTIFICATION", oEmailData, null)
                            // await lib_email.sendEmail(connection, oEmaiContent.emailBody, oEmaiContent.subject, [sBuyerEmail], null, null)
                            var sCCEmail = await lib_email.setDynamicCC( null);
                            await  lib_email.sendivenEmail(sBuyerEmail,sCCEmail,'html', oEmaiContent.subject, oEmaiContent.emailBody)
                        }
                  
                    }

                    statusCode = 200;
                } else {
                    // iVen_Content.postErrorLog(conn, Result, iReqNo, sUserId, APP_NAME, "PROCEDURE");
                    statusCode = parseInt(Result.outputScalar.OUT_ERROR_CODE);
                    responseObj.ERROR_CODE = parseInt(Result.outputScalar.OUT_ERROR_CODE);
                    responseObj.ERROR_DESC = Result.outputScalar.OUT_ERROR_MESSAGE;
                    throw responseObj;
                }

                req.reply(responseObj);
                // iVen_Content.responseInfo(JSON.stringify(responseObj), "text/plain", statusCode);
                }catch(error){

                    var sType=error.code?"Procedure":"Node Js";    
                    var iErrorCode=error.code??500;   
                    let Result = {
                        OUT_ERROR_CODE: iErrorCode,
                        OUT_ERROR_MESSAGE:  error.message ? error.message : error
                    }
        
                    lib_common.postErrorLog(Result,iReqNo,sUserIdentity,sUserRole,"Vendor Registration Approval",sType,dbConn,hdbext);   
                    
                    req.error({ code:iErrorCode, message:  error.message ? error.message : error });
                }
            }
           
            else if (action === "APPROVE") { //-----------------------------------------------------------------------------
                //////////////////FOrtesting 

                try{
                    // isEmailNotificationEnabled = 0;
                    ///////////////
                    
                    var sSapVendorCode = null;      
                    // ------------- MDG Posting Start------------------
                    // var iMaxLevelCount = await getMaxApproverCount(connection, sEntityCode);
                    var iMaxLevelCount = await lib_common.getMaxHierarchyApproverCount(connection, sEntityCode,'REG');  
                    var checkApprover = await lib_common.getHierarchyApproverForEntity(connection, sEntityCode,'MASTER_APPROVAL_HIERARCHY_FE',iLevel,'REG')||[];

                    var iVenVendorCode = null;
                    var oMDGResponse = null;
                    var iMDGStatus = null;
                    var oMDGPayload = null;
                    var bMDGComparison = null;
                    var bAttachmentComparison = null;
                    var oActiveData = null;
                    var CurrAttachment = null;
                    var bNoChange = false;
                    var oDataStatus = null;
                    var ODataResponse = null;
                    var sCompareValue = 'A';  
                    var bApproveWithoutMatrix=false;
                    var bQuickRegistrationWithoutApprovalFlag=false;
                    var aRegisterCheck=await SELECT`SETTING`
                    .from('VENDOR_PORTAL_MASTER_IVEN_SETTINGS')
                    .where({CODE:'REGAPPR_MATRIX_CHK'})
                    if(aRegisterCheck[0].SETTING&&checkApprover.length==0&&iRequestType==7){
                        bApproveWithoutMatrix=true  
                        iLevel=null  
                        bQuickRegistrationWithoutApprovalFlag=true;
                        eventsData=await getApproveEventsObj(inputData[0])      

                    }else{    
                        bApproveWithoutMatrix=false        
                    }      

                    if (iLevel === iMaxLevelCount) {
                        oMDGPayload =await lib_mdg.getMDGPayload(inputData,addressData,contactsData,bankData, connection);
                        iVenVendorCode = inputData[0].IVEN_VENDOR_CODE || null;
                        // sSapVendorCode = parseInt(oMDGPayload.Lifnr, 10) || "";

                        // ------------------------START: Direct MDG Call for testing-------------------------
                        var MDGResult =await  lib_mdg.PostToMDG(oMDGPayload,connection);
                    

                        iMDGStatus = MDGResult.iStatusCode;
                        oMDGResponse = MDGResult.oResponse;

                        // sChangeRequestNo = oMDGResponse.changerequestNo.length === 12 ?  oMDGResponse.changerequestNo : null;

                        sChangeRequestNo =oMDGResponse.changerequestNo;
                        sSapVendorCode = parseInt(oMDGResponse.d.Lifnr, 10) || "";

                        //   sChangeRequestNo = oMDGResponse;
                        // sCompareValue = "M";

                    }

                    // ------------- MDG Posting End------------------

                    // if (iLevel < iMaxLevelCount || sChangeRequestNo !== null) {
                    if (iLevel <= iMaxLevelCount) {
                        // 			if (iLevel <= iMaxLevelCount && bNoChange === false && oDataStatus !== 400 && iMDGStatus !== 500) {

                        // eventsData = getEventObjRegApproval(eventsData, iLevel, iMaxLevelCount, sChangeRequestNo);

                        // Result = execProcedure(iReqNo, sEntityCode, iRequestType,
                        //     sSupplierEmail, sBuyerEmail, sUserId, iLevel, aEventObj, sChangeRequestNo, iVenVendorCode, sSapVendorCode, sSupplerName,
                        //     sCompareValue);
                        const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'REGFORM_APPROVAL')

                        Result = await dbConn.callProcedurePromisified(loadProc,
                            [iReqNo, sEntityCode, iRequestType,
                                sSupplierEmail, sBuyerEmail, sUserId, iLevel, eventsData, 
                                sChangeRequestNo, iVenVendorCode, sSapVendorCode, sSupplerName,
                                sCompareValue]);
                        var responseObj = {
                            "Message": Result.outputScalar.OUT_SUCCESS !== null ? Result.outputScalar.OUT_SUCCESS : "Approval failed!",
                            "MDG_status": iMDGStatus,
                            "MDG_Payload": oMDGPayload,
                            "ODataResponse": oMDGResponse,
                            "bMDGComparison": bMDGComparison,
                            "bAttachmentComparison": bAttachmentComparison,
                            "CurrAttachment": CurrAttachment,            
                            "sChangeRequestNo": sChangeRequestNo,
                            "sChangeRequestNo1": sChangeRequestNo       
                            // "MDG_Response":oMDGResponse    
                        };

                        if (Result.outputScalar.OUT_SUCCESS !== null) {    

                            var oEmailData = {
                                "ReqNo": iReqNo,
                                "ReqType": iRequestType,
                                "SupplierName": sSupplerName,
                                "SupplerEmail": sSupplierEmail,
                                "Approver_Email": sUserId,
                                "Approver_Level": iLevel,
                                "Next_Approver": Result.outputScalar.OUT_EMAIL_TO, // Proc Manager
                                "Buyer": sBuyerEmail,
                                "NextApproverRole":checkApprover[0]?.USER_ROLE||null       
                            };        

                            action = Result.outputScalar.OUT_MAX_LEVEL == iLevel ? "FINAL_APPROVAL" : "APPROVE";
                            if(bQuickRegistrationWithoutApprovalFlag){//For Quick Registration Scenario as there's no level for it
                                action="FINAL_APPROVAL";
                                oEmailData.Approver_Email="System";    
                            }

                            if (action === "APPROVE") {
                                // pending for approval - notification to Proc Manager
                                if (isEmailNotificationEnabled) {       
                                    // var oEmaiContent = EMAIL_LIBRARY.getEmailData(action, "REGISTER", oEmailData, null);
                                    // EMAIL_LIBRARY._sendEmailV2(oEmaiContent.emailBody, oEmaiContent.subject, [oEmailData.Next_Approver], null);
                                    oEmaiContent = await lib_email_content.getEmailContent(connection, action, "REGISTER", oEmailData, null)
                                    // await lib_email.sendEmail(connection, oEmaiContent.emailBody, oEmaiContent.subject, [oEmailData.Next_Approver], null, null)
                                    var sCCEmail = await lib_email.setDynamicCC( null);
                                    await  lib_email.sendivenEmail(oEmailData.Next_Approver,sCCEmail,'html', oEmaiContent.subject, oEmaiContent.emailBody)
                                    // Approval done - notification to Buyer
                                    // var oEmaiContent2 = EMAIL_LIBRARY.getEmailData(action, "BUYER_NOTIFICATION", oEmailData, null);
                                    // EMAIL_LIBRARY._sendEmailV2(oEmaiContent2.emailBody, oEmaiContent2.subject, [oEmailData.Buyer], null);
                                    // oEmaiContent = await lib_email_content.getEmailContent(connection, action, "BUYER_NOTIFICATION", oEmailData, null)
                                    // await lib_email.sendEmail(connection, oEmaiContent.emailBody, oEmaiContent.subject, [oEmailData.Buyer], null, null)
                                    // var sCCEmail = await lib_email.setDynamicCC( null);
                                    // await  lib_email.sendivenEmail(oEmailData.Buyer,sCCEmail,'html', oEmaiContent.subject, oEmaiContent.emailBody)
                                }

                            } else if (action === "FINAL_APPROVAL") {

                                // Approval done - notification to Buyer & Proc Manager
                                if (isEmailNotificationEnabled) {
                                    // var oEmaiContent2 = EMAIL_LIBRARY.getEmailData(action, "BUYER_NOTIFICATION", oEmailData, null);
                                    // EMAIL_LIBRARY._sendEmailV2(oEmaiContent2.emailBody, oEmaiContent2.subject, [oEmailData.Buyer, oEmailData.Approver_Email], null);
                                    oEmaiContent = await lib_email_content.getEmailContent(connection, action, "BUYER_NOTIFICATION", oEmailData, null)
                                    // await lib_email.sendEmail(connection, oEmaiContent.emailBody, oEmaiContent.subject, [oEmailData.Buyer, oEmailData.Approver_Email], null, null)
                                    var sCCEmail = await lib_email.setDynamicCC( null);
                                    var sToEmail = [oEmailData.Buyer, oEmailData.SupplerEmail].toString();    
                                    await  lib_email.sendivenEmail(sToEmail,sCCEmail,'html', oEmaiContent.subject, oEmaiContent.emailBody)
                                }
                                //Post to IAS for Create Normal Request
                                // if(iRequestType == 1)  

                                var aIASSetting=await SELECT .from('VENDOR_PORTAL_MASTER_IVEN_SETTINGS') .where({CODE:'REGAPPR_IAS_ENABLE'});
                                if(aIASSetting[0].SETTING=='X')
                                    await lib_ias.CreateVendorIdIAS(sSapVendorCode,sSupplerName,null,sSupplierEmail);    

                            }

                            statusCode = 200;
                        } else {
                            // iVen_Content.postErrorLog(conn, Result, iReqNo, sUserId, APP_NAME, "PROCEDURE");
                            statusCode = parseInt(Result.outputScalar.OUT_ERROR_CODE);
                            responseObj.ERROR_CODE = parseInt(Result.outputScalar.OUT_ERROR_CODE);
                            responseObj.ERROR_DESC = Result.outputScalar.OUT_ERROR_MESSAGE;
                            throw JSON.stringify(responseObj);
                        }

                        // iVen_Content.responseInfo(JSON.stringify(responseObj), "text/plain", statusCode);
                        return responseObj;
                    } else {        
                        throw "Max level reached";
                            // responseObj = {
                            //     "Message": "MDG posting failed!",
                            //     "MDG_status": iMDGStatus,
                            //     "MDG_Payload": oMDGPayload,
                            //     "SAP_Code": sSapVendorCode,
                            //     "MDG_Response": oMDGResponse

                            // }
                            // Result = {
                            //     "OUT_ERROR_CODE": iMDGStatus,
                            //     "OUT_ERROR_MESSAGE": JSON.stringify(oMDGResponse)
                            // }
                        //     iVen_Content.postErrorLog(conn, Result, iReqNo, sUserId, "Supplier Registration Approval", "API");

                        //     if (bNoChange === true) {
                        //         responseObj.Message = "No Change Found in Data for Approval!"
                        //     } else if (oDataStatus && oDataStatus === 400) {
                        //         responseObj.Message = ODataResponse.oResponse;
                        //     } else if (iMDGStatus && iMDGStatus === 500) {
                        //         responseObj.Message = JSON.stringify(oMDGResponse);
                        //     }

                        //     iVen_Content.responseInfo(JSON.stringify(responseObj), "text/plain", 400);
                        //     if (iRequestType !== 5) {
                        //         // 	MDG_LIBRARY.rollbackSAPVendorCodeInSeq(conn);
                        //     }
                    }
                }catch(error){

                    var sType=error.code?"Procedure":"Node Js";    
                    var iErrorCode=error.code??500;   
                    let Result = {
                        OUT_ERROR_CODE: iErrorCode,
                        OUT_ERROR_MESSAGE:  error.message ? error.message : error
                    }
                    lib_common.postErrorLog(Result,iReqNo,sUserIdentity,sUserRole,"Vendor Registration Approval",sType,dbConn,hdbext);   
                    
                    req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 

                }

            }
            else if (action === "DUPLICATECHECK") {
                try{
                    var sTradeLicense = (inputData[0].TRADE_LIC_NO === null || inputData[0].TRADE_LIC_NO === "") ? "" : inputData[0].TRADE_LIC_NO.toUpperCase();
                    var sVatNumber = (inputData[0].VAT_REG_NUMBER === null || inputData[0].VAT_REG_NUMBER === "") ? "" : inputData[0].VAT_REG_NUMBER.toUpperCase();
                    var sSupplierName = (inputData[0].VENDOR_NAME1 === null || inputData[0].VENDOR_NAME1 === "") ? "" : inputData[0].VENDOR_NAME1.toUpperCase();
                    var sRequestNo = (inputData[0].REQUEST_NO === null || inputData[0].REQUEST_NO === "" || inputData[0].REQUEST_NO === undefined) ? "" : parseInt(
                        inputData[0].REQUEST_NO, 10);
                    var responseObj = {
                        "TRADE_LIC_NO": await duplicateCheck(connection, "TRADE_LIC_NO", sTradeLicense, sRequestNo),
                        "VAT_REG_NUMBER": await duplicateCheck(connection, "VAT_REG_NUMBER", sVatNumber, sRequestNo),
                        "VENDOR_NAME1": await duplicateCheck(connection, "VENDOR_NAME1", sSupplierName, sRequestNo)
                    };
                    req.reply(responseObj);
                    // iVen_Content.responseInfo(JSON.stringify(responseObj), "text/plain", 200);
                }catch(error){
                    var sType=error.code?"Procedure":"Node Js";    
                    var iErrorCode=error.code??500;   
                    let Result = {
                        OUT_ERROR_CODE: iErrorCode,
                        OUT_ERROR_MESSAGE:  error.message ? error.message : error
                    }
                    lib_common.postErrorLog(Result,iReqNo,sUserIdentity,sUserRole,"Vendor Registration Approval",sType,dbConn,hdbext);   
                    
                    req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
                }
            }

        } catch (error) {
            req.error({ code: "500", message: error.message ? error.message : error });
        }
    })
    this.on('MessengerService', async (req) => {    
        var client = await dbClass.createConnectionFromEnv();
        let dbConn = new dbClass(client);
        try {
            var { action, messengerData, inputData, eventsData,userDetails } = req.data;    
            var isEmailNotificationEnabled = false;
            var sUserIdentity=userDetails.USER_ID || null;
            var sUserRole=userDetails.USER_ROLE || null;
            // get connection
            // var client = await dbClass.createConnectionFromEnv();
            // let dbConn = new dbClass(client);
            // execProcedure = conn.loadProcedure('VENDOR_PORTAL', 'VENDOR_PORTAL.Procedure::ONBOARDING_REJECT');

            //intialize connection to database
            let connection = await cds.connect.to('db');

            //Check if email notification is enabled
            isEmailNotificationEnabled = await lib_email.isiVenSettingEnabled(connection, "VM_EMAIL_NOTIFICATION");

            var iReqNo = inputData[0].REQUEST_NO || null;
            var sEntityCode = inputData[0].ENTITY_CODE || null;
            var sSupplierEmail = inputData[0].REGISTERED_ID || null;
            var sBuyerEmail = inputData[0].REQUESTER_ID || null;
            var sSupplerName = inputData[0].VENDOR_NAME1 || null;
            var sLoginId = messengerData.loginId;   
            var iStatus=inputData[0].STATUS||null;
            var sMailTo = messengerData.mailTo;
            var sVCode=inputData[0].VENDOR_CODE||null;    

            // var sAction = inputData[0].ACTION;
            var aEventObj = await getEventObj(eventsData, action,iStatus);
            // var sComment = "";
            // execProcedure = conn.loadProcedure('VENDOR_PORTAL', 'VENDOR_PORTAL.Procedure::COMMUNICATION_TOOL');
            // Result = execProcedure(iRegNo, sSupplerEmail, sMailTo, sAction, aEventObj);
            const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'MESSENGER_SERVICE')
            Result = await dbConn.callProcedurePromisified(loadProc,
                [iReqNo, sSupplierEmail, sMailTo, action, aEventObj]);
                             

            if (Result.outputScalar.OUT_SUCCESS === null)
                throw "Messenger failed to send message!";    

            var responseObj = {
                "Message": Result.outputScalar.OUT_SUCCESS     
            };

            if (Result.outputScalar.OUT_SUCCESS !== null) {

                var oEmailData = {
                    "ReqNo": iReqNo,        
                    "SupplierName": sSupplerName,
                    "From_Email": sLoginId,
                    "To_Email": Result.outputScalar.OUT_EMAIL_TO,
                    "sMessage": aEventObj[0].COMMENT
                };
                var sAppName; 
                var sPmId = "";                                
                if (action === "VENDOR") {    
                    sPMId = await lib_common.getHierarchyApproverForEntity(connection, sEntityCode,'MASTER_APPROVAL_HIERARCHY_FE',1,'REG');  
                    if (sPmId !== "") {
                        sPmId = sPmId[0].USER_ID;
                    }                   
                    sAppName="Vendor Registration Form"              
                }else{        
                    sAppName=await getAppName(iReqNo);                                     
                }      
                    
                if (isEmailNotificationEnabled) {    
                    // var oEmaiContent = EMAIL_LIBRARY.getEmailData(sAction, "COMMUNCATION", oEmailData, null);
                    // EMAIL_LIBRARY._sendEmailV2(oEmaiContent.emailBody, oEmaiContent.subject, [oEmailData.To_Email], [sPmId]);
                    oEmaiContent = await lib_email_content.getEmailContent(connection, action, "COMMUNCATION", oEmailData, null)
                    // await lib_email.sendEmail(connection, oEmaiContent.emailBody, oEmaiContent.subject, [oEmailData.To_Email], [sPmId], null)
                    var sCCEmail = await lib_email.setDynamicCC(null);      
                    await  lib_email.sendivenEmail(oEmailData.To_Email,sCCEmail,'html', oEmaiContent.subject, oEmaiContent.emailBody)
                                      
                }

                statusCode = 200;
            } else {
                statusCode = 400;
            }
            // responseInfo(JSON.stringify(responseObj), "text/plain", statusCode);
            req.reply(responseObj);
        } catch (error) {
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;   
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }
            // lib_common.postErrorLog(Result,iReqNo,sUserIdentity,sUserRole,"Vendor Registration",sType,dbConn,hdbext);   
            lib_common.postErrorLog(Result,iReqNo,sUserIdentity,sUserRole,sAppName,sType,dbConn,hdbext);  
            
            req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
        }
    })

    this.on('RegFormDataEdit', async (req) => {
        var client = await dbClass.createConnectionFromEnv();
        var dbConn = new dbClass(client);
        try {
            var { action, stepNo, reqHeader, addressData, contactsData, updatedFields, editLog,userDetails} = req.data;   
            var isEmailNotificationEnabled = false;
            // get connection
            // var client = await dbClass.createConnectionFromEnv();
            // let dbConn = new dbClass(client);
            // execProcedure = conn.loadProcedure('VENDOR_PORTAL', 'VENDOR_PORTAL.Procedure::ONBOARDING_REJECT');

            //intialize connection to database
            let connection = await cds.connect.to('db');
            //  queryResult = await connection.run(SELECT `COUNT(*)`
            //  .from`${connection.entities['VENDOR_PORTAL.REQUEST_INFO_TEMP']}`
            //  .where`REQUEST_NO = ${reqHeader[0].REQUEST_NO}`);

            //Check if email notification is enabled
            // isEmailNotificationEnabled = await lib_email.isiVenSettingEnabled(connection, "VM_EMAIL_NOTIFICATION");

            var sUserIdentity=userDetails.USER_ID || null;
            var sUserRole=userDetails.USER_ROLE || null;

            var iReqNo = reqHeader[0].REQUEST_NO || null;
            var sUserId = reqHeader[0].REGISTERED_ID || null;
            var sEntityCode = reqHeader[0].ENTITY_CODE || null;
            var sIsResend = reqHeader[0].REQUEST_RESENT || null;
            var iStatus = reqHeader[0].STATUS || null;
            var aAddressObj = await getidForArr(addressData, "SR_NO") || [];
            var aContactObj = await getidForArr(contactsData, "SR_NO") || [];

            // --Section 2--
            // var aPaymentObj = getidForArr(oPayload.VALUE.PAYMENT, "SR_NO") || [];
            // var aFinanceObj = getidForArr(oPayload.VALUE.FINANCE, "SR_NO") || [];
            // var aOwnerObj = getidForArr(oPayload.VALUE.OWNERS, "SR_NO") || [];
            // --Section 3--
            // var aProdServPayloadObj = getProdServData(oPayload.VALUE.PRODSERV, "SR_NO") || [];
            // var aProductObj = aProdServPayloadObj.Products || [];
            // var aServiceObj = aProdServPayloadObj.Service || [];
            // var aProdServbj = [...aProductObj, ...aServiceObj];

            // var aCapacityObj = getidForArr(oPayload.VALUE.CAPACITY, "SR_NO") || [];
            // var aCustomerObj = getidForArr(oPayload.VALUE.CUSTOMER, "SR_NO") || [];
            // var aOEMObj = getidForArr(oPayload.VALUE.OEM, "SR_NO") || [];

            // --Section 4--
            // var aDiscFieldsObj = oPayload.VALUE.DISC_FIELDS || [];
            // if (aDiscFieldsObj.length > 0) {
            //     aDiscFieldsObj[0].OBR_NO = 0;
            // }
            // var aRelativeObj = getidForArr(oPayload.VALUE.DISC_RELATIVES, "SR_NO") || [];
            // var aQaCertiObj = getidForArr(oPayload.VALUE.DISC_QA_CERTI, "SR_NO") || [];

            // --Section 5--
            // var aAttachFieldsObj = oPayload.VALUE.ATTACH_FIELDS || [];
            // if (aAttachFieldsObj.length > 0) {
            //     aAttachFieldsObj[0].OBR_NO = 0;
            // }
            // var aAttachmentsObj = getidForArr(oPayload.VALUE.ATTACHMENTS, "SR_NO") || [];

            var aUpdatedFieldsIDs = updatedFields;
            var aUpdatedFieldsObj = [];
            if (aUpdatedFieldsIDs.length > 0) {
                aUpdatedFieldsObj = await lib_common.getUpdatedFieldsDataForEdit(iReqNo, aUpdatedFieldsIDs, connection) || [];
            }
                         
            var aLogsTable = await getLogsCount(connection, editLog);
            // Result = execProcedure(iReqNo, iStep, sEntityCode, sUserId, sIsResend, iStatus,
            //     aMainObj, aAddressObj, aContactObj,
            //     aPaymentObj, aFinanceObj, aOwnerObj,
            //     aProdServbj, aCapacityObj, aCustomerObj, aOEMObj,
            //     aDiscFieldsObj, aRelativeObj, aQaCertiObj,
            //     aAttachFieldsObj, aAttachmentsObj,
            //     aUpdatedFieldsObj,aLogsTable);
            if (action === 'EDIT') {
                const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'REGFORM_EDIT_APPROVER')
                Result = await dbConn.callProcedurePromisified(loadProc,
                    [iReqNo,stepNo, sUserId,null, reqHeader, aAddressObj, aContactObj, [], [], [], [],
                        [], [], [], [], [], [], [], [], [], aUpdatedFieldsObj, aLogsTable]);        

                if (Result.outputScalar.OUT_SUCCESS === null) {

                    let sErrorMsg = JSON.stringify({
                        "Edit_Success": '',
                        "REQUEST_NO": 0,
                        "Message": "Edit saving failed!"

                    })
                    throw sErrorMsg;
                }
                responseObj = {
                    "Edit_Success": 'X',
                    "REQUEST_NO": Result.outputScalar.OUT_SUCCESS,
                    "Message": "Edit saved successfully"
                };    

                // responseInfo(JSON.stringify(responseObj), "text/plain", 200);
                req.reply(responseObj);
            }
        } catch (error) {
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;   
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }
            lib_common.postErrorLog(Result,iReqNo,sUserIdentity,sUserRole,"Vendor Registration Approval",sType,dbConn,hdbext);   
            
            req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
        }
    })

    this.on('ManageCMS', async (req) => {
        var client = await dbClass.createConnectionFromEnv();
        var dbConn = new dbClass(client); 
        try {
            var { action,attachmentId, inputData,userDetails } = req.data;
            var sUserIdentity=userDetails.USER_ID || null;
            var sUserRole=userDetails.USER_ROLE || null;
            var aCMSData = inputData || [];
            var Result, responseObj;

            var iReqNo=attachmentId.REQUEST_NO||null;

            // get connection
            if (aCMSData.length > 0) {
                var client = await dbClass.createConnectionFromEnv();
                let dbConn = new dbClass(client);

                const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'CMS_OPERATIONS');
                Result = await dbConn.callProcedurePromisified(loadProc,[action,attachmentId.REQUEST_NO,attachmentId.SR_NO,attachmentId.DOC_ID, aCMSData]);

                if (Result.outputScalar.OUT_SUCCESS !== null) {
                    responseObj = {
                        "Message": Result.outputScalar.OUT_SUCCESS,
                        "DocID": Result.outputScalar.OUT_DOC_ID
                    };

                    req.reply(JSON.stringify(responseObj));
                }
                else {   
                    responseObj = {
                        "Message": "CMS operation for " + action + " failed!",
                        "DocId": Result.outputScalar.OUT_DOC_ID,
                        "ERROR_CODE": parseInt(Result.outputScalar.OUT_ERROR_CODE),
                        "ERROR_DESC": Result.outputScalar.OUT_ERROR_MESSAGE
                    };
                    throw JSON.stringify(responseObj);
                }
            }
            else throw "Input data missing for action."
        } catch (error) {
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;   
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }
            lib_common.postErrorLog(Result,iReqNo,sUserIdentity,sUserRole,"Vendor Registration Form",sType,dbConn,hdbext);   
            
            req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
        }
    })

    this.on('RegFormDataSync', async (req) => {
        var client = await dbClass.createConnectionFromEnv();
        var dbConn = new dbClass(client); 
        try {
            var { action,bankData,userDetails } = req.data;
            var sResponse=null;
            var sUserID=userDetails.USER_ID || null;
            var sUserRole=userDetails.USER_ROLE||null;
            var iReqNo=bankData[0].REQUEST_NO ||null;   

            const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'REGFORM_SYNC');
            if(action=="SYNC"){
                sResponse = await dbConn.callProcedurePromisified(loadProc,
                    [action,bankData]   
                );   
                req.reply(sResponse);   
            }     
        } catch (error) {
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;   
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }
            lib_common.postErrorLog(Result,iReqNo,sUserID,sUserRole,"Vendor Registration Approval",sType,dbConn,hdbext);   
            
            req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
        }
    })

    this.on('RegFormSR', async (req) => {    
        var client = await dbClass.createConnectionFromEnv();
        var dbConn = new dbClass(client); 
        var sResponse;
        try {
            var { action ,       
                reqHeader ,   
                addressData ,
                eventsData ,       
                securityPin,
                userDetails} = req.data;

            var sUserID=userDetails.USER_ID || null;
            var sUserRole=userDetails.USER_ROLE||null;

            var connection = await cds.connect.to('db');
            var isEmailNotificationEnabled = false; 

            isEmailNotificationEnabled = await lib_common.isiVenSettingEnabled(connection, "VM_EMAIL_NOTIFICATION");
            const loadProcedure = await dbConn.loadProcedurePromisified(hdbext, null, 'SELF_REGISTRATION');
                               
            if(action=="SELF_REGISTER"){
                var valid=await checkVendor(connection,reqHeader)
                            
                if (valid == 'ErrorEmail') {
                    throw {"message":"Vendor Email " + reqHeader[0].REGISTERED_ID + " already exist."}
                }else if(valid =='ErrorName') {          
                    throw {"message":"Vendor " + reqHeader[0].VENDOR_NAME1 + " already exist. Previous request is in process."}
                }   

                if (reqHeader === null || reqHeader === "" || reqHeader === undefined ||
                    reqHeader[0].VENDOR_NAME1 === null ||
                    reqHeader[0].REGISTERED_ID === null ||
                    reqHeader[0].COUNTRY === null ||
                    reqHeader[0].BP_TYPE_CODE === null ||
                    (reqHeader[0].BP_TYPE_CODE === "B" && reqHeader[0].TRADE_LIC_NO === null)) {
                    throw "Invalid Payload";     
                }    
                            
                reqHeader[0].REQUESTER_ID=reqHeader[0].REGISTERED_ID
                reqHeader[0].VENDOR_CODE="SR";
                reqHeader[0].SUPPL_TYPE_DESC= reqHeader[0].SUPPL_TYPE_DESC
                reqHeader[0].SUPPL_TYPE= reqHeader[0].SUPPL_TYPE   
                reqHeader[0].BP_TYPE_CODE= reqHeader[0].BP_TYPE_CODE.trim() || ""
                reqHeader[0].BP_TYPE_DESC= reqHeader[0].BP_TYPE_DESC.toUpperCase().trim() || ""
                reqHeader[0].REQUEST_TYPE= reqHeader[0].REQUEST_TYPE || 1;
                reqHeader[0].CREATION_TYPE= reqHeader[0].REQUEST_TYPE || 1;
                reqHeader[0].COMMENT= "Self Registration by " + reqHeader[0].VENDOR_NAME1.toUpperCase().trim() || "";
                reqHeader[0].CREATED_ON=new Date().toISOString();       
                reqHeader[0].NDA_TYPE=null;         

                var oEventReqCrt = await getEventPayload(reqHeader, connection, 1);
                var oEventReqApr = await getEventPayload(reqHeader, connection, 2);
                var aEvents = [oEventReqCrt, oEventReqApr];

                var sVendorName = reqHeader[0].VENDOR_NAME1.toUpperCase().trim() || "";
                var sVendorEmail = reqHeader[0].REGISTERED_ID.toLowerCase().trim() || "";
                        
                var sSecurityPin = securityPin.toLowerCase().trim() || "";   

                var sRegIdCheck=await checkRegisteredIdExists(connection,sVendorEmail) || []; 
                if(sRegIdCheck.length==0)
                    return "Please Generate Security Pin!";         
                else if (sRegIdCheck[0].SEC_CODE !== sSecurityPin) {
                    throw "Invalid Security Pin!";        
                }             

                var sTL_NO=reqHeader[0].TRADE_LIC_NO || null;   
                var sEntity = reqHeader[0].ENTITY_CODE || null;
                var sSupplierTypeCode = reqHeader[0].SUPPL_TYPE || null;
                var sSupplierCountry = addressData[0].COUNTRY || null;
                var iStatus = 2;     
                var sBuyerId=null;   

                sResponse = await dbConn.callProcedurePromisified(loadProcedure,
                    [sEntity, null, sVendorName, sVendorEmail, sSupplierTypeCode, 1, iStatus, sTL_NO, sBuyerId, sSupplierCountry,
                        reqHeader,   
                        aEvents]
                );                          
                var iRequestNum=sResponse.outputScalar.OUT_SUCCESS1||null              
                var responseObj = {
                    "requestNo":iRequestNum!=null?iRequestNum:"Request Submission Failed",
                    "message":"Self Registration Request Created : "+iRequestNum+"",
                    "results": sResponse.results  
                };         

                req.reply(responseObj)  
                // var sPMId = await lib_common.getApproverForEntity(connection, sEntityCode, 'PM', 'MATRIX_REGISTRATION_APPR') || "";
                // if (sPMId !== "") sPMId = sPMId[0].USER_ID;
                var oEmailData={}
                oEmailData.ReqNo = iRequestNum;   

                if (isEmailNotificationEnabled) {
                    // var oEmaiContent = EMAIL_LIBRARY.getEmailData("SELFREG", "REGISTER", oEmailData, status);
                    // EMAIL_LIBRARY._sendEmailV2(oEmaiContent.emailBody, oEmaiContent.subject, [sPMId], null);
                      
                    var oEmaiContent = await lib_email_content.getEmailContent(connection, "SELFREG_SUPPLIER", "SUPPLIER_NOTIFICATION", oEmailData, iStatus);
                    var sCCEmail = await lib_email.setDynamicCC( null);       
                    await  lib_email.sendivenEmail(sVendorEmail,sCCEmail,'html', oEmaiContent.subject, oEmaiContent.emailBody)
                }
            }   
        } catch (error) {
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;   
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }       
            lib_common.postErrorLog(Result,null,sUserID,sUserRole,"Vendor Self Registration",sType,dbConn,hdbext);   
            
            req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
        }
    })

    this.on('RegFormVendorEdit', async (req) => {
        var client = await dbClass.createConnectionFromEnv();
           var dbConn = new dbClass(client); 
        try {    
            var isEmailNotificationEnabled = false; 

            const loadProcedure = await dbConn.loadProcedurePromisified(hdbext, null, 'REGFORM_EDIT_VENDOR');     
            var {action,reqHeader,eventsData,userDetails}=req.data
            var connection=await cds.connect.to('db');   
            var responseObj={};
            var sUserId=userDetails.USER_ID||"";
            var sUserRole=userDetails.USER_ROLE||"";
            var iReqNo = reqHeader[0].REQUEST_NO||null;
            var sReponse,sAction;
            var iIvenCode = reqHeader[0].IVEN_VENDOR_CODE||null;
            var sSAPCode = reqHeader[0].SAP_VENDOR_CODE||null;
            var sVendorEmail = reqHeader[0].REGISTERED_ID||null;
            var sVendorName = reqHeader[0].VENDOR_NAME1||null;
            var sEntityCode = reqHeader[0].ENTITY_CODE||null;
            var iReqType = reqHeader[0].REQUEST_TYPE||null;                            
            var iCreateType = reqHeader[0].CREATION_TYPE||null;       
            var aSupplType=reqHeader[0].SUPPL_TYPE||null;   
            var iStatus=reqHeader[0].STATUS||null;      
            var aEvents= await getEventObjects() || [];    
            
            var iCurrentStatus =await getCurrentRequestStatus(connection, iReqNo) || "";

            isEmailNotificationEnabled = await lib_common.isiVenSettingEnabled(connection, "VM_EMAIL_NOTIFICATION");

            if (iCurrentStatus !== iStatus) {    
				responseObj = {
					"message": "Status of current Request No:" + iReqNo + " doesn't match with our data.",
					"status": "Warning"
				};
			} else if (iCurrentStatus === 11) {

				var oActiveData =await getActiveData(connection,reqHeader) || null;

                if (oActiveData !== null) {
                    var iActiveReqNo = oActiveData.REQUEST_NO_ACTIVE;

                    if (iReqNo !== iActiveReqNo) {
                        iReqNo = iActiveReqNo;    
                    }
                }

				sResponse = await dbConn.callProcedurePromisified(loadProcedure,
                    [iReqNo, iIvenCode, sSAPCode, sEntityCode, sVendorEmail, sVendorName, iCreateType,aEvents]
                );    

                var iRequestNum=sResponse.outputScalar.OUT_SUCCESS||null;                       
                responseObj = {
                    "requestNo":iRequestNum!=null?iRequestNum:"Registration Form Edit Failed",
                    "message":"Update Request Generated For Request Number : "+iRequestNum+"",
                    "results": sResponse.results,   
                    "status": iRequestNum !== null ? "Success" : "Error"    
                }; 
                    
			} else {
				responseObj = {
					"message": "Form cannot be edited as current Request No:" + iReqNo + " is in-process.",
					"status": "Warning"
				};
			}               
            req.reply(responseObj)  
            var oEmailData={}   
                oEmailData.ReqNo = iRequestNum;   
                oEmailData.ReqType = 5;      
                oEmailData.SupplierName=sVendorName;    

                if (isEmailNotificationEnabled) {
                    // var oEmaiContent = EMAIL_LIBRARY.getEmailData("SELFREG", "REGISTER", oEmailData, status);
                    // EMAIL_LIBRARY._sendEmailV2(oEmaiContent.emailBody, oEmaiContent.subject, [sPMId], null);
                                  
                    var oEmaiContent = await lib_email_content.getEmailContent(connection,"UPDATE","REQUEST",oEmailData, null);
                    var sCCEmail = await lib_email.setDynamicCC( null);                  
                    await  lib_email.sendivenEmail(sVendorEmail,sCCEmail,'html', oEmaiContent.subject, oEmaiContent.emailBody)
                }
    
        }catch(error){
            var sType=error.code?"Procedure":"Node Js";    
          var iErrorCode=error.code??500;     
          // let Result2 = {
          //   OUT_SUCCESS: error.message || ""
          // };
          let Result = {
              OUT_ERROR_CODE: iErrorCode,
              OUT_ERROR_MESSAGE:  error.message ? error.message : error
          }
          lib_common.postErrorLog(Result,iReqNo,sUserId,sUserRole,"Registration Form",sType,dbConn,hdbext);
          console.error(error)     
          // return error.messsage     
          req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
        }
    });
    
    async function getActiveData(connection, data) {
        try {
            var oActiveObj = null;
            let aResult = await connection.run(
                SELECT
                    .from`${connection.entities['VIEW_REQUEST_ACTIVE_STATUS']}`
                    .where({ SAP_VENDOR_CODE: data[0].SAP_VENDOR_CODE,ACTIVE: "A", STATUS: 11 })
                   );
                //   
            // var sQuery = 'SELECT * FROM \"_SYS_BIC\".\"VENDOR_PORTAL.View/VIEW_REQUEST_ACTIVE_STATUS\"';
            // sQuery += 'WHERE SAP_VENDOR_CODE=? AND ACTIVE=? AND STATUS=?';
            // var aResult = con.executeQuery(sQuery, data[0].SAP_VENDOR_CODE, 'A', 11);

            if (aResult.length > 0) {
                oActiveObj = {
                    "REQUEST_NO_ACTIVE": aResult[0].REQUEST_NO,
                    "REQUEST_TYPE": aResult[0].REQUEST_TYPE,
                    "CREATION_TYPE": aResult[0].CREATION_TYPE,
                    "STATUS": aResult[0].STATUS
                };
            }
            return oActiveObj;
        }
        catch (error) { throw error; }

    }

    async function getLogsCount(conn, oPayloadValue) {
        try {
            var iCount = 0;
            //    var sQuery =
            // 	'SELECT MAX("EVENT_NO") AS COUNT FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::SUPPLIER_PROFILE_LOG" WHERE SAP_VENDOR_CODE = ?';
            // var aResult = conn.executeQuery(sQuery, oPayloadValue[0].SAP_VENDOR_CODE);
            let aResult = await conn.run(
                SELECT` MAX(EVENT_NO) AS COUNT`
                    .from`${conn.entities['VENDOR_PORTAL.SUPPLIER_PROFILE_LOG']}`
                    .where`SAP_VENDOR_CODE =${oPayloadValue[0].SAP_VENDOR_CODE}`
            );
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
        catch (error) {
            throw error;                
        }
    }

    // async function getUpdatedFieldsDataForEdit(iReqNo, aUpdatedFieldsIDs, connection) {
    //     try {

    //         var aUpdatedIdData = [];

    //         var aColumnsTemplate = await lib_common.getTemplateColumns(connection);

    //         if (aUpdatedFieldsIDs.length > 0) {

    //             if (aColumnsTemplate.length > 0) {
    //                 if (aColumnsTemplate.length !== 0) {
    //                     var aColumnsTemplateObj = JSON.parse(JSON.stringify(aColumnsTemplate[0]));
    //                     var aTemplateKeys = Object.keys(aColumnsTemplate[0]);

    //                     for (var i = 0; i < aTemplateKeys.length; i++) {
    //                         if (aTemplateKeys[i] === "CCODE" || aTemplateKeys[i] === "TYPE") {
    //                             delete aColumnsTemplateObj[aTemplateKeys[i]];
    //                         } else if (aUpdatedFieldsIDs.includes(aTemplateKeys[i])) {
    //                             aColumnsTemplateObj[aTemplateKeys[i].toString()] = 'X';
    //                         } else {
    //                             aColumnsTemplateObj[aTemplateKeys[i].toString()] = null;
    //                         }
    //                     }

    //                     aColumnsTemplateObj.REQ_NO = iReqNo;
    //                     aUpdatedIdData.push(aColumnsTemplateObj);
    //                 } else {
    //                     throw "TEMPLATE Data missing Mandatory Fields Table";
    //                 }
    //             }
    //         }

    //         return aUpdatedIdData;
    //     }
    //     catch (error) {
    //         throw error;
    //     }
    // }

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
    async function getEventObj(oPayloadValue, action,status) {

        var iEventCode = null,
            sRemark = null;

        switch (action) {
            case "VENDOR":
                iEventCode = 10;
                if(status==5||status==6||status==9)
                    sRemark = "Vendor sent message to Approver";   
                else
                    sRemark = "Vendor sent message to Buyer";
                break;
            case "BUYER":
                iEventCode = 11;
                sRemark = "Buyer sent message to Vendor";
                break;
            case "APPROVER":
                iEventCode = 13;
                sRemark = "Approver sent message to Vendor";
                break;
        }

        var eventArr = [];

        if (oPayloadValue.length === 1) {
            eventArr = [{
                "REQUEST_NO": 0,
                "EVENT_NO": 0,
                "EVENT_CODE": iEventCode,
                "USER_ID": oPayloadValue[0].USER_ID,
                "USER_NAME": oPayloadValue[0].USER_NAME,
                "REMARK": sRemark,
                "COMMENT": oPayloadValue[0].COMMENT,
                "CREATED_ON": oPayloadValue[0].CREATED_ON,
                "EVENT_TYPE": oPayloadValue[0].EVENT_TYPE
            }];

        } else {
            throw "Incorrect Data format for posting";
        }

        return eventArr;
    }
    async function duplicateCheck(connection, sColumnName, sColumnValue, iObrNo) {
        try {
            var aResult = null;
            // aDataObjects = [];
            var whereObj = {};
            // var whereString ;
            // if (sColumnName === 'TRADE_LIC_NO') {
            //     whereObj['TRADE_LIC_NO'] = sColumnValue
            //     // whereString = `TRADE_LIC_NO = ${sColumnValue}`;
            // }
            // else if (sColumnName === 'VAT_REG_NUMBER') {
            //     whereObj['VAT_REG_NUMBER'] = sColumnValue
            // }
            // else if (sColumnName === 'VENDOR_NAME1') {
            //     whereObj['VENDOR_NAME1'] = sColumnValue
            // }
            whereObj[sColumnName] = sColumnValue;
            if (iObrNo !== "" && sColumnValue !== "") {   
                // whereObj['REQUEST_NO'] = {'!=':iObrNo}
                // aResult = await connection.run(SELECT
                //     .from`${connection.entities['VENDOR_PORTAL.REQUEST_INFO']}`
                //     .where(whereObj)
                //     // .where`TRADE_LIC_NO=${sColumnValue} AND REQUEST_NO=${iObrNo}`
                // );
                var sColumnAlias="VENDOR_PORTAL_REQUEST_INFO."+sColumnName;
                var qAndObject={ 'VENDOR_PORTAL_REQUEST_INFO.REQUEST_NO':{'!=':iObrNo}};
                qAndObject[sColumnAlias]=sColumnValue;
                aResult=await SELECT .columns('*','APPROVER_ROLE as APPR_ROLE') .from('VENDOR_PORTAL_REQUEST_INFO')      
                .join('VENDOR_PORTAL_MASTER_APPROVAL_HIERARCHY_FE')
                .on({ 'VENDOR_PORTAL_REQUEST_INFO.APPROVER_LEVEL':'VENDOR_PORTAL_MASTER_APPROVAL_HIERARCHY_FE.APPROVER_LEVEL',
                'VENDOR_PORTAL_REQUEST_INFO.ENTITY_CODE': 'VENDOR_PORTAL_MASTER_APPROVAL_HIERARCHY_FE.ENTITY_CODE',
                'VENDOR_PORTAL_REQUEST_INFO.PROCESS_LEVEL': 'VENDOR_PORTAL_MASTER_APPROVAL_HIERARCHY_FE.APPR_TYPE',
                'VENDOR_PORTAL_REQUEST_INFO.APPROVER_ROLE': 'VENDOR_PORTAL_MASTER_APPROVAL_HIERARCHY_FE.USER_ROLE',
             })   
                .and(qAndObject);                        
            }
            else {         
                aResult=[];
                  
                // aResult=await SELECT .columns('*','APPROVER_ROLE as APPR_ROLE') .from('VENDOR_PORTAL_REQUEST_INFO')      
                // .join('VENDOR_PORTAL_MASTER_APPROVAL_HIERARCHY_FE')
                // .on({ 'VENDOR_PORTAL_REQUEST_INFO.APPROVER_LEVEL':'VENDOR_PORTAL_MASTER_APPROVAL_HIERARCHY_FE.APPROVER_LEVEL',
                // 'VENDOR_PORTAL_REQUEST_INFO.ENTITY_CODE': 'VENDOR_PORTAL_MASTER_APPROVAL_HIERARCHY_FE.ENTITY_CODE',
                // 'VENDOR_PORTAL_REQUEST_INFO.PROCESS_LEVEL': 'VENDOR_PORTAL_MASTER_APPROVAL_HIERARCHY_FE.APPR_TYPE',
                // 'VENDOR_PORTAL_REQUEST_INFO.APPROVER_ROLE': 'VENDOR_PORTAL_MASTER_APPROVAL_HIERARCHY_FE.USER_ROLE',
                // }) 
                // .and({ 'A.REQUEST_NO':{'!=':iObrNo} });     
                

                // aResult = await connection.run(SELECT
                //     .from`${connection.entities['VENDOR_PORTAL.REQUEST_INFO']}`
                //     .where(whereObj)
                //     // .where`${sColumnName} = ${sColumnValue}`
                // );
            }
            // var sQuery =
            // 	'SELECT * FROM \"VENDOR_PORTAL\".\"VENDOR_PORTAL.Table::ONBOARDING_FORM\" WHERE ' + sColumnName + ' = ? ';

            // if (iObrNo !== "" && sColumnValue !== "") {
            // 	sQuery +=
            // 		'AND OBR_NO != ?';
            // 	aResult = conn.executeQuery(sQuery, sColumnValue, iObrNo);
            // }

            // if (aResult != null) {
            // 	aDataObjects = Object.keys(aResult).map(function(key) {
            // 		return aResult[key];
            // 	});
            // }
            // return aDataObjects;
            return aResult
        }
        catch (error) { throw error; }
    }

    async function getMaxApproverCount(connection, iEntityCode) {
        try {
            var iCount = 0;

            // var sQuery =
            // 	'SELECT MAX("APPROVER_LEVEL") AS COUNT FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::ONBOARDING_MATRIX" WHERE ENTITY_CODE = ?';
            // var aResult = conn.executeQuery(sQuery, iEntityCode);
            let aResult = await connection.run(
                SELECT`MAX(APPROVER_LEVEL) AS COUNT`
                    .from`${connection.entities['VENDOR_PORTAL.MATRIX_REGISTRATION_APPR']}`
                    .where({ ENTITY_CODE: iEntityCode }));    

            if (aResult.length > 0) {
                iCount = aResult[0].COUNT;
            }
            return iCount;
        } catch (error) { throw error; }
    }
    function getEventObjRegApproval(eventsData, iLevel, iMaxLevelCount, sChangeRequestNo) {

        var sCrNo = '';
        if (iLevel === iMaxLevelCount && (eventsData[0].COMMENT !== null || eventsData[0].COMMENT !== "") && (sChangeRequestNo !== null ||
            sChangeRequestNo !== "")) {
            // sCrNo = 'CR: ' + sChangeRequestNo + ' Created - ';
            sCrNo = 'CR: ' + parseInt(sChangeRequestNo, 10) + ' Created - ';
        }
        if (eventsData[0] !== null)
            eventsData[0].COMMENT = sCrNo + eventsData[0].COMMENT || ""
        else
            throw "Incorrect Data format for posting";

        return eventsData[0];
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

    async function getProdServiceData(arrayPrdSrv, propertyName) {
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
    
    async function fnCheckSupplier(connection, requestNo) {
        var value = 0;
        // var sQuery =
        //     'SELECT * FROM \"VENDOR_PORTAL\".\"VENDOR_PORTAL.Table::VENDOR_INVITATION\" WHERE REG_NO = ?';
        // var aResult = conn.executeQuery(sQuery, sRegNo);
        let aResult = await connection.run(
            SELECT
                .from`${connection.entities['VENDOR_PORTAL.REQUEST_INFO']}`
                .where({ REQUEST_NO: requestNo })
        );
        // if (aResult[0].REQUESTER_ID === null && aResult[0].VENDOR_CODE === "SR") {
        //     value = null;
        // }
        if (aResult[0].VENDOR_CODE === "SR") {
            value = null;
        }   
        return value;
    }

    async function getCcodeRType(connection, requestNo, sTable) {
        try {
            var oDataObjects = null, aEntityResult = null;
            let aResult = await connection.run(
                SELECT
                    .from`${connection.entities['VENDOR_PORTAL.' + sTable]}`
                    .where({ REQUEST_NO: requestNo })
            );
            // var sQuery =
            // 'SELECT * FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::' + sTable + '" WHERE REG_NO = ?';
            // var aResult = conn.executeQuery(sQuery, requestNo);
            if (aResult.length > 0) {
                aEntityResult = await connection.run(
                    SELECT`BUTXT`
                        .from`${connection.entities['VENDOR_PORTAL.MASTER_ENTITY_CODE']}`
                        .where({ BUKRS: aResult[0].ENTITY_CODE })
                );
                if (aEntityResult.length > 0) {
                    oDataObjects = {
                        "EntityCode": aResult[0].ENTITY_CODE,
                        // "RequestType": aResult[0].REQUEST_TYPE,
                        "CreationType":aResult[0].CREATION_TYPE,
                        "RequestTypeDesc": aEntityResult[0].BUTXT
                    };
                }
            }
            // if (aResult.length > 0) {
            //     oDataObjects = {
            //         "EntityCode": aResult[0].ENTITY_CODE,
            //         "RequestType": aResult[0].REQUEST_TYPE,
            //         "RequestTypeDesc": aEntityResult[0].BUTXT
            //     };
            // }

            return oDataObjects;
        }
        catch (error) { throw error; }
    }

    async function getDraftData(connection, requestNo) {
        try {
            var oProdServObj = await getProdServData(connection, requestNo, "REGFORM_PRODUCT_SERVICE");
            var oOEMObj = await getOEMExclAndNonExclData(connection, requestNo, "REGFORM_OEM");
            var aMainData = await checkOtFolderIds(connection, await getTableData(connection, requestNo, "REQUEST_INFO")) || [];

            var oDraftObj = {
                "MAIN": aMainData || [],
                "ADDRESS": await getAddressWithDesc(connection, await getTableData(connection, requestNo, "REGFORM_ADDRESS") || []),
                "CONTACTS": await getContactsWithDesc(connection, await getTableData(connection, requestNo, "REGFORM_CONTACTS") || []),
                "PAYMENT": await getPaymentsWithDesc(connection, await getTableData(connection, requestNo, "REGFORM_BANKS") || []),

                "FINANCE": await getTableData(connection, requestNo, "REGFORM_FINANCIAL") || [],
                "OWNERS": await getTableData(connection, requestNo, "REGFORM_OWNERS") || [],

                "PRODUCTS": oProdServObj.Products || [],
                "SERVICES": oProdServObj.Service || [],
                "CAPACITY": await getTableData(connection, requestNo, "REGFORM_CAPACITY") || [],
                "CUSTOMER": await getTableData(connection, requestNo, "REGFORM_CUSTOMERS") || [],
                "OEM_EX": oOEMObj.OEM_EX || [],
                "OEM_NE": oOEMObj.OEM_NE || [],

                "DISC_FIELDS": await getTableData(connection, requestNo, "REGFORM_DISCLOSURE_FIELDS") || [],
                "DISC_RELATIVES": await getTableData(connection, requestNo, "REGFORM_DISCLOSURE_RELATIVES") || [],
                "DISC_QA_CERTI": await getTableData(connection, requestNo, "REGFORM_DISCLOSURE_QACERT") || [],

                "ATTACH_FIELDS": await getTableData(connection, requestNo, "REGFORM_ATTACH_FIELDS") || [],
                "ATTACHMENTS": await getAttachmentsData(connection, requestNo, "REGFORM_ATTACHMENTS", "ONB") || [],
                "EVENTS": await getEventsData(connection, requestNo, "REQUEST_EVENTS_LOG", "MSG") || []
            };

            return oDraftObj;
        }
        catch (error) { throw error; }
    }

    async function getProdServData(connection, requestNo, sTable) {
        try {
            var aProductsArr = [];
            var aServiceArr = [];

            let aResult = await connection.run(
                SELECT
                    .from`${connection.entities['VENDOR_PORTAL.' + sTable]}`
                    .where({ REQUEST_NO: requestNo }));
            // var sQuery =
            //     'SELECT * FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::' + sTable + '" WHERE REQUEST_NO = ?';
            // var aResult = conn.executeQuery(sQuery, requestNo);
            if (aResult.length > 0) {
                Object.keys(aResult).map(function (key) {
                    if (aResult[key].TYPE === "PROD") {
                        aProductsArr.push(aResult[key]);
                    } else if (aResult[key].TYPE === "SERV") {
                        aServiceArr.push(aResult[key]);
                    }
                });
            }

            var oDataObjects = {
                "Products": aProductsArr,
                "Service": aServiceArr
            };

            return oDataObjects;
        }
        catch (error) { throw error; }
    }

    async function getOEMExclAndNonExclData(connection, requestNo, sTable) {
        try {
            var aExclusiveArr = [];
            var aNonExclusiveArr = [];
            let aResult = await connection.run(
                SELECT
                    .from`${connection.entities['VENDOR_PORTAL.' + sTable]}`
                    .where({ REQUEST_NO: requestNo }));
            // var sQuery =
            // 	'SELECT * FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::' + sTable + '" WHERE REQUEST_NO = ?';
            // var aResult = conn.executeQuery(sQuery, requestNo);

            if (aResult.length > 0) {
                Object.keys(aResult).map(function (key) {

                    if (aResult[key].OEM_TYPE === "OEM_EX") {
                        aExclusiveArr.push(aResult[key]);
                    } else if (aResult[key].OEM_TYPE === "OEM_NE") {
                        aNonExclusiveArr.push(aResult[key]);
                    }
                });
            }

            var oDataObjects = {
                "OEM_EX": aExclusiveArr,
                "OEM_NE": aNonExclusiveArr
            };


            return oDataObjects;
        }
        catch (error) { throw error; }
    }

    async function getTableData(connection, requestNo, sTable) {
        try {
            let aResult = await connection.run(
                SELECT
                    .from`${connection.entities['VENDOR_PORTAL.' + sTable]}`
                    .where({ REQUEST_NO: requestNo })
                    // .orderBy`TABLE_DESCRIPTION`
            );
            // var sQuery = 'SELECT * FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::' + sTable + '" WHERE REQUEST_NO = ?';
            // var aResult = conn.executeQuery(sQuery, requestNo);

            // var aDataObjects = Object.keys(aResult).map(function(key) { 
            // 	return aResult[key];
            // });

            return aResult;
        }
        catch (error) { throw error; }
    }

    async function getOtFolderIdData(connection, sTable, sIvenVendorCode) {
        try {
            let aResult = await connection.run(
                SELECT
                    .from`${connection.entities['VENDOR_PORTAL.' + sTable]}`
                    .where({ IVEN_VENDOR_CODE: sIvenVendorCode }));
            // var sQuery = 'SELECT * FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::REGFORM_FOLDER_IDS"';
            // sQuery += ' WHERE IVEN_VENDOR_CODE = ?';
            // var aResult = conn.executeQuery(sQuery, sIvenVendorCode);

            // var aDataObjects = Object.keys(aResult).map(function(key) { 
            // 	return aResult[key];
            // });

            return aResult;
        }
        catch (error) { throw error; }
    }

    async function checkOtFolderIds(connection, aMainData) {
        try {
            var aFolderIdData = null;
            var aMainDataLocal = [];
            if (aMainData.length === 1 && (aMainData[0].OT_PARENT_ID === null || aMainData[0].OT_FOLDER1_ID === null || aMainData[0].OT_FOLDER2_ID === null)) {
                aFolderIdData = await getOtFolderIdData(connection, "REGFORM_FOLDER_IDS", aMainData[0].IVEN_VENDOR_CODE);

                if (aFolderIdData.length > 0) {
                    aMainDataLocal = JSON.parse(JSON.stringify(aMainData));

                    aMainDataLocal[0].OT_PARENT_ID = aFolderIdData[0].OT_PARENT_ID;
                    aMainDataLocal  [0].OT_FOLDER1_ID = aFolderIdData[0].OT_FOLDER1_ID;
                    aMainDataLocal[0].OT_FOLDER2_ID = aFolderIdData[0].OT_FOLDER2_ID;

                    aMainData = aMainDataLocal;
                }
            }
            return aMainData;
        }
        catch (error) { throw error; }
    }

    async function getAddressWithDesc(connection, addressArr) {
        try {
            var addressWithDesc = [];
            if (addressArr.length > 0) {
                var dataObj = {};
                // addressWithDesc = Object.keys(addressArr).map(function(key) {
                //     dataObj = JSON.parse(JSON.stringify(addressArr[key]));

                // 	if (dataObj.COUNTRY !== "" || dataObj.COUNTRY !== null) {
                // 		dataObj.COUNTRY_DESC = getCountryDesc(connection, dataObj.COUNTRY) || "";
                // 	}
                // 	if (dataObj.STATE !== "" || dataObj.STATE !== null) {
                // 		dataObj.REGION_DESC = getRegionDesc(conn, dataObj.COUNTRY, dataObj.STATE) || "";
                // 	}

                // 	return dataObj;
                // });
                for (var i = 0; i < addressArr.length; i++) {
                    dataObj = JSON.parse(JSON.stringify(addressArr[i]));
                    if (dataObj.COUNTRY !== "" || dataObj.COUNTRY !== null) {
                        dataObj.COUNTRY_DESC = await getCountryDesc(connection, dataObj.COUNTRY) || "";
                    }
                    if (dataObj.STATE !== "" || dataObj.STATE !== null) {
                        dataObj.REGION_DESC = await getRegionDesc(connection, dataObj.COUNTRY, dataObj.STATE) || "";
                    }
                    addressWithDesc.push(dataObj);
                }
            }

            return addressWithDesc;
        }
        catch (error) { throw error; }
    }

    async function getCountryDesc(connection, countryCode) {
        try {
            var sDesc = "";
            let aResult = await connection.run(
                SELECT`LANDX`
                    .from`${connection.entities['VENDOR_PORTAL.MASTER_COUNTRY']}`
                    .where({ LAND1: countryCode }));

            // var sQuery =
            //     'SELECT "LANDX" AS DESC FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::MASTER_COUNTRY" WHERE LAND1 = ?';
            // var aResult = conn.executeQuery(sQuery, countryCode);

            if (aResult.length > 0) {
                sDesc = aResult[0].LANDX;
            }
            return sDesc;
        }
        catch (error) { throw error; }
    }

    async function getRegionDesc(connection, countryCode, regionCode) {
        try {
            var sDesc = "";
            let aResult = await connection.run(
                SELECT`BEZEI`
                    .from`${connection.entities['VENDOR_PORTAL.MASTER_REGION']}`
                    .where({ LAND1: countryCode, BLAND: regionCode }));

            //     var sQuery =
            //     'SELECT "BEZEI" AS DESC FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::MASTER_REGION" WHERE LAND1 = ? AND BLAND = ?';
            // var aResult = conn.executeQuery(sQuery, countryCode, regionCode);

            if (aResult.length > 0) {
                sDesc = aResult[0].BEZEI;
            }
            return sDesc;
        }
        catch (error) { throw error; }
    }

    async function getContactsWithDesc(connection, contactsArr) {
        try {
            var addressWithDesc = [];
            if (contactsArr.length > 0) {
                var dataObj = {};
                for (var i = 0; i < contactsArr.length; i++) {
                    dataObj = JSON.parse(JSON.stringify(contactsArr[i]));
                    if (dataObj.NATIONALITY !== "" || dataObj.NATIONALITY !== null) {
                        dataObj.COUNTRY_DESC = await getCountryDesc(connection, dataObj.NATIONALITY) || "";
                    }
                    if (dataObj.STATE !== "" || dataObj.STATE !== null) {
                        dataObj.REGION_DESC = await getRegionDesc(connection, dataObj.NATIONALITY, dataObj.STATE) || "";
                    }
                    addressWithDesc.push(dataObj);
                }
                // addressWithDesc = Object.keys(contactsArr).map(function(key) {
                //     dataObj = JSON.parse(JSON.stringify(contactsArr[key]));

                // 	if (dataObj.NATIONALITY !== "" || dataObj.NATIONALITY !== null) {
                // 		dataObj.COUNTRY_DESC = getCountryDesc(conn, dataObj.NATIONALITY) || "";
                // 	}
                // 	if (dataObj.STATE !== "" || dataObj.STATE !== null) {
                // 		dataObj.REGION_DESC = getRegionDesc(conn, dataObj.NATIONALITY, dataObj.STATE) || "";
                // 	}

                // 	return dataObj;
                // });
            }

            return addressWithDesc;
        }
        catch (error) { throw error; }
    }

    async function getPaymentsWithDesc(connection, paymentArr) {
        try {
            var paymentWithDesc = [];
            if (paymentArr.length > 0) {
                var dataObj = {};
                // paymentWithDesc = Object.keys(paymentArr).map(function(key) {
                //     dataObj = JSON.parse(JSON.stringify(paymentArr[key]));

                // 	if (dataObj.BANK_COUNTRY !== "" || dataObj.BANK_COUNTRY !== null) {
                // 		dataObj.COUNTRY_DESC = getCountryDesc(conn, dataObj.BANK_COUNTRY) || "";
                // 	}

                // 	return dataObj;
                // });
                for (var i = 0; i < paymentArr.length; i++) {
                    dataObj = JSON.parse(JSON.stringify(paymentArr[i]));

                    if (dataObj.BANK_COUNTRY !== "" || dataObj.BANK_COUNTRY !== null) {
                        dataObj.COUNTRY_DESC = await getCountryDesc(connection, dataObj.BANK_COUNTRY) || "";
                    }
                    paymentWithDesc.push(dataObj);
                }
            }

            return paymentWithDesc;
        }
        catch (error) { throw error; }
    }

    async function getAttachmentsData(connection, requestNo, sTable, sAttachType) {
        try {
            let aResult = await connection.run(
                SELECT`REQUEST_NO,SR_NO,ATTACH_CODE,ATTACH_GROUP,ATTACH_DESC,ATTACH_VALUE,EXPIRY_DATE,FILE_NAME,FILE_TYPE,FILE_MIMETYPE,OT_DOC_ID`
                    .from`${connection.entities['VENDOR_PORTAL.' + sTable]}`
                    .where({ REQUEST_NO: requestNo, FILE_TYPE: sAttachType }));
            // var sQuery =
            // 	'SELECT "REQUEST_NO","SR_NO","ATTACH_CODE","ATTACH_GROUP","ATTACH_DESC","ATTACH_VALUE","EXPIRY_DATE","FILE_NAME","FILE_TYPE","FILE_MIMETYPE"';
            // sQuery += 'FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::' + sTable + '" WHERE REQUEST_NO = ? AND  FILE_TYPE = ?';

            // var aResult = conn.executeQuery(sQuery, requestNo, sAttachType);

            // var aDataObjects = Object.keys(aResult).map(function(key) {
            // 	return aResult[key];
            // });

            return aResult;
        }
        catch (error) { throw error; }
    }

    async function getEventsData(connection, requestNo, sTable, sMsgType) {
        try {
            let aResult = await connection.run(
                SELECT
                    .from`${connection.entities['VENDOR_PORTAL.' + sTable]}`
                    .where({ REQUEST_NO: requestNo, EVENT_TYPE: sMsgType }));
            // var sQuery =
            // 	'SELECT * FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::' + sTable + '" WHERE REG_NO = ? AND  EVENT_TYPE != ?';
            // var aResult = conn.executeQuery(sQuery, requestNo, sMsgType);

            // var aDataObjects = Object.keys(aResult).map(function(key) {
            // 	return aResult[key];
            // });
            return aResult;
        }
        catch (error) { throw error; }
    }

    async function getVisibleFieldsData(connection, entityCode, creationType) {
        try {
            let aResult = await connection.run(
                SELECT
                    .from`${connection.entities['VENDOR_PORTAL.MASTER_REGFORM_FIELDS_VISIBLE']}`
                    .where({ CCODE: entityCode, TYPE: creationType }));
            // var sQuery =
            // 	'SELECT * FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::ENTITY_FIELDS_VISIBLE" WHERE "CCODE" = ? AND "TYPE" = ?';
            // var aResult = conn.executeQuery(sQuery, iEntityCode, iType);

            return aResult;
        }
        catch (error) { throw error; }
    }

    async function getMandatoryFieldsData(connection, entityCode, creationType) {
        try {
            let aResult = await connection.run(
                SELECT
                    .from`${connection.entities['VENDOR_PORTAL.MASTER_REGFORM_FIELDS_MANDATORY']}`
                    .where({ CCODE: entityCode, TYPE: creationType }));
            // var sQuery =
            // 	'SELECT * FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::ENTITY_FIELDS_MANDATORY" WHERE CCODE = ? AND TYPE = ?';
            // var aResult = conn.executeQuery(sQuery, iEntityCode, iType);

            return aResult;
        }
        catch (error) { throw error; }
    }

    async function getUpdatedFieldsData(connection, requestNo) {
        try {
            let aResult = await connection.run(
                SELECT
                    .from`${connection.entities['VENDOR_PORTAL.MASTER_REGFORM_FIELDS_UPDATED']}`
                    .where({ REQ_NO: requestNo }));
            // var sQuery =
            // 	'SELECT * FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::ENTITY_FIELDS_UPDATED" WHERE REQ_NO = ?';
            // var aResult = conn.executeQuery(sQuery, iRegNo);

            // var aDataObjects = Object.keys(aResult).map(function(key) {
            // 	return aResult[key];
            // });

            // return aDataObjects;
            return aResult;
        }
        catch (error) { throw error; }
    }

    async function getiVenSettings(connection) {
        try {
            let aResult = await connection.run(
                SELECT`CODE,SETTING`
                    .from`${connection.entities['VENDOR_PORTAL.MASTER_IVEN_SETTINGS']}`
                    .where({ TYPE: 'REGFORM' }));
            // var sQuery =
            // 	'SELECT "CODE", "SETTING" FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::MASTER_IVEN_SETTINGS" ';
            // sQuery += 'WHERE "TYPE" = ?';
            // var aResult = conn.executeQuery(sQuery, "REGFORM"); 

            // var aDataObjects = Object.keys(aResult).map(function(key) {
            // 	return aResult[key];
            // });
            return aResult;
        }
        catch (error) { throw error; }
    }

    async function getObjectFromRows(aDataObjects) {
        try {
            var oReturnObj = {},
                datalength = aDataObjects.length;

            if (datalength > 0) {
                for (var i = 0; i < datalength; i++) {
                    oReturnObj[aDataObjects[i].CODE.toString()] = aDataObjects[i].SETTING;
                }
            }
            return oReturnObj;
        }
        catch (error) { throw error; }
    }

    async function getOpenTextCredentials(connection) {
        try {
            var aDataObj = "";
            let aResult = await connection.run(
                SELECT`USERNAME,PASSWORD,ADD_INFO1`
                    .from`${connection.entities['VENDOR_PORTAL.MASTER_CREDENTIAL']}`
                    .where({ TYPE: 'OPENTEXT', SR_NO: 1 }));
            // var sQuery =
            // 	'SELECT "USERNAME","PASSWORD","ADD_INFO1" FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::MASTER_CREDENTIAL" WHERE TYPE = ? AND SR_NO = ?';
            // var aResult = conn.executeQuery(sQuery, "OPENTEXT", 1);

            if (aResult.length > 0) {
                aDataObj = aResult[0];
            }

            return aDataObj;
        }
        catch (error) { throw error; }
    }

    async function getClientDetails(connection) {
        try {
            var aDataObj = "";

            let aResult = await connection.run(
                SELECT`CLIENT_FULL_NAME,CLIENT_SHORT_NAME,CLIENT_COUNTRY`
                    .from`${connection.entities['VENDOR_PORTAL.MASTER_EMAIL_CONTACT_ID']}`
                    .where({ SR_NO: 1 }));
            // var sQuery =
            // 	'SELECT "CLIENT_FULL_NAME", "CLIENT_SHORT_NAME", "CLIENT_COUNTRY" FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::MASTER_EMAIL_CONTACT_ID" WHERE SR_NO = ?';
            // var aResult = conn.executeQuery(sQuery, 1);

            if (aResult.length > 0) {
                aDataObj = aResult[0];
            }

            return aDataObj;
        }
        catch (error) { throw error; }
    }
    async function getLabelsForFormID(connection) {
        try {
            var aDataObj = "";
            var responseObj = []

            let aResult = await connection.run(
                SELECT`FIELDS,DESCRIPTION`
                    .from`${connection.entities['VENDOR_PORTAL.MASTER_REGFORM_FIELDS_ID_DESC']}`
                    .orderBy("FIELDS")
                    );
            // var sQuery =
            // 	'SELECT "CLIENT_FULL_NAME", "CLIENT_SHORT_NAME", "CLIENT_COUNTRY" FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::MASTER_EMAIL_CONTACT_ID" WHERE SR_NO = ?';
            // var aResult = conn.executeQuery(sQuery, 1);
            // obj= Object.assign({}, ...aResult);     
            // if (aResult.length > 0) {
                // aDataObj = aResult[0];
                // obj= Object.assign({}, ...aResult);   
                // aResult.map(function(record){
                //     // var obj ={}
                //     obj[record.FIELDS] = record.DESCRIPTION   
                //     responseObj.push(obj)
                // })                 
            // }     

             const outputObject = aResult.reduce((result, item) => {
                result[item["FIELDS"]] = item["DESCRIPTION"];
                return result;
              }, {});         
      
            return [outputObject];
        }
        catch (error) { throw error; }
    }

    async function getRandomNumber() {
        var randomNo = JSON.stringify(Math.floor(100000 + Math.random() * 900000));

        return randomNo;
    }

    async function getAppName(iReqNo){
        var aReqInfo=await SELECT .from('VENDOR_PORTAL_REQUEST_INFO') .where({REQUEST_NO:iReqNo});   
        return (aReqInfo[0].STATUS==1||aReqInfo[0].STATUS==15)?"Vendor Request Approval":"Vendor Registration Approval";
    }          

    async function getEventPayload(reqHeader, connection, sType) {
        var sRemark = null;
        var iEventCode = null;
        var iEventNo = null;  
        var iComment=null;
        
        // var iComment="Self registration done by " + reqHeader[0].VENDOR_NAME1.toUpperCase().trim()
    
        if (sType === 1) {
            sRemark = "REG Request Created with self registration";
            iEventNo = 1;     
            iEventCode = 1;
            iComment="Self registration request created by " + reqHeader[0].VENDOR_NAME1.toUpperCase().trim()
        } else {
            sRemark = "Invite Sent with self registration";
            iEventNo = 2;
            iEventCode = 2;   
            // iComment="Self registration request invited by " + reqHeader[0].VENDOR_NAME1.toUpperCase().trim()
            iComment="Self registration request auto-generated for invitation";  
        }
    
        var oEventObj = {
            "REQUEST_NO": 0,
            "EVENT_NO": iEventNo,
            "EVENT_CODE": iEventCode,
            "EVENT_TYPE": "REG",
            "USER_ID": reqHeader[0].REGISTERED_ID.toLowerCase().trim() || "",     
            "USER_NAME": reqHeader[0].VENDOR_NAME1.toUpperCase().trim() || "",
            "REMARK": sRemark,
            "COMMENT": iComment,      
            "CREATED_ON": new Date().toISOString()             
        };
    
        return oEventObj;      
    }

    async function checkRegisteredIdExists(connection, vendorEmail) {
        let sResult = await connection.run(SELECT
            .from(`${connection.entities['VENDOR_PORTAL.REQUEST_SECURITY_CODE']}`)
            .where({ REGISTERED_ID: vendorEmail }));    
            return sResult
    }

    async function checkVendor(connection, data, val) {
        try {
            let aQuery1Result = await connection.run(
                SELECT 
                    .from`${connection.entities['VENDOR_PORTAL.REQUEST_INFO']}`
                    .where`STATUS NOT IN (3,8) AND VENDOR_NAME1 = ${data[0].VENDOR_NAME1}`
            );
            // var sQuery =
            // 	'SELECT * FROM \"VENDOR_PORTAL\".\"VENDOR_PORTAL.Table::VENDOR_INVITATION\" WHERE STATUS != ? AND STATUS != ? AND VENDOR_NAME=?';
            // var aResult = con.executeQuery(sQuery, 3, 8, data[0].VENDOR_NAME);

            let aQuery2Result = await connection.run(
                SELECT
                    .from`${connection.entities['VENDOR_PORTAL.REQUEST_INFO']}`
                    .where`STATUS NOT IN (3,8) AND REGISTERED_ID = ${data[0].REGISTERED_ID}`
            );

            // var sQuery1 =
            // 	'SELECT * FROM \"VENDOR_PORTAL\".\"VENDOR_PORTAL.Table::VENDOR_INVITATION\" WHERE STATUS != ? AND STATUS != ? AND VEMAIL=?';
            // var sResult = con.executeQuery(sQuery1, 3, 8, data[0].VEMAIL);

            var iNameCount = aQuery1Result.length;
            var iEmailCount = aQuery2Result.length;

            if (iEmailCount !== 0) {
                return 'ErrorEmail';
            } else if (iEmailCount === 0 && iNameCount === 0) {
                return 0;
            } else {
                return 'ErrorName';
            }
        }
        catch (error) { throw error; }
    }

    async function getEventObjects() {   
        var oEventObj = [{
                "REQUEST_NO": 1,
                "EVENT_NO": 1,
                "EVENT_CODE": 1,
                "EVENT_TYPE": "REG",
                "USER_ID": "",
                "USER_NAME": "",
                "REMARK": "Update Request Created",
                "COMMENT": "Update Request is auto-generated for Vendor Edit request",    
                "CREATED_ON": null
            },
            {
                "REQUEST_NO": 2,
                "EVENT_NO": 2,
                "EVENT_CODE": 2,
                "EVENT_TYPE": "REG",
                "USER_ID": "",
                "USER_NAME": "",
                "REMARK": "Update Request Approved",
                "COMMENT": "Update Request is auto-approved for Vendor Edit request",
                "CREATED_ON": null
            }
    
        ];
    
        return oEventObj;
    }

    async function getCurrentRequestStatus(conn, iRequestNo) {
        var iCount = 0;
        var aResult = await SELECT .from('VENDOR_PORTAL_REQUEST_INFO') .where({REQUEST_NO:iRequestNo});
    
        if (aResult.length > 0) {       
            iCount = aResult[0].STATUS;    
        }
    
        return iCount;
    }

    async function getApproveEventsObj(oReqHeader){
        var aEventObj=[{
        "REQUEST_NO":100000949,// Any Number
        "EVENT_NO":1,
        "EVENT_CODE":0,     
        "EVENT_TYPE":"ONB",
        "USER_ID":oReqHeader?.REGISTERED_ID,
        "USER_NAME":oReqHeader?.VENDOR_NAME1,       
        "REMARK":"Registration Approval",
        "COMMENT":"Request is auto-generated for registration approval request",
        "CREATED_ON":null
    }]
        return aEventObj
    }

})