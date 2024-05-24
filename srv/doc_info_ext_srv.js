const cds=require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
const lib_dms = require('./DMS_LIB/BTP_DMS_LIB')

module.exports=cds.service.impl(function(srv){
    this.on('AttachmentPost',async (req)=>{
        try{
            var client=await dbClass.createConnectionFromEnv();
            var dbConn=new dbClass(client);
            const {ACTION,DOC_ATTACHMENT,DOC_HEADER}=req.data;
            DOC_ATTACHMENT[0].INSTANCE_UID="00000005-0000-0000-0000-000000000006";
            DOC_ATTACHMENT[0].LOGIN_ID=DOC_ATTACHMENT[0].LOGIN_ID??""    
            if(ACTION=='CREATE'){
                const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'PO_ATTACHMENT_STORE');
                var sResponse = await dbConn.callProcedurePromisified(loadProc,
                  [  DOC_ATTACHMENT,DOC_HEADER]);                    
                 
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
            let connection = await cds.connect.to('db');
          
            if(ACTION=='UPDATE'){
                var sPOFileNo =await getPOFileNo(connection,DOC_HEADER[0].FILE_ID);
            DOC_HEADER[0].PO_FILE_NO = sPOFileNo[1];
            let isExists = sPOFileNo[0];
                var DOC_ITEM = DOC_LINEITEMS;             
                // var Status = DOC_HEADER.STATUS;
                // var po_File_No = DOC_HEADER[0].PO_FILE_NO
                // var FILE_ID = DOC_HEADER[0].FILE_ID;
                //   var gross_value = DOC_HEADER[0].GROSSAMOUNT;
                //   var currencyCode = DOC_HEADER[0].CURRENCYCODE;
                //  var documentDate = DOC_HEADER[0].DOCUMENTDATE;
                //  var documentNumber = DOC_HEADER[0].DOCUMENTNUMBER;
                // var purchaseOrderNumber = DOC_HEADER[0].PURCHASEORDERNUMBER;
                // var status = DOC_HEADER[0].STATUS;
                // var sapNumber = DOC_HEADER[0].SAPNUMBER ;
                // var sapNumberyear = DOC_HEADER[0].SAPNUMBERYEAR     ;
                // var requestDate = DOC_HEADER[0].REQUESTEDDATE    ;
                // var taxCode = DOC_HEADER[0].TAXCODE           ;
                // var taxCodeDesc = DOC_HEADER[0].TAXCODE_DESCRIPTION ;
                // var vendorCode = DOC_HEADER[0].VENDORCODE        ;
                // var vendorName = DOC_HEADER[0].VENDORNAME        ;
                
                const loadProcedureHeader= await dbConn.loadProcedurePromisified(hdbext, null, 'PO_UPDATE_HEADER');
                var sResponseHeader = await dbConn.callProcedurePromisified(loadProcedureHeader,["UPDATE",DOC_HEADER]
                    // [ po_File_No,FILE_ID, gross_value,currencyCode , documentDate,documentNumber,purchaseOrderNumber, status ,sapNumber , sapNumberyear, requestDate,taxCode,taxCodeDesc,vendorCode, vendorName ,isExists]
                    // [Status, FILE_ID, documentDate, purchaseOrderNumber, documentNumber, currencyCode, gross_value]
                    ); 

            
                for (var l = 0; l < DOC_ITEM.length; l++) {
                    var poFileNo = DOC_ITEM[l].PO_FILE_NO;
                    var ITEMID = DOC_ITEM[l].ITEMID;
                    var description = DOC_ITEM[l].DESCRIPTION;
                    var netAmount = DOC_ITEM[l].NETAMOUNT;
                    var quantity = DOC_ITEM[l].QUANTITY;
                    var unitOfMeasure = DOC_ITEM[l].UNITOFMEASURE;
                    var unitPrice = DOC_ITEM[l].UNITPRICE;
                    var glCode = DOC_ITEM[l].GL_CODE;
                    var glaccount=DOC_ITEM[l].GL_ACCOUNT; 
                    var costcenterCode = DOC_ITEM[l].COST_CENTERCODE;
                    var costcenter=DOC_ITEM[l].COST_CENTER;
                    var taxCode = DOC_ITEM[l].TAXCODE;
                    var taxCodeDesc=DOC_ITEM[l].TAXCODE_DESCRIPTION;
                  
                  
                 
                    // var HEADERID = DOC_ITEM[l].HEADERID;
                 
                    
                    const loadProcedureItems= await dbConn.loadProcedurePromisified(hdbext, null, 'PO_UPDATE_ITEM');
                    var sResponseItems = await dbConn.callProcedurePromisified(loadProcedureItems,
                  [poFileNo,ITEMID, description , netAmount,quantity,unitOfMeasure,unitPrice,glCode, glaccount,costcenterCode ,costcenter, taxCode,taxCodeDesc]); 

                }
                
                        
                var STATUS = DOC_HEADER[0].STATUS;
                var FILE_ID = DOC_HEADER[0].FILE_ID;
                var INSTANCE_UID = DOC_HEADER[0].FILE_ID;    

                const loadProcedureAttach = await dbConn.loadProcedurePromisified(hdbext, null, 'PO_UPDATE_ATTACH');
                var sResponseAttach = await dbConn.callProcedurePromisified(loadProcedureAttach,
                    [STATUS, INSTANCE_UID, FILE_ID]);                 
                req.reply(sResponseItems.outputScalar);            
            }
            else if(ACTION === "HEADERUPDATE"){
             var sPOFileNo =await getPOFileNo(connection,DOC_HEADER[0].FILE_ID);
            DOC_HEADER[0].PO_FILE_NO = sPOFileNo[1];
            let isExists = sPOFileNo[0];
                const loadProcedureHeaderOnly= await dbConn.loadProcedurePromisified(hdbext, null, 'PO_UPDATE_HEADER');
                var sResponseHeaderOnly = await dbConn.callProcedurePromisified(loadProcedureHeaderOnly,["HEADERUPDATE",DOC_HEADER]
                    // [Status, FILE_ID, documentDate, purchaseOrderNumber, documentNumber, currencyCode, gross_value]
                    ); 
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
                // var costcenter=DOC_ITEM.COST_CENTER;
                // var glaccount=DOC_ITEM.GL_ACCOUNT;   
                // var description = DOC_ITEM.DESCRIPTION;
                // var netAmount = DOC_ITEM.NETAMOUNT;
                // var quantity = DOC_ITEM.QUANTITY;
                // var unitOfMeasure = DOC_ITEM.UNITOFMEASURE;
                // var unitPrice = DOC_ITEM.UNITPRICE;
                // var HEADERID = DOC_ITEM.HEADERID;    
                // var ITEMID = DOC_ITEM.ITEMID;


                var poFileNo = DOC_ITEM.PO_FILE_NO;
                var ITEMID = DOC_ITEM.ITEMID;
                var description = DOC_ITEM.DESCRIPTION;
                var netAmount = DOC_ITEM.NETAMOUNT;
                var quantity = DOC_ITEM.QUANTITY;
                var unitOfMeasure = DOC_ITEM.UNITOFMEASURE;
                var unitPrice = DOC_ITEM.UNITPRICE;
                var glCode = DOC_ITEM.GL_CODE;
                var glaccount=DOC_ITEM.GL_ACCOUNT; 
                var costcenterCode = DOC_ITEM.COST_CENTERCODE;
                var costcenter=DOC_ITEM.COST_CENTER;
                // var taxCode = DOC_ITEM.TAXCODE;
                // var taxCodeDesc=DOC_ITEM.TAXCODE_DESCRIPTION;
               
                const loadProcedureItemsOnly= await dbConn.loadProcedurePromisified(hdbext, null, 'PO_UPDATE_ITEM');
                var sResponseItemsOnly = await dbConn.callProcedurePromisified(loadProcedureItemsOnly,
                        // [description, netAmount, quantity, unitOfMeasure, unitPrice, HEADERID, ITEMID,glaccount,costcenter]); 
                        [poFileNo,ITEMID, description , netAmount,quantity,unitOfMeasure,unitPrice,glCode, glaccount,costcenterCode ,costcenter,"",""]); 
                
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

   async function getPOFileNo(connection, sFileId) {
        try {
          
          // let connection = await cds.connect.to('db');
          let queryResult = await connection.run(
            SELECT`PO_FILE_NO`
            .from`${connection.entities['DOC_INFO_EXT.ATTACHMENT']}`
            .where`FILE_ID = ${sFileId}`);
            if(queryResult.length !== 0) 
                return [true, queryResult[0].PO_FILE_NO];
            else
                return [false,0];
        }
        catch (error) { throw error; }
      }

      //Temporary api to change Status
      this.on('tempChangeStatus', async (req) => {

        try {
          var { poFileNo, status } = req.data;
    
          var client = await dbClass.createConnectionFromEnv();
          var dbConn = new dbClass(client);
          // var {sapClient,destFileName} = req.data;
        //   var response = { "onPremiseSrv": null, "cloudSrv": null };
        let connection = await cds.connect.to('db');
          let sResults1 = await connection.run(UPDATE
            .entity(`${connection.entities['DOC_INFO_EXT.DOC_HEADER']}`)
            .set({STATUS : status})
            .where({ PO_FILE_NO: poFileNo }))
          req.reply('Updated successfully,affected row : '+sResults1);
        }
        catch (error) {
          req.error({ code: "500", message: error.message ? error.message : error });
          // throw error;
        }
      })
    
})