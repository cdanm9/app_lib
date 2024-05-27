// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
// const lib = require('./LIB/EMPLOYEE_LIB')
const lib_common = require('./LIB/iven_library')



module.exports = cds.service.impl(function () {

  // this.on("error",(err,req)=>{
  //   switch(err.message){
  //     case"UNIQUE_CONSTRAINT_VIOLATION":
  //       err.message="The entry already exists.";
  //       break;

  //     default:
  //       err.message=
  //         "An error occured. Please retry. Technical error message: "+
  //         err.message;
  //     break;
  //   }
  // });

  this.on('PostUserMaster', async (req) => {
    //Changes By Chandan M 21/11/23 Start
    // get connection
    var client = await dbClass.createConnectionFromEnv()
    let dbConn = new dbClass(client)
      //Changes By Chandan M 21/11/23 End   
    try {
      // local variables          

      var {action,userMaster,entityData,userDetails}=req.data
      var sUserId=userDetails.USER_ID || null;
      var sUserRole=userDetails.USER_ROLE || null;
      var bIsDuplicateUser = null;   
      var aRoleCode=userMaster[0].USER_ROLE.split(',');      
         
      if (action === "CREATE") {
        // Check Duplicate User
        bIsDuplicateUser = await _checkDuplicateUser(userMaster);
      }

      if (!bIsDuplicateUser || (action === "UPDATE" || action === "DELETE")) {
        

        // load procedure
        const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'MASTER_IVEN_USERS')
        // console.log(oReqData)
                                     
        // to fetch all descriptions                 
        var aRoles=await SELECT  .from('VENDOR_PORTAL_MASTER_USER_ROLE') .where({'CODE':{'IN':aRoleCode}}); 

        const sRolesDesc = aRoles.map(item => item.DESCRIPTION).join(', ').replace(/,([^,]*)$/, ' and$1');    

        // excute procedure
        const result = await dbConn.callProcedurePromisified(loadProc,
          [action, userMaster, entityData,sRolesDesc]);                           
                      
        return result;       
      }   
      else {
        return "This user already exist.";        
      }
        
    } catch (error) {
      var sType=error.code?"Procedure":"Node Js";    
      var iErrorCode=error.code??500; 
      let Result = {
          OUT_ERROR_CODE: iErrorCode,
          OUT_ERROR_MESSAGE:  error.message ? error.message : error
      }       
      lib_common.postErrorLog(Result,null,sUserId,sUserRole,"User Master",sType,dbConn,hdbext);
      console.error(error)        
      req.error({ code:iErrorCode, message:  error.message ? error.message : error });      
    }   
  })

  async function _checkDuplicateUser(data) {
    try {
      //Connection to database
      let connection = await cds.connect.to('db');//form connection to database
      queryResult = await connection.run(SELECT.from`${connection.entities['VENDOR_PORTAL.MASTER_IVEN_USERS']}`
        .where`EMAIL = ${data[0].EMAIL} AND ACTIVE = 'X'`);


      if (queryResult.length === 0) {
        return false;
      } else {
        return true;
      }
    }
    catch (error) {
      throw error;
    }
  }

})