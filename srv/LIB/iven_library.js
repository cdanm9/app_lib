const cds = require("@sap/cds");

module.exports = {
  getEntityDesc :async function (entityCode) {
  try{
    let connection = await cds.connect.to ('db');
    // console.log(connection.entities['EMPLOYEE']);
    let queryResult =  await connection.run(SELECT `BUTXT`.from `${connection.entities['VENDOR_PORTAL.MASTER_ENTITY_CODE']}`
      .where `BUKRS = ${entityCode}`);
   
    return queryResult[0].BUTXT;
  } 
   catch(error  ){  throw error; }
 },
  generateSuccessMessage:function(aData) {
	var successMsg = '';
	if (aData.length > 0) {
		for (var j = 0; j < aData.length; j++) {
			if (j === 0) {
				successMsg = aData[j];
			} else if (j === aData.length - 1) {
				successMsg = successMsg + " and " + aData[j];
			} else {
				successMsg = successMsg + " , " + aData[j];
			}
		}
	}
	if (successMsg === "") {
		successMsg = 'No Changes Has Been Detected';
	} else {
		successMsg = successMsg + " Has Been Updated";
	}
	return successMsg
}
}