// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
const lib_common = require('./LIB/iven_library')

module.exports = cds.service.impl(function () {
  this.on('PostApprovalMatrix', async (req) => {
    //Changes By Chandan M 21/11/23 Start
    // get connection
    var client = await dbClass.createConnectionFromEnv();
    let dbConn = new dbClass(client);
    //Changes By Chandan M 21/11/23 End
    try {     
      // local variables
      var oReqData = req.data.input;
      var oUserDetails=oReqData.USER_DETAILS;
      var sUserId=oUserDetails.USER_ID || null;
      var sUserRole=oUserDetails.USER_ROLE || null;
      var sAction = oReqData.ACTION;
      var aMatrixData = req.data.input.VALUE;
      var sTableName,bCheckDuplicateMatrix,sEntityDescription;   

      //  // get connection
      //  var client = await dbClass.createConnectionFromEnv();
      //  let dbConn = new dbClass(client);
       let connection = await cds.connect.to('db');

       // getEntity Description against Entity Code from library
      sEntityDescription = await lib_common.getEntityDesc(connection, aMatrixData[0].ENTITY_CODE);

      //Check for App Type
      if(oReqData.APP_TYPE == 'REQUEST'){
        sTableName = 'VENDOR_PORTAL_MATRIX_REQUEST_APPR';
        bCheckDuplicateMatrix = await _checkDuplicateOnReqMatrix(aMatrixData);
        // _checkDuplicateOnReqMatrix(aMatrixData);

      }else if(oReqData.APP_TYPE == 'REGISTRATION'){
        sTableName = 'VENDOR_PORTAL_MATRIX_REGISTRATION_APPR';
        bCheckDuplicateMatrix =await  _checkDuplicateOnRegMatrix(aMatrixData);
      }


      if((bCheckDuplicateMatrix === 0 || bCheckDuplicateMatrix === 1 ) || (sAction === "UPDATE" || sAction === "DELETE") )    
      {
      // load procedure
      const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'MATRIX_APPROVAL_USERS')
      console.log(oReqData)

      // excute procedure
      const result = await dbConn.callProcedurePromisified(loadProc,
      [oReqData.APP_TYPE, oReqData.ACTION, aMatrixData,sTableName]);
      return result
      }
      else {
				if (bCheckDuplicateMatrix === "APPR_EXISTS_DIFF_EC") {
					throw {message : "This approver already exist for another entity."} ;
				} else if (bCheckDuplicateMatrix === "APPR_EXISTS_FOR_EC") {
					throw {message:"This matrix for entity " + sEntityDescription + " already exist."};
				}
       
			}
      // return "success";
      
    } catch (error) {
      var sType=error.code?"Procedure":"Node Js";    
      var iErrorCode=error.code??500;

      // let Result2 = {
      //   OUT_SUCCESS: error.message || ""
      // };
      let Result = {
          OUT_ERROR_CODE: iErrorCode,
          OUT_ERROR_MESSAGE:  error.message ? error.message : error
      }
      lib_common.postErrorLog(Result,null,sUserId,sUserRole,"Approval Matrix",sType,dbConn,hdbext);
      console.error(error)     
      // return error.messsage     
      req.error({ code:iErrorCode, message:  error.message ? error.message : error });


    }
  })

  async function _checkDuplicateOnReqMatrix(data) {
    try{
     //Connection to database
    //  let connection = await cds.connect.to('db');//form connection to database
    //  var aResultEntityCode = await SELECT .from `VENDOR_PORTAL.MATRIX_REQUEST_APPR`;
    //  connection.run(SELECT .from `${connection.entities['VENDOR_PORTAL.MATRIX_REQUEST_APPR']}`);
     

     var aResultEntityCode = await SELECT .from `VENDOR_PORTAL.MATRIX_REQUEST_APPR`  .where `ENTITY_CODE=${data[0].ENTITY_CODE}`;
    //  connection.run(SELECT .from `${connection.entities['VENDOR_PORTAL.MATRIX_REQUEST_APPR']}`
    //   .where `ENTITY_CODE = ${data[0].ENTITY_CODE}`);
      

      var aResultEmail = await SELECT .from `VENDOR_PORTAL.MATRIX_REQUEST_APPR`  .where `USER_ID=${data[0].USER_ID} AND ENTITY_CODE=${data[0].ENTITY_CODE}`;
      // connection.run(SELECT.from`${connection.entities['VENDOR_PORTAL.MATRIX_REQUEST_APPR']}`
      // .where`USER_ID = ${data[0].USER_ID} AND ENTITY_CODE = ${data[0].ENTITY_CODE} `);

  
    var aSameEntityCodes = [];
    var aDiffEntityCodes = [];
    for (var i = 0; i < aResultEmail.length; i++) {
      if (aResultEmail[i].ENTITY_CODE !== data[0].ENTITY_CODE) {
        aDiffEntityCodes.push(aResultEmail[i].ENTITY_CODE);
      } else {
          aSameEntityCodes.push(aResultEmail[i].ENTITY_CODE);
      }
    }
  
    if (aResultEntityCode.length < 2 && aDiffEntityCodes.length === 0) {
      // Only Max 2 records :  1 PM & 1 BYR
      return 1;
    } else if (aResultEntityCode.length === 2 ) {
        // Already 2 Approvers present for the specified Entity code
      return 'APPR_EXISTS_FOR_EC';
    } else if (aResultEmail.length > 0 && aDiffEntityCodes.length > 0) {
         // Already Approver exists with email id for different entity codes
      return 'APPR_EXISTS_DIFF_EC';
    } else if (aResultEmail.length === 0 && aResultEntityCode.length === 0) {
        // No combination exists in matrix
      return 0;
     }
    }
    catch(error  ){  throw error; }
  }

 // Checks duplicate for Reqistration Matrix
async function _checkDuplicateOnRegMatrix(data) {
  try{
	 //Connection to database
   let connection = await cds.connect.to('db');//form connection to database
   var sResult = await SELECT .from `VENDOR_PORTAL.MATRIX_REGISTRATION_APPR`  .where `ENTITY_CODE=${data[0].ENTITY_CODE} AND APPROVER_LEVEL=${data[0].APPROVER_LEVEL}`;
     
  //  var sResult = await connection.run(SELECT.from`${connection.entities['VENDOR_PORTAL.MATRIX_REGISTRATION_APPR']}`
  //   .where`ENTITY_CODE = ${data[0].ENTITY_CODE} AND APPROVER_LEVEL = ${data[0].APPROVER_LEVEL} `);

  var aResult = await SELECT .from `VENDOR_PORTAL.MATRIX_REGISTRATION_APPR`  .where `USER_ID=${data[0].USER_ID}`;
    
  //  var aResult = await connection.run(SELECT.from`${connection.entities['VENDOR_PORTAL.MATRIX_REGISTRATION_APPR']}`
  //    .where`USER_ID = ${data[0].USER_ID}  `);

 	if (sResult.length !== 0 && sResult.length < 3) {
		return "APPR_EXISTS_FOR_EC";
 	} else if (aResult.length !== 0) {
 		return "APPR_EXISTS_DIFF_EC";
        return 0;
	} else if (aResult.length === 0 && sResult.length === 0) {
		return 0;
   	}
  }
  catch(error  ){  throw error; }
}
  
})