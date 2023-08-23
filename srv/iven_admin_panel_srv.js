// get libraries/modules
const cds = require('@sap/cds')
const lib = require('./LIB/iven_library_admin_panel')

module.exports = cds.service.impl(function () {
  this.on('GetAdminPanelData', async (req) => {
    try {
      // local variables
      var oReqData = req.data.input
      oReqData = JSON.parse(oReqData);
      var sAction = oReqData.ACTION
      var sTableCode = oReqData.TABLE_CODE
      var iRequestNo = oReqData.REQUEST_NO
      var sQueryResult = null, sTableName = null

      if(sAction === "MASTER_TABLES"){
        //Fetch Table Name from Input Table Code
        sTableName =await  lib.getTableNameFromTableCode(sTableCode)

        //Fetch Data based on Table Name
        sQueryResult =await lib.getDataFromTableName(sTableName)
        console.log(sQueryResult)
        return sQueryResult
      }
      else if(sAction === "DASHBOARD")
      {
         // Get dashboard data from admin panel library
        var oResponse = await lib.getDashboardData();
           return oResponse
      }
      else if (sAction === 'MASTER_FORMS') {

        // responseObj = {
        //   "Results": getMasterFormsData(conn),
        //   "ProgressBar" : ADMIN_LIBRARY.getPercentOfConfig(conn)
        // };
        // iVen_Content.responseInfo(JSON.stringify(responseObj), "application/json", 200);
  
      }
     
    } catch (error) {
      console.error(error)
      // return error.messsage
      req.error({code:"500", message: error.message});
    }
  })


})