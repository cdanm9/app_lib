const cds=require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
const lib_dms = require('./DMS_LIB/BTP_DMS_LIB')

module.exports=cds.service.impl(function(srv){
    this.on('AttachmentPost',async (req)=>{
        try{
            var client=await dbClass.createConnectionFromEnv();
            var dbConn=new dbClass(client);
            const {ACTION,DOC_ATTACHMENT}=req.data;
            DOC_ATTACHMENT[0].INSTANCE_UID="00000005-0000-0000-0000-000000000006";
            DOC_ATTACHMENT[0].LOGIN_ID=DOC_ATTACHMENT[0].LOGIN_ID??""    
            if(ACTION=='CREATE'){
                const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'PO_ATTACHMENT_STORE');
                var sResponse = await dbConn.callProcedurePromisified(loadProc,
                    DOC_ATTACHMENT);                    
                 
                var oContent={      
                    invocationContext:"${invocation_context}",
                    input:{}
                }
                
                let destToken = await cds.connect.to('BPA_TOKEN');
                var params = "?grant_type=client_credentials";
                var path = encodeURI(params);
                const TokenWF = await destToken.send('POST', path);
                var lv_JWToken = TokenWF.access_token;
                let destAPI = await cds.connect.to('BPA_DEST');
                var JToken = 'Bearer ' + lv_JWToken;   
                const URL = await destAPI.send('POST', '/public/irpa/runtime/v1/apiTriggers/59316e5b-59da-4110-b803-f34d861af9ef/runs', oContent, { "Content-Type": "application/json", 'Authorization': JToken,'irpa-api-key':'_JovcgRc--vXQYoCH5NoH4z3yVJBzVvO'});    
                    
                req.reply(sResponse.outputScalar);     
            } 
        }catch(error){
            req.error({code:500,message:error.message??error})
        }
    });
    this.on('POUpdate',async (req)=>{    
        try{     
            var client=await dbClass.createConnectionFromEnv();
            var dbConn=new dbClass(client);
            const {ACTION,DOC_HEADER,DOC_LINEITEMS,ATTACHMENT}=req.data;          
            if(ACTION=='UPDATE'){
                var DOC_ITEM = DOC_LINEITEMS;             
                var Status = DOC_HEADER.STATUS;
                var FILE_ID = DOC_HEADER.FILE_ID;
                var documentDate = DOC_HEADER.DOCUMENTDATE;
                var purchaseOrderNumber = DOC_HEADER.PURCHASEORDERNUMBER;
                var documentNumber = DOC_HEADER.DOCUMENTNUMBER;
                var currencyCode = DOC_HEADER.CURRENCYCODE;
                var gross_value = DOC_HEADER.GROSSAMOUNT;

                const loadProcedureHeader= await dbConn.loadProcedurePromisified(hdbext, null, 'PO_UPDATE_HEADER');
                var sResponseHeader = await dbConn.callProcedurePromisified(loadProcedureHeader,
                    [Status, FILE_ID, documentDate, purchaseOrderNumber, documentNumber, currencyCode, gross_value]); 

            
                for (var l = 0; l < DOC_ITEM.length; l++) {

                    var costcenter=DOC_ITEM[l].COST_CENTER;
                    var glaccount=DOC_ITEM[l].GL_ACCOUNT;    
                    var description = DOC_ITEM[l].DESCRIPTION;
                    var netAmount = DOC_ITEM[l].NETAMOUNT;
                    var quantity = DOC_ITEM[l].QUANTITY;
                    var unitOfMeasure = DOC_ITEM[l].UNITOFMEASURE;
                    var unitPrice = DOC_ITEM[l].UNITPRICE;
                    var HEADERID = DOC_ITEM[l].HEADERID;
                    var ITEMID = DOC_ITEM[l].ITEMID;
                    
                    const loadProcedureItems= await dbConn.loadProcedurePromisified(hdbext, null, 'PO_UPDATE_ITEM');
                    var sResponseItems = await dbConn.callProcedurePromisified(loadProcedureItems,
                        [description, netAmount, quantity, unitOfMeasure, unitPrice, HEADERID, ITEMID,glaccount,costcenter]); 

                }
                
                        
                var STATUS = DOC_HEADER.STATUS;
                var FILE_ID = DOC_HEADER.FILE_ID;
                var INSTANCE_UID = DOC_HEADER.FILE_ID;    

                const loadProcedureAttach = await dbConn.loadProcedurePromisified(hdbext, null, 'PO_UPDATE_ATTACH');
                var sResponseAttach = await dbConn.callProcedurePromisified(loadProcedureAttach,
                    [STATUS, INSTANCE_UID, FILE_ID]);                 
                req.reply(sResponseItems.outputScalar);            
            }
            else if(ACTION === "HEADERUPDATE"){
                var Status = DOC_HEADER.STATUS;
                var FILE_ID = DOC_HEADER.FILE_ID;
                var documentDate = DOC_HEADER.DOCUMENTDATE;
                var purchaseOrderNumber = DOC_HEADER.PURCHASEORDERNUMBER;
                var documentNumber = DOC_HEADER.DOCUMENTNUMBER;
                var currencyCode = DOC_HEADER.CURRENCYCODE;
                var gross_value = DOC_HEADER.GROSSAMOUNT;
                const loadProcedureHeaderOnly= await dbConn.loadProcedurePromisified(hdbext, null, 'PO_UPDATE_HEADER');
                var sResponseHeaderOnly = await dbConn.callProcedurePromisified(loadProcedureHeaderOnly,
                    [Status, FILE_ID, documentDate, purchaseOrderNumber, documentNumber, currencyCode, gross_value]); 
                req.reply(sResponseHeaderOnly.outputScalar)
            }else if(ACTION === "HEADERATTACH"){
                var STATUS = ATTACHMENT.STATUS;
                var FILE_ID = ATTACHMENT.FILE_ID;
                var INSTANCE_UID = ATTACHMENT.INSTANCE_UID;
                const loadProcedureAttachOnly = await dbConn.loadProcedurePromisified(hdbext, null, 'PO_UPDATE_ATTACH');
                var sResponseAttachOnly = await dbConn.callProcedurePromisified(loadProcedureAttachOnly,
                    [STATUS, INSTANCE_UID, FILE_ID]);                 
                req.reply(sResponseAttachOnly.outputScalar); 
            }else if(ACTION === "UPDATEITEM"){
                var DOC_ITEM = DOC_LINEITEMS[0];  
                var costcenter=DOC_ITEM.COST_CENTER;
                var glaccount=DOC_ITEM.GL_ACCOUNT;   
                var description = DOC_ITEM.DESCRIPTION;
                var netAmount = DOC_ITEM.NETAMOUNT;
                var quantity = DOC_ITEM.QUANTITY;
                var unitOfMeasure = DOC_ITEM.UNITOFMEASURE;
                var unitPrice = DOC_ITEM.UNITPRICE;
                var HEADERID = DOC_ITEM.HEADERID;    
                var ITEMID = DOC_ITEM.ITEMID;
               
                const loadProcedureItemsOnly= await dbConn.loadProcedurePromisified(hdbext, null, 'PO_UPDATE_ITEM');
                var sResponseItemsOnly = await dbConn.callProcedurePromisified(loadProcedureItemsOnly,
                        [description, netAmount, quantity, unitOfMeasure, unitPrice, HEADERID, ITEMID,glaccount,costcenter]);                 
                req.reply(sResponseItemsOnly.outputScalar);          
            }    
        }catch(error){
            req.error({code:500,message:error.message??error})    
        }
    });

    // this.on('APITrigger',async (req)=>{
    //     const lv_JWToken = await this._fetchJwtToken();
    //     try {
    //         let ConDMS = await cds.connect.to('BTP_DMS_Dest');
    //         var JToken = 'Bearer ' + lv_JWToken;
    //         const Resp = await ConDMS.send('POST', '/rest/v2/repositories', body, { 'Authorization': JToken,
    //     'Content-Type':"application/json" });
    //         var dlist = Resp;
    //         var output = [];
    //         output.push(dlist);
    //         return output;
    //     } catch (error) {
    //         // error.message = error.reason.response.body.message;
    //         // var err = error.reason.response.body.message;
    //         error.reason.response.body.code=200;
    //         var err=error.reason.response.body
    //         return err;
    //     }
    // })

    this.on('DocInfoExtTrigger', async (req) => {     
        try {
            var oContent={
                invocationContext:"${invocation_context}",
                input:{}
            }
            
            let destToken = await cds.connect.to('BPA_TOKEN');
            var params = "?grant_type=client_credentials";
            var path = encodeURI(params);
            const TokenWF = await destToken.send('POST', path);
            var lv_JWToken = TokenWF.access_token;
            let destAPI = await cds.connect.to('BPA_DEST');
            var JToken = 'Bearer ' + lv_JWToken;   
            const URL = await destAPI.send('POST', '/public/irpa/runtime/v1/apiTriggers/59316e5b-59da-4110-b803-f34d861af9ef/runs', oContent, { "Content-Type": "application/json", 'Authorization': JToken,'irpa-api-key':'_JovcgRc--vXQYoCH5NoH4z3yVJBzVvO'});
            req.reply("Processed");            
        } catch (error) {
          req.error({code:500,message:error.message??error})
        }
    });

})