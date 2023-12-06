// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
const lib_ias = require('./LIB/iven_library_ias')
const lib_common = require('./LIB/iven_library')

module.exports = cds.service.impl(function () {
    this.on('FetchIASUser', async (req) => {
        
        try {
              var client = await dbClass.createConnectionFromEnv();
              var dbConn = new dbClass(client);
              await lib_ias.getIASUser();
            //   console.log('done');
       
        } catch (error) {
            
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }
            lib_common.postErrorLog(Result,null,null,null,"FetchIASUser Job",sType,dbConn,hdbext);
            console.error(error)     
            // return error.messsage            
            req.error({ code:iErrorCode, message:  error.message ? error.message : error });
        }
    })
    this.on('AutoDeleteErrorLog', async (req) => {
        
        try {
            var sResponse = null;
      var connection = await cds.connect.to('db');
              var client = await dbClass.createConnectionFromEnv();
              var dbConn = new dbClass(client);
              const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'AUTO_DELETE_ERROR_LOG')
              sResponse = await dbConn.callProcedurePromisified(loadProc,[]);
             console.log(sResponse)
            //   let errorLogLimit = await connection.run(
            //     SELECT`SETTING`
            //       .from`${connection.entities['VENDOR_PORTAL.MASTER_IVEN_SETTINGS']}`
            //       .where`CODE = 'JOB_ERRORLOG_LIMIT'`
            //   );
               
        //   let aResult = await connection.run(
        //         SELECT `LOG_ID` 
        //           .from`${connection.entities['VENDOR_PORTAL.IVEN_ERROR_LOG']}`
        //           .where ` DATE(CREATED_ON)= ADD_DAYS(CURRENT_DATE,-30)`
        //       );
        //     console.log(aResult);
        //     var aLOG_ID = []
        //     aResult.map(function(record){
        //             aLOG_ID.push(record.LOG_ID)
        //     })
        //     var sLog_id = aLOG_ID.toString();
        //     // var sWhereClause = "LOG_ID = (" + sLog_id +")";
        //     var sWhereClause = "LOG_ID = "+aLOG_ID[0];
        //  let aDeleteResult = await connection.run(
        //         DELETE  
        //           .from`${connection.entities['VENDOR_PORTAL.IVEN_ERROR_LOG']}`
        //           .where({LOG_ID:{'=':aLOG_ID[0]}})
        //         //   .where `LOG_ID = '${aLOG_ID[0]}'`
        //       );
        //       console.log(aDeleteResult);
        } catch (error) {
            
            var sType=error.code?"Procedure":"Node Js";    
            var iErrorCode=error.code??500;
            let Result = {
                OUT_ERROR_CODE: iErrorCode,
                OUT_ERROR_MESSAGE:  error.message ? error.message : error
            }
            lib_common.postErrorLog(Result,null,null,null,"AutoDeleteErrorLog Job",sType,dbConn,hdbext);
            // console.error(error)     
            // return error.messsage            
            req.error({ code:iErrorCode, message:  error.message ? error.message : error });
        }
    })
    
}
)