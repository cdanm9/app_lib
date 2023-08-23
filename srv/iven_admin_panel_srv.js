// get libraries/modules
const cds = require('@sap/cds')
const lib = require('./LIB/iven_library_admin_panel')

module.exports = cds.service.impl(function () {
  // this.on('simpleFunc',async(req) =>{
  //   return req.data.input
  // })

  this.on('GetAdminPanelData', async (req) => {
    try {
      //trial 
      // var x = await lib.getMasterTablenamesData('Master');
      // var aAllMasterTables = await lib.getMasterTablenamesData(null);
      // var aRowCountsOfAllMasters =await lib.getRowCountsOfAllMasters( aAllMasterTables) || [];
      // var iTotalMastersFilled =await lib.getTotalMasterFilled(aRowCountsOfAllMasters, 'Master');
      // console.log(aRowCountsOfAllMasters);
      // local variables
      var oReqData = req.data.input
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
      }
     
    } catch (error) {
      console.error(error)
      // return error.messsage
      req.error({code:"500", message: error.message});
    }
  })


})