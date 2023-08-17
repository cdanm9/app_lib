// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
// const lib = require('./LIB/EMPLOYEE_LIB')

module.exports = cds.service.impl(function () {
  this.on('PostUserMaster', async (req) => {
    try {
      // local variables
      var oReqData = req.data.input
      var aUserData = req.data.input.USERMASTER
      var aUserDataUserData = req.data.input.ENTITYDATA

      // get connection
      var client = await dbClass.createConnectionFromEnv()
      let dbConn = new dbClass(client)

      // load procedure
      const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'MASTER_IVEN_USERS')
      console.log(oReqData)

      // excute procedure
      const result = await dbConn.callProcedurePromisified(loadProc,
      [oReqData.ACTION, oReqData.SR_NO, aUserData, aUserDataUserData]);

      return "result"
      s
    } catch (error) {
      console.error(error)
      return error
    }
  })

})