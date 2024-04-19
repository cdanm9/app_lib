const cds = require("@sap/cds");
const crypto = require('crypto');

module.exports = {
	//s4 HANA odata service connection
	getCSRFTokenS4: async function (payload) {
		try {
			//   set connection to ZIVN_VENDOR_REG_SRV Destination
			var iVenVendorConnection = await cds.connect.to('ZIVN_VENDOR_REG_SRV');
			var response = await iVenVendorConnection.send({
				method: 'POST',
				path: '/GetCitySet',
				headers: { 'Content-Type': 'application/json' },
				data: payload
			})
			return response;
			// console.log(response);
		} catch (error) { throw error; }
	},
	// try{

	// var params = '/'
	// var sPath = encodeURI(params);

	// res = await erpConnection.send('GET', sPath, {},			
	//  {
	// 	"Content-Type":"application/json",
	// 	"x-csrf-token": "Fetch",
	// 	// " X-CSRF-Token":"fetch",
	// 	"Accept":"application/json"
	// 	// "sap-client":"009"  
	//  }
	//  )
	// console.log(res);
	// }
	// catch(error){
	// 	token = error.reason.response.headers["x-csrf-token"];
	// }
	// var data ={
	// 	"Lifnr": "6000000045",
	// 	"Land1": "IN",
	// 	"Name1": "TEST VENDOR 111",
	// 	"Name2": "",
	// 	"Ort01": "1100",
	// 	"Ort02": "",
	// 	"Pfach": "",
	// 	"Pstlz": "00000",
	// 	"Regio": "MH",
	// 	"Sortl": "TEST",
	// 	"Stras": "Rajpath",
	// 	"STR_SUPPL1": "",
	// 	"STR_SUPPL2": "",
	// 	"STR_SUPPL3": "",
	// 	"Anred": "Company",
	// 	"HouseNum": "12",
	// 	"Telephone1": "098765765",
	// 	"Telephone2": "",
	// 	"Mobile1": "",
	// 	"Mobile2": "",
	// 	"Fax1": "",
	// 	"Fax2": "",
	// 	"Email1": "t@gmail.com",
	// 	"Email2": "",
	// 	"Sperr": "",
	// 	"Sperm": "",
	// 	"Partner": "1234567890",
	// 	"Type": "CRM001",
	// 	"Idnumber": "200000232",
	// 	"BP_Type": "9002",
	// 	"VAT_RegNo": "",
	// 	"BankDetailsSet": [{
	// 		"Lifnr": "6000000045",
	// 		"BankID": "1001",
	// 		"Banks": "IN",
	// 		"IBAN": "IN163124651234567",
	// 		"Bankl": "IN000000000",
	// 		"Bankn": "9876567909",
	// 		"Bkont": "",
	// 		"Xezer": "",
	// 		"Bkref": "",
	// 		"Koinh": "Wasim",
	// 		"EbppAccname": ""
	// 	}],
	// 	"ContactPersonSet": [{
	// 		"Lifnr": "6000000045",
	// 		"PartnerID": "",
	// 		"Name1": "Test",
	// 		"Name2": "Vendor",
	// 		"Designation": "CEO",
	// 		"HouseNum1": "",
	// 		"Street": "",
	// 		"City1": "",
	// 		"Country": "IN",
	// 		"State": "",
	// 		"PoBox": "",
	// 		"PostalCode": "",
	// 		"TelephoneNumber": "987654567",
	// 		"Mobile": "876545678",
	// 		"EmailID": "te@gmail.com"
	// 	}, {
	// 		"Lifnr": "6000000045",
	// 		"PartnerID": "",
	// 		"Name1": "Wasim",
	// 		"Name2": "Khan",
	// 		"Designation": "CEO",
	// 		"HouseNum1": "",
	// 		"Street": "",
	// 		"City1": "",
	// 		"Country": "IN",
	// 		"State": "",
	// 		"PoBox": "",
	// 		"PostalCode": "",
	// 		"TelephoneNumber": "98765678",
	// 		"Mobile": "654567",
	// 		"EmailID": "aa@gmail.com"
	// 	}],
	// 	"Scenario": "C",
	// 	"CompanyDataSet": [{
	// 		"Lifnr": "6000000045",
	// 		"Bukrs": "1000"
	// 	}]
	// };
	// var params = '/GeneralDataSet'
	// var sPath = encodeURI(params);
	// res = await erpConnection.send('POST', sPath, data,			
	//  {
	// 	"Content-Type":"application/json",
	// 	"x-csrf-token":token
	//  })

	// const SapCfAxios = require('sap-cf-axios').default;
	// const csr = SapCfAxios("ZMDG_VENDOR_REG_SRV");
	// // const onpremiseDest = SapCfAxios('ERP', null, 'GET');
	// 	try {

	// 		const response = await csr({
	// 			method: "GET",
	// 			url: "/",
	// 			headers: {
	// 				"content-type": "application/json",
	// 				"x-csrf-token": "Fetch" 
	// 			},
	// 			 xsrfHeaderName: "x-csrf-token"
	// 		});

	// 		return response.headers;
	// 	} catch (error) {
	// 		console.log(error)
	// 	}

	/////////////////////////////////////////
	// 		const SapCfAxios = require('sap-cf-axios').default;
	// // const destinationName = "ZMDG_VENDOR_REG_SRV";
	// const destinationName ="ERP";
	// const destination = SapCfAxios(destinationName);
	// let response = await destination({
	// 	method: 'GET',
	// 	url: "/ZIVN_VENDOR_REG_SRV/GetCountrySet",
	// 	headers: {
	// 		"x-csrf-token": "Fetch"

	// 	}
	// });
	// console.log(response);



	// const tx = erpConnection.tx(req);
	// const response = await tx.send('GET', '/', null, {
	//                     "X-CSRF-Token": "fetch",
	// 					"sap-client":"009"
	//                 })
	// var params = '/$metadata';

	// var params = '/$metadata';

	//},
	// catchToken:async function(token){console.log(token)},
	getEntityDesc: async function (connection, entityCode) {
		try {
			var response = "";
			// let connection = await cds.connect.to('db');
			let queryResult = await connection.run(SELECT`BUTXT`.from`${connection.entities['VENDOR_PORTAL.MASTER_ENTITY_CODE']}`
				.where`BUKRS = ${entityCode}`);
			if (queryResult.length > 0)
				response = queryResult[0].BUTXT
			return response;
		}
		catch (error) { throw error; }
	},
	getApproverForEntity: async function (connection, sEntityCode, sUserRole, sTableName) {
		try {
			// let sApprover = null;
			let sTableFullName = 'VENDOR_PORTAL.' + sTableName;
			let aResult = await connection.run(
				SELECT
					.from`${connection.entities[sTableFullName]}`
					.where({ ENTITY_CODE: sEntityCode, USER_ROLE: sUserRole }));
			if (aResult.length > 0) return aResult;
			else return null;
			// sApprover = aResult[0].USER_ID;            

		}
		catch (error) { throw error; }

	},
	getHierarchyApproverForEntity: async function (connection, sEntityCode, sTableName,iLevel,sApprType) {
		try {          
			// let sApprover = null;            
			let sTableFullName = 'VENDOR_PORTAL.' + sTableName;
			let aResult = await connection.run(
				SELECT
					.from`${connection.entities[sTableFullName]}`
					.where({ ENTITY_CODE: sEntityCode,APPROVER_LEVEL: iLevel,APPR_TYPE:sApprType}));      
			if (aResult.length > 0) return aResult;            
			else return null;          
			// sApprover = aResult[0].USER_ID;           
		}              
		catch (error) { throw error; }

	},
	getMaxHierarchyApproverCount:async function (connection, iEntityCode,sApprType) {
        try {
            var iCount = 0;
            let aResult = await connection.run(
                SELECT`MAX(APPROVER_LEVEL) AS COUNT`
                    .from`${connection.entities['VENDOR_PORTAL.MASTER_APPROVAL_HIERARCHY_FE']}`   
                    .where({ ENTITY_CODE: iEntityCode,APPR_TYPE:sApprType }));

            if (aResult.length > 0) {
                iCount = aResult[0].COUNT;
            }
            return iCount;
        } catch (error) { throw error; }
    },
	// #TabName : Form Fields
	getTemplateColumns: async function (conn) {
		try {
			// var aResult = await SELECT .from `VENDOR_PORTAL.MASTER_REGFORM_FIELDS_MANDATORY`  .where `CCODE = 'TEMPLATE' AND TYPE = 1`;

			let aResult = await conn.run(
				SELECT
					.from`${conn.entities['VENDOR_PORTAL.MASTER_REGFORM_FIELDS_MANDATORY']}`
					.where`CCODE = 'TEMPLATE' AND TYPE = 1`
			);      
			return aResult;
		}
		catch (error) {
			throw error;
		}
	},
	generateSuccessMessage: function (aData) {
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
	},

	responseInfo: function (req, sType, sCode, sMessage, sStatus) {
		sStringifiedMessage = JSON.stringify(sMessage);
		if ((toString.call(JSON.parse(sStringifiedMessage)) === '[object Object]')
			&& (JSON.parse(sStringifiedMessage).message !== undefined || JSON.parse(sStringifiedMessage).messages !== undefined)) {

			sMessage = JSON.parse(sStringifiedMessage).message || JSON.parse(sStringifiedMessage).messages;
			sCode = JSON.parse(sStringifiedMessage).code
		}
		else {
			sMessage = sMessage
		}

		var oErrorObject = JSON.stringify({ code: sCode, message: sMessage })

		if (sType === 'error')
			req.error(oErrorObject);
		else if (sType === 'warn')
			req.warn(oErrorObject);
		else if (sType === 'info')
			req.info(oErrorObject);
		else if (sType === 'notify')
			req.notify(oErrorObject);
		else if (sType === 'reject')
			req.reject(oErrorObject);
	},

	isiVenSettingEnabled: async function (connection, sSettingCode) {
		try {
			var isEnabled = false;
			let aResult = await connection.run(
				SELECT`SETTING`
					.from`${connection.entities['VENDOR_PORTAL.MASTER_IVEN_SETTINGS']}`
					.where({ CODE: sSettingCode, SETTING: 'X' })
			);
			if (aResult.length > 0)
				isEnabled = true;

			return isEnabled;
		}
		catch (error) { throw error; }
	},
	getUpdatedFieldsDataForEdit: async function (iReqNo, aUpdatedFieldsIDs, connection) {
		try {

			var aUpdatedIdData = [];

			var aColumnsTemplate = await this.getTemplateColumns(connection);

			if (aUpdatedFieldsIDs.length > 0) {

				if (aColumnsTemplate.length > 0) {
					if (aColumnsTemplate.length !== 0) {
						var aColumnsTemplateObj = JSON.parse(JSON.stringify(aColumnsTemplate[0]));
						var aTemplateKeys = Object.keys(aColumnsTemplate[0]);

						for (var i = 0; i < aTemplateKeys.length; i++) {
							if (aTemplateKeys[i] === "CCODE" || aTemplateKeys[i] === "TYPE") {
								delete aColumnsTemplateObj[aTemplateKeys[i]];
							} else if (aUpdatedFieldsIDs.includes(aTemplateKeys[i])) {
								aColumnsTemplateObj[aTemplateKeys[i].toString()] = 'X';
							} else {
								aColumnsTemplateObj[aTemplateKeys[i].toString()] = null;
							}
						}

						aColumnsTemplateObj.REQ_NO = iReqNo;
						aUpdatedIdData.push(aColumnsTemplateObj);
					} else {
						throw "TEMPLATE Data missing Mandatory Fields Table";
					}
				}
			}

			return aUpdatedIdData;
		}
		catch (error) {
			throw error;
		}
	},
	errorLogPayload: async function (REQUEST_NO, SR_NO, ERROR_CODE, ERROR_DESCRPTION, CREATED_ON, USER_ID,USER_ROLE, APP_NAME, TYPE) {
		var aArray = [];
		var oObject = {
			"LOG_ID": await this.createLogID() || null,
			"REQUEST_NO": REQUEST_NO || null,
			"SR_NO": SR_NO || null,
			"ERROR_CODE": ERROR_CODE || null,
			"ERROR_DESCRPTION": ERROR_DESCRPTION || null,
			"CREATED_ON": CREATED_ON || null,
			"USER_ID": USER_ID || null,
			"USER_ROLE": USER_ROLE || null,  
			"APP_NAME": APP_NAME || null,
			"TYPE": TYPE || null   
		}
		aArray.push(oObject)
		return aArray;
	},

	postErrorLog: async function (Result, REQUEST_NO, USER_ID,USER_ROLE,APP_NAME, TYPE, dbConn, hdbext) {
		if (Result.OUT_ERROR_CODE !== null || Result.OUT_ERROR_MESSAGE !== null) {
			const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'ERROR_LOG')
           
			// var execProcedure = conn.loadProcedure("VENDOR_PORTAL", "VENDOR_PORTAL.Procedure::ERROR_LOG");
			var errorLogStructure = await this.errorLogPayload(REQUEST_NO, null, Result.OUT_ERROR_CODE, Result.OUT_ERROR_MESSAGE, null, USER_ID,USER_ROLE,APP_NAME, TYPE);
			// execProcedure(errorLogStructure);   
			sResponse = await dbConn.callProcedurePromisified(loadProc, errorLogStructure);
    
		}
	},
	createLogID: function () {   
		var oDate = new Date();
		var sMonth = '00' + String(oDate.getMonth() + 1);
		var sLogID = 'LOG' + oDate.getFullYear() + (sMonth).slice(-2) + ('00' + oDate.getDate()).slice(-2) + ('00' + oDate.getHours()).slice(-2) +
			('00' + oDate.getMinutes()).slice(-2) + ('00' + oDate.getSeconds()).slice(-2) + ('000' + oDate.getMilliseconds()).slice(-3);
		return sLogID;
	},
	getRegisteredId:async function(iReqNo,connection){
		try {
			// let connection = await cds.connect.to('db');
			let aResult = await connection.run(
				SELECT `REGISTERED_ID`
					.from`${connection.entities['VENDOR_PORTAL.REQUEST_INFO']}`
					.where({ REQUEST_NO: iReqNo }));
			if (aResult.length > 0) return aResult[0].REGISTERED_ID;
			else return null;       

		}
		catch (error) { throw error; }
	},
	getEncryptedSecurityPin:async function(sSecurityPin){
		try{
		const algorithm = 'aes-256-cbc'; //Using AES encryption
		const key = crypto.randomBytes(32);
		const iv = crypto.randomBytes(16);
		let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
		let encrypted = cipher.update(sSecurityPin);
		encrypted = Buffer.concat([encrypted, cipher.final()]);   
		return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };       
			}
		catch(error){throw error;}
		
	}


}