namespace VENDOR_PORTAL;

entity MASTER_COUNTRY{
    key LAND1 : String(3);
    key LANDX : String(15);
    key NATIO : String(25);    
}

entity MASTER_CREDENTIAL{
    key SR_NO : Integer;
    USERNAME : String(100);
    PASSWORD : String(100);
    TYPE : String(100);
    ADD_INFO1 : String(100);
    ADD_INFO2 : String(100);
    ADD_INFO3 : String(100);
    CREATED_ON : Timestamp;
}

entity MASTER_CURRENCY{

    key WAERS : String(5);
    LTEXT : String(40);

}

entity MASTER_EMAIL_CONTACT_ID{

    key SR_NO : Integer;
    EMAIL_NOTIF_1 : String(100);
    EMAIL_NOTIF_2 : String(100);
    EMAIL_NOTIF_3 : String(100);
    CONTACT_ID_1 : String(100);
    CONTACT_ID_2 : String(100);
    CONTACT_ID_3 : String(100);
    CLIENT_FULL_NAME : String(100);
    CLIENT_SHORT_NAME : String(100);
    CLIENT_COUNTRY : String(100);

}

// entity MASTER_ENTITY{

//     key CCODE : Integer64;
//     CNAME : String(100);
//     CCONTACTNO : String(10);

// }

entity MASTER_ENTITY_CODE{

    key BUKRS : String(4);
    BUTXT : String(50);
    ORT01 : String(25);
    WAERS : String(5);

}

entity MASTER_FORMFIELDS_ID_DESC{

    key FIELDS : String(15);
    DESCRIPTION : String(500);
    CATEGORY : String(50);
    SECTION : String(50);

}

entity MASTER_IAS_USER{

    key USER_ID : String(50);
    STATUS : String(50);
    LOGIN : String(50);
    key EMAIL : String(150);
    FIRST_NAME : String(250);
    LAST_NAME : String(250);
    COMPANY_CODE : String(100);
    EMP_NO : String(100);
    
}

entity MASTER_IBAN_COUNTRY{
    key LAND1: String(3);
    key LANDX : String(25);
    key LENGTH: Integer
}

entity MASTER_IVEN_SAP_VENDOR_NO{
     // REG_NO : Integer64; 
    SAP_VENDOR_CODE : String(10);
    key IVEN_VENDOR_CODE : Integer64;
    ACCOUNT_GROUP : String(50)
}

entity MASTER_IVEN_SETTINGS{
    key CODE : String(25);
    DESCRIPTION : String(100);
    SETTING : String(10);
    TYPE : String(10)
}

entity MASTER_IVEN_USERS{
    key SR_NO : Integer;
    USER_ID : String(50);
    USER_ROLE : String(50);
    USER_NAME : String(500);
    key EMAIL : String(150);
    COMPANY_CODE : String(500);
    EMP_NO : String(100);
    CREATED_ON : Timestamp;
    UPDATED_ON : Timestamp;
    ACTIVE : String(1)

}

entity MASTER_ONBOARDING_ATTACHMENTS{
    key OBR_NO : Integer64;
    key SR_NO : Integer;
    ATTACH_CODE : Integer;
    ATTACH_GROUP : String(30);
    ATTACH_DESC : String(100);
    ATTACH_VALUE : String(50);
    EXPIRY_DATE : Date;
    FILE_NAME : String(100);
    FILE_TYPE : String(100);
    FILE_MIMETYPE : String(100);
    FILE_CONTENT : LargeBinary;
    UPLOADED_ON : Timestamp;
    OT_DOC_ID : String(10);
    OT_LAST_DOC_ID : String(10);
    UPDATE_FLAG : String(1);
    DELETE_FLAG : String(1);
    ATTACH_SHORT_DEC : String(50);
    ATTACH_FOR :String(50)
}

entity MASTER_REGEX_POSTALCODE{
    key LAND1 : String(3);
    REGEX : String(250);
    REGEX_EXP : String(250);
    
}

entity MASTER_REGION{
    key LAND1 : String(3);
    key BLAND : String(3);
    key BEZEI : String(20);
    
}
entity MASTER_REQUEST_EVENTS{
    key CODE : Integer;
    DESCRIPTION : String(50);
    TYPE : String(25);
}

entity MASTER_REQUEST_TYPE{
    key CODE: Integer;
        DESCRIPTION: String(50);
        SUPPLIER_TYPE: String(50);
}
entity MASTER_SAP_CLIENT{
    key SR_NO: Integer ;
     CLIENT:Integer not null;
    DESTINTAION:String(25) not null;
}

entity MASTER_STATUS{
    key CODE: Integer;
        DESCRIPTION: String(50);
}

entity MASTER_SUBACCOUNT{
    key SR_NO: Integer;
     SUBACCOUNT:String(50) not null;
    PORTAL_LINK:String(100);
}

entity MASTER_TABLENAMES{
    key SR_NO: Integer;
     TABLE_CODE: String(25) not null;
     TABLE_NAME:String(50) not null;
    TABLE_TYPE:String(25) not null;
    COLUMN_COUNT:Integer not null;
    TABLE_DESCRIPTION:String(100);   
}

entity MASTER_TELECODE{
    key LAND1: String(3);
        TELEFTO: String(4);
}

entity MASTER_USER_ENTITY_CODES{
    key USER_ID: String(50);
    key USER_ROLE: String(50);
    key ENTITY_CODE:String(50);
        EMAIL:String(150);
        ENTITY_DESC:String(100);
}

entity MASTER_USER_ROLE{
    key CODE: String(25);
        DESCRIPTION: String(100);
}

entity MASTER_ATTACHMENT_TYPES {
  key CODE:Integer not null;
	 DESCRIPTION:String(100);
	 SHORT_DESCRIPTION:String(10);
	 TYPE:String(10);
	 GROUP1:String(10);
	 GROUP2:String(10); // Table group   
}
entity MASTER_IVEN_ATTACHMENTS{
    key SR_NO : Integer;
    key ENTITY_CODE : String(10);
    key ATTACH_CODE : Integer;
    ATTACH_GROUP:String(30);
    ATTACH_DESC  : String(100);
    FILE_NAME : String(100);
    FILE_TYPE : String(100);
    FILE_MIMETYPE : String(100);
    FILE_CONTENT : LargeBinary;
    UPLOADED_ON : Timestamp;
    ATTACH_TYPE_CODE : String(10);
    ATTACH_TYPE_DESC : String(100);
}


