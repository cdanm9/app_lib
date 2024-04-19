// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
const lib_admin_panel = require('./LIB/iven_library_admin_panel')
const lib_common = require('./LIB/iven_library')
const { response } = require('express')
const { Connection } = require('@sap/hana-client')

module.exports = cds.service.impl(function () {
    this.on('getPluginData', async (req) => {
         //get Connection
         var client = await dbClass.createConnectionFromEnv();
         let dbConn = new dbClass(client);
        try {
            //local Variables
            var { action, loginEmail, isRequests,isSettings,userId,userRole } = req.data;
            var responseObj ;

            //intialize connection to database
            let connection = await cds.connect.to('db');

            
            //Check if email notification is enabled
            // isEmailNotificationEnabled = await lib_email.isiVenSettingEnabled(connection, "VM_EMAIL_NOTIFICATION");

            // get connection
            // var client = await dbClass.createConnectionFromEnv();
            // let dbConn = new dbClass(client);
            if (action === 'PENDING_APPROVALS') {
		    
                responseObj = {};
                
                if(isRequests !== null) {
                    responseObj.Results =await getAllPendingApprovals(connection, loginEmail.toLowerCase()) || ""; 
                }
                
                if(isSettings !== null){
                    responseObj.Settings =await getObjectFromRows(await getiVenSettings(connection));
                    responseObj.SubAccountInfo = await lib_admin_panel.getTableData(connection, "MASTER_SUBACCOUNT") || [];
                }
                
                // statusCode = 200; 
                // responseInfo(JSON.stringify(responseObj), "application/json", statusCode); 
                req.reply(responseObj);
    
            } else {
                // responseInfo("Invalid Action", "text/plain", 400);
                throw "Invalid Action";
            }

        
        } catch (error) {
            
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }
            lib_common.postErrorLog(Result,null,userId,userRole,"Plugin",sType,dbConn,hdbext);
            console.error(error)     
            // return error.messsage            
            req.error({ code:iErrorCode, message:  error.message ? error.message : error });
        }
    })

   async function getAllPendingApprovals(connection, sLoginEmail) {
    try{
	
        // var sQuery = 'SELECT * FROM \"_SYS_BIC\".\"VENDOR_PORTAL.View/REGISTATION_REQUEST_DETAILS_V2\"';
        //     sQuery += 'WHERE STATUS_INV != ? AND STATUS_INV != ? AND STATUS_INV != ? AND STATUS_INV != ? AND  NEXT_APPROVER = ?'; 
        // var aResult = conn.executeQuery(sQuery, 3, 8, 10, 11, sLoginEmail); 
        var sNextApprover='';
        // let aResult = await connection.run(
        //     SELECT
        //         .from`${connection.entities['VENDOR_PORTAL.REQUEST_INFO']}`
        //         .where`STATUS NOT IN (3,8,10,11,14) AND NEXT_APPROVER = ${sLoginEmail}`);

        let aResult = await connection.run(
            SELECT
                .from`${connection.entities['VENDOR_PORTAL.REQUEST_INFO']}`
                .where`STATUS NOT IN (3,8,10,11,14) AND NEXT_APPROVER != ${sNextApprover}`);    
        
        // var aDataObjects = Object.keys(aResult).map(function(key) {
        //     return aResult[key];
        // });
           
        return aResult;
    } 
    catch (error) { throw error; }
    }
    async function getiVenSettings(connection){
        try{
        // var sQuery =
        //     'SELECT "CODE", "SETTING" FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::MASTER_IVEN_SETTINGS" ';
        // sQuery += 'WHERE "TYPE" = ?';
        // var aResult = conn.executeQuery(sQuery, "PORTAL"); 
        let aResult = await connection.run(
            SELECT `CODE,SETTING`
                .from`${connection.entities['VENDOR_PORTAL.MASTER_IVEN_SETTINGS']}`
                .where`TYPE='PORTAL'`);
        
    
        // var aDataObjects = Object.keys(aResult).map(function(key) {
        //     return aResult[key];
        // });
        return aResult;
        }
        catch (error) { throw error; }
    }
   async  function getObjectFromRows(aDataObjects){
    try{
        var oReturnObj = {},
        datalength = aDataObjects.length;
        
        if(datalength > 0){
            for (var i = 0; i < datalength; i++) {
                oReturnObj[aDataObjects[i].CODE.toString()] = aDataObjects[i].SETTING;
            }
        }
        
        return oReturnObj;
    }
        catch (error) { throw error; }
    }  
}
)