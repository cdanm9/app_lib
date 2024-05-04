context BFPOC {
//Transaction Table
entity NONPO_HEADER{
    key REQUEST_NO:Integer;
    VENDOR_CODE:Integer;
    VENDOR_NAME: String(100);
    VENDOR_INV: String(20);   
    VENDOR_STATE: String(30);
    VENDOR_GST: String(18);
    VENDOR_INV_DATE:Date;
    EXPENSE_START_DATE:Date;
    EXPENSE_END_DATE:Date;
    VENDOR_INV_AMT:Double;
    COMPANY_STATE: String(30);
    COMPANY_GST: String(18);
    COMPANY_BP: String(4);
    CREDIT_TYPE: String(100);
    ORG_UNIT: String(30);       
    STATUS: String(10);
    LEVEL:Integer;
    SAP_DOCUMENT_NO: String(16);
    FISCAL_YEAR:Integer;
    NEXT_APPROVER_ID: String(20);
    REMARKS: String(200);
}

entity NONPO_ITEM{
    key REQUEST_NO:Integer;
    key INVOICE_ITEM:Integer;
    GL_CODE:String(10);
    RATE:Double;
    HSNCODE:String(10);
    GST:String(10);
    PROFIT_CENTER:String(10);
    SHIP_TO_LOCATION:String(50);
    COST_CENTER:String(10);
    COST_ALLOCATION:String(10);
    GL_DESCRIPTION:String(100);
}

entity USER_LOG_DETAIL{
key ID: Integer;
key REQUEST_NO: Integer;
APPROVER_CODE: String(20);
REMARKS:String(300);
ACTION_TIME:Timestamp;
}

//Master Tables
entity APPROVER_MATRIX{
    key APPROVER_CODE:String(15);
        APPROVER_NAME:String(50);
        APPROVER_EMAIL:String(50);
        LEVEL: Integer;
}

entity SPCMASTER{
    key ID:Integer;
        SHIP_TO_LOCATION:String(100);
        PROFIT_CENTRE:String(100);
        COST_CENTRE:String(100);   
}
}