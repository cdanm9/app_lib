// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
// const lib = require('./LIB/EMPLOYEE_LIB')



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
    try {
      // local variables
      var oReqData = req.data.input
      var sAction = oReqData.ACTION
      var aUserData = oReqData.VALUE[0].USERMASTER
      var aEntityData = oReqData.VALUE[0].ENTITYDATA
      var bIsDuplicateUser = null

      if(sAction === "CREATE"){
      // Check Duplicate User
       bIsDuplicateUser = await _checkDuplicateUser(aUserData);
      }

      if (!bIsDuplicateUser  || (sAction === "UPDATE" || sAction === "DELETE") ) {
        // get connection
        var client = await dbClass.createConnectionFromEnv()
        let dbConn = new dbClass(client)

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
      console.error(error)
      // return error.messsage
      req.error({code:"500", message: error.message});
    }
  })

  async function _checkDuplicateUser(data) {
    try{
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
  catch(error  ){  throw error;
  }
  }

})