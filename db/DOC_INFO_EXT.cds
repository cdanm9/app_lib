context DOC_INFO_EXT {
    entity ATTACHMENT {
        key FILE_ID         : UUID;
            PO_FILE_NO      : Integer64;
            FILE_CONTENT    : LargeBinary;
            FILE_MIME_TYPE  : String(2000);
            FILE_NAME       : String(1000);
            INSTANCE_UID    : UUID;
            INVOICE_NO      : String(16); //10-May-24:Supritha - Changed datatype from Integer to String(16) since invoice no can be alphanumeric
            INVOICE_DATE    : Date;
            STATUS          : String(100);
            UPLOADED_ON     : Timestamp;
            SAP_DOCUMENT_NO : String(100);
            DOC_TYPE        : String(100);
            AMOUNT          : Decimal;
            LOGIN_ID        : String(500);
            TO_HEADER       : Association to one DOC_HEADER
                                  on TO_HEADER.FILE_ID = FILE_ID;
    }

// //10-May-24:Supritha - Restructured DOC_HEADER & DOC_LINEITEMS table
    entity DOC_HEADER {
        key PO_FILE_NO          : Integer64;
            FILE_ID             : UUID;
            GROSSAMOUNT         : Decimal;
            CURRENCYCODE        : String(10);
            DOCUMENTDATE        : Date;
            DOCUMENTNUMBER      : String;
            PURCHASEORDERNUMBER : String;
            STATUS              : String;
            SAPNUMBER           : String;
            SAPNUMBERYEAR       : String;
            REQUESTEDDATE       : Date;
            TAXCODE             : String(20);
            TAXCODE_DESCRIPTION : String(50);
            VENDORCODE          : String(20);
            VENDORNAME          : String(50);
            TO_ATTACHMENT       : Association to one ATTACHMENT
                                      on TO_ATTACHMENT.FILE_ID = FILE_ID;
            TO_LINEITEM         : Association to many DOC_LINEITEMS
                                      on TO_LINEITEM.PO_FILE_NO = PO_FILE_NO;
    }

    entity DOC_LINEITEMS {
        key PO_FILE_NO          : Integer64;
        key ITEMID              : Integer;
            DESCRIPTION         : String(2000);
            NETAMOUNT           : Decimal;
            QUANTITY            : Decimal;
            UNITOFMEASURE       : String;
            UNITPRICE           : Decimal;
            GL_CODE             : String;
            GL_ACCOUNT          : String(200);
            COST_CENTERCODE     : String;
            COST_CENTER         : String(200);
            TAXCODE             : String(20);
            TAXCODE_DESCRIPTION : String(50);
    }


// entity DOC_HEADER{
//     // key HEADERID:Integer;
//      key PO_FILE_NO:Integer64;
//         FILE_ID:UUID;
//         GROSSAMOUNT:Decimal;
//         CURRENCYCODE:String;
//         DOCUMENTDATE:Date;
//         DOCUMENTNUMBER:String;
//         PURCHASEORDERNUMBER:String;
//         STATUS:String;
//     TO_ATTACHMENT: Association to one ATTACHMENT on TO_ATTACHMENT.FILE_ID=FILE_ID;
//         TO_LINEITEM: Association to many DOC_LINEITEMS on TO_LINEITEM.PO_FILE_NO=PO_FILE_NO;

// }

// entity DOC_LINEITEMS{
//     key PO_FILE_NO:Integer64;
//     key ITEMID:Integer;
//         DESCRIPTION:String(2000);
//         NETAMOUNT:Decimal;
//         QUANTITY:Decimal;
//         UNITOFMEASURE:String;
//         UNITPRICE:Decimal;
//         GL_ACCOUNT:String(200);
//         COST_CENTER:String(200);
// }


}
