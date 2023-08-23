const cds = require("@sap/cds");
module.exports = {
  getDataFromTableName:async function(sTableName){
    try{
      //local Variables
      var responseObject ={}, TableInfo = null;

      let connection = await cds.connect.to ('db');
      let queryResult =  await connection.run(SELECT .from `${connection.entities['VENDOR_PORTAL.'+sTableName]}`);

     TableInfo =await this.getMasterTableSchema(sTableName) || [];
      responseObject['sTableName'] = queryResult || [];
      responseObject['TableColumns'] =  TableInfo;
      responseObject['TableColumnsCount'] =  TableInfo.length;
      return responseObject;
    } 
     catch(error  ){  throw error; }
  },

  getTableNameFromTableCode:async function(sTableCode){
    try{
      let connection = await cds.connect.to ('db');
      let queryResult =  await connection.run(SELECT `TABLE_NAME` .from `${connection.entities['VENDOR_PORTAL.MASTER_TABLENAMES']}`
                 .where `TABLE_CODE = ${sTableCode}` );
     
      return queryResult[0].TABLE_NAME;
    } 
     catch(error  ){  throw error; }
  },
  getMasterTableSchema:async function(sTableName){
    try{
      let connection = await cds.connect.to ('db');
    let queryResult =  await connection.run(SELECT `COLUMN_NAME ,DATA_TYPE_NAME` .from `TABLE_COLUMNS`
    .where `TABLE_NAME = ${'VENDOR_PORTAL_'+sTableName}` );
  
    var aDataObjects = Object.keys(queryResult).map(function(key) {
      return queryResult[key].COLUMN_NAME;
    });
    return aDataObjects
  } 
  catch(error  ){  throw error; }
  
  },
  // getMasterTablenamesData:async function(sTableType){
  //   var aResult = null;
  //   var queryResult

  //   let connection = await cds.connect.to ('db');
  
  //   if(sTableType !== null){
  //     queryResult =  await connection.run(SELECT  .from `${connection.entities['VENDOR_PORTAL.MASTER_TABLENAMES']}`
  //     .where `TABLE_TYPE = ${sTableType}`  .orderBy `TABLE_DESCRIPTION` );
  //   }
  //   else
  //   {
  //     queryResult =  await connection.run(SELECT  .from `${connection.entities['VENDOR_PORTAL.MASTER_TABLENAMES']}`
  //     .orderBy `TABLE_DESCRIPTION`);
  //   }
  //   // var aDataObjects = Object.keys(queryResult).map(function(key) {
  //   //   return queryResult[key];
  //   // });
  
  //   return queryResult;
  // },
//   getRowCountOfTables:async function(sTableName){
//     let connection = await cds.connect.to ('db');
//     let queryResult =   connection.run(SELECT `COUNT(*) as COUNT` .from `${connection.entities['VENDOR_PORTAL.'+sTableName]}`);
   
//     // var sQuery =
// 		// 'SELECT COUNT(*) AS "COUNT" FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::' + sTableName + '"';
// 	// var aResult = conn.executeQuery(sQuery);

// 	var aDataObjects = Object.keys(queryResult).map(function(key) {
// 		return queryResult[key].COUNT;
// 	});
// // var aDataObjects =queryResult.length;
// 	return parseInt(aDataObjects[0], 10) || 0;
//   },
  // This funtion gives row counts of all Master Tables maintained in MASTER_TABLENAMES
//   getRowCountsOfAllMasters : async function (aAllMasterTables) {
//   var iCount = 0, aDataObjects = [], oDataObj = {} , that = this;
  
//   if(aAllMasterTables.length > 0){
//       aDataObjects = Object.keys(aAllMasterTables).map(  function(key) {
//           oDataObj = {};
//           iCount =   that.getRowCountOfTables( aAllMasterTables[key].TABLE_NAME);
//         oDataObj.TABLE_NAME = aAllMasterTables[key].TABLE_NAME;
//         oDataObj.TABLE_DESCRIPTION = aAllMasterTables[key].TABLE_DESCRIPTION;
//         oDataObj.COUNT = iCount;
//         oDataObj.TABLE_TYPE = aAllMasterTables[key].TABLE_TYPE;
//         return oDataObj;
//     });
//   }
//   console.log(aDataObjects);
// return aDataObjects;
// },
//  getTotalMasterFilled:function( aRowCountsOfAllMasters, sTableType) {
//   var iDatalength = 0;
//   var iCount = 0;
//   var iNotFilledCount = 0;
  
//   if(aRowCountsOfAllMasters.length > 0){
//       Object.keys(aRowCountsOfAllMasters).map(function(key) {
//           if(aRowCountsOfAllMasters[key].TABLE_TYPE === sTableType) {
//               iDatalength += 1;
//               if(aRowCountsOfAllMasters[key].COUNT !== 0){
//                   iCount += 1;
//               }
//           }
//     });
//   }
  
//   iNotFilledCount = iDatalength - iCount || 0;
   
// return {"TOTAL" : iDatalength, "FILLED" : iCount, "NOT_FILLED" : iNotFilledCount};
// },
//    getDashboardData:function() {
    
//     var aAllMasterTables = this.getMasterTablenamesData(null);
//     var aRowCountsOfAllMasters = getRowCountsOfAllMasters( aAllMasterTables) || [];
//     var iTotalMastersFilled = getTotalMasterFilled(conn, aRowCountsOfAllMasters, 'Master');
//     var iTotalConfigFilled = getTotalMasterFilled(conn, aRowCountsOfAllMasters, 'Config');

// 	var oDataObj = {
// 		"ALL_MASTER_TABLES_COUNT": aAllMasterTables.length || 0,
// 		"TOTAL_NO_OF_MASTERS": iTotalMastersFilled || 0,
// 		"TOTAL_NO_OF_CONFIGS": iTotalConfigFilled || 0,
// 		"ALL_MASTERS_ROW_COUNT": aRowCountsOfAllMasters,
// 		"ALL_CONGIG_FIELD_PERCENT": getPercentOfConfig(conn)
    
//     	};

// 	return oDataObj;
// }
}
