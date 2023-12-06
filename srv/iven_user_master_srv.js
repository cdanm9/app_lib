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
      var oReqData = req.data.input;
      var oUserDetails=oReqData.USER_DETAILS;
      var sUserId=oUserDetails.USER_ID || null;
      var sUserRole=oUserDetails.USER_ROLE || null;
      var sAction = oReqData.ACTION
      var aUserData = oReqData.VALUE[0].USERMASTER
      var aEntityData = oReqData.VALUE[0].ENTITYDATA
      var bIsDuplicateUser = null

      if (sAction === "CREATE") {
        // Check Duplicate User
        bIsDuplicateUser = await _checkDuplicateUser(aUserData);
      }

      if (!bIsDuplicateUser || (sAction === "UPDATE" || sAction === "DELETE")) {
        

        // load procedure
        const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'MASTER_IVEN_USERS')
        console.log(oReqData)

        // excute procedure
        const result = await dbConn.callProcedurePromisified(loadProc,
          [sAction, aUserData, aEntityData]);

        return result;
      }   
      else {
        return "This user already exist.";        
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
      lib_common.postErrorLog(Result,null,sUserId,sUserRole,"User Master",sType,dbConn,hdbext);
      console.error(error)     
      // return error.messsage     
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