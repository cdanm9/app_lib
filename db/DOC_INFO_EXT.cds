context DOC_INFO_EXT{
    entity ATTACHMENT{  
        key FILE_ID:UUID;
            PO_FILE_NO:Integer64; 
            FILE_CONTENT:LargeBinary;
            FILE_MIME_TYPE:String(2000);     
            FILE_NAME:String(1000);
            INSTANCE_UID:UUID;
            INVOICE_NO:Integer64;
            INVOICE_DATE:Date;
            STATUS:String(100);    
            UPLOADED_ON:Timestamp; 
            SAP_DOCUMENT_NO:String(100); 
            DOC_TYPE:String(100);
            AMOUNT:Decimal;  
            LOGIN_ID:String(500); 
            TO_HEADER: Association to one DOC_HEADER on TO_HEADER.FILE_ID=FILE_ID;       
    }

    entity DOC_HEADER{
        key HEADERID:Integer;
            FILE_ID:UUID;
            GROSSAMOUNT:Decimal;     
            CURRENCYCODE:String;
            DOCUMENTDATE:Date;
            DOCUMENTNUMBER:String;
            PURCHASEORDERNUMBER:String;
            STATUS:String;
            TO_ATTACHMENT: Association to one ATTACHMENT on TO_ATTACHMENT.FILE_ID=FILE_ID;
            TO_LINEITEM: Association to many DOC_LINEITEMS on TO_LINEITEM.HEADERID=HEADERID;           
    }

    entity DOC_LINEITEMS{
        key HEADERID:Integer;
        key ITEMID:Integer;
            DESCRIPTION:String(2000);
            NETAMOUNT:Decimal;
            QUANTITY:Decimal;
            UNITOFMEASURE:String;
            UNITPRICE:Decimal;    
            GL_ACCOUNT:String(200);    
            COST_CENTER:String(200);      
    }

    
}