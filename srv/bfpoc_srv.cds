using {BFPOC} from '../db/BFPOC';
service bfpocService {

    //ENTITY 

    entity NONPOHEADER   as projection on BFPOC.NONPO_HEADER;
    entity NONPOITEM     as projection on BFPOC.NONPO_ITEM;
    entity APPROVERMATRIX     as projection on BFPOC.APPROVER_MATRIX;     
    entity SPCMaster   as projection on BFPOC.SPCMASTER;     
    entity USERLOGDETAIL   as projection on BFPOC.USER_LOG_DETAIL;

    //TYPE

    type UserLog{
        LEVEL:Integer;
        REQUEST_NO: Integer64;
        APPROVER_CODE: String(20);
        REMARKS: String(300);
        ACTION_TIME: Timestamp;
	}

    //ACTION
    action VendorInvoicePost(actio returns many String;n:String,NONPO_HEADER:many NONPOHEADER,NONPO_ITEM: many NONPOITEM,USER_LOG_DETAIL: many USERLOGDETAIL)

    // action VendorInvoicePost(action:String,NONPO_HEADER:String,NONPO_ITEM: String,USER_LOG_DETAIL: String) returns many String;
    action InvoiceApproval(REQUEST_TYPE:String,HEADER:VendorInvoiceUserLogReport,ITEMS: many NONPOITEM,ON_CLOUD: UserLog) returns many String;   

    //VIEWS

    define view VendorInvoiceReport AS
    SELECT FROM 
     BFPOC.NONPO_HEADER AS H
    LEFT OUTER JOIN BFPOC.APPROVER_MATRIX AS M ON M.APPROVER_CODE= H.NEXT_APPROVER_ID
    
    {
        H.REQUEST_NO,
        H.VENDOR_CODE,
        H.VENDOR_NAME,
        H.VENDOR_INV,
        H.VENDOR_STATE,
        H.VENDOR_GST,
        H.VENDOR_INV_DATE,
        H.EXPENSE_START_DATE,
        H.EXPENSE_END_DATE,
        H.VENDOR_INV_AMT,
        H.COMPANY_STATE,
        H.COMPANY_GST,
        H.COMPANY_BP,
        H.CREDIT_TYPE,
        H.ORG_UNIT,
        H.STATUS,
        H.LEVEL,
        H.SAP_DOCUMENT_NO,
        H.FISCAL_YEAR,
        H.REMARKS,
        H.NEXT_APPROVER_ID,
        
        /*case
          when H.NEXT_APPROVER_ID = '' then ''
          end as NEXT_APPROVER_NAME,*/
        M.APPROVER_NAME,
        M.APPROVER_EMAIL,
        M.LEVEL AS APPROVER_LEVEL
    }
    
    ORDER BY H.REQUEST_NO;
    
    define view VendorInvoiceUserLogReport AS
    SELECT FROM 
    BFPOC.NONPO_HEADER AS H
    INNER JOIN BFPOC.USER_LOG_DETAIL AS L ON L.REQUEST_NO = H.REQUEST_NO 
    INNER JOIN BFPOC.APPROVER_MATRIX AS M ON M.APPROVER_CODE = L.APPROVER_CODE 
    
    {
        H.REQUEST_NO,
        H.VENDOR_CODE,
        H.VENDOR_NAME,
        H.VENDOR_INV,
        H.VENDOR_STATE,
        H.VENDOR_GST,
        H.VENDOR_INV_DATE,
        H.EXPENSE_START_DATE,
        H.EXPENSE_END_DATE,
        H.VENDOR_INV_AMT,
        H.COMPANY_STATE,
        H.COMPANY_GST,
        H.COMPANY_BP,
        H.CREDIT_TYPE,
        H.ORG_UNIT,
        H.STATUS,
        H.LEVEL,
        H.SAP_DOCUMENT_NO,
        H.FISCAL_YEAR,
        H.REMARKS,
        L.APPROVER_CODE,
        L.ID,
        L.REMARKS AS APPROVAL_REMARKS,
        L.ACTION_TIME,
        M.APPROVER_NAME,
        M.APPROVER_EMAIL,
        M.LEVEL AS APPROVER_LEVEL
    };
}
