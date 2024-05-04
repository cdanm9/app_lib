using {
    VENDOR_PORTAL.MASTER_STATUS,
    VENDOR_PORTAL.MASTER_COUNTRY,
    VENDOR_PORTAL.MASTER_REGION,
    VENDOR_PORTAL.MASTER_CURRENCY,
    VENDOR_PORTAL.MASTER_REGFORM_FIELDS_MANDATORY,
    VENDOR_PORTAL.MASTER_REGFORM_FIELDS_UPDATED,
    VENDOR_PORTAL.MASTER_REGFORM_FIELDS_VISIBLE,
    VENDOR_PORTAL.MASTER_REQUEST_TYPE,
    VENDOR_PORTAL.MASTER_ENTITY_CODE
} from '../db/MASTER_TABLES';
   
using {cuid} from '@sap/cds/common';

namespace VENDOR_PORTAL;

entity APPR_VENDOR_REQ {

    key REQ_ID   : Integer;
        APPROVER : String(20);
        APPR_REJ : String(1);
        APPROVE  : String(1);
        REJECT   : String(1);
        REMARK   : String(200);
        ACT_DAT  : Date;

}


entity IVEN_ERROR_LOG {

    key LOG_ID           : String(50);
        REQUEST_NO       : Integer64;
        SR_NO            : Integer64;
        ERROR_CODE       : Integer64;
        ERROR_DESCRPTION : String(1000);
        CREATED_ON       : Timestamp;
        USER_ID          : String(50);
        USER_ROLE        : String(50); 
        APP_NAME         : String(50);
        TYPE             : String(50);
                
}

entity IVEN_EMAIL_LOG {

    key LOG_ID       : UUID;
        STATUS       : Integer;
        STATUS_DSC   : String(50);
        LOG          : String;
        CREATED_ON   : Timestamp;
        CREATED_DATE : Timestamp;
        USER_ID      : String(50);
        TO_EMAIL     : String(1000);
        CC_EMAIL     : String(1000);
        SUBJECT      : String(100);
        BODY         : String;
        TYPE         : String(10);

}

entity INVOICE_APPROVAL {

    key PO_NO         : String(10);
    key INVOICE_NO    : String(10);
    key ITEM_NO       : String(6);
        MATERIAL_CODE : String(30);
        MATERIAL_DESC : String(40);
        INV_QTY       : Double;
        UOM           : String(4);
        NET_PRICE     : Double;
        CGST          : Double;
        SGST          : Double;
        IGST          : Double;
        AMOUNT        : Double;
        INVOICE_DATE  : Date;
        TRANSPORTER   : String(100);
        LR_DATE       : Date;
        LR_NO         : String(30);
        STATUS        : String(1);

}

// entity NDA_ATTACHMENTS{
//     key SR_NO : Integer;
//     key ENTITY_CODE : String(10);
//     key ATTACH_CODE : Integer;
//     ATTACH_GROUP:String(30);
//     ATTACH_DESC  : String(100);
//     FILE_NAME : String(100);
//     FILE_TYPE : String(100);
//     FILE_MIMETYPE : String(100);
//     FILE_CONTENT : LargeBinary;
//     UPLOADED_ON : Timestamp;
//     ATTACH_TYPE_CODE : String(10);
//     ATTACH_TYPE_DESC : String(100);
// }

entity NEW_VENDOR_ADMIN {
    key REQID        : Integer;
        VENDORCODE   : String(20);
        PURCHASE_ORG : String(50);
        INDUSTKEY    : String(100);
        SEARCHTERM   : String(100);
        PAYTERM      : String(100);
        ORDERCURR    : String(10);
        SCHEMAGROUP  : String(10);
        GRBASE       : String(1);
        SRVBASE      : String(1);
        AUTOPO       : String(1);
        COMPCODE     : String(10);
        ACCTGROUP    : String(10);
        SORTKEY      : String(10);
        RECONACC     : String(100);
        PAYMETHOD    : String(10);
        HOUSEBANK    : String(100);
        DUBLEINV     : String(1);
        TAXCOUNTRY   : String(20);
        TERMSPAY     : String(30);
        ACT_DAT      : Date;
}

entity NEW_VENDOR_REQ {
    key REQID                   : Integer;
        VENDOR                  : String(20);
        CNAME                   : String(200);
        STREETNO                : String(50);
        STREET2                 : String(150);
        STREET3                 : String(150);
        COUNTRY                 : String(20);
        COUNTRYD                : String(20);
        CITY                    : String(20);
        CITYD                   : String(20);
        PINCODE                 : String(20);
        DISTRICT                : String(20);
        DISTRICTD               : String(20);
        REGION                  : String(20);
        REGIOND                 : String(20);
        TELNO                   : String(20);
        MOBILENO                : String(20);
        EMAIL                   : String(50);
        EMAIL2                  : String(50);
        FAX                     : String(50);
        MANUFACTURER            : String(200);
        MANFADDRESS             : String(200);
        CONTPERSON              : String(100);
        CONTPERSONMOBILE        : String(20);
        CONTEMAIL               : String(50);
        CONTADDRESS             : String(200);
        BNKACCNO                : String(30);
        BNKNAME                 : String(200);
        NAMEINBANK              : String(200);
        IFSCCODE                : String(30);
        PANCARD                 : String(10);
        GSTN                    : String(15);
        GSTNTYPE                : String(20);
        TAXOTHINFO              : String(100);
        NOOFEMP                 : String(10);
        NOOFCONTRACTUALEMP      : String(10);
        TURNOVER                : String(30);
        PAYMENTTERMS            : String(100);
        PRODCURRMANF            : String(200);
        PROPEXPANSION           : String(200);
        TOIMANUFACTURING        : String(1);
        TOIPACKAGING            : String(1);
        TOITRADING              : String(1);
        CONSTOFCOMP             : String(200);
        OWNER                   : String(200);
        DATEOFCOMM              : Date;
        FACTSITUATED            : String(200);
        LOCATIONCOVERED         : String(200);
        COMPREGISTERED          : String(200);
        LINEOFACTIVITY          : String(200);
        MPCBACT                 : String(10);
        MPCBZONE                : String(200);
        MPCBCONSENTNO           : String(50);
        MPCBVALIDITYPERIOD      : String(20);
        CASESPENDING            : String(30);
        CASESDETAILS            : String(200);
        FACTORYACT              : String(20);
        FACTLICENSENO           : String(200);
        FACTLICENSEVALIDITYDATE : String(20);
        CHILDLABACT             : String(20);
        ANYCHILDLAB             : String(20);
        CONTLABOURACT           : String(20);
        MANCAPACITY             : String(200);
        INCHARGEEDU             : String(100);
        LISTOFMACHINARIES       : String(200);
        QCLAB                   : String(20);
        LISTOFINSTRUMENT        : String(200);
        MANFAGREEMENT           : String(200);
        WRITTENPERMISSION       : String(200);
        REQUESTDATE             : Date;
        VENDCREATEDFLAG         : String(1);
        MAILFLAG                : String(1);

}

entity REGFORM_ADDRESS {
    key REQUEST_NO       : Integer64;
    key SR_NO            : Integer;
        ADDRESS_TYPE     : String(50);
        ADDRESS_DESC     : String(50);
        HOUSE_NUM1       : String(10);
        STREET1          : String(60);
        STREET2          : String(40);
        STREET3          : String(40);
        STREET4          : String(40);
        CITY             : String(100);
        STATE            : String(100);
        COUNTRY          : String(100);
        POSTAL_CODE      : String(10);
        CONTACT_NO       : String(30);
        CONTACT_TELECODE : String(4);
        FAX_NO           : String(10);
        EMAIL            : String(241);
        DISTRICT         : String(35);
        TO_COUNTRY       : Association to one MASTER_COUNTRY
                               on TO_COUNTRY.LAND1 = COUNTRY;
        TO_REGION        : Association to one MASTER_REGION
                               on  TO_REGION.LAND1 = COUNTRY
                               and TO_REGION.BLAND = STATE;
}

entity REGFORM_ADDRESS_TEMP {
    key REQUEST_NO       : Integer64;
    key TEMP_ID          : Integer64;
    key SR_NO            : Integer;
        ADDRESS_TYPE     : String(50);
        ADDRESS_DESC     : String(50);
        HOUSE_NUM1       : String(10);
        STREET1          : String(60);
        STREET2          : String(40);
        STREET3          : String(40);
        STREET4          : String(40);
        CITY             : String(100);
        STATE            : String(100);
        COUNTRY          : String(100);
        POSTAL_CODE      : String(10);
        CONTACT_NO       : String(30);
        CONTACT_TELECODE : String(4);
        FAX_NO           : String(10);
        EMAIL            : String(241);
        DISTRICT         : String(35);
}

entity REGFORM_CONTACTS {
    key REQUEST_NO       : Integer64;
    key SR_NO            : Integer;
        NAME1            : String(35);
        NAME2            : String(35);
        HOUSE_NUM1       : String(10);
        STREET1          : String(40);
        STREET2          : String(40);
        CITY             : String(100);
        STATE            : String(100);
        POSTAL_CODE      : String(10);
        DESIGNATION      : String(50);
        NATIONALITY      : String(30);
        PASSPORT_NO      : String(30);
        EMAIL            : String(241);
        CONTACT_NO       : String(30);
        MOBILE_NO        : String(30);
        CONTACT_TYPE     : String(10);
        CONTACT_TELECODE : String(4);    
        MOBILE_TELECODE  : String(4);
        BP_ID            : String(10);
        TO_COUNTRY       : Association to one MASTER_COUNTRY
                               on TO_COUNTRY.LAND1 = NATIONALITY;
        TO_REGION        : Association to one MASTER_REGION
                               on  TO_REGION.LAND1 = NATIONALITY
                               and TO_REGION.BLAND = STATE;
}

entity REGFORM_ATTACH_FIELDS {
    key REQUEST_NO                 : Integer64;
        // If UAE Company
        IS_UAE_COMPANY             : String(5);
        // Do you issue an Electronic Tax Invoice
        ISSUE_ELEC_TAX_INV         : String(100);
        // Are you a Sole Agent / Distributor / Dealer for a manufacturer / service provider
        SOLE_DIST_MFG_SER          : String(5);
        //SOLE_DIST_MFG_SER_TYPE : String(100);

        // Passport  Representative / Authorized person
        PASSPORT_OF_AUTH_SIGNATORY : String(5);
        PASSPORT_REPR_AUTH_PERSON  : String(5);
}

entity REGFORM_ATTACHMENTS {
    key REQUEST_NO       : Integer64;
    key SR_NO            : Integer;
        ATTACH_CODE      : Integer;
        ATTACH_GROUP     : String(30);
        ATTACH_DESC      : String(100);
        ATTACH_VALUE     : String(100);
        EXPIRY_DATE      : Date;
        FILE_NAME        : String(100);
        FILE_TYPE        : String(100);
        FILE_MIMETYPE    : String(100);
        FILE_CONTENT     : LargeBinary;
        UPLOADED_ON      : Timestamp;
        OT_DOC_ID        : String(10);
        OT_LAST_DOC_ID   : String(10);
        UPDATE_FLAG      : String(1);
        DELETE_FLAG      : String(1);
        ATTACH_SHORT_DEC : String(50);
        ATTACH_FOR       : String(50);
}

entity REGFORM_ATTACHMENTS_TEMP {
    key REQUEST_NO       : Integer64;
    key TEMP_ID          : Integer64;
    key SR_NO            : Integer;
        ATTACH_CODE      : Integer;
        ATTACH_GROUP     : String(30);
        ATTACH_DESC      : String(100);
        ATTACH_VALUE     : String(100);
        EXPIRY_DATE      : Date;
        FILE_NAME        : String(100);
        FILE_TYPE        : String(100);
        FILE_MIMETYPE    : String(100);
        FILE_CONTENT     : LargeBinary;
        UPLOADED_ON      : Timestamp;
        OT_DOC_ID        : String(10);
        OT_LAST_DOC_ID   : String(10);
        UPDATE_FLAG      : String(1);
        DELETE_FLAG      : String(1);
        ATTACH_SHORT_DEC : String(50);
        ATTACH_FOR       : String(50);

}

entity REGFORM_ATTACHMENTS_CMS {
        // key REQUEST_NO
        // key SR_NO            : Integer;
    key DOC_ID        : Integer64;
        FILE_NAME     : String(100);
        FILE_MIMETYPE : String(100);
        FILE_CONTENT  : LargeBinary;
        UPLOADED_ON   : Timestamp;
        ACTIVE_FLAG   : String(1);
}

entity REGFORM_CAPACITY {
    key REQUEST_NO            : Integer64;
    key SR_NO                 : Integer;
        // TOTAL_PROD_CAPACITY : String(20);
        CITY                  : String(100);
        COUNTRY               : String(100);
        PLANT_MANF_CAPABILITY : String(5);
        PROD_CAPACITY         : Double;
        TIME_TO_SERVICE       : String(50);
        TO_COUNTRY            : Association to one MASTER_COUNTRY
                                    on TO_COUNTRY.LAND1 = COUNTRY;
}


entity REGFORM_CONTACTS_TEMP {
    key REQUEST_NO       : Integer64;
    key TEMP_ID          : Integer64;
    key SR_NO            : Integer;
        NAME1            : String(35);
        NAME2            : String(35);
        HOUSE_NUM1       : String(10);
        STREET1          : String(40);
        STREET2          : String(40);
        CITY             : String(100);
        STATE            : String(100);
        POSTAL_CODE      : String(10);
        DESIGNATION      : String(50);
        NATIONALITY      : String(30);
        PASSPORT_NO      : String(30);
        EMAIL            : String(241);
        CONTACT_NO       : String(30);
        MOBILE_NO        : String(30);
        CONTACT_TYPE     : String(10);
        CONTACT_TELECODE : String(4);
        MOBILE_TELECODE  : String(4);
        BP_ID            : String(10);
}

entity REGFORM_CUSTOMERS {
    key REQUEST_NO     : Integer64;
    key SR_NO          : Integer;
        CUSTOMER_NAME  : String(100);
        CUSTOMER_SHARE : Double;
}

entity REGFORM_DISCLOSURE_FIELDS {
    key REQUEST_NO                : Int64;
        // Conflict of Interest
        INTEREST_CONFLICT         : String(5);
        INTEREST_CONFLICT_TEXT    : String(100);
        // Legal case disclosure
        ANY_LEGAL_CASES           : String(5);
        ANY_LEGAL_CASES_TEXT      : String(100);
        // Supplier declaration
        AKN_SIGNATURE             : String(100);
        AKN_NAME                  : String(100);
        AKN_DESIGNATION           : String(100);
        AKN_DATE                  : Date;
        AKN_COMPANY_STAMP         : String(100);
        //Academic Discount
        ACADEMIC_DISCOUNT         : String(5);
        // Relatives Working for
        RELATIVE_WORKING          : String(5);
        // Validation of information submitted
        VALID_SIGNATORY_NAME      : String(100);
        VALID_DESIGNATION         : String(100);
        // REACH compliance
        REACH_COMPLIANCE          : String(5);
        // CLP compliance
        CLP_COMPLIANCE            : String(5);
        // ITAR and FCPA compliance
        APPLY_ITAR_REG            : String(5);
        SUPPLY_ITAR_EAR           : String(5);
        APPLY_FCPA                : String(5);
        US_ORIGIN_SUPPL           : String(5);
        ERP_MGMT_SYSTEM           : String(5);
        ERP_MGMT_SYSTEM_NAME      : String(100);
        INDUSRIAL_DESIGN_SW       : String(5);
        INDUSRIAL_DESIGN_SW_NAME  : String(100);
        // Overview
        COUNTERFIET_PARTS_PCD     : String(5);
        QUALITY_AGREEMENT         : String(5);
        MANUFACTURING_PCD         : String(5);
        TECH_SPEC_MFG_SRV         : String(5);
        PLAN_COLLECTION           : String(5);
        ANALYSIS_RISKMGMT_PROC    : String(5);
        CONFIG_CTRL_SYSTEM        : String(5);
        CTRL_PLANNING_PROC        : String(5);
        CONT_IMPROVEMENT_PROG     : String(5);
        EPI_QUALITY_SUPPL_REQ     : String(5);
        // Suppliers/ imput material
        SUPPL_EVAL_PROC           : String(5);
        NON_CONF_ANALYSIS         : String(5);
        TECH_SPEC_MATERIAL        : String(5);
        MATERIAL_INSPECTION_TESTS : String(5);
        CTRL_ORDERS_DOC_PROC      : String(5);
        TECHNICAL_DOC_PROC        : String(5);
        // Production
        QUALIFIED_STAFF           : String(5);
        QUALIFICATION_ARRAY       : String(5);
        PROC_FOR_INCOMING         : String(5);
        MFG_INSPECTION_TESTS      : String(5);
        INTERAL_QUAL_AUDITS       : String(5);
        MEASURING_EQUIP_CALIB     : String(5);
        NON_CONF_TREATMENT_PROC   : String(5);
        REPTITIVE_CAUSES_PROC     : String(5);
        IDENTIFICATION_METHOD     : String(5);
        MAINTENANCE_SCHEDULES     : String(5);
        WORK_INSTRUCTION_METHODS  : String(5);
        DOCUMENTED_PROC           : String(5);
        PLANNING_CONTROL_SYSTEM   : String(5);
        // Storage
        CRITERIA_COLLECT_PROC     : String(5);
        COMP_BASED_WMS            : String(5);
        ESTAB_CRITERIA            : String(5);
        DEFINED_POLICIES          : String(5);
        // Customer service
        CUSTOMER_SERVICE          : String(5);
        // Technology
        MASS_SERIES_PROD          : String(5);
        TECH_SUPPORT              : String(5);
        // HEALTH, SAFETY AND ENVIROMENT
        SFTY_ENVI_POLICY          : String(5);
        ENVI_FRIENDLY_PROD        : String(5);
        SUSTAINABILITY_PROG       : String(5);
        COMPLY_LABOR_REG          : String(5);
        REQUIRE_EUC               : String(5);
        EXPORT_CNTRL              : String(5);
}

entity REGFORM_DISCLOSURE_QACERT {
    key REQUEST_NO : Int64;
    key SR_NO      : Integer;
        // Quality Certification
        CERTI_NAME : String(100);
        CERTI_TYPE : String(100);
        AVAILABLE  : String(100);
        DONE_BY    : String(100);
}

entity REGFORM_DISCLOSURE_RELATIVES {
    key REQUEST_NO   : Int64;
    key SR_NO        : Integer;
        NAME         : String(100);
        RELATIONSHIP : String(100);
}

entity REGFORM_FINANCIAL {
    key REQUEST_NO      : Int64;
    key SR_NO           : Integer;
        FIN_YEAR        : Integer;
        TOTAL_REVENUE   : Double;
        NET_PROFIT_LOSS : Double;
        TOTAL_ASSETS    : Double;
        TOTAL_EQUITY    : Double;
        CURRENCY        : String(10);
        TO_CURRENCY     : Association to one MASTER_CURRENCY
                              on TO_CURRENCY.WAERS = CURRENCY;
}

entity REGFORM_FOLDER_IDS {

    key IVEN_VENDOR_CODE : Int64;
        SAP_VENDOR_CODE  : String(10);
        OT_PARENT_ID     : String(10);
        OT_FOLDER1_ID    : String(25);
        OT_FOLDER2_ID    : String(25);
        OT_FOLDER3_ID    : String(25);
        OT_FOLDER4_ID    : String(25);

}

// entity ONBOARDING_FORM_TEMP {
//         // Official Use
//     key REQUEST_NO                : Int64;
//     key TEMP_ID               : Int64;
//         STATUS                : Integer;
//         APPROVER_LEVEL        : Integer;
//         APPROVER_ROLE         : String(50);
//         NEXT_APPROVER         : String(100);
//         SAP_VENDOR_NO         : String(10);
//         IVEN_VENDOR_CODE      : Int64;
//         REGISTERED_ID         : String(100);
//         SECONDARY_EMAILS_ID   : String(500);
//         ENTITY_CODE           : String(10);
//         REQUEST_TYPE          : Integer;
//         CREATION_TYPE         : Integer;
//         REQUEST_RESENT        : String(5);
//         REQUESTER_ID          : String(100);
//         MDG_CR_NO             : String(15);
//         LAST_ACTIVE_REQ_NO    : Int64;
//         // Company Information
//         COMPANY_NAME1         : String(100);
//         COMPANY_NAME2         : String(100);
//         WEBSITE               : String(100);
//         //Legal Structure
//         LEGAL_STRUCTURE       : String(50);
//         LEGAL_STRUCTURE_OTHER : String(100);
//         // Business Information
//         ESTAB_YEAR            : String(4);
//         NO_OF_EMP             : Integer;
//         NO_OF_ENGG            : Integer;
//         NO_OF_QUALITY         : Integer;
//         NO_OF_PROD            : Integer;
//         NO_OF_ADMIN           : Integer;
//         NO_OF_OTHERS          : Integer;
//         BUSINESS_TYPE         : String(50);
//         TRADE_LIC_NO          : String(50);
//         TRADE_LIC_NO_DATE     : Date;
//         VAT_REG_NUMBER        : String(25);
//         VAT_REG_DATE          : Date;
//         VAT_CHECK             : String(1);
//         ICV_SCORE             : Decimal;
//         ICV_DATE              : Date;
//         ICV_CHECK             : String(1);
//         // Serction 3: Operation Info
//         SUPPL_CATEGORY        : String(5000);
//         SUPPL_CATEGORY_DESC   : String(5000);
//         SUPPL_TYPE            : String(50);
//         SUPPL_TYPE_DESC       : String(30);
//         BP_TYPE_CODE          : String(4);
//         BP_TYPE_DESC          : String(100);
//         ACTIVITY_TYPE         : String(30);
//         // Order Size Details
//         ORDER_SIZE_MIN        : String(50);
//         ORDER_SIZE_MAX        : String(50);
//         // Total Production Details from Section 4: Disclosures Info
//         TOTAL_PROD_CAPACITY   : String(20);
//         // STATUS base updates
//         LAST_SAVED_STEP       : Integer;
//         // Submission Fields
//         COMPLETED_BY          : String(100);
//         COMPLETED_BY_POSITION : String(50);
//         ACK_VALIDATION        : String(5); //Validation of information submitted

//         // Timestamps
//         SUBMISSION_DATE       : Timestamp;
//         LAST_UPDATED_ON       : Timestamp;
//         //------------------OpenText--------------------------------
//         OT_PARENT_ID          : String(10);
//         OT_FOLDER1_ID         : String(25);
//         OT_FOLDER2_ID         : String(25);
//         OT_FOLDER3_ID         : String(25);
//         OT_FOLDER4_ID         : String(25);
// }

// entity ONBOARDING_FORM {

//         // Official Use
//     key REQUEST_NO                : Int64;
//         STATUS                : Integer;
//         APPROVER_LEVEL        : Integer;
//         APPROVER_ROLE         : String(50);
//         NEXT_APPROVER         : String(100);
//         SAP_VENDOR_NO         : String(10);
//         IVEN_VENDOR_CODE      : Int64;
//         REGISTERED_ID         : String(100);
//         SECONDARY_EMAILS_ID   : String(500);
//         ENTITY_CODE           : String(10);
//         REQUEST_TYPE          : Integer;
//         CREATION_TYPE         : Integer;
//         REQUEST_RESENT        : String(5);
//         REQUESTER_ID          : String(100);
//         MDG_CR_NO             : String(15);
//         LAST_ACTIVE_REQ_NO    : Int64;
//         // Company Information
//         COMPANY_NAME1         : String(100);
//         COMPANY_NAME2         : String(100);
//         WEBSITE               : String(100);
//         //Legal Structure
//         LEGAL_STRUCTURE       : String(50);
//         LEGAL_STRUCTURE_OTHER : String(100);
//         // Business Information
//         ESTAB_YEAR            : String(4);
//         NO_OF_EMP             : Integer;
//         NO_OF_ENGG            : Integer;
//         NO_OF_QUALITY         : Integer;
//         NO_OF_PROD            : Integer;
//         NO_OF_ADMIN           : Integer;
//         NO_OF_OTHERS          : Integer;
//         BUSINESS_TYPE         : String(50);
//         TRADE_LIC_NO          : String(50);
//         TRADE_LIC_NO_DATE     : Date;
//         VAT_REG_NUMBER        : String(25);
//         VAT_REG_DATE          : Date;
//         VAT_CHECK             : String(1);
//         ICV_SCORE             : Decimal;
//         ICV_DATE              : Date;
//         ICV_CHECK             : String(1);
//         // Serction 3: Operation Info
//         SUPPL_CATEGORY        : String(5000);
//         SUPPL_CATEGORY_DESC   : String(5000);
//         SUPPL_TYPE            : String(50);
//         SUPPL_TYPE_DESC       : String(50);
//         BP_TYPE_CODE          : String(4);
//         BP_TYPE_DESC          : String(100);
//         ACTIVITY_TYPE         : String(30);
//         // Order Size Details
//         ORDER_SIZE_MIN        : String(50);
//         ORDER_SIZE_MAX        : String(50);
//         // Total Production Details from Section 4: Disclosures Info
//         TOTAL_PROD_CAPACITY   : String(20);
//         // STATUS base updates
//         LAST_SAVED_STEP       : Integer;
//         // Submission Fields
//         COMPLETED_BY          : String(100);
//         COMPLETED_BY_POSITION : String(50);
//         ACK_VALIDATION        : String(5); //Validation of information submitted

//         // Timestamps
//         SUBMISSION_DATE       : Timestamp;
//         LAST_UPDATED_ON       : Timestamp;
//         //------------------OpenText--------------------------------
//         OT_PARENT_ID          : String(10);
//         OT_FOLDER1_ID         : String(25);
//         OT_FOLDER2_ID         : String(25);
//         OT_FOLDER3_ID         : String(25);
//         OT_FOLDER4_ID         : String(25);


// }

entity ONBOARDING_IAS_LOG {

    key JOB_SR_NO        : Integer;
    key JOB_TASKS_COUNT  : Integer;
        REQUEST_NO       : Int64;
        SAP_VENDOR_NO    : String(10);
        IVEN_VENDOR_CODE : Int64;
        USER_ID          : String(100);
        DISPLAYNAME      : String(100);
        ID               : String(100);
        REMARK           : String(100);
        STATUS           : String(1);
        STATUS_CODE      : Integer;
        CREATED_ON       : Timestamp;
}

entity REGFORM_OEM {

    key REQUEST_NO   : Integer64;
    key SR_NO        : Integer;
    key OEM_TYPE     : String(10);
        COMPANY_NAME : String(100);
        COUNTRY      : String(100);
        OEM_CATEGORY : String(100);

}

entity REGFORM_OWNERS {

    key REQUEST_NO        : Integer64;
    key SR_NO             : Integer;
        NAME              : String(100);
        NATIONALITY       : String(100);
        CONTACT_NO        : String(12);
        CONTACT_TELECODE  : String(4);
        PASSPORT_NO       : String(30);
        ACTIVITY_TYPE     : String(30);
        OWNERSHIP_PERCENT : Double;
        TO_COUNTRY        : Association to one MASTER_COUNTRY
                                on TO_COUNTRY.LAND1 = NATIONALITY;
}

entity REGFORM_BANKS {

    key REQUEST_NO          : Integer64;
    key SR_NO               : Integer;
        NAME                : String(100);
        BENEFICIARY         : String(100);
        ACCOUNT_NO          : String(38); //18 (account no) + 20 (BankRef)
        ACCOUNT_NAME        : String(40);
        ACCOUNT_HOLDER      : String(60);
        BANK_ID             : String(4);
        BANK_KEY            : String(15);
        BANK_COUNTRY        : String(50); //3 length
        BRANCH_NAME         : String(100);
        IBAN_NUMBER         : String(34); //34 length
        SWIFT_CODE          : String(15);
        BIC_CODE            : String(15);
        ROUTING_CODE        : String(15);
        OTHER_CODE          : String(1);
        OTHER_CODE_NAME     : String(15);
        OTHER_CODE_VAL      : String(15);
        PAYMENT_METHOD      : String(25);
        PAYMENT_METHOD_DESC : String(30);
        PAYMENT_TERMS       : String(25);
        PAYMENT_TERMS_DESC  : String(30);
        INVOICE_CURRENCY    : String(25);
        VAT_REG_NUMBER      : String(25);
        VAT_REG_DATE        : Date;
        DUNS_NUMBER         : String(10);
        BANK_CURRENCY       : String(5);
        BANK_NO             : String(15);
        PAYMENT_TYPE        : String(10);
        TO_COUNTRY          : Association to one MASTER_COUNTRY
                                  on TO_COUNTRY.LAND1 = BANK_COUNTRY;
        TO_CURRENCY         : Association to one MASTER_CURRENCY
                                  on TO_CURRENCY.WAERS = BANK_CURRENCY;
}

entity REGFORM_BANKS_TEMP {

    key REQUEST_NO          : Integer64;
    key TEMP_ID             : Integer64;
    key SR_NO               : Integer;
        NAME                : String(100);
        BENEFICIARY         : String(100);
        ACCOUNT_NO          : String(38); // 18 (account no) + 20 (BankRef)
        ACCOUNT_NAME        : String(40);
        ACCOUNT_HOLDER      : String(60);
        BANK_ID             : String(4);
        BANK_KEY            : String(15);
        BANK_COUNTRY        : String(50); //3 length
        BRANCH_NAME         : String(100);
        IBAN_NUMBER         : String(40); //34 length
        SWIFT_CODE          : String(15);
        BIC_CODE            : String(15);
        ROUTING_CODE        : String(15);
        OTHER_CODE          : String(1);
        OTHER_CODE_NAME     : String(15);
        OTHER_CODE_VAL      : String(15);
        PAYMENT_METHOD      : String(25);
        PAYMENT_METHOD_DESC : String(30);
        PAYMENT_TERMS       : String(25);
        PAYMENT_TERMS_DESC  : String(30);
        INVOICE_CURRENCY    : String(25);
        VAT_REG_NUMBER      : String(25);
        VAT_REG_DATE        : Date;
        DUNS_NUMBER         : String(10);
        BANK_CURRENCY       : String(5);
        BANK_NO             : String(15);
        PAYMENT_TYPE        : String(10);

}

entity REGFORM_PRODUCT_SERVICE {

    key REQUEST_NO        : Integer64;
    key TYPE              : String(10);
    key SR_NO             : Integer;
        PROD_NAME         : String(100);
        PROD_DESCRIPTION  : String(200);
        PROD_CATEGORY     : String(200);
        PROD_CATEGORY_DEC : String(100);

}

entity REQUEST_ACTIVE_STATUS {

    key REQUEST_NO       : Integer64;
        ACTIVE           : String(1);
        TYPE             : Integer;
        UPDATED_ON       : Timestamp;
        IVEN_VENDOR_CODE : Integer64;

}

entity REQUEST_EVENTS_LOG {

    key REQUEST_NO : Integer64;
    key EVENT_NO   : Integer;
        EVENT_CODE : Integer;
        EVENT_TYPE : String(20);
        USER_ID    : String(100);
        USER_NAME  : String(100);
        REMARK     : String(100);
        COMMENT    : String(1000);
        CREATED_ON : Timestamp;

}

entity REQUEST_SECURITY_CODE {

    key REGISTERED_ID : String(100);
        SEC_CODE      : String(100);
        CREATED_ON    : Timestamp;

}

entity SUPPLIER_PROFILE_LOG {

    key SAP_VENDOR_CODE    : String(10);
    key EVENT_NO           : Integer;
        EVENT_CODE         : Integer;
        EVENT_TYPE         : String(20);
        USER_ID            : String(100);
        USER_NAME          : String(100);
        REMARK             : String(100);
        COMMENT            : String(1000);
        UPDATED_ON         : Timestamp;
        UPDATED_FIELD_NAME : String(100);
        CHANGE_VALUE       : String(5000);
        ORG_VALUE          : String(5000);
        REQUEST_NO         : Integer64;
}

entity USER_DELEGATION {

    key SR_NO          : Integer;
        ASSIGN_FROM    : String(50);
        ASSIGN_TO      : String(50);
        ASSIGN_TO_NAME : String(100);
        REASON         : String(1000);
        DEL_FROM_DATE  : Timestamp;
        DEL_TO_DATE    : Timestamp;
        STATUS         : String(1);
        ENTITY_CODE    : String(10);

}

entity USER_DELEGATION_HISTORY {

    key SR_NO          : Integer;
    key LOG_NO         : Integer;
        ASSIGN_FROM    : String(50);
        ASSIGN_TO      : String(50);
        ASSIGN_TO_NAME : String(100);
        REASON         : String(1000);
        DEL_FROM_DATE  : Timestamp;
        DEL_TO_DATE    : Timestamp;
        STATUS         : String(1);
        ENTITY_CODE    : String(10);
        CHANGED_BY     : String(50);
        CHANGED_DATE   : Timestamp;

}

entity USER_QUERY {

    key REQ_NO   : String(10);
        CATAGORY : String(100);
        SUBJECT  : String(100);
        QUESTION : String(100);
        UNAME    : String(10);
        CDATE    : Date;
        STATUS   : String(20);
        ACTION   : String(10);
        RDATE    : Date;
        ANSWER   : String(100);

}

// entity VENDOR_INVITATION {
entity REQUEST_INVITATION {

    key REQUEST_NO         : Integer64;
        SAP_VENDOR_CODE    : String(10);
        VNAME              : String(100);
        VCODE              : String(50);
    key VEMAIL             : String(241);
        CREATED_ON         : Timestamp;
        UPDATED_ON         : Timestamp;
        ENTITY_CODE        : String(50);
        ENTITY_DESC        : String(100);
        STATUS             : Integer;
        COMMENT            : String(1000);
        REQUEST_TYPE       : Integer;
        CREATION_TYPE      : Integer;
        SUPPLIER_TYPE_DESC : String(100);
        SUPPLIERTYPE_CODE  : String(50);
        BP_TYPE_DESC       : String(100);
        BP_TYPE_CODE       : String(4);
        IVEN_VENDOR_CODE   : Integer64;
        CREATED_BY         : String(100);
        CREATED_BY_NAME    : String(100);
        NEXT_APPROVER      : String(100);
        NDA_TYPE           : String(50);
        REMINDER_COUNT     : Integer;
        BUYER_ASSIGN_CHECK : String(1);

}

entity VENDOR_INVITATION_LOG {

    key REQUEST_NO     : Integer64;
    key LAST_REMINDER  : Timestamp;
    key UPDATED_ON     : Timestamp;
    key REMINDER_COUNT : Integer;

}

entity REQUEST_INFO {
    key REQUEST_NO               : Integer64;
        SAP_VENDOR_CODE          : String(10);
        IVEN_VENDOR_CODE         : Integer64;
        STATUS                   : Integer;
        REGISTERED_ID            : String(100); // Vendor Email ID
        ENTITY_CODE              : String(10);
        REQUEST_TYPE             : Integer;
        CREATION_TYPE            : Integer;
        VENDOR_NAME1             : String(100);
        VENDOR_NAME2             : String(100);
        VENDOR_CODE              : String(50);
        APPROVER_LEVEL           : Integer;
        APPROVER_ROLE            : String(50);
        // NEXT_APPROVER            : String(100);
        REQUESTER_ID             : String(100); // Request creator i.e. Buyer Email ID
        SUPPL_TYPE               : String(50);
        SUPPL_TYPE_DESC          : String(50);
        BP_TYPE_CODE             : String(4);
        BP_TYPE_DESC             : String(100);
        REQUEST_RESENT           : String(5);
        MDG_CR_NO                : String(15);
        LAST_ACTIVE_REQ_NO       : Integer64;
        SECONDARY_EMAILS_ID      : String(500);
        WEBSITE                  : String(100);
        LEGAL_STRUCTURE          : String(50);
        LEGAL_STRUCTURE_OTHER    : String(100);
        ESTAB_YEAR               : String(4);
        NO_OF_EMP                : Integer;
        NO_OF_ENGG               : Integer;
        NO_OF_QUALITY            : Integer;
        NO_OF_PROD               : Integer;
        NO_OF_ADMIN              : Integer;
        NO_OF_OTHERS             : Integer;
        BUSINESS_TYPE            : String(50);
        TRADE_LIC_NO             : String(50);
        TRADE_LIC_NO_DATE        : Date;
        VAT_REG_NUMBER           : String(25);
        VAT_REG_DATE             : Date;
        SUPPL_CATEGORY           : String(5000);
        SUPPL_CATEGORY_DESC      : String(5000);
        ACTIVITY_TYPE            : String(30);
        ORDER_SIZE_MIN           : String(50);
        ORDER_SIZE_MAX           : String(50);
        TOTAL_PROD_CAPACITY      : String(20);
        LAST_SAVED_STEP          : Integer;
        COMPLETED_BY             : String(100);
        COMPLETED_BY_POSITION    : String(50);
        ACK_VALIDATION           : String(5);
        SUBMISSION_DATE          : Timestamp;
        LAST_UPDATED_ON          : Timestamp;
        OT_PARENT_ID             : String(10);
        OT_FOLDER1_ID            : String(25);
        OT_FOLDER2_ID            : String(25);
        OT_FOLDER3_ID            : String(25);
        OT_FOLDER4_ID            : String(25);
        VAT_CHECK                : String(1);
        ICV_SCORE                : Decimal;
        ICV_DATE                 : Date;
        ICV_CHECK                : String(1);
        NDA_TYPE                 : String(50);
        REMINDER_COUNT           : Integer;
        BUYER_ASSIGN_CHECK       : String(1);
        CREATED_ON               : Timestamp;
        COMMENT                  : String(1000);
        LEGACY_ID                : String(10);
        PROCESS_LEVEL                :  String(10);                  
        TO_STATUS                : Association to one VENDOR_PORTAL.MASTER_STATUS
                                       on TO_STATUS.CODE = STATUS;
        TO_ADDRESS               : Association to many VENDOR_PORTAL.REGFORM_ADDRESS
                                       on TO_ADDRESS.REQUEST_NO = REQUEST_NO;
        TO_CONTACTS              : Association to many VENDOR_PORTAL.REGFORM_CONTACTS
                                       on TO_CONTACTS.REQUEST_NO = REQUEST_NO;
        TO_BANKS                 : Association to many VENDOR_PORTAL.REGFORM_BANKS
                                       on TO_BANKS.REQUEST_NO = REQUEST_NO;
        TO_FINANCE               : Association to many VENDOR_PORTAL.REGFORM_FINANCIAL
                                       on TO_FINANCE.REQUEST_NO = REQUEST_NO;
        TO_OWNERS                : Association to many VENDOR_PORTAL.REGFORM_OWNERS
                                       on TO_OWNERS.REQUEST_NO = REQUEST_NO;
        TO_PRODUCT_SERVICES      : Association to many VENDOR_PORTAL.REGFORM_PRODUCT_SERVICE
                                       on TO_PRODUCT_SERVICES.REQUEST_NO = REQUEST_NO;
        TO_CAPACITY              : Association to many VENDOR_PORTAL.REGFORM_CAPACITY
                                       on TO_CAPACITY.REQUEST_NO = REQUEST_NO;
        TO_CUSTOMERS             : Association to many VENDOR_PORTAL.REGFORM_CUSTOMERS
                                       on TO_CUSTOMERS.REQUEST_NO = REQUEST_NO;
        TO_OEM                   : Association to many VENDOR_PORTAL.REGFORM_OEM
                                       on TO_OEM.REQUEST_NO = REQUEST_NO;
        TO_MANDATORY_FIELDS      : Association to one VENDOR_PORTAL.MASTER_REGFORM_FIELDS_MANDATORY
                                       on  TO_MANDATORY_FIELDS.CCODE = ENTITY_CODE
                                       and TO_MANDATORY_FIELDS.TYPE  = CREATION_TYPE;
        TO_VISIBLE_FIELDS        : Association to one VENDOR_PORTAL.MASTER_REGFORM_FIELDS_VISIBLE
                                       on  TO_VISIBLE_FIELDS.CCODE = ENTITY_CODE
                                       and TO_VISIBLE_FIELDS.TYPE  = CREATION_TYPE;
        TO_UPDATED_FIELDS        : Association to one VENDOR_PORTAL.MASTER_REGFORM_FIELDS_UPDATED
                                       on TO_UPDATED_FIELDS.REQ_NO = REQUEST_NO;
        TO_DISCLOSURE_FIELDS     : Association to many VENDOR_PORTAL.REGFORM_DISCLOSURE_FIELDS
                                       on TO_DISCLOSURE_FIELDS.REQUEST_NO = REQUEST_NO;
        TO_RELATIVES             : Association to many VENDOR_PORTAL.REGFORM_DISCLOSURE_RELATIVES
                                       on TO_RELATIVES.REQUEST_NO = REQUEST_NO;
        TO_QA_CERTIFICATES       : Association to many VENDOR_PORTAL.REGFORM_DISCLOSURE_QACERT
                                       on TO_QA_CERTIFICATES.REQUEST_NO = REQUEST_NO;
        TO_ATTACH_FIELDS         : Association to many VENDOR_PORTAL.REGFORM_ATTACH_FIELDS
                                       on TO_ATTACH_FIELDS.REQUEST_NO = REQUEST_NO;
        TO_ATTACHMENTS           : Association to many VENDOR_PORTAL.REGFORM_ATTACHMENTS
                                       on TO_ATTACHMENTS.REQUEST_NO = REQUEST_NO;
        TO_REQUEST_TYPE          : Association to one VENDOR_PORTAL.MASTER_REQUEST_TYPE
                                       on TO_REQUEST_TYPE.CODE = REQUEST_TYPE;
        TO_ENTITY_CODE           : Association to one VENDOR_PORTAL.MASTER_ENTITY_CODE   
                                       on TO_ENTITY_CODE.BUKRS = ENTITY_CODE;
        TO_REQUEST_ACTIVE_STATUS : Association to one VENDOR_PORTAL.REQUEST_ACTIVE_STATUS
                                       on TO_REQUEST_ACTIVE_STATUS.REQUEST_NO = REQUEST_NO; 
        TO_HIERARCHY: Association to one VENDOR_PORTAL.MASTER_APPROVAL_HIERARCHY_FE on TO_HIERARCHY.APPR_TYPE=PROCESS_LEVEL
        and TO_HIERARCHY.ENTITY_CODE=ENTITY_CODE and TO_HIERARCHY.APPROVER_LEVEL=APPROVER_LEVEL;          
}

entity REQUEST_INFO_TEMP {
    key REQUEST_NO            : Integer64;
    key TEMP_ID               : Integer64;
        SAP_VENDOR_CODE       : String(10);
        IVEN_VENDOR_CODE      : Integer64;
        STATUS                : Integer;
        REGISTERED_ID         : String(100); // Vendor Email ID
        ENTITY_CODE           : String(10);
        REQUEST_TYPE          : Integer;
        CREATION_TYPE         : Integer;
        VENDOR_NAME1          : String(100);
        VENDOR_NAME2          : String(100);
        VENDOR_CODE           : String(50);
        APPROVER_LEVEL        : Integer;
        APPROVER_ROLE         : String(50);
        // NEXT_APPROVER         : String(100);
        REQUESTER_ID          : String(100); // Request creator i.e. Buyer Email ID
        SUPPL_TYPE            : String(50);
        SUPPL_TYPE_DESC       : String(50);
        BP_TYPE_CODE          : String(4);
        BP_TYPE_DESC          : String(100);
        REQUEST_RESENT        : String(5);
        MDG_CR_NO             : String(15);
        LAST_ACTIVE_REQ_NO    : Integer64;
        SECONDARY_EMAILS_ID   : String(500);
        WEBSITE               : String(100);
        LEGAL_STRUCTURE       : String(50);
        LEGAL_STRUCTURE_OTHER : String(100);
        ESTAB_YEAR            : String(4);
        NO_OF_EMP             : Integer;
        NO_OF_ENGG            : Integer;
        NO_OF_QUALITY         : Integer;
        NO_OF_PROD            : Integer;
        NO_OF_ADMIN           : Integer;
        NO_OF_OTHERS          : Integer;
        BUSINESS_TYPE         : String(50);
        TRADE_LIC_NO          : String(50);
        TRADE_LIC_NO_DATE     : Date;
        VAT_REG_NUMBER        : String(25);
        VAT_REG_DATE          : Date;
        SUPPL_CATEGORY        : String(5000);
        SUPPL_CATEGORY_DESC   : String(5000);
        ACTIVITY_TYPE         : String(30);
        ORDER_SIZE_MIN        : String(50);
        ORDER_SIZE_MAX        : String(50);
        TOTAL_PROD_CAPACITY   : String(20);
        LAST_SAVED_STEP       : Integer;
        COMPLETED_BY          : String(100);
        COMPLETED_BY_POSITION : String(50);
        ACK_VALIDATION        : String(5);
        SUBMISSION_DATE       : Timestamp;
        LAST_UPDATED_ON       : Timestamp;
        OT_PARENT_ID          : String(10);
        OT_FOLDER1_ID         : String(25);
        OT_FOLDER2_ID         : String(25);
        OT_FOLDER3_ID         : String(25);
        OT_FOLDER4_ID         : String(25);
        VAT_CHECK             : String(1);
        ICV_SCORE             : Decimal;
        ICV_DATE              : Date;
        ICV_CHECK             : String(1);
        NDA_TYPE              : String(50);
        REMINDER_COUNT        : Integer;
        BUYER_ASSIGN_CHECK    : String(1);
        CREATED_ON            : Timestamp;
        COMMENT               : String(1000);
        LEGACY_ID             : String(10);
        PROCESS_LEVEL             : String(10);       
        TO_STATUS             : Association to one VENDOR_PORTAL.MASTER_STATUS
                                    on TO_STATUS.CODE = STATUS;
}

entity VENDOR_MASTER_S4_HANA {
    key BUKRS : String(4);
    key LIFNR : String(10);
        NAME1 : String(35);
}
