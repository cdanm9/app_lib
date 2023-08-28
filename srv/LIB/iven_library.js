const cds = require("@sap/cds");

module.exports = {

	getEntityDesc: async function (entityCode) {
		try {
			let connection = await cds.connect.to('db');
			let queryResult = await connection.run(SELECT`BUTXT`.from`${connection.entities['VENDOR_PORTAL.MASTER_ENTITY_CODE']}`
				.where`BUKRS = ${entityCode}`);

			return queryResult[0].BUTXT || "";
		}
		catch (error) { throw error; }
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
	}


}