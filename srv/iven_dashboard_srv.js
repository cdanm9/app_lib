const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")

const lib_common = require('./LIB/iven_library')
const lib_email = require('./LIB/iven_library_email')
const lib_email_content = require('./LIB/iven_library_email_content')
   
module.exports = cds.service.impl(function (srv) {   
    var {RequestInfo,MasterFormFieldsVisible}=srv.entities;
    srv.after('READ', RequestInfo, async req => {
        try{    
            var client = await dbClass.createConnectionFromEnv();
            var dbConn = new dbClass(client);        
        }catch(error){          
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;   
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }       
 
            lib_common.postErrorLog(Result,null,userId,userRole,"Vendor Management Report",sType,dbConn,hdbext);   
              
            req.error({ code:iErrorCode, message:  error.message ? error.message : error }); 
        }
        
    })

    srv.after('READ', MasterFormFieldsVisible, async req => {
        try{    
            var client = await dbClass.createConnectionFromEnv();
            var dbConn = new dbClass(client);        
        }catch(error){          
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;   
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }       
 
            lib_common.postErrorLog(Result,null,userId,userRole,"Vendor Management Report",sType,dbConn,hdbext);   
              
            req.error({ code:iErrorCode, message:  error.message ? error.message : error });    
        }
        
    })
})