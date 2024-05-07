// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")

module.exports = cds.service.impl(function (srv) {
    this.on('VendorInvoicePost',async (req)=>{
        try{      
            var client=await dbClass.createConnectionFromEnv();
            var dbConn=new dbClass(client);    
            const {action,NONPO_HEADER,NONPO_ITEM,USER_LOG_DETAIL}=req.data;
            const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'VENDOR_INVOICE');
            // var sResponse = await dbConn.callProcedurePromisified(loadProc,
            //     [JSON.parse(NONPO_HEADER),JSON.parse(NONPO_ITEM),JSON.parse(USER_LOG_DETAIL)]);  
                var sResponse = await dbConn.callProcedurePromisified(loadProc,
                    [NONPO_HEADER,NONPO_ITEM,USER_LOG_DETAIL]);             
            req.reply(sResponse.outputScalar); 
        }catch (error) {      
            req.error({code:500,message:"Vendor Invoice creation failed : "+(error.message??error)});      
        } 

    })

    this.on('InvoiceApproval',async (req)=>{
        try {
            var client=await dbClass.createConnectionFromEnv();
            var dbConn=new dbClass(client);
            const payload=req.data   
            const {REQUEST_TYPE,HEADER,ITEMS,ON_CLOUD}=req.data;
            if (REQUEST_TYPE == "Approve") {     
                var data = ON_CLOUD;
                var SAP_DOCUMENT_NO = "";  
                var STATUS="PENDING"        

                // For Final Approval by Level 3, Insert into On-Premise service.
                if (data.LEVEL === 3) {   
                    var responseArr = await submitOnPremise(payload,req);
                    // SAP_DOCUMENT_NO = responseArr[0].SapDocumentNo;           
                    SAP_DOCUMENT_NO = responseArr.d.SapDocumentNo;       
                    STATUS="APPROVED"           
                }

                const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'INVOICE_APPROVAL');
                var oResult =await dbConn.callProcedurePromisified(loadProc,
                    [data.LEVEL, data.REQUEST_NO, data.APPROVER_CODE, data.REMARKS, data.ACTION_TIME, SAP_DOCUMENT_NO,STATUS]); 
                oResult.outputScalar.success = true;
                req.reply(oResult.outputScalar)         
            }
        } catch(error) {
            req.error({code:500,message:error.message??error,success:false});           
        }
    })

    async function demoPayload() {
        // 			"VENDOR_INV_DATE": "2020-11-24T00:00:00.000Z",
        // 			"EXPENSE_START_DATE": "2020-11-25T00:00:00.000Z",
        // 			"EXPENSE_END_DATE": "2020-12-01T00:00:00.000Z",
        // 		VendorInvDate: oData.VENDOR_INV_DATE,
        // 		ExpensesDate: oData.EXPENSE_START_DATE,
        // 		ExpenseeDate: oData.EXPENSE_END_DATE,
        var data = {
            "REQUEST_TYPE": "Approve",
            "ON_CLOUD": {
                "LEVEL": 3,
                "REQUEST_NO": 1000000015,
                "APPROVER_CODE": "P1942962395",
                "REMARKS": "test remark",
                "ACTION_TIME": "2020-11-20T09:41:43.792Z"
            },
            "HEADER": {
                "REQUEST_NO": 1000000015,
                "VENDOR_CODE": 1827,
                "VENDOR_NAME": 'Prabhu Chemical Products',
                "VENDOR_INV": '445577',
                "VENDOR_STATE": 'Tamil Nadu',
                "VENDOR_GST": '33AAHFP6342F1ZE',
                "VENDOR_INV_AMT": '500',
                "COMPANY_STATE": 'Andra Pradesh',
                "COMPANY_GST": '37XXXXX0000X0X0',
                "COMPANY_BP": 'AP01',
                "CREDIT_TYPE": '50',
                "ORG_UNIT": 'HR',
                "STATUS": 'PENDING',
                "LEVEL": 3,
                "SAP_DOCUMENT_NO": '',
                "FISCAL_YEAR": 2020,
                "NEXT_APPROVER_ID": 'P1942872075',
                "APPROVER_CODE": 'P1942962395',
                "APPROVER_NAME": 'SWAROOP KUMAR',
                "APPROVER_EMAIL": 'swaroop.n@intellectbizware.com'
            },
            "ITEMS": [{
                "REQUEST_NO": 1000000015,
                "INVOICE_ITEM": 1,
                "GL_CODE": '24520600',
                "RATE": '200',
                "HSNCODE": '6555',
                "GST": '5445',
                "PROFIT_CENTER": '454',
                "SHIP_TO_LOCATION": 'pune',
                "COST_CENTER": '1044103',
                "COST_ALLOCATION": '40',
                "GL_DESCRIPTION": 'Kotak Mahindra Bank Ltd Main'
        }]
        };
    
        return data;
    }
    
    async function renamingHeaderFormatObj(oData) {
        var dataFormat = {
            "RequestNo": oData.REQUEST_NO.toString(),
            "VendorCode": oData.VENDOR_CODE.toString(),
            "VendorName": oData.VENDOR_NAME,
            "VendorInv": oData.VENDOR_INV,
            "VendorState": oData.VENDOR_STATE,
            "VendorGst": oData.VENDOR_GST,
            // "VendorInvAmt": oData.VENDOR_INV_AMT,
            "VendorInvAmt": oData.VENDOR_INV_AMT.toString(),   
            "CompanyState": oData.COMPANY_STATE,
            "CompanyGst": oData.COMPANY_GST,
            "CompanyBp": oData.COMPANY_BP,
            "CreditType": oData.CREDIT_TYPE,
            "OrgUnit": oData.ORG_UNIT,
            "Status": oData.STATUS,
            "Zlevel": oData.LEVEL.toString(),
            "SapDocumentNo": oData.SAP_DOCUMENT_NO,
            "FiscalYear": oData.FISCAL_YEAR.toString()
        };
    
        return dataFormat;
    }
    
    async function renamingItemsFormatArr(aData) {
        var dataFormat = [];
        var tempObj = {};
    
        for (var i = 0; i < aData.length; i++) {
            tempObj = {
                "RequestNo": aData[i].REQUEST_NO.toString(),
                "InvoiceItem": aData[i].INVOICE_ITEM.toString(),
                "GlCode": aData[i].GL_CODE,
                "GlDescription": aData[i].GL_DESCRIPTION,    
                // "Rate": aData[i].RATE,      
                "Rate": aData[i].RATE.toString(),      
                "Hsncode": aData[i].HSNCOD,
                "Gst": aData[i].GST,
                "ProfitCenter": aData[i].PROFIT_CENTER,
                "ShipTo": aData[i].SHIP_TO_LOCATION,
                "CostCenter": aData[i].COST_CENTER,
                "CostAllocation": aData[i].COST_ALLOCATION
            };
    
            dataFormat.push(tempObj);
        }
    
        return dataFormat;
    }
    
    // async function getServiceFormat(headerobj, itemsArr) {
    
    //     var itemsResultsArr = {
    //         "results": itemsArr
    //     };
    
    //     var data = headerobj;
    //     data.HEADERTOITEM = itemsResultsArr;
    
    //     var finalData = {
    //         "d": data
    //     };     
    
    //     return finalData;      
    // }

    async function getServiceFormat(headerobj, itemsArr) {
    
        // var itemsResultsArr = {
        //     "results": itemsArr
        // };
    
        var data = headerobj;
        data.HEADERTOITEM = itemsArr;
    
        // var finalData = {
        //     "d": data
        // };     
    
        return data;                     
    }
    
    async function submitOnPremise(payload,req) {   
        // DEMO DATA (Comment below line when testing done)
        try{   
            // var payload =await demoPayload();         
        
            var headerData =await renamingHeaderFormatObj(payload.HEADER);
            var itemsData = await renamingItemsFormatArr(payload.ITEMS);
            var data =await getServiceFormat(headerData, itemsData);
            var sFinal = JSON.stringify(data);
        
            var url = "/HEADERSet";     
            url = encodeURI(url);  
            var iBFPOCconnection = await cds.connect.to('ZIBS_BFPOC_SRV');   
			var sResponse = await iBFPOCconnection.send({
			  method: 'POST',
			  path: url,
			  data:sFinal,                          
			  headers: { 'Content-Type': 'application/json',        
						  "accept": "application/json",
						  "X-Requested-With": "XMLHttpRequest"}
			})
            return sResponse;       
        }catch(error){
            req.error({code:500,message:error.message??error});          
        }
    }
})