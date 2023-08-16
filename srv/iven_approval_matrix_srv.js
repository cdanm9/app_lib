const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
// const lib = require('./LIB/EMPLOYEE_LIB')
module.exports = cds.service.impl(function () {  
  this.on('approvalMatrixCRUD', async (req) => {
    try {
     
    var client = await dbClass.createConnectionFromEnv()
    let dbConn = new dbClass(client)
     
const loadProc = await dbConn.loadProcedurePromisified(hdbext,null, 'MATRIX_REQUEST_APPR')
console.log(req.data.input)
// console.log(req.data.input);
const result = await dbConn.callProcedurePromisified(loadProc, [req.data.input.APP_TYPE,req.data.input.ACTION,req.data.input.VALUE]);
     
      return "result"
  } catch (error) {
      console.error(error)
      return error
  }
  })

})