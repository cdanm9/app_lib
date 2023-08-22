const cds = require("@sap/cds");

exports.getEntityDesc = async function (entityCode) {
  try{
    let connection = await cds.connect.to ('db');
    // console.log(connection.entities['EMPLOYEE']);
    let queryResult =  await connection.run(SELECT `BUTXT`.from `${connection.entities['VENDOR_PORTAL.MASTER_ENTITY_CODE']}`
      .where `BUKRS = ${entityCode}`);
   
    return queryResult[0].BUTXT;
  } 
   catch(error  ){  throw error; }
 };