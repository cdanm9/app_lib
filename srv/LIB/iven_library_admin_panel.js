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
  getMasterTablenamesData:async function(sTableType){
    try{
    var aResult = null;
    var queryResult

    let connection = await cds.connect.to ('db');
  
    if(sTableType !== null){
      queryResult =  await connection.run(SELECT  .from `${connection.entities['VENDOR_PORTAL.MASTER_TABLENAMES']}`
      .where `TABLE_TYPE = ${sTableType}`  .orderBy `TABLE_DESCRIPTION` );
    }
    else
    {
      queryResult =  await connection.run(SELECT  .from `${connection.entities['VENDOR_PORTAL.MASTER_TABLENAMES']}`
      .orderBy `TABLE_DESCRIPTION`);
    }
  
    return queryResult;
  } 
  catch(error  ){  throw error; }
  },
  getRowCountOfTables: async function(sTableName){
    try{
    let connection = await cds.connect.to ('db');
    let queryResult = await  connection.run(SELECT `COUNT(*) as COUNT` 
            .from `${connection.entities['VENDOR_PORTAL.'+sTableName]}`);
   
	var aDataObjects = Object.keys(queryResult).map(function(key) {
		return queryResult[key].COUNT;
	});

	return parseInt(aDataObjects[0], 10) || 0;
} 
catch(error  ){  throw error; }
  },
  // This funtion gives row counts of all Master Tables maintained in MASTER_TABLENAMES
  getRowCountsOfAllMasters : async function (aAllMasterTables) {
    try{
  var iCount = 0, aDataObjects = [], oDataObj = {} , that = this ,oCount = {'COUNT':[]},increment =0;

  
  if(aAllMasterTables.length > 0){
  
     for(var i=0; i<aAllMasterTables.length ;i++){
      iCount =await   that.getRowCountOfTables( aAllMasterTables[i].TABLE_NAME);
      oCount.COUNT.push(iCount);
     }
    
      aDataObjects = Object.keys(aAllMasterTables).map(  function(key) {
          oDataObj = {};
          
        oDataObj.TABLE_NAME = aAllMasterTables[key].TABLE_NAME;
        oDataObj.TABLE_DESCRIPTION = aAllMasterTables[key].TABLE_DESCRIPTION;
        oDataObj.COUNT =  oCount.COUNT[increment];
        oDataObj.TABLE_TYPE = aAllMasterTables[key].TABLE_TYPE;
        increment++;
        return oDataObj;
    });
  }
 
return aDataObjects;
} 
catch(error  ){  throw error; }
},
 getTotalMasterFilled:function( aRowCountsOfAllMasters, sTableType) {
  var iDatalength = 0;
  var iCount = 0;
  var iNotFilledCount = 0;
  
  if(aRowCountsOfAllMasters.length > 0){
      Object.keys(aRowCountsOfAllMasters).map(function(key) {
          if(aRowCountsOfAllMasters[key].TABLE_TYPE === sTableType) {
              iDatalength += 1;
              if(aRowCountsOfAllMasters[key].COUNT !== 0){
                  iCount += 1;
              }
          }
    });
  }
  
  iNotFilledCount = iDatalength - iCount || 0;
   
return {"TOTAL" : iDatalength, "FILLED" : iCount, "NOT_FILLED" : iNotFilledCount};
},
 getMasterCredentials:async function() {
  try{
  let connection = await cds.connect.to ('db');
  let aResult = await  connection.run(SELECT `USERNAME,PASSWORD,ADD_INFO1` 
              .from `${connection.entities['VENDOR_PORTAL.MASTER_CREDENTIAL']}`);
	
	if(aResult[0] === undefined || aResult[0] === null) {
    aResult[0] = {
           "USERNAME" : null,
           "PASSWORD"  : null,
           "ADD_INFO1"  : null
       };
    }

	return aResult[0] || null; 
  }
  catch(error){throw error;}
},
 getMasterClientContactInfo:async function() {
  try{
    let connection = await cds.connect.to ('db');
    let aResult = await  connection.run(SELECT `EMAIL_NOTIF_1,CONTACT_ID_1,CLIENT_FULL_NAME,CLIENT_SHORT_NAME,CLIENT_COUNTRY` 
                .from `${connection.entities['VENDOR_PORTAL.MASTER_EMAIL_CONTACT_ID']}`);
	
	if(aResult[0] === undefined || aResult[0] === null) {
    aResult[0] = {
           "EMAIL_NOTIF_1" : null,
           "CONTACT_ID_1" : null,
           "CLIENT_FULL_NAME" : null,
           "CLIENT_SHORT_NAME" : null,
           "CLIENT_COUNTRY"  : null
       };
    }

	return aResult[0] || null; 
}
catch(error){throw error;}
},
 getMasterSubaccounttInfo:async function() {
  try{
    let connection = await cds.connect.to ('db');
    let aResult = await  connection.run(SELECT `SUBACCOUNT,PORTAL_LINK` 
                .from `${connection.entities['VENDOR_PORTAL.MASTER_SUBACCOUNT']}`);
	
	if(aResult[0] === undefined || aResult[0] === null) {
    aResult[0] = {
           "SUBACCOUNT" : null,
           "PORTAL_LINK"  : null
       };
    }

	return aResult[0] || null; 
}
catch(error){throw error;}
},
 getPercentOfConfig:async function() {
  var aMasterCredentials = await this.getMasterCredentials();
  var aMasterClientContactInfo =await this.getMasterClientContactInfo();
  var aMasterSubaccounttInfo =await this.getMasterSubaccounttInfo();
  
  var aConfigArr = [aMasterCredentials, aMasterClientContactInfo, aMasterSubaccounttInfo, aMasterCredentials];
  var dataArr = [];
  var aReturnArr = [];
  var oIterationObj = {};
  var iCountOfAllConfigfFields = 0;
  var iCountOfNullConfigfFields = 0;
  var iPercentOfConfigfFields = 0;
  for(var i = 0; i < aConfigArr.length; i++) {
      oIterationObj = aConfigArr[i];
      if(oIterationObj !== null && Object.keys(oIterationObj).length > 0) {
          for (let key in oIterationObj) {
             if (oIterationObj.hasOwnProperty(key)) {
                  iCountOfAllConfigfFields += 1;
                  if(oIterationObj[key] === null || oIterationObj[key] === "" || oIterationObj[key] === undefined){
                     iCountOfNullConfigfFields += 1; 
                  }
             }
          }
      }
  }
  
  iPercentOfConfigfFields = Math.round(( (iCountOfAllConfigfFields - iCountOfNullConfigfFields) / iCountOfAllConfigfFields) * 100 || 0);
  
  aReturnArr.push(
      {
          "VALUE" : "Complete",
          "COUNT": (iCountOfAllConfigfFields - iCountOfNullConfigfFields) || 0
      });
      
  if(iPercentOfConfigfFields !== 100) {
      aReturnArr.push(
          {
              "VALUE" : "Pending",
              "COUNT": iCountOfNullConfigfFields || 0
          });
  } 
  
  return {"ALL_CONFIG_FIELDS_COUNT" : iCountOfAllConfigfFields, 
  "COMPLETED_CONFIG_FIELDS_COUNT" :  iCountOfAllConfigfFields - iCountOfNullConfigfFields,
  "NULL_CONFIG_FIELDS_COUNT" : iCountOfNullConfigfFields, 
  "PERCENT_OF_FILEDS_COMPLETE" : iPercentOfConfigfFields,
  "SUCCESS_STATE" : iPercentOfConfigfFields === 100 ? 'Success' : 'Warning',
  "CHART_ARRAY" : aReturnArr}; 
},

 getDashboardData:async function() {
    var aAllMasterTables = await this.getMasterTablenamesData(null);
    var aRowCountsOfAllMasters =await this.getRowCountsOfAllMasters( aAllMasterTables) || [];
    var iTotalMastersFilled =await this.getTotalMasterFilled(aRowCountsOfAllMasters, 'Master');
    var iTotalConfigFilled = await this.getTotalMasterFilled(aRowCountsOfAllMasters, 'Config');

	var oDataObj = {
		"ALL_MASTER_TABLES_COUNT": aAllMasterTables.length || 0,
		"TOTAL_NO_OF_MASTERS": iTotalMastersFilled || 0,
		"TOTAL_NO_OF_CONFIGS": iTotalConfigFilled || 0,
		"ALL_MASTERS_ROW_COUNT": aRowCountsOfAllMasters,
		"ALL_CONGIG_FIELD_PERCENT": await this.getPercentOfConfig()
    
    	};

	return oDataObj;
}
}
