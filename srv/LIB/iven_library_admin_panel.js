const cds = require("@sap/cds");
module.exports = {

  // getArrayFromResult: async function (aResult) {
  //     var aDataObjects = Object.keys(aResult).map(function(key) {
  //       return aResult[key];
  //     });
    
  //     return aDataObjects;
  // },

  getDataFromTableName: async function (connection,sTableName) {
    try {
      //local Variables
      var responseObject = {}, TableInfo = null;

      // let connection = await cds.connect.to('db');
      let queryResult = await connection.run(SELECT.from`${connection.entities['VENDOR_PORTAL.' + sTableName]}`);

      TableInfo = await this.getMasterTableSchema(connection ,sTableName) || [];
      responseObject['sTableName'] = queryResult || [];
      responseObject['TableColumns'] = TableInfo;
      responseObject['TableColumnsCount'] = TableInfo.length;
      return responseObject;
    }
    catch (error) { throw error; }
  },

  getTableNameFromTableCode: async function (connection,sTableCode) {
    try {
      // let connection = await cds.connect.to('db');
      let queryResult = await connection.run(SELECT`TABLE_NAME`.from`${connection.entities['VENDOR_PORTAL.MASTER_TABLENAMES']}`
        .where`TABLE_CODE = ${sTableCode}`);
      return queryResult[0].TABLE_NAME;
    }
    catch (error) { throw error; }
  },

  // #TabName : Masters
  getMasterTableSchema: async function (connection,sTableName) {
    try {
      // let connection = await cds.connect.to('db');
      let queryResult = await connection.run(SELECT`COLUMN_NAME ,DATA_TYPE_NAME`.from`TABLE_COLUMNS`
        .where`TABLE_NAME = ${'VENDOR_PORTAL_' + sTableName}`);

      var aDataObjects = Object.keys(queryResult).map(function (key) {
        return queryResult[key].COLUMN_NAME;
      });
      return aDataObjects
    }
    catch (error) { throw error; }

  },

  getMasterTablenamesData: async function (connection,sTableType) {
    try {
      var aResult = null;
      var queryResult

      // let connection = await cds.connect.to('db');

      if (sTableType !== null) {
        queryResult = await connection.run(SELECT.from`${connection.entities['VENDOR_PORTAL.MASTER_TABLENAMES']}`
          .where`TABLE_TYPE = ${sTableType}`.orderBy`TABLE_DESCRIPTION`);
      }
      else {
        queryResult = await connection.run(SELECT.from`${connection.entities['VENDOR_PORTAL.MASTER_TABLENAMES']}`
          .orderBy`TABLE_DESCRIPTION`);
      }

      return queryResult;
    }
    catch (error) { throw error; }
  },

  getRowCountOfTables: async function (connection,sTableName) {
    try {
      // let connection = await cds.connect.to('db');
      let queryResult = await connection.run(SELECT`COUNT(*) as COUNT`
        .from`${connection.entities['VENDOR_PORTAL.' + sTableName]}`);

      var aDataObjects = Object.keys(queryResult).map(function (key) {
        return queryResult[key].COUNT;
      });

      return parseInt(aDataObjects[0], 10) || 0;
    }
    catch (error) { throw error; }
  },

  // This funtion gives row counts of all Master Tables maintained in MASTER_TABLENAMES
  getRowCountsOfAllMasters: async function (connection,aAllMasterTables) {
    try {
      var iCount = 0, aDataObjects = [], oDataObj = {}, that = this;
      if (aAllMasterTables.length > 0) {

        for (var i = 0; i < aAllMasterTables.length; i++) {
          oDataObj = {}
          iCount = await that.getRowCountOfTables(connection,aAllMasterTables[i].TABLE_NAME);
          oDataObj.TABLE_NAME = aAllMasterTables[i].TABLE_NAME;
          oDataObj.TABLE_DESCRIPTION = aAllMasterTables[i].TABLE_DESCRIPTION;
          oDataObj.COUNT = iCount;
          oDataObj.TABLE_TYPE = aAllMasterTables[i].TABLE_TYPE;
          aDataObjects.push(oDataObj);
        }
      }

      return aDataObjects;
    }
    catch (error) { throw error; }
  },

  getTotalMasterFilled: function (aRowCountsOfAllMasters, sTableType) {
    var iDatalength = 0;
    var iCount = 0;
    var iNotFilledCount = 0;

    if (aRowCountsOfAllMasters.length > 0) {
      Object.keys(aRowCountsOfAllMasters).map(function (key) {
        if (aRowCountsOfAllMasters[key].TABLE_TYPE === sTableType) {
          iDatalength += 1;
          if (aRowCountsOfAllMasters[key].COUNT !== 0) {
            iCount += 1;
          }
        }
      });
    }

    iNotFilledCount = iDatalength - iCount || 0;

    return { "TOTAL": iDatalength, "FILLED": iCount, "NOT_FILLED": iNotFilledCount };
  },

  getMasterCredentials: async function (connection) {
    try {
      // let connection = await cds.connect.to('db');
      let aResult = await connection.run(SELECT`USERNAME,PASSWORD,ADD_INFO1`
        .from`${connection.entities['VENDOR_PORTAL.MASTER_CREDENTIAL']}`);

      if (aResult[0] === undefined || aResult[0] === null) {
        aResult[0] = {
          "USERNAME": null,
          "PASSWORD": null,
          "ADD_INFO1": null
        };
      }

      return aResult[0] || null;
    }
    catch (error) { throw error; }
  },

  getMasterClientContactInfo: async function (connection) {
    try {
      // let connection = await cds.connect.to('db');
      let aResult = await connection.run(SELECT`EMAIL_NOTIF_1,CONTACT_ID_1,CLIENT_FULL_NAME,CLIENT_SHORT_NAME,CLIENT_COUNTRY`
        .from`${connection.entities['VENDOR_PORTAL.MASTER_EMAIL_CONTACT_ID']}`);

      if (aResult[0] === undefined || aResult[0] === null) {
        aResult[0] = {
          "EMAIL_NOTIF_1": null,
          "CONTACT_ID_1": null,
          "CLIENT_FULL_NAME": null,
          "CLIENT_SHORT_NAME": null,
          "CLIENT_COUNTRY": null
        };
      }

      return aResult[0] || null;
    }
    catch (error) { throw error; }
  },

  getMasterSapClient: async function (connection) {
    try {
      // let connection = await cds.connect.to('db');
      let aResult = await connection.run(SELECT`CLIENT,DESTINTAION`
        .from`${connection.entities['VENDOR_PORTAL.MASTER_SAP_CLIENT']}`);

      if (aResult[0] === undefined || aResult[0] === null) {
        aResult[0] = {
          "CLIENT": null,
          "DESTINTAION": null
        };
      }

      return aResult[0] || null;
    }
    catch (error) { throw error; }
  },
  getMasterSubaccounttInfo: async function (connection) {
    try {
      // let connection = await cds.connect.to('db');
      let aResult = await connection.run(SELECT`SUBACCOUNT,PORTAL_LINK`
        .from`${connection.entities['VENDOR_PORTAL.MASTER_SUBACCOUNT']}`);

      if (aResult[0] === undefined || aResult[0] === null) {
        aResult[0] = {
          "SUBACCOUNT": null,
          "PORTAL_LINK": null
        };
      }

      return aResult[0] || null;
    }
    catch (error) { throw error; }
  },


  // #TabName : Admin (Dashboard)
  getPercentOfConfig: async function (connection) {
    var aMasterCredentials = await this.getMasterCredentials(connection);
    var aMasterClientContactInfo = await this.getMasterClientContactInfo(connection);
    var aMasterSubaccounttInfo = await this.getMasterSubaccounttInfo(connection);
    var aMasterSapClientials = await this.getMasterSapClient(connection);

    var aConfigArr = [aMasterClientContactInfo, aMasterSubaccounttInfo, aMasterSapClientials];
    var dataArr = [];
    var aReturnArr = [];
    var oIterationObj = {};
    var iCountOfAllConfigfFields = 0;
    var iCountOfNullConfigfFields = 0;
    var iPercentOfConfigfFields = 0;
    for (var i = 0; i < aConfigArr.length; i++) {
      oIterationObj = aConfigArr[i];
      if (oIterationObj !== null && Object.keys(oIterationObj).length > 0) {
        for (let key in oIterationObj) {
          if (oIterationObj.hasOwnProperty(key)) {
            iCountOfAllConfigfFields += 1;
            if (oIterationObj[key] === null || oIterationObj[key] === "" || oIterationObj[key] === undefined) {
              iCountOfNullConfigfFields += 1;
            }
          }
        }
      }
    }

    iPercentOfConfigfFields = Math.round(((iCountOfAllConfigfFields - iCountOfNullConfigfFields) / iCountOfAllConfigfFields) * 100 || 0);

    aReturnArr.push(
      {
        "VALUE": "Complete",
        "COUNT": (iCountOfAllConfigfFields - iCountOfNullConfigfFields) || 0
      });

    if (iPercentOfConfigfFields !== 100) {
      aReturnArr.push(
        {
          "VALUE": "Pending",
          "COUNT": iCountOfNullConfigfFields || 0
        });
    }

    return {
      "ALL_CONFIG_FIELDS_COUNT": iCountOfAllConfigfFields,
      "COMPLETED_CONFIG_FIELDS_COUNT": iCountOfAllConfigfFields - iCountOfNullConfigfFields,
      "NULL_CONFIG_FIELDS_COUNT": iCountOfNullConfigfFields,
      "PERCENT_OF_FILEDS_COMPLETE": iPercentOfConfigfFields,
      "SUCCESS_STATE": iPercentOfConfigfFields === 100 ? 'Success' : 'Warning',
      "CHART_ARRAY": aReturnArr
    };
  },

  getDashboardData: async function (connection) {
    var aAllMasterTables = await this.getMasterTablenamesData(connection,null);
    var aRowCountsOfAllMasters = await this.getRowCountsOfAllMasters(connection,aAllMasterTables) || [];
    var iTotalMastersFilled = await this.getTotalMasterFilled(aRowCountsOfAllMasters, 'Master');
    var iTotalConfigFilled = await this.getTotalMasterFilled(aRowCountsOfAllMasters, 'Config');

    var oDataObj = {
      "ALL_MASTER_TABLES_COUNT": aAllMasterTables.length || 0,
      "TOTAL_NO_OF_MASTERS": iTotalMastersFilled || 0,
      "TOTAL_NO_OF_CONFIGS": iTotalConfigFilled || 0,
      "ALL_MASTERS_ROW_COUNT": aRowCountsOfAllMasters,
      "ALL_CONGIG_FIELD_PERCENT": await this.getPercentOfConfig(connection)

    };

    return oDataObj;
  },

  // #TabName : Form Fields
  getTemplateColumns: async function (conn) {
    try {
      // var aResult = await SELECT .from `VENDOR_PORTAL.MASTER_REGFORM_FIELDS_MANDATORY`  .where `CCODE = 'TEMPLATE' AND TYPE = 1`;
      
      let aResult = await conn.run(
          SELECT
          .from `${conn.entities['VENDOR_PORTAL.MASTER_REGFORM_FIELDS_MANDATORY']}`
          .where `CCODE = 'TEMPLATE' AND TYPE = 1`
        );
        return aResult;
    }
    catch (error) { 
      throw error; }
  },

  getFieldsDescData: async function (conn) {
    try {
      let aResult = await conn.run(
        SELECT
          .from`${conn.entities['VENDOR_PORTAL.MASTER_REGFORM_FIELDS_ID_DESC']}`
      );
  
      // var aDataObjects = this.getArrayFromResult(aResult)
      return aResult;
    }
    catch (error) { throw error; }
  },
   getFieldsDesc:function(sFieldId, aArrayData) {
    // var index = myArray.findIndex(item => item.id === 2);
    var index = aArrayData.findIndex(function(items) {
        return items.FIELDS === sFieldId;
    });
    if (aArrayData[index] !== undefined) {
        return aArrayData[index];
    } else {
        return {};
    }
},

  getVisibleFieldsData: async function (connection ,iEntityCode, iType) {
    try {
      // let connection = await cds.connect.to('db');
      let aResult = await connection.run(
        SELECT
          .from`${connection.entities['VENDOR_PORTAL.MASTER_REGFORM_FIELDS_VISIBLE']}`
          .where`CCODE = ${iEntityCode} AND TYPE = ${iType}`
      );
  
      // var aDataObjects = this.getArrayFromResult(aResult)
      return aResult;
    }
    catch (error) { throw error; }
  },

  getMandatoryFieldsData: async function (connection ,iEntityCode, iType) {
    try {
      // let connection = await cds.connect.to('db');
      let aResult = await connection.run(
        SELECT
          .from`${connection.entities['VENDOR_PORTAL.MASTER_REGFORM_FIELDS_MANDATORY']}`
          .where`CCODE = ${iEntityCode} AND TYPE = ${iType}`
      );
  
      // var aDataObjects = this.getArrayFromResult(aResult)
      return aResult;
    }
    catch (error) { throw error; }
  },
   getCountryDesc:async function(connection, countryCode) {
    try {
      var sDesc = "";
      // let connection = await cds.connect.to('db');
      let aResult = await connection.run(
        SELECT `LANDX as DESC`
          .from`${connection.entities['VENDOR_PORTAL.MASTER_COUNTRY']}`
          .where`LAND1 = ${countryCode}`
      );
    // var sQuery =
    //   'SELECT "LANDX" AS DESC FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::MASTER_COUNTRY" 
    //   WHERE LAND1 = ?';
    // var aResult = conn.executeQuery(sQuery, countryCode);
  
    if (aResult.length > 0) {
      sDesc = aResult[0].DESC;
    }
    return sDesc;
  }
  catch (error) { throw error; }
  },
   getClientInfoWithDesc:async function( connection,aClientInfoArr) {
    var aClientInfoWithDesc = [];
    if (aClientInfoArr.length > 0) {
      var dataObj = {};
      for(var i=0;i<aClientInfoArr.length;i++)
      {
        dataObj = JSON.parse(JSON.stringify(aClientInfoArr[i]));
            if (dataObj.CLIENT_COUNTRY !== "" || dataObj.CLIENT_COUNTRY !== null) {
          dataObj.CLIENT_COUNTRY_DESC = await this.getCountryDesc( connection,dataObj.CLIENT_COUNTRY) || "";
        }
      aClientInfoWithDesc.push(dataObj);
      }
      // aClientInfoWithDesc = Object.keys(aClientInfoArr).map(function(key) {
      //   dataObj = JSON.parse(JSON.stringify(aClientInfoArr[key]));
  
      //   if (dataObj.CLIENT_COUNTRY !== "" || dataObj.CLIENT_COUNTRY !== null) {
      //     dataObj.CLIENT_COUNTRY_DESC = await getCountryDesc( dataObj.CLIENT_COUNTRY) || "";
      //   }
      //   return dataObj;
      // });
    }
  
    return aClientInfoWithDesc;
  },
   getTableData:async function( connection,sTable) {
    try {
      // var aDataObjects = [];
      // let connection = await cds.connect.to('db');
      let aResult = await connection.run(
        SELECT 
          .from`${connection.entities['VENDOR_PORTAL.' + sTable]}`
      );
  
    return aResult;
  }
  catch (error) { throw error; }
  },
   getAttachmentsTableData:async function(connection,sTable) {
    try {
      // var aDataObjects = [];
      // let connection = await cds.connect.to('db');
      let aResult = await connection.run(
        SELECT `SR_NO,ENTITY_CODE,ATTACH_CODE,ATTACH_GROUP,ATTACH_DESC,FILE_NAME,FILE_TYPE,FILE_MIMETYPE,UPLOADED_ON,ATTACH_TYPE_CODE,ATTACH_TYPE_DESC`
          .from`${connection.entities['VENDOR_PORTAL.' + sTable]}`
      );
    // var aDataObjects = [];
    // var sQuery =
    //   'SELECT "SR_NO","ENTITY_CODE","ATTACH_CODE","ATTACH_GROUP","ATTACH_DESC","FILE_NAME","FILE_TYPE","FILE_MIMETYPE","UPLOADED_ON","ATTACH_TYPE_CODE","ATTACH_TYPE_DESC"';
    // sQuery += 'FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::' + sTable + '"';
    // var aResult = conn.executeQuery(sQuery);
    // if (aResult.length > 0) {
    //   aDataObjects = Object.keys(aResult).map(function(key) {
    //     return aResult[key];
    //   });
    // }
    return aResult;
  }
  catch (error) { throw error; }
  },
  
   getMasterFormsData:async function(connection) {
   var aTableResponse = await this.getTableData( connection,"MASTER_EMAIL_CONTACT_ID")
    var oMasterobj = {
      "Client_Info":await this.getClientInfoWithDesc(connection, aTableResponse),
      "Sap_Info": await this.getTableData(connection, "MASTER_SAP_CLIENT"),
      "SubAccount_Info": await this.getTableData( connection,"MASTER_SUBACCOUNT"),
      "MasterCredential_Info": await this.getTableData(connection, "MASTER_CREDENTIAL"),
      "IvenAttachments":await this.getAttachmentsTableData(connection, "MASTER_IVEN_ATTACHMENTS")
    };
    return oMasterobj;
  }


}
