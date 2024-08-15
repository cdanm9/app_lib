// namespace VENDOR_PORTAL;
using {cuid,managed} from '@sap/cds/common';

context VENDOR_PORTAL {
    entity MASTER_COUNTRY {
        key LAND1 : String(3);
        key LANDX : String(15);
        key NATIO : String(25);
    }

    entity MASTER_CREDENTIAL {
        key SR_NO      : Integer;
            USERNAME   : String(100);
            PASSWORD   : String(100);
            TYPE       : String(100);
            ADD_INFO1  : String(100);
            ADD_INFO2  : String(100);
            ADD_INFO3  : String(100);
            CREATED_ON : Timestamp;
    }

    entity EMAIL_CONFIG {
        key SR_NO        : Integer;
            HOST         : String(100);
            PORT         : Integer;
            SECURE       : Boolean;
            SENDER_EMAIL : String(100);
            USERNAME     : String(100);
            PASSWORD     : String(100);
            CREATED_ON   : Timestamp;
    }

    entity MASTER_CURRENCY {

        key WAERS : String(5);
            LTEXT : String(40);

    }

    entity MASTER_EMAIL_CONTACT_ID {

        key SR_NO             : Integer;
            EMAIL_NOTIF_1     : String(100);
            EMAIL_NOTIF_2     : String(100);
            EMAIL_NOTIF_3     : String(100);
            CONTACT_ID_1      : String(100);
            CONTACT_ID_2      : String(100);
            CONTACT_ID_3      : String(100);
            CLIENT_FULL_NAME  : String(100);
            CLIENT_SHORT_NAME : String(100);
            CLIENT_COUNTRY    : String(100);
            EMAIL_CC: String(1000);

    }

    // entity MASTER_ENTITY{

    //     key CCODE : Integer64;
    //     CNAME : String(100);
    //     CCONTACTNO : String(10);

    // }request

    entity MASTER_ENTITY_CODE {

        key BUKRS : String(4);
            BUTXT : String(50);
            ORT01 : String(25);
            WAERS : String(5);

    }

    entity MASTER_REGFORM_FIELDS_ID_DESC {

        key FIELDS      : String(15);
            DESCRIPTION : String(500);
            CATEGORY    : String(50);
            SECTION     : String(50);

    }

    entity MASTER_IAS_USER {

        key USER_ID      : String(50);
            STATUS       : String(50);
            LOGIN        : String(50);
        key EMAIL        : String(150) @Communication.IsEmailAddress;
            FIRST_NAME   : String(250);
            LAST_NAME    : String(250);
            COMPANY_CODE : String(100);
            EMP_NO       : String(100);
            MOBILE_NO    : String(15)  @Communication.IsPhoneNumber;

    }

    entity MASTER_IBAN_COUNTRY {
        key LAND1  : String(3);
        key LANDX  : String(25);
        key LENGTH : Integer
    }

    entity MASTER_IVEN_SAP_VENDOR_NO {
            // REG_NO : Integer64;
            SAP_VENDOR_CODE  : String(10);
        key IVEN_VENDOR_CODE : Integer64;
            ACCOUNT_GROUP    : String(50)
    }

    entity MASTER_IVEN_SETTINGS {
        key CODE        : String(25);
            DESCRIPTION : String(100);
            SETTING     : String(100);
            TYPE        : String(10)
    }


    entity MASTER_ONBOARDING_ATTACHMENTS {
        key OBR_NO           : Integer64;
        key SR_NO            : Integer;
            ATTACH_CODE      : Integer;
            ATTACH_GROUP     : String(30);
            ATTACH_DESC      : String(100);
            ATTACH_VALUE     : String(50);
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
            ATTACH_FOR       : String(50)
    }

    entity MASTER_REGEX_POSTALCODE {
        key LAND1     : String(3);
            REGEX     : String(250);
            REGEX_EXP : String(250);
    }

    entity MASTER_REGION {
        key LAND1 : String(3);
        key BLAND : String(3);
        key BEZEI : String(20);
    }

    entity MASTER_REQUEST_EVENTS {
        key CODE        : Integer;
            DESCRIPTION : String(50);
            TYPE        : String(25);
    }

    entity MASTER_REQUEST_TYPE {
        key CODE          : Integer;
            DESCRIPTION   : String(50);
            SUPPLIER_TYPE : String(50);
    }

    entity MASTER_SAP_CLIENT {
        key SR_NO       : Integer;
            CLIENT      : Integer not null;
            DESTINTAION : String(25) not null;
    }

    entity MASTER_STATUS {
        key CODE        : Integer;
            DESCRIPTION : String(50);
    }

    entity MASTER_SUBACCOUNT {
        key SR_NO       : Integer;
            SUBACCOUNT  : String(50) not null;
            PORTAL_LINK : String(100);
    // DM_LIMIT : Integer;
    }

    entity MASTER_TABLENAMES {
        key SR_NO                 : Integer;
            TABLE_CODE            : String(25) not null;
            TABLE_NAME            : String(50) not null;
            TABLE_TYPE            : String(25) not null;
            COLUMN_COUNT          : Integer not null;
            TABLE_DESCRIPTION     : String(100);
            PRIMARY_KEY           : String(300);
            PRMIARY_KEY_DATA_TYPE : String(300);
    }

    entity MASTER_TELECODE {
        key LAND1      : String(3);
            TELEFTO    : String(4);
            TO_COUNTRY : Association to one MASTER_COUNTRY
                             on TO_COUNTRY.LAND1 = LAND1;
    }

    entity MASTER_IVEN_USERS {
        key SR_NO            : Integer;
            USER_ID          : String(50);
            USER_ROLE        : String(50);
            USER_NAME        : String(500);
        key EMAIL            : String(150);
            COMPANY_CODE     : String(500);
            EMP_NO           : String(100);
            CREATED_ON       : Timestamp;
            UPDATED_ON       : Timestamp;
            ACTIVE           : String(1);
            TO_USER_ROLE     : Association to one MASTER_USER_ROLE
                                   on TO_USER_ROLE.CODE = USER_ROLE;
            TO_ENTITY_CODE   : Association to one MASTER_ENTITY_CODE
                                   on TO_ENTITY_CODE.BUKRS = COMPANY_CODE;
            TO_USER_ENTITIES : Association to many MASTER_USER_ENTITY_CODES
                                   on TO_USER_ENTITIES.USER_ID = USER_ID;
    }

    // entity MASTER_IVEN_USERS_FIORI:cuid{
    //         SR_NO            : Integer;
    //         USER_ID          : String(50);
    //         // USER_ROLE        : String(50);
    //         USER_NAME        : String(500);
    //         EMAIL            : String(150);
    //         // COMPANY_CODE     : String(500);
    //         EMP_NO           : String(100);
    //         CREATED_ON       : Timestamp;
    //         UPDATED_ON       : Timestamp;
    //         // ACTIVE           : String(1);
    //         TO_USER_ROLES     : Association to one MASTER_USER_ROLE
    //                                on TO_USER_ROLE.CODE = USER_ROLE;
    //         TO_USER_ENTITIES : Association to many MASTER_USER_ENTITY_CODES
    //                                on TO_USER_ENTITIES.USER_ID = USER_ID;
    // }

    entity MASTER_USER_ENTITY_CODES {       
        key USER_ID     : String(50);
        key USER_ROLE   : String(50);
        key ENTITY_CODE : String(50);
            EMAIL       : String(150);        
            ENTITY_DESC : String(100);   
    }

    entity MASTER_USER_ROLE {
        key CODE        : String(25);
            DESCRIPTION : String(100);
    }

    entity MASTER_ATTACHMENT_TYPES {
        key CODE              : Integer not null;
            DESCRIPTION       : String(100);
            SHORT_DESCRIPTION : String(10);
            TYPE              : String(10);
            GROUP1            : String(10);
            GROUP2            : String(10); // Table group
    }
   
    entity MASTER_IVEN_ATTACHMENTS {   
        key SR_NO            : Integer;
        key ENTITY_CODE      : String(10);
        key ATTACH_CODE      : Integer;
            ATTACH_GROUP     : String(30);
            ATTACH_DESC      : String(100);
            FILE_NAME        : String(100);
            FILE_TYPE        : String(100);    
            FILE_MIMETYPE    : String(100) ;           
            FILE_CONTENT     : LargeBinary ;    
            UPLOADED_ON      : Timestamp;
            ATTACH_TYPE_CODE : String(10);
            ATTACH_TYPE_DESC : String(100);
    }

    entity MATRIX_REQUEST_APPR {

        key APPROVER_LEVEL : Integer;
        key USER_ROLE      : String(10);
        key USER_ID        : String(100);
        key ENTITY_CODE    : String(50);
            // key ENTITY_DESC : String(100);
            TO_USER_ROLE   : Association to one MASTER_USER_ROLE
                                 on TO_USER_ROLE.CODE = USER_ROLE;
            TO_ENTITY_CODE : Association to one MASTER_ENTITY_CODE
                                 on TO_ENTITY_CODE.BUKRS = ENTITY_CODE;
    }

    entity MATRIX_REGISTRATION_APPR {

        key APPROVER_LEVEL : Integer;
        key USER_ROLE      : String(10);
        key USER_ID        : String(100);
        key ENTITY_CODE    : String(10);
            TO_USER_ROLE   : Association to one MASTER_USER_ROLE
                                 on TO_USER_ROLE.CODE = USER_ROLE;
            TO_ENTITY_CODE : Association to one MASTER_ENTITY_CODE
                                 on TO_ENTITY_CODE.BUKRS = ENTITY_CODE;
    }

    entity MASTER_REGFORM_FIELDS_MANDATORY {
        key CCODE     : String(10);
        key TYPE      : Integer;
            // Section 1: General Information -------------------------------------------------------
            // Group 1: Company Information
            // Type 1: Head Quarter Information
            S1G1T1F1  : String(1); //Company Name (English)
            S1G1T1F2  : String(1); //Company Name (Arabic)
            S1G1T1F3  : String(1); //Mailing Address
            S1G1T1F13 : String(1); //Street 2
            S1G1T1F14 : String(1); //Street 3
            S1G1T1F15 : String(1); //Street 4
            S1G1T1F4  : String(1); //City
            S1G1T1F5  : String(1); //State
            S1G1T1F6  : String(1); //Country
            S1G1T1F7  : String(1); //Postal code
            S1G1T1F8  : String(1); //Contact No.
            S1G1T1F9  : String(1); //Fax No.
            S1G1T1F10 : String(1); //Email
            S1G1T1F11 : String(1); //Website
            S1G1T1F12 : String(1); //District
            S1G1T1F16 :String(1);//Street No.

            //Type 2: Other Office details
            S1G1T2F1  : String(1); //Whole Table - Registering Office Details
            S1G1T2F2  : String(1); //Add Additional Other Office Details
            S1G1T2F3  : String(1); //Office Address - Street 1
            S1G1T2F12 : String(1); //Street 2
            S1G1T2F13 : String(1); //Street 3
            S1G1T2F14 : String(1); //Street 4
              S1G1T2F15 : String(1);//Street No.
            S1G1T2F4  : String(1); //City
            S1G1T2F5  : String(1); //State
            S1G1T2F6  : String(1); //Country
            S1G1T2F7  : String(1); //Postal code/ZIP Code/ PO Box No.
            S1G1T2F8  : String(1); //Office Contact No.
            S1G1T2F9  : String(1); //Fax No.
            S1G1T2F10 : String(1); //Email
            S1G1T2F11 : String(1); //District


            // Group 2: Contact Details
            // Type 1: Head of the company (MD / Chariman)
            S1G2T1F1  : String(1); //Name
            S1G2T1F2  : String(1); //Designation
            S1G2T1F3  : String(1); //Email Address
            S1G2T1F4  : String(1); //Contact Number
            S1G2T1F5  : String(1); //Mobile Number
            S1G2T1F6  : String(1); //Nationality
            S1G2T1F7  : String(1); //City
            S1G2T1F8  : String(1); //State
            S1G2T1F9  : String(1); //Postal code/ZIP Code/ PO Box No.
            S1G2T1F10 : String(1); //Last Name

            // Type 2: Authorised Contact Details
            S1G2T2F1  : String(1); //Name
            S1G2T2F2  : String(1); //Other Contact Details
            S1G2T2F3  : String(1); //Designation
            S1G2T2F4  : String(1); //Email Address
            S1G2T2F5  : String(1); //Contact Number
            S1G2T2F6  : String(1); //Nationality
            S1G2T2F7  : String(1); //Passport #
            S1G2T2F8  : String(1); //Mobile Number
            S1G2T2F9  : String(1); //City
            S1G2T2F10 : String(1); //State
            S1G2T2F11 : String(1); //Postal code/ZIP Code/ PO Box No.
              S1G2T2F12 : String(1);//Last Name

            // Group 3: Legal Structure
            // Type 1: Registering office legal structure
            S1G3T1F1  : String(1); //Type of legal structure

            // Group 4: Business Information
            // Type 1: A:: same Business Information type
            S1G4T1F1  : String(1); //Year of establishment
            S1G4T2F1  : String(1); //No. of Employees
            S1G4T3F1  : String(1); //No. of Employees in Engineering
            S1G4T4F1  : String(1); //No. of Employees in Quality
            S1G4T5F1  : String(1); //No. of Employees in Production
            S1G4T6F1  : String(1); //No. of Employees in Administration
            S1G4T7F1  : String(1); //No. of Employees in Other functions
            S1G4T8F1  : String(1); //Type of Business
            S1G4T9F1  : String(1); //Trade License No.

            // Group 5: Supplier Category
            // Type 1: Supplier Category's Information
            S1G5T1F1  : String(1); //Supplier Category
            S1G5T2F1  : String(1); //Supplier Type
            S1G5T3F1 : String(1); //Certificate of Incorporation
            S1G5T4F1 : String(1);//Vendor Sub Type

            // Section 2: Financial Information -------------------------------------------------------
            // Group 1: Payment Information
            // Type 1: Bank Account details
            S2G1T1F1  : String(1); //Bank Name
            S2G1T1F2  : String(1); //Beneficiary Name
            S2G1T1F3  : String(1); //Account Number
            S2G1T1F4  : String(1); //Branch Name
            S2G1T1F5  : String(1); //IBAN Number
            S2G1T1F6  : String(1); //Swift code
            S2G1T1F7  : String(1); //BIC code
            S2G1T1F8  : String(1); //Routing code
            S2G1T1F9  : String(1); //Other Codes
            S2G1T1F10 : String(1); //Bank Country
            S2G1T1F11 : String(1); //Bank Currency
            S2G1T1F12 : String(1);//Other Code Value

            // Type 2: Payment Type
            S2G1T2F10 : String(1); //Payment Method
            S2G1T2F11 : String(1); //Payment Terms / Credit Period
            S2G1T2F12 : String(1); //Invoice Currency

            // Type 3: Value Added Tax (VAT) Information
            S2G1T3F13 : String(1); //VAT Registration Number
            S2G1T3F14 : String(1); //VAT Registration Date

            // Type 4: DUNS Number
            S2G1T4F15 : String(1); //DUNS Number

            // Type 5: Additional Paymenr Details
            S2G1T5F1  : String(1); //Bank Name
            S2G1T5F2  : String(1); ////Other Payment Details
            S2G1T5F3  : String(1); //Beneficiary Name
            S2G1T5F4  : String(1); //Account Number
            S2G1T5F5  : String(1); //Branch Name
            S2G1T5F6  : String(1); //IBAN Number
            S2G1T5F7  : String(1); //Swift code
            S2G1T5F8  : String(1); //Routing code
            S2G1T5F9  : String(1); //Other Codes
            S2G1T5F10 : String(1); //Bank Country
            S2G1T5F11 : String(1); //Bank Currency
            S2G1T5F12 : String(1); //VAT Registration Number
            S2G1T5F13 : String(1); //VAT Registration Date
              S2G1T5F14: String(1); //Other Code Value


            // Group 2: Financial Information
            // Type 1: Bank Account details
            S2G2T1F1  : String(1); //Total Revenue
            S2G2T2F1  : String(1); //Net Profit/Loss
            S2G2T3F1  : String(1); //Total Assets
            S2G2T4F1  : String(1); //Total Equity
            S2G2T5F1  : String(1); //Currency

            // Group 3: Owner's Information
            // Type 1: Owner's Information
            S2G3T1F1  : String(1); //Owner's name
            S2G3T1F2  : String(1); //Add Additional Owner's information
            S2G3T1F3  : String(1); //Owner's Nationality
            S2G3T1F4  : String(1); //Owner's Phone No
            S2G3T1F5  : String(1); //Owner's Passport  No
            S2G3T1F6  : String(1); //Owner's % of ownership

            // Section 3: Operational Information -------------------------------------------------------
            // Group 1: Products / Service description
            // Type 1: Product/service details
            S3G1T1F1  : String(1); // Product Name
            S3G1T1F2  : String(1); // Add additional product information
            S3G1T1F3  : String(1); // Product description
            S3G1T1F4  : String(1); // Category of product
            S3G1T1F5  : String(1); // Type (eg: Products/Services)

            // Group 2: Operational capacity
            // Type 1: Production details
            S3G2T1F1  : String(1); // Production capacity
            // Type 2: Plant location
            S3G2T2F1  : String(1); // Country
            S3G2T2F2  : String(1); // Add additional Operational/production information
            S3G2T2F3  : String(1); // City
            S3G2T2F4  : String(1); // Will this plant will be used to manufacture products/services
            S3G2T2F5  : String(1); // Production capacity
            S3G2T2F6  : String(1); // Lead time to service

            // Group 3: Order Details
            // Type 1: Order size details
            S3G3T1F1  : String(1); // Minimum Order size
            S3G3T1F2  : String(1); // Maximum Order size

            // Group 4: Major Clients / customers
            // Type 1: Major Clients / customers details
            S3G4T1F1  : String(1); // Provide list of major clients / customers
            S3G4T1F2 : String(1); //Customer Name
            S3G4T1F3 : String(1); //Percentage Share of Business in Major Clients / Customers

            // Group 5: Original equipment manufacturer details
            // Type 1: Exclusive Distributor of OEM
            S3G5T1F1  : String(1); // Company Name
            S3G5T1F2  : String(1); // Add Addtional Exclusive Distributor of OEM
            S3G5T1F3  : String(1); // Country
            S3G5T1F4  : String(1); // Category of product

            // Type 2: Non Exclusive Distributor of OEM
            S3G5T2F1  : String(1); // Company Name
            S3G5T2F2  : String(1); // Add Addtional Non Exclusive Distributor of OEM
            S3G5T2F3  : String(1); // Country
            S3G5T2F4  : String(1); // Category of product


            // Section 4: Disclosures -------------------------------------------------------
            // Group 1: Conflict of Interest
            S4G1D1    : String(1);
            // Group 2: Legal case disclosure
            S4G2D1    : String(1);
            // Group 3: Supplier declaration
            S4G3D1    : String(1);
            // Group 4: Academic Discount
            S4G4D1    : String(1);
            // Group 5: Relatives Table
            S4G5D1    : String(1);
            // Group 6: Validation of information submitted
            //     S4G6D1 : String(1);
            // Group 7: REACH compliance
            S4G7D1    : String(1);
            // Group 8: CLP compliance
            S4G8D1    : String(1);
            // Group 9: ITAR and FCPA compliance
            S4G9D1    : String(1);
            S4G9D2    : String(1);
            S4G9D3    : String(1);
            S4G9D4    : String(1);
            // Group 10: IT Equipment and Tools
            S4G10D1   : String(1);
            S4G10D2   : String(1);
            // Group 11: Quality Certificates
            S4G11D1   : String(1);
            // Group 12: Overview
            S4G12D1   : String(1);
            S4G12D2   : String(1);
            S4G12D3   : String(1);
            S4G12D4   : String(1);
            S4G12D5   : String(1);
            S4G12D6   : String(1);
            S4G12D7   : String(1);
            S4G12D8   : String(1);
            S4G12D9   : String(1);
            S4G12D10  : String(1);
            // Group 13: Suppliers/ input material
            S4G13D1   : String(1);
            S4G13D2   : String(1);
            S4G13D3   : String(1);
            S4G13D4   : String(1);
            S4G13D5   : String(1);
            S4G13D6   : String(1);
            // Group 14: Production
            S4G14D1   : String(1);
            S4G14D2   : String(1);
            S4G14D3   : String(1);
            S4G14D4   : String(1);
            S4G14D5   : String(1);
            S4G14D6   : String(1);
            S4G14D7   : String(1);
            S4G14D8   : String(1);
            S4G14D9   : String(1);
            S4G14D10  : String(1);
            S4G14D11  : String(1);
            S4G14D12  : String(1);
            S4G14D13  : String(1);
            // Group 15: Storage
            S4G15D1   : String(1);
            S4G15D2   : String(1);
            S4G15D3   : String(1);
            S4G15D4   : String(1);
            // Group 16: Customer service
            S4G16D1   : String(1);
            // Group 17: Customer service
            S4G17D1   : String(1);
            S4G17D2   : String(1);
            // Group 18: Health; Safety & Environment
            S4G18D1   : String(1);
            S4G18D2   : String(1);
            S4G18D3   : String(1);
            S4G18D4   : String(1);
            // Group 18: Export Complaince
            S4G19D1   : String(1);
            S4G19D2   : String(1);
            // Section 5: Attachments -------------------------------------------------------
            // Attachment 5.1: Company Profile
            S5A1F1    : String(1);
            // Attachment 5.2: Catalogue of Products / services
            S5A2F1    : String(1);
            // Attachment 5.3: Production/Quality Resources
            S5A3F1    : String(1);
            // Attachment 5.4: Power of Attorney
            S5A4F1    : String(1);
            // Attachment 5.5: Passport Copy of Authorized Signatory
            S5A5F1    : String(1);
            S5A5F3    : String(1); // UID copy
            // Attachment 5.6: Passport  Representative / Authorized person
            S5A5F2    : String(1);
            S5A5F4    : String(1); // UID copy

            // Attachment 5.7: Bank Account letter issued by the Bank (In Bank's letterhead)
            S5A6F1    : String(1);
            // Attachment 5.8: If UAE Company
            S5A7F1    : String(1);
            // Attachment 5.9: If UAE Company
            S5A7F2    : String(1);
            // Attachment 5.10: Do you issue an Electronic Tax Invoice
            S5A9F1    : String(1);
            // Attachment 5.11: TRN Certificate
            S5A10F1   : String(1);
            // Attachment 5.12: Chamber of Commerce certificate
            S5A11F1   : String(1);
            // Attachment 5.14: Are you a Sole Agent / Distributor / Dealer for a manufacturer / service provider
            S5A12F1   : String(1);
            // Attachment 5.15: Signed  Non-disclosure Agreement (NDA)
            S5A13F1   : String(1);
            // Attachment 5.16: Financial Statement of the past three recorded years
            S5A14F1   : String(1);
            // Attachment 5.17: ISO Certificate
            S5A15F1   : String(1);
            // Attachment 5.19: Other Quality certificates
            S5A16F1   : String(1);
            // Attachment 5.20: List of Major Customers
            S5A17F1   : String(1);
            // Attachment 5.21: List of Major Suppliers
            S5A18F1   : String(1);
            // Attachment 5.22: List of references
            S5A19F1   : String(1);
            // Attachment 5.23: Signed and stamped NIMR PO terms and conditions
            S5A20F1   : String(1);
            // Attachment 5.24: all Agency /distributorship Agreement endorse by OEM
            S5A21F1   : String(1);
            // Attachment for Other attachment
            S5A22F1   : String(1);
            // Section 7: Acknowledgment -------------------------------------------------------
            // Attachment 5.1: Acknowledgment fields
            S7G1D1    : String(1); // Completed by
            S7G1D2    : String(1); // Designation
            S7G1D3    : String(1); // Date
            S7G1D4    : String(1); // Validation of information submitted
    }

    entity MASTER_REGFORM_FIELDS_UPDATED {
        key REQ_NO    : Int64 not null;
            // Section 1: General Information -------------------------------------------------------
            // Group 1: Company Information
            // Type 1: Head Quarter Information
            S1G1T1F1  : String(1); //Company Name (English);
            S1G1T1F2  : String(1); //Company Name (Arabic);
            S1G1T1F3  : String(1); //Mailing Address
            S1G1T1F13 : String(1); //Street 2
            S1G1T1F14 : String(1); //Street 3
            S1G1T1F15 : String(1); //Street 4
            S1G1T1F4  : String(1); //City
            S1G1T1F5  : String(1); //State
            S1G1T1F6  : String(1); //Country
            S1G1T1F7  : String(1); //Postal code
            S1G1T1F8  : String(1); //Contact No.
            S1G1T1F9  : String(1); //Fax No.
            S1G1T1F10 : String(1); //Email
            S1G1T1F11 : String(1); //Website
            S1G1T1F12 : String(1); //District
            S1G1T1F16 :String(1);//Street No.

            // Type 2: Other Office details
            S1G1T2F1  : String(1); //Whole Table - Registering Office Details
            S1G1T2F2  : String(1); //Add Additional Other Office Details
            S1G1T2F3  : String(1); //Office Address - Street 1
            S1G1T2F12 : String(1); //Street 2
            S1G1T2F13 : String(1); //Street 3
            S1G1T2F14 : String(1); //Street 4
              S1G1T2F15 : String(1);//Street No.
            S1G1T2F4  : String(1); //City
            S1G1T2F5  : String(1); //State
            S1G1T2F6  : String(1); //Country
            S1G1T2F7  : String(1); //Postal code/ZIP Code/ PO Box No.
            S1G1T2F8  : String(1); //Office Contact No.
            S1G1T2F9  : String(1); //Fax No.
            S1G1T2F10 : String(1); //Email
            S1G1T2F11 : String(1); //District

            // Group 2: Contact Details
            // Type 1: Head of the company (MD / Chariman)
            S1G2T1F1  : String(1); //Name
            S1G2T1F2  : String(1); //Designation
            S1G2T1F3  : String(1); //Email Address
            S1G2T1F4  : String(1); //Contact Number
            S1G2T1F5  : String(1); //Mobile Number
            S1G2T1F6  : String(1); //Nationality
            S1G2T1F7  : String(1); //City
            S1G2T1F8  : String(1); //State
            S1G2T1F9  : String(1); //Postal code/ZIP Code/ PO Box No.
             S1G2T1F10 : String(1); //Last Name

            // Type 2: Authorised Contact Details
            S1G2T2F1  : String(1); //Name
            S1G2T2F2  : String(1); //Other Contact Details
            S1G2T2F3  : String(1); //Designation
            S1G2T2F4  : String(1); //Email Address
            S1G2T2F5  : String(1); //Contact Number
            S1G2T2F6  : String(1); //Nationality
            S1G2T2F7  : String(1); //Passport #
            S1G2T2F8  : String(1); //Mobile Number
            S1G2T2F9  : String(1); //City
            S1G2T2F10 : String(1); //State
            S1G2T2F11 : String(1); //Postal code/ZIP Code/ PO Box No.
            S1G2T2F12 : String(1);//Last Name

            // Group 3: Legal Structure
            // Type 1: Registering office legal structure
            S1G3T1F1  : String(1); //Type of legal structure

            // Group 4: Business Information
            // Type 1: A;; same Business Information type
            S1G4T1F1  : String(1); //Year of establishment
            S1G4T2F1  : String(1); //No. of Employees
            S1G4T3F1  : String(1); //No. of Employees in Engineering
            S1G4T4F1  : String(1); //No. of Employees in Quality
            S1G4T5F1  : String(1); //No. of Employees in Production
            S1G4T6F1  : String(1); //No. of Employees in Administration
            S1G4T7F1  : String(1); //No. of Employees in Other functions
            S1G4T8F1  : String(1); //Type of Business
            S1G4T9F1  : String(1); //Trade License No.

            // Group 5: Supplier Category
            // Type 1: Supplier Category's Information
            S1G5T1F1  : String(1); //Supplier Category
            S1G5T2F1  : String(1); //Supplier Type
               S1G5T3F1 : String(1); //Certificate of Incorporation
                S1G5T4F1 : String(1);//Vendor Sub Type

            // Section 2: Financial Information -------------------------------------------------------
            // Group 1: Payment Information
            // Type 1: Bank Account details
            S2G1T1F1  : String(1); //Bank Name
            S2G1T1F2  : String(1); //Beneficiary Name
            S2G1T1F3  : String(1); //Account Number
            S2G1T1F4  : String(1); //Branch Name
            S2G1T1F5  : String(1); //IBAN Number
            S2G1T1F6  : String(1); //Swift code
            S2G1T1F7  : String(1); //BIC code
            S2G1T1F8  : String(1); //Routing code
            S2G1T1F9  : String(1); //Other Codes
            S2G1T1F10 : String(1); //Bank Country
            S2G1T1F11 : String(1); //Bank Currency
              S2G1T1F12 : String(1);//Other Code Value

            // Type 2: Payment Type
            S2G1T2F10 : String(1); //Payment Method
            S2G1T2F11 : String(1); //Payment Terms / Credit Period
            S2G1T2F12 : String(1); //Invoice Currency

            // Type 3: Value Added Tax (VAT) Information
            S2G1T3F13 : String(1); //VAT Registration Number
            S2G1T3F14 : String(1); //VAT Registration Date

            // Type 4: DUNS Number
            S2G1T4F15 : String(1); //DUNS Number

            // Type 5: Additional Paymenr Details
            S2G1T5F1  : String(1); //Bank Name
            S2G1T5F2  : String(1); ////Other Payment Details
            S2G1T5F3  : String(1); //Beneficiary Name
            S2G1T5F4  : String(1); //Account Number
            S2G1T5F5  : String(1); //Branch Name
            S2G1T5F6  : String(1); //IBAN Number
            S2G1T5F7  : String(1); //Swift code
            S2G1T5F8  : String(1); //Routing code
            S2G1T5F9  : String(1); //Other Codes
            S2G1T5F10 : String(1); //Bank Country
            S2G1T5F11 : String(1); //Bank Currency
            S2G1T5F12 : String(1); //VAT Registration Number
            S2G1T5F13 : String(1); //VAT Registration Date
              S2G1T5F14: String(1); //Other Code Value


            // Group 2: Financial Information
            // Type 1: Bank Account details
            S2G2T1F1  : String(1); //Total Revenue
            S2G2T2F1  : String(1); //Net Profit/Loss
            S2G2T3F1  : String(1); //Total Assets
            S2G2T4F1  : String(1); //Total Equity
            S2G2T5F1  : String(1); //Currency

            // Group 3: Owner's Information
            // Type 1: Owner's Information
            S2G3T1F1  : String(1); //Owner's name
            S2G3T1F2  : String(1); //Add Additional Owner's information
            S2G3T1F3  : String(1); //Owner's Nationality
            S2G3T1F4  : String(1); //Owner's Phone No
            S2G3T1F5  : String(1); //Owner's Passport  No
            S2G3T1F6  : String(1); //Owner's % of ownership

            // Section 3: Operational Information -------------------------------------------------------
            // Group 1: Products / Service description
            // Type 1: Product/service details
            S3G1T1F1  : String(1); // Product Name
            S3G1T1F2  : String(1); // Add additional product information
            S3G1T1F3  : String(1); // Product description
            S3G1T1F4  : String(1); // Category of product
            S3G1T1F5  : String(1); // Type (eg: Products/Services)

            // Group 2: Operational capacity
            // Type 1: Production details
            S3G2T1F1  : String(1); // Production capacity
            // Type 2: Plant location
            S3G2T2F1  : String(1); // Country
            S3G2T2F2  : String(1); // Add additional Operational/production information
            S3G2T2F3  : String(1); // City
            S3G2T2F4  : String(1); // Will this plant will be used to manufacture products/services
            S3G2T2F5  : String(1); // Production capacity
            S3G2T2F6  : String(1); // Lead time to service

            // Group 3: Order Details
            // Type 1: Order size details
            S3G3T1F1  : String(1); // Minimum Order size
            S3G3T1F2  : String(1); // Maximum Order size

            // Group 4: Major Clients / customers
            // Type 1: Major Clients / customers details
            S3G4T1F1  : String(1); // Provide list of major clients / customers
             S3G4T1F2 : String(1); //Customer Name
            S3G4T1F3 : String(1); //Percentage Share of Business in Major Clients / Customers


            // Group 5: Original equipment manufacturer details
            // Type 1: Exclusive Distributor of OEM
            S3G5T1F1  : String(1); // Company Name
            S3G5T1F2  : String(1); // Add Addtional Exclusive Distributor of OEM
            S3G5T1F3  : String(1); // Country
            S3G5T1F4  : String(1); // Category of product

            // Type 2: Non Exclusive Distributor of OEM
            S3G5T2F1  : String(1); // Company Name
            S3G5T2F2  : String(1); // Add Addtional Non Exclusive Distributor of OEM
            S3G5T2F3  : String(1); // Country
            S3G5T2F4  : String(1); // Category of product


            // Section 4: Disclosures -------------------------------------------------------
            // Group 1: Conflict of Interest
            S4G1D1    : String(1);
            // Group 2: Legal case disclosure
            S4G2D1    : String(1);
            // Group 3: Supplier declaration
            S4G3D1    : String(1);
            // Group 4: Academic Discount
            S4G4D1    : String(1);
            // Group 5: Relatives Table
            S4G5D1    : String(1);
            // Group 6: Validation of information submitted
            //     S4G6D1 : String(1);
            // Group 7: REACH compliance
            S4G7D1    : String(1);
            // Group 8: CLP compliance
            S4G8D1    : String(1);
            // Group 9: ITAR and FCPA compliance
            S4G9D1    : String(1);
            S4G9D2    : String(1);
            S4G9D3    : String(1);
            S4G9D4    : String(1);
            // Group 10: IT Equipment and Tools
            S4G10D1   : String(1);
            S4G10D2   : String(1);
            // Group 11: Quality Certificates
            S4G11D1   : String(1);
            // Group 12: Overview
            S4G12D1   : String(1);
            S4G12D2   : String(1);
            S4G12D3   : String(1);
            S4G12D4   : String(1);
            S4G12D5   : String(1);
            S4G12D6   : String(1);
            S4G12D7   : String(1);
            S4G12D8   : String(1);
            S4G12D9   : String(1);
            S4G12D10  : String(1);
            // Group 13: Suppliers/ input material
            S4G13D1   : String(1);
            S4G13D2   : String(1);
            S4G13D3   : String(1);
            S4G13D4   : String(1);
            S4G13D5   : String(1);
            S4G13D6   : String(1);
            // Group 14: Production
            S4G14D1   : String(1);
            S4G14D2   : String(1);
            S4G14D3   : String(1);
            S4G14D4   : String(1);
            S4G14D5   : String(1);
            S4G14D6   : String(1);
            S4G14D7   : String(1);
            S4G14D8   : String(1);
            S4G14D9   : String(1);
            S4G14D10  : String(1);
            S4G14D11  : String(1);
            S4G14D12  : String(1);
            S4G14D13  : String(1);
            // Group 15: Storage
            S4G15D1   : String(1);
            S4G15D2   : String(1);
            S4G15D3   : String(1);
            S4G15D4   : String(1);
            // Group 16: Customer service
            S4G16D1   : String(1);
            // Group 17: Customer service
            S4G17D1   : String(1);
            S4G17D2   : String(1);
            // Group 18: Health, Safety & Environment
            S4G18D1   : String(1);
            S4G18D2   : String(1);
            S4G18D3   : String(1);
            S4G18D4   : String(1);
            // Group 18: Export Complaince
            S4G19D1   : String(1);
            S4G19D2   : String(1);
            // Section 5: Attachments -------------------------------------------------------
            // Attachment 5.1: Company Profile
            S5A1F1    : String(1);
            // Attachment 5.2: Catalogue of Products / services
            S5A2F1    : String(1);
            // Attachment 5.3: Production/Quality Resources
            S5A3F1    : String(1);
            // Attachment 5.4: Power of Attorney
            S5A4F1    : String(1);
            // Attachment 5.5: Passport Copy of Authorized Signatory
            S5A5F1    : String(1);
            S5A5F3    : String(1); // UID copy
            // Attachment 5.6: Passport  Representative / Authorized person
            S5A5F2    : String(1);
            S5A5F4    : String(1); // UID copy

            // Attachment 5.7: Bank Account letter issued by the Bank (In Bank's letterhead)
            S5A6F1    : String(1);
            // Attachment 5.8: If UAE Company
            S5A7F1    : String(1);
            // Attachment 5.9: If UAE Company
            S5A7F2    : String(1);
            // Attachment 5.10: Do you issue an Electronic Tax Invoice
            S5A9F1    : String(1);
            // Attachment 5.11: TRN Certificate
            S5A10F1   : String(1);
            // Attachment 5.12: Chamber of Commerce certificate
            S5A11F1   : String(1);
            // Attachment 5.14: Are you a Sole Agent / Distributor / Dealer for a manufacturer / service provider
            S5A12F1   : String(1);
            // Attachment 5.15: Signed  Non-disclosure Agreement (NDA)
            S5A13F1   : String(1);
            // Attachment 5.16: Financial Statement of the past three recorded years
            S5A14F1   : String(1);
            // Attachment 5.17: ISO Certificate
            S5A15F1   : String(1);
            // Attachment 5.19: Other Quality certificates
            S5A16F1   : String(1);
            // Attachment 5.20: List of Major Customers
            S5A17F1   : String(1);
            // Attachment 5.21: List of Major Suppliers
            S5A18F1   : String(1);
            // Attachment 5.22: List of references
            S5A19F1   : String(1);
            // Attachment 5.23: Signed and stamped NIMR PO terms and conditions
            S5A20F1   : String(1);
            // Attachment 5.24: all Agency /distributorship Agreement endorse by OEM
            S5A21F1   : String(1);
            // Attachment for Other attachment
            S5A22F1   : String(1);
            // Section 7: Acknowledgment -------------------------------------------------------
            // Attachment 5.1: Acknowledgment fields
            S7G1D1    : String(1); // Completed by
            S7G1D2    : String(1); // Designation
            S7G1D3    : String(1); // Date
            S7G1D4    : String(1); // Validation of information submitted

    }

    entity MASTER_REGFORM_FIELDS_VISIBLE {
        key CCODE     : String(10);
        key TYPE      : Integer;
            // Section 1: General Information -------------------------------------------------------
            // Group 1: Company Information
            // Type 1: Head Quarter Information
            S1G1T1F1  : String(1); //Company Name (English)
            S1G1T1F2  : String(1); //Company Name (Arabic)
            S1G1T1F3  : String(1); //Mailing Address
            S1G1T1F13 : String(1); //Street 2
            S1G1T1F14 : String(1); //Street 3
            S1G1T1F15 : String(1); //Street 4
            S1G1T1F4  : String(1); //City
            S1G1T1F5  : String(1); //State
            S1G1T1F6  : String(1); //Country
            S1G1T1F7  : String(1); //Postal code
            S1G1T1F8  : String(1); //Contact No.
            S1G1T1F9  : String(1); //Fax No.
            S1G1T1F10 : String(1); //Email
            S1G1T1F11 : String(1); //Website
            S1G1T1F12 : String(1); //District
            S1G1T1F16 :String(1);//Street No.

            // Type 2: Other Office details
            S1G1T2F1  : String(1); //Whole Table - Registering Office Details
            S1G1T2F2  : String(1); //Add Additional Other Office Details
            S1G1T2F3  : String(1); //Office Address - Street 1
            S1G1T2F12 : String(1); //Street 2
            S1G1T2F13 : String(1); //Street 3
            S1G1T2F14 : String(1); //Street 4
            S1G1T2F15 : String(1);//Street No.
            S1G1T2F4  : String(1); //City
            S1G1T2F5  : String(1); //State
            S1G1T2F6  : String(1); //Country
            S1G1T2F7  : String(1); //Postal code/ZIP Code/ PO Box No.
            S1G1T2F8  : String(1); //Office Contact No.
            S1G1T2F9  : String(1); //Fax No.
            S1G1T2F10 : String(1); //Email
            S1G1T2F11 : String(1); //District

            // Group 2: Contact Details
            // Type 1: Head of the company (MD / Chariman)
            S1G2T1F1  : String(1); //Name
            S1G2T1F2  : String(1); //Designation
            S1G2T1F3  : String(1); //Email Address
            S1G2T1F4  : String(1); //Contact Number
            S1G2T1F5  : String(1); //Mobile Number
            S1G2T1F6  : String(1); //Nationality
            S1G2T1F7  : String(1); //City
            S1G2T1F8  : String(1); //State
            S1G2T1F9  : String(1); //Postal code/ZIP Code/ PO Box No.
             S1G2T1F10 : String(1); //Last Name

            // Type 2: Authorised Contact Details
            S1G2T2F1  : String(1); //Name
            S1G2T2F2  : String(1); //Other Contact Details
            S1G2T2F3  : String(1); //Designation
            S1G2T2F4  : String(1); //Email Address
            S1G2T2F5  : String(1); //Contact Number
            S1G2T2F6  : String(1); //Nationality
            S1G2T2F7  : String(1); //Passport #
            S1G2T2F8  : String(1); //Mobile Number
            S1G2T2F9  : String(1); //City
            S1G2T2F10 : String(1); //State
            S1G2T2F11 : String(1); //Postal code/ZIP Code/ PO Box No.
              S1G2T2F12 : String(1);//Last Name

            // Group 3: Legal Structure
            // Type 1: Registering office legal structure
            S1G3T1F1  : String(1); //Type of legal structure

            // Group 4: Business Information
            // Type 1: A;; same Business Information type
            S1G4T1F1  : String(1); //Year of establishment
            S1G4T2F1  : String(1); //No. of Employees
            S1G4T3F1  : String(1); //No. of Employees in Engineering
            S1G4T4F1  : String(1); //No. of Employees in Quality
            S1G4T5F1  : String(1); //No. of Employees in Production
            S1G4T6F1  : String(1); //No. of Employees in Administration
            S1G4T7F1  : String(1); //No. of Employees in Other functions
            S1G4T8F1  : String(1); //Type of Business
            S1G4T9F1  : String(1); //Trade License No.

            // Group 5: Supplier Category
            // Type 1: Supplier Category's Information
            S1G5T1F1  : String(1); //Supplier Category
            S1G5T2F1  : String(1); //Supplier Type
            S1G5T3F1 : String(1); //Certificate of Incorporation
             S1G5T4F1 : String(1);//Vendor Sub Type

            // Section 2: Financial Information -------------------------------------------------------
            // Group 1: Payment Information
            // Type 1: Bank Account details
            S2G1T1F1  : String(1); //Bank Name
            S2G1T1F2  : String(1); //Beneficiary Name
            S2G1T1F3  : String(1); //Account Number
            S2G1T1F4  : String(1); //Branch Name
            S2G1T1F5  : String(1); //IBAN Number
            S2G1T1F6  : String(1); //Swift code
            S2G1T1F7  : String(1); //BIC code
            S2G1T1F8  : String(1); //Routing code
            S2G1T1F9  : String(1); //Other Codes
            S2G1T1F10 : String(1); //Bank Country
            S2G1T1F11 : String(1); //Bank Currency
              S2G1T1F12 : String(1);//Other Code Value

            // Type 2: Payment Type
            S2G1T2F10 : String(1); //Payment Method
            S2G1T2F11 : String(1); //Payment Terms / Credit Period
            S2G1T2F12 : String(1); //Invoice Currency

            // Type 3: Value Added Tax (VAT) Information
            S2G1T3F13 : String(1); //VAT Registration Number
            S2G1T3F14 : String(1); //VAT Registration Date

            // Type 4: DUNS Number
            S2G1T4F15 : String(1); //DUNS Number

            // Type 5: Additional Paymenr Details
            S2G1T5F1  : String(1); //Bank Name
            S2G1T5F2  : String(1); ////Other Payment Details
            S2G1T5F3  : String(1); //Beneficiary Name
            S2G1T5F4  : String(1); //Account Number
            S2G1T5F5  : String(1); //Branch Name
            S2G1T5F6  : String(1); //IBAN Number
            S2G1T5F7  : String(1); //Swift code
            S2G1T5F8  : String(1); //Routing code
            S2G1T5F9  : String(1); //Other Codes
            S2G1T5F10 : String(1); //Bank Country
            S2G1T5F11 : String(1); //Bank Currency
            S2G1T5F12 : String(1); //VAT Registration Number
            S2G1T5F13 : String(1); //VAT Registration Date
            S2G1T5F14: String(1); //Other Code Value


            // Group 2: Financial Information
            // Type 1: Bank Account details
            S2G2T1F1  : String(1); //Total Revenue
            S2G2T2F1  : String(1); //Net Profit/Loss
            S2G2T3F1  : String(1); //Total Assets
            S2G2T4F1  : String(1); //Total Equity
            S2G2T5F1  : String(1); //Currency

            // Group 3: Owner's Information
            // Type 1: Owner's Information
            S2G3T1F1  : String(1); //Owner's name
            S2G3T1F2  : String(1); //Add Additional Owner's information
            S2G3T1F3  : String(1); //Owner's Nationality
            S2G3T1F4  : String(1); //Owner's Phone No
            S2G3T1F5  : String(1); //Owner's Passport  No
            S2G3T1F6  : String(1); //Owner's % of ownership

            // Section 3: Operational Information -------------------------------------------------------
            // Group 1: Products / Service description
            // Type 1: Product/service details
            S3G1T1F1  : String(1); // Product Name
            S3G1T1F2  : String(1); // Add additional product information
            S3G1T1F3  : String(1); // Product description
            S3G1T1F4  : String(1); // Category of product
            S3G1T1F5  : String(1); // Type (eg: Products/Services)

            // Group 2: Operational capacity
            // Type 1: Production details
            S3G2T1F1  : String(1); // Production capacity
            // Type 2: Plant location
            S3G2T2F1  : String(1); // Country
            S3G2T2F2  : String(1); // Add additional Operational/production information
            S3G2T2F3  : String(1); // City
            S3G2T2F4  : String(1); // Will this plant will be used to manufacture products/services
            S3G2T2F5  : String(1); // Production capacity
            S3G2T2F6  : String(1); // Lead time to service

            // Group 3: Order Details
            // Type 1: Order size details
            S3G3T1F1  : String(1); // Minimum Order size
            S3G3T1F2  : String(1); // Maximum Order size

            // Group 4: Major Clients / customers
            // Type 1: Major Clients / customers details
            S3G4T1F1  : String(1); // Provide list of major clients / customers
             S3G4T1F2 : String(1); //Customer Name
            S3G4T1F3 : String(1); //Percentage Share of Business in Major Clients / Customers


            // Group 5: Original equipment manufacturer details
            // Type 1: Exclusive Distributor of OEM
            S3G5T1F1  : String(1); // Company Name
            S3G5T1F2  : String(1); // Add Addtional Exclusive Distributor of OEM
            S3G5T1F3  : String(1); // Country
            S3G5T1F4  : String(1); // Category of product

            // Type 2: Non Exclusive Distributor of OEM
            S3G5T2F1  : String(1); // Company Name
            S3G5T2F2  : String(1); // Add Addtional Non Exclusive Distributor of OEM
            S3G5T2F3  : String(1); // Country
            S3G5T2F4  : String(1); // Category of product


            // Section 4: Disclosures -------------------------------------------------------
            // Group 1: Conflict of Interest
            S4G1D1    : String(1);
            // Group 2: Legal case disclosure
            S4G2D1    : String(1);
            // Group 3: Supplier declaration
            S4G3D1    : String(1);
            // Group 4: Academic Discount
            S4G4D1    : String(1);
            // Group 5: Relatives Table
            S4G5D1    : String(1);
            // Group 6: Validation of information submitted
            //    S4G6D1 : String(1);
            // Group 7: REACH compliance
            S4G7D1    : String(1);
            // Group 8: CLP compliance
            S4G8D1    : String(1);
            // Group 9: ITAR and FCPA compliance
            S4G9D1    : String(1);
            S4G9D2    : String(1);
            S4G9D3    : String(1);
            S4G9D4    : String(1);
            // Group 10: IT Equipment and Tools
            S4G10D1   : String(1);
            S4G10D2   : String(1);
            // Group 11: Quality Certificates
            S4G11D1   : String(1);
            // Group 12: Overview
            S4G12D1   : String(1);
            S4G12D2   : String(1);
            S4G12D3   : String(1);
            S4G12D4   : String(1);
            S4G12D5   : String(1);
            S4G12D6   : String(1);
            S4G12D7   : String(1);
            S4G12D8   : String(1);
            S4G12D9   : String(1);
            S4G12D10  : String(1);
            // Group 13: Suppliers/ input material
            S4G13D1   : String(1);
            S4G13D2   : String(1);
            S4G13D3   : String(1);
            S4G13D4   : String(1);
            S4G13D5   : String(1);
            S4G13D6   : String(1);
            // Group 14: Production
            S4G14D1   : String(1);
            S4G14D2   : String(1);
            S4G14D3   : String(1);
            S4G14D4   : String(1);
            S4G14D5   : String(1);
            S4G14D6   : String(1);
            S4G14D7   : String(1);
            S4G14D8   : String(1);
            S4G14D9   : String(1);
            S4G14D10  : String(1);
            S4G14D11  : String(1);
            S4G14D12  : String(1);
            S4G14D13  : String(1);
            // Group 15: Storage
            S4G15D1   : String(1);
            S4G15D2   : String(1);
            S4G15D3   : String(1);
            S4G15D4   : String(1);
            // Group 16: Customer service
            S4G16D1   : String(1);
            // Group 17: Customer service
            S4G17D1   : String(1);
            S4G17D2   : String(1);
            // Group 18: Health, Safety & Environment
            S4G18D1   : String(1);
            S4G18D2   : String(1);
            S4G18D3   : String(1);
            S4G18D4   : String(1);
            // Group 18: Export Complaince
            S4G19D1   : String(1);
            S4G19D2   : String(1);
            // Section 5: Attachments -------------------------------------------------------
            // Attachment 5.1: Company Profile
            S5A1F1    : String(1);
            // Attachment 5.2: Catalogue of Products / services
            S5A2F1    : String(1);
            // Attachment 5.3: Production/Quality Resources
            S5A3F1    : String(1);
            // Attachment 5.4: Power of Attorney
            S5A4F1    : String(1);
            // Attachment 5.5: Passport Copy of Authorized Signatory
            S5A5F1    : String(1);
            S5A5F3    : String(1); // UID copy
            // Attachment 5.6: Passport  Representative / Authorized person
            S5A5F2    : String(1);
            S5A5F4    : String(1); // UID copy

            // Attachment 5.7: Bank Account letter issued by the Bank (In Bank's letterhead)
            S5A6F1    : String(1);
            // Attachment 5.8: If UAE Company
            S5A7F1    : String(1);
            // Attachment 5.9: If UAE Company
            S5A7F2    : String(1);
            // Attachment 5.10: Do you issue an Electronic Tax Invoice
            S5A9F1    : String(1);
            // Attachment 5.11: TRN Certificate
            S5A10F1   : String(1);
            // Attachment 5.12: Chamber of Commerce certificate
            S5A11F1   : String(1);
            // Attachment 5.14: Are you a Sole Agent / Distributor / Dealer for a manufacturer / service provider
            S5A12F1   : String(1);
            // Attachment 5.15: Signed  Non-disclosure Agreement (NDA)
            S5A13F1   : String(1);
            // Attachment 5.16: Financial Statement of the past three recorded years
            S5A14F1   : String(1);
            // Attachment 5.17: ISO Certificate
            S5A15F1   : String(1);
            // Attachment 5.19: Other Quality certificates
            S5A16F1   : String(1);
            // Attachment 5.20: List of Major Customers
            S5A17F1   : String(1);
            // Attachment 5.21: List of Major Suppliers
            S5A18F1   : String(1);
            // Attachment 5.22: List of references
            S5A19F1   : String(1);
            // Attachment 5.23: Signed and stamped NIMR PO terms and conditions
            S5A20F1   : String(1);
            // Attachment 5.24: all Agency /distributorship Agreement endorse by OEM
            S5A21F1   : String(1);
            // Attachment for Other attachment
            S5A22F1   : String(1);
            // Section 7: Acknowledgment -------------------------------------------------------
            // Attachment 5.1: Acknowledgment fields
            S7G1D1    : String(1); // Completed by
            S7G1D2    : String(1); // Designation
            S7G1D3    : String(1); // Date
            S7G1D4    : String(1); // Validation of information submitted
    }

    entity DATA_MIGRATION_FIELD_CONFIGURATION {
        key FIELD_ID     : String(10);
        key GROUP        : String(100);
            IS_MANDATORY : String(1);
            IS_VISIBLE   : String(1);
    }

    entity MASTER_DATA_MIGRATION_FIELDS_ID_DESC {

        key FIELD_ID    : String(10);
            DESCRIPTION : String(500);
            GROUP       : String(100);
    }

    entity MASTER_APPROVAL_HIERARCHY {
        key HIERARCHY_ID    : String(10);
        key TYPE            : String(10);
            ENTITY_CODE     : String(10);
            LEVEL           : Integer;
            ROLE_CODE       : String(10);
            ACCESS_EDIT     : String(1);
            ACCESS_APPROVE  : String(1);
            ACCESS_SENDBACK : String(1);
            ACCESS_REJECT   : String(1);

            //new change
            TO_ENTITY_CODE : Association to one MASTER_ENTITY_CODE
                        on TO_ENTITY_CODE.BUKRS = ENTITY_CODE;
            
          
    }   

    entity MASTER_APPROVAL_MATRIX {
        key HIERARCHY_ID : String(10);
        key TYPE         : String(10);
            USER_IDS     : String(1000);     
    }      

    //Hierarchy Implementation Start      

    entity MASTER_APPROVAL_HIERARCHY_FE:cuid {    
            // @readonly                   
            @readonly @mandatory APPR_TYPE       : String(10);         
            // @readonly 
            @mandatory @readonly ENTITY_CODE     : String(10);
            @mandatory USER_ID         : String(1000)  @Communication.IsEmailAddress;   
            @readonly @mandatory APPROVER_LEVEL           : Integer  @assert.range: [1,1000];   
            @mandatory USER_ROLE       : String(10);       
            ACCESS_EDIT     : Boolean default false;   
            ACCESS_APPROVE  : Boolean default false;
            ACCESS_SENDBACK : Boolean default false;
            ACCESS_REJECT   : Boolean default false;          
            TO_ENTITY_CODE : Association to one MASTER_ENTITY_CODE
                        on TO_ENTITY_CODE.BUKRS = ENTITY_CODE;   
            TO_ROLE: Association to one MASTER_USER_ROLE on TO_ROLE.CODE=USER_ROLE;    
            TO_ENTITY_TYPE: Association to MASTER_ENTITY_TYPE_FE;  
            TO_APPR_TYPE: Association to one MASTER_APPROVAL_TYPE on TO_APPR_TYPE.CODE=APPR_TYPE;         
    }             
    entity MASTER_APPROVAL_TYPE{
        key CODE:String(10);
        DESC:String(50);                           
    }            
     
    @assert.unique.name:[APPR_TYPE, ENTITY_CODE]
    // @assert.unique:[APPR_TYPE, ENTITY_CODE]    
    entity MASTER_ENTITY_TYPE_FE:cuid{    
        @mandatory APPR_TYPE : String(10);     
        @mandatory ENTITY_CODE : String(10);        
        TO_ENTITY_CODE : Association to one MASTER_ENTITY_CODE
                        on TO_ENTITY_CODE.BUKRS = ENTITY_CODE;   
        TO_HIERARCHY: Composition of many MASTER_APPROVAL_HIERARCHY_FE on TO_HIERARCHY.TO_ENTITY_TYPE=$self;
        TO_APPR_TYPE: Association to one MASTER_APPROVAL_TYPE on TO_APPR_TYPE.CODE=APPR_TYPE;
    }    
      
    //Hierarchy Implementation End

    //Fiori Elements User Master Conversion Start

    @assert.unique.name:[USER_ID, EMAIL]
    entity MASTER_IVEN_USERS_FIORI:cuid,managed{
        SR_NO            : Integer;
        
        @mandatory USER_ID    : String(50);
        @mandatory @readonly USER_NAME : String(500);    
        @mandatory @readonly EMAIL    : String(150);    
        EMP_NO           : String(100);   
        ACTIVE           : String(1);
        TO_USER_ROLES     : Composition of many MASTER_USER_ROLE_CODES_FIORI
                                on TO_USER_ROLES.TO_USER=$self;
        TO_USER_ENTITIES : Composition of many MASTER_USER_ENTITY_CODES_FIORI
                                on TO_USER_ENTITIES.TO_USER = $self;       
    }

    entity MASTER_USER_ENTITY_CODES_FIORI:cuid{     
        @readonly @mandatory USER_ID         : String(50);
        @mandatory ENTITY_CODE     : String(50);
        @readonly @mandatory EMAIL           : String(150);
        TO_ENTITY_CODE  : Association to one MASTER_ENTITY_CODE
                          on TO_ENTITY_CODE.BUKRS = ENTITY_CODE;                  
        TO_USER: Association to MASTER_IVEN_USERS_FIORI;                  
    }

    entity MASTER_USER_ROLE_CODES_FIORI:cuid{
        @readonly @mandatory USER_ID     : String(50);
        @mandatory USER_ROLE   : String(50);
        @readonly @mandatory EMAIL       : String(150);  
        TO_ROLE: Association to one MASTER_USER_ROLE on TO_ROLE.CODE=USER_ROLE;  
        TO_USER: Association to MASTER_IVEN_USERS_FIORI;    
    }

    //Fiori Elements User Master Conversion End

    //EMail Content Start
    entity MASTER_EMAIL_CONTENT{     
        key ACTION: String(25);
        key APP_TYPE: String(25);
        REQ_TYPE:String(25);    
        APP_LINK:String(200);   
        SUBJECT:String(250);
        BODY:String;     
        SUPPORT_MSG:String(500);
        APP_LINK_MSG:String(500);
        INFO_MSG:String(500);
        CLOSING_MSG:String(500);
        AUTOGEN_MSG:String(500);   
        END_EMAIL_BODY1:String(250);
        END_EMAIL_BODY2:String(250);  
    }
    //EMail Content End

    //MDK Attachment Start

     entity MASTER_IVEN_MDK_ATTACHMENTS {                 
        key SR_NO            : Integer;
        key ENTITY_CODE      : String(10);      
        key ATTACH_CODE      : Integer;         
            ATTACH_GROUP     : String(30);   
            ATTACH_DESC      : String(100);
            FILE_NAME        : String(100);
            FILE_TYPE        : String(100);
            FILE_MIMETYPE    : String(100);           
            FILE_CONTENT     : LargeBinary;
            UPLOADED_ON      : Timestamp;
            ATTACH_TYPE_CODE : String(10);
            ATTACH_TYPE_DESC : String(100);
    }  

    //MDK Attachment End

}


@cds.persistence.exists
@cds.persistence.calcview
entity USERMASTER_ENTITIES {
    key USER_NAME    : String(500) @title: 'USER_NAME: USER_NAME';
        EMAIL        : String(150) @title: 'EMAIL: EMAIL';
        COMPANY_CODE : String(500) @title: 'COMPANY_CODE: COMPANY_CODE';
        CREATED_ON   : Timestamp   @title: 'CREATED_ON: CREATED_ON';
        ACTIVE       : String(1)   @title: 'ACTIVE: ACTIVE';
        ENTITY_CODE  : String(50)  @title: 'ENTITY_CODE: ENTITY_CODE';
        ENTITY_DESC  : String(100) @title: 'ENTITY_DESC: ENTITY_DESC';
        USER_ID      : String(50)  @title: 'USER_ID: USER_ID';
        USER_ROLE    : String(50)  @title: 'USER_ROLE: USER_ROLE';
}

@cds.persistence.exists
@cds.persistence.calcview
entity VIEW_REQUEST_ACTIVE_STATUS {
    key REQUEST_NO         : Integer64    @title: 'REQUEST_NO: REQUEST_NO';
        SAP_VENDOR_CODE    : String(10)   @title: 'SAP_VENDOR_CODE: SAP_VENDOR_CODE';
        IVEN_VENDOR_CODE   : Integer64    @title: 'IVEN_VENDOR_CODE: IVEN_VENDOR_CODE';
        STATUS             : Integer      @title: 'STATUS: STATUS';
        REGISTERED_ID      : String(100)  @title: 'REGISTERED_ID: REGISTERED_ID';
        ENTITY_CODE        : String(10)   @title: 'ENTITY_CODE: ENTITY_CODE';
        REQUEST_TYPE       : Integer      @title: 'REQUEST_TYPE: REQUEST_TYPE';
        CREATION_TYPE      : Integer      @title: 'CREATION_TYPE: CREATION_TYPE';
        VENDOR_NAME1       : String(100)  @title: 'VENDOR_NAME1: VENDOR_NAME1';
        REQUESTER_ID       : String(100)  @title: 'REQUESTER_ID: REQUESTER_ID';
        CREATED_ON         : Timestamp    @title: 'CREATED_ON: CREATED_ON';
        ACTIVE             : String(1)    @title: 'ACTIVE: ACTIVE';
        SUPPL_TYPE_DESC    : String(50)   @title: 'SUPPL_TYPE_DESC: SUPPL_TYPE_DESC';
        BP_TYPE_CODE       : String(4)    @title: 'BP_TYPE_CODE: BP_TYPE_CODE';
        SUPPL_TYPE         : String(50)   @title: 'SUPPL_TYPE: SUPPL_TYPE';
        BP_TYPE_DESC       : String(100)  @title: 'BP_TYPE_DESC: BP_TYPE_DESC';
        BUYER_ASSIGN_CHECK : String(1)    @title: 'BUYER_ASSIGN_CHECK: BUYER_ASSIGN_CHECK';
        VENDOR_CODE        : String(50)   @title: 'VENDOR_CODE: VENDOR_CODE';
        LEGACY_ID          : String(10)   @title: 'LEGACY_ID: LEGACY_ID';
        COMMENT            : String(1000) @title: 'COMMENT: COMMENT';
        NDA_TYPE           : String(50)   @title: 'NDA_TYPE: NDA_TYPE';
        REMINDER_COUNT     : Integer      @title: 'REMINDER_COUNT: REMINDER_COUNT';
        TO_STATUS          : Association to one VENDOR_PORTAL.MASTER_STATUS
                                 on TO_STATUS.CODE = STATUS;
}

@cds.persistence.exists
@cds.persistence.calcview
entity VIEW_DATA_MIGRATION_FIELDS {
    key FIELD_ID     : String(10)  @title: 'FIELD_ID: FIELD_ID';
        GROUP        : String(100) @title: 'GROUP: GROUP';
        IS_MANDATORY : String(1)   @title: 'IS_MANDATORY: IS_MANDATORY';
        IS_VISIBLE   : String(1)   @title: 'IS_VISIBLE: IS_VISIBLE';
        DESCRIPTION  : String(500) @title: 'DESCRIPTION: DESCRIPTION';
}

@cds.persistence.exists 
@cds.persistence.calcview 
entity CALC_HEIRARCHY_MATRIX {
key     HIERARCHY_ID: String(10)  @title: 'HIERARCHY_ID: HIERARCHY_ID' ; 
        TYPE: String(10)  @title: 'TYPE: TYPE' ; 
        ENTITY_CODE: String(10)  @title: 'ENTITY_CODE: ENTITY_CODE' ; 
        LEVEL: Integer  @title: 'LEVEL: LEVEL' ; 
        ROLE_CODE: String(10)  @title: 'ROLE_CODE: ROLE_CODE' ; 
        ACCESS_EDIT: String(1)  @title: 'ACCESS_EDIT: ACCESS_EDIT' ; 
        ACCESS_APPROVE: String(1)  @title: 'ACCESS_APPROVE: ACCESS_APPROVE' ; 
        ACCESS_SENDBACK: String(1)  @title: 'ACCESS_SENDBACK: ACCESS_SENDBACK' ; 
        ACCESS_REJECT: String(1)  @title: 'ACCESS_REJECT: ACCESS_REJECT' ; 
        USER_IDS: String(1000)  @title: 'USER_IDS: USER_IDS' ; 
        TO_ENTITY_CODE   : Association to one VENDOR_PORTAL.MASTER_ENTITY_CODE
                             on TO_ENTITY_CODE.BUKRS = ENTITY_CODE;
      TO_ROLE     : Association to one VENDOR_PORTAL.MASTER_USER_ROLE
                                   on TO_ROLE.CODE = ROLE_CODE;
}

@cds.persistence.exists 
@cds.persistence.calcview    
Entity VIEW_REQUEST_COUNTER_STATUS {
key     DESCRIPTION: String(50)  @title: 'DESCRIPTION: DESCRIPTION' ; 
        STATUS: Integer  @title: 'STATUS: STATUS' ; 
        CODE: Integer  @title: 'CODE: CODE' ; 
        REQUEST_NO: Integer64  @title: 'REQUEST_NO: REQUEST_NO' ; 
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity VIEW_REQUEST_TYPE_COUNT {
        CODE: Integer  @title: 'CODE: CODE' ; 
key     DESCRIPTION: String(50)  @title: 'DESCRIPTION: DESCRIPTION' ; 
        REQ_TYPE_COUNT: Integer64  @title: 'REQUEST_NO: REQUEST_NO' ;    
        REQUEST_TYPE: Integer @title: 'REQUEST_TYPE: REQUEST_TYPE' ;    
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity VIEW_REG_PM_APPR {
        CODE: Integer  @title: 'CODE: CODE' ; 
key     DESCRIPTION: String(50)  @title: 'DESCRIPTION: DESCRIPTION' ; 
        STATUS_COUNT: Integer64  @title: 'STATUS_COUNT: REQUEST_NO' ; 
        STATUS: Integer  @title: 'STATUS: STATUS' ; 
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity VIEW_ENTITY_CODE_COUNT {
key     BUKRS: String(4)  @title: 'BUKRS: BUKRS' ; 
key     BUTXT: String(50)  @title: 'BUTXT: BUTXT' ; 
        ENTITY_COUNT: Integer64  @title: 'ENTITY_COUNT: REQUEST_NO' ; 
        ENTITY_CODE: String(100)  @title: 'ENTITY_CODE: ENTITY_CODE' ;     
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity VIEW_PENDING_BYR_COUNT {
key     DESCRIPTION: String(50)  @title: 'DESCRIPTION: DESCRIPTION' ; 
        PND_BYR_COUNT: Integer64  @title: 'PND_BYR_COUNT: REQUEST_NO' ; 
        STATUS: Integer  @title: 'STATUS: STATUS' ; 
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity VIEW_REQUEST_ACTION_STATUS {
        CODE: Integer  @title: 'CODE: CODE' ; 
key     DESCRIPTION: String(50)  @title: 'DESCRIPTION: DESCRIPTION' ; 
        ACT_STATUS_COUNT: Integer64  @title: 'ACT_STATUS_COUNT: REQUEST_NO' ; 
        STATUS: Integer  @title: 'STATUS: STATUS' ; 
}


@cds.persistence.exists 
@cds.persistence.calcview 
Entity VIEW_REQUEST_ALL_STATUS_COUNT {
        CODE: Integer  @title: 'CODE: CODE' ; 
key     DESCRIPTION: String(50)  @title: 'DESCRIPTION: DESCRIPTION' ; 
        STATUS_COUNT: Integer64  @title: 'STATUS_COUNT: REQUEST_NO' ; 
}


@cds.persistence.exists 
@cds.persistence.calcview 
Entity VIEW_REQUEST_PM_APPR {
        CODE: Integer  @title: 'CODE: CODE' ; 
key     DESCRIPTION: String(50)  @title: 'DESCRIPTION: DESCRIPTION' ; 
        PM_REQ_COUNT: Integer64  @title: 'PM_REQ_COUNT: REQUEST_NO' ; 
        STATUS: Integer  @title: 'STATUS: STATUS' ; 
}


@cds.persistence.exists 
@cds.persistence.calcview 
Entity VIEW_REQUEST_REJECTED_STATUS {
        CODE: Integer  @title: 'CODE: CODE' ; 
key     DESCRIPTION: String(50)  @title: 'DESCRIPTION: DESCRIPTION' ; 
        REJ_STATUS_COUNT: Integer64  @title: 'REJ_STATUS_COUNT: REQUEST_NO' ; 
        STATUS: Integer  @title: 'STATUS: STATUS' ; 
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity VIEW_SUPPLIER_TYPE_COUNT {
key     SUPPL_TYPE: String(50)  @title: 'SUPPL_TYPE: SUPPL_TYPE' ; 
key     SUPPL_TYPE_DESC: String(50)  @title: 'SUPPL_TYPE_DESC: SUPPL_TYPE_DESC' ; 
        REQUEST_NO: Integer64  @title: 'REQUEST_NO: REQUEST_NO' ;    
}

// @cds.persistence.exists 
// @cds.persistence.calcview 
// Entity VIEW_LGC_SUPPL {
//         REQUEST_NO: Integer64  @title: 'REQUEST_NO: REQUEST_NO' ; 
// key     STATUS: Integer  @title: 'STATUS: STATUS' ; 
// key     VENDOR_CODE: String(50)  @title: 'VENDOR_CODE: VENDOR_CODE' ; 
// key     VEN_DESC: String(50)  @title: 'VEN_DESC: VEN_DESC' ; 
// }

@cds.persistence.exists 
@cds.persistence.calcview 
Entity VIEW_LG_SUPPL {
key     VEN_DESC: String(25)  @title: 'VEN_DESC: VEN_DESC' ; 
key     DESCRIPTION: String(50)  @title: 'DESCRIPTION: DESCRIPTION' ; 
        REQ_COUNT: Integer64  @title: 'REQUEST_NO: REQUEST_NO' ; 
key     VENDOR_CODE: String(50)  @title: 'VENDOR_CODE: VENDOR_CODE' ; 
        STATUS: Integer  @title: 'STATUS: STATUS' ; 
}   

@cds.persistence.exists 
@cds.persistence.calcview 
Entity VIEW_REG_APPR_PND {
        STATUS_COUNT: Integer64  @title: 'STATUS_COUNT: STATUS_COUNT' ; 
        CODE: Integer  @title: 'CODE: CODE' ; 
key     PENDING_PM: String(25)  @title: 'PENDING_PM: PENDING_PM' ; 
     DESCRIPTION: String(50)  @title: 'DESCRIPTION: DESCRIPTION' ; 
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity VIEW_REG_APPROVE_PM {   
        REQUEST_NO: Integer64  @title: 'REQUEST_NO: REQUEST_NO' ; 
key     PM_PENDING: String(25)  @title: 'PM_PENDING: PM_PENDING' ; 
}


@cds.persistence.exists 
@cds.persistence.calcview      
Entity VIEW_TURN_AROUND_TIME {
key     REQUEST_NO: Integer64  @title: 'REQUEST_NO: REQUEST_NO' ; 
        REQ_CREATE_EVENT_NO: Integer  @title: 'REQ_CREATE_EVENT_NO: REQ_CREATE_EVENT_NO' ; 
        REQ_CREATE_EVENT_CODE: Integer  @title: 'REQ_CREATE_EVENT_CODE: REQ_CREATE_EVENT_CODE' ; 
        REQ_CREATE_TIMESTAMP: Timestamp  @title: 'REQ_CREATE_TIMESTAMP: REQ_CREATE_TIMESTAMP' ; 
        REQ_INV_EVENT_NO: Integer  @title: 'REQ_INV_EVENT_NO: REQ_INV_EVENT_NO' ; 
        REQ_INV_EVENT_CODE: Integer  @title: 'REQ_INV_EVENT_CODE: REQ_INV_EVENT_CODE' ; 
        REQ_INV_TIMESTAMP: Timestamp  @title: 'REQ_INV_TIMESTAMP: REQ_INV_TIMESTAMP' ; 
        FORM_SUB_EVENT_NO: Integer  @title: 'FORM_SUB_EVENT_NO: FORM_SUB_EVENT_NO' ; 
        FORM_SUB_EVENT_CODE: Integer  @title: 'FORM_SUB_EVENT_CODE: FORM_SUB_EVENT_CODE' ; 
        FORM_SUB_TIMESTAMP: Timestamp  @title: 'FORM_SUB_TIMESTAMP: FORM_SUB_TIMESTAMP' ; 
        FA_EVENT_NO: Integer  @title: 'FA_EVENT_NO: FA_EVENT_NO' ; 
        FA_EVENT_CODE: Integer  @title: 'FA_EVENT_CODE: FA_EVENT_CODE' ; 
        FA_TIMESTAMP: Timestamp  @title: 'FA_TIMESTAMP: FA_TIMESTAMP' ; 
        CREATE_INV_TAT: Integer  @title: 'CREATE_INV_TAT: CREATE_INV_TAT' ; 
        INV_FS_TAT: Integer  @title: 'INV_FS_TAT: INV_FS_TAT' ; 
        FS_FA_TAT: Integer  @title: 'FS_FA_TAT: FS_FA_TAT' ; 
        CREATE_INV_TAT_MIN: Integer  @title: 'CREATE_INV_TAT_MIN: CREATE_INV_TAT_MIN' ; 
        INV_FS_TAT_MIN: Integer  @title: 'INV_FS_TAT_MIN: INV_FS_TAT_MIN' ; 
        FS_FA_TAT_MIN: Integer  @title: 'FS_FA_TAT_MIN: FS_FA_TAT_MIN' ; 
        CREATE_INV_TAT_HRS: Integer  @title: 'CREATE_INV_TAT_HRS: CREATE_INV_TAT_HRS' ; 
        INV_FS_TAT_HRS: Integer  @title: 'INV_FS_TAT_HRS: INV_FS_TAT_HRS' ; 
        FS_FA_TAT_HRS: Integer  @title: 'FS_FA_TAT_HRS: FS_FA_TAT_HRS' ; 
        CREATE_INV_TAT_DAYS: Integer  @title: 'CREATE_INV_TAT_DAYS: CREATE_INV_TAT_DAYS' ; 
        INV_FS_TAT_DAYS: Integer  @title: 'INV_FS_TAT_DAYS: INV_FS_TAT_DAYS' ; 
        FS_FA_TAT_DAYS: Integer  @title: 'FS_FA_TAT_DAYS: FS_FA_TAT_DAYS' ; 
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity REQ_TURNAROUND {
        CREATE_INV_TAT: Decimal(16)  @title: 'CREATE_INV_TAT: CREATE_INV_TAT' ; 
        INV_FS_TAT: Decimal(16)  @title: 'INV_FS_TAT: INV_FS_TAT' ; 
        FS_FA_TAT: Decimal(16)  @title: 'FS_FA_TAT: FS_FA_TAT' ; 
key     UNIT: String(50)  @title: 'UNIT: UNIT' ; 
        CREATE_INV_TAT_MIN: Decimal(16)  @title: 'CREATE_INV_TAT_MIN: CREATE_INV_TAT_MIN' ; 
        INV_FS_TAT_MIN: Decimal(16)  @title: 'INV_FS_TAT_MIN: INV_FS_TAT_MIN' ; 
        FS_FA_TAT_MIN: Decimal(16)  @title: 'FS_FA_TAT_MIN: FS_FA_TAT_MIN' ; 
        CREATE_INV_TAT_HRS: Decimal(16)  @title: 'CREATE_INV_TAT_HRS: CREATE_INV_TAT_HRS' ; 
        INV_FS_TAT_HRS: Decimal(16)  @title: 'INV_FS_TAT_HRS: INV_FS_TAT_HRS' ; 
        FS_FA_TAT_HRS: Decimal(16)  @title: 'FS_FA_TAT_HRS: FS_FA_TAT_HRS' ; 
        CREATE_INV_TAT_DAYS: Decimal(16)  @title: 'CREATE_INV_TAT_DAYS: CREATE_INV_TAT_DAYS' ; 
        INV_FS_TAT_DAYS: Decimal(16)  @title: 'INV_FS_TAT_DAYS: INV_FS_TAT_DAYS' ; 
        FS_FA_TAT_DAYS: Decimal(16)  @title: 'FS_FA_TAT_DAYS: FS_FA_TAT_DAYS' ; 
}


@cds.persistence.exists 
@cds.persistence.calcview 
Entity REQUEST_TAT {    
key     CREATE_INV_TAT: Decimal(16)  @title: 'CREATE_INV_TAT: CREATE_INV_TAT' ; 
        INV_FS_TAT: Decimal(16)  @title: 'INV_FS_TAT: INV_FS_TAT' ; 
        FS_FA_TAT: Decimal(16)  @title: 'FS_FA_TAT: FS_FA_TAT' ; 
        UNIT: String(50)  @title: 'UNIT: UNIT' ; 
        CREATE_INV_TAT_MIN: Decimal(16)  @title: 'CREATE_INV_TAT_MIN: CREATE_INV_TAT_MIN' ; 
        INV_FS_TAT_MIN: Decimal(16)  @title: 'INV_FS_TAT_MIN: INV_FS_TAT_MIN' ; 
        FS_FA_TAT_MIN: Decimal(16)  @title: 'FS_FA_TAT_MIN: FS_FA_TAT_MIN' ; 
        CREATE_INV_TAT_HRS: Decimal(16)  @title: 'CREATE_INV_TAT_HRS: CREATE_INV_TAT_HRS' ; 
        INV_FS_TAT_HRS: Decimal(16)  @title: 'INV_FS_TAT_HRS: INV_FS_TAT_HRS' ; 
        FS_FA_TAT_HRS: Decimal(16)  @title: 'FS_FA_TAT_HRS: FS_FA_TAT_HRS' ; 
        CREATE_INV_TAT_DAYS: Decimal(16)  @title: 'CREATE_INV_TAT_DAYS: CREATE_INV_TAT_DAYS' ; 
        INV_FS_TAT_DAYS: Decimal(16)  @title: 'INV_FS_TAT_DAYS: INV_FS_TAT_DAYS' ; 
        FS_FA_TAT_DAYS: Decimal(16)  @title: 'FS_FA_TAT_DAYS: FS_FA_TAT_DAYS' ; 
        STAGE: String(50)  @title: 'STAGE: STAGE' ; 
        CREATE_INV_TAT_1: Decimal(16)  @title: 'CREATE_INV_TAT_1: CREATE_INV_TAT' ; 
        INV_FS_TAT_1: Decimal(16)  @title: 'INV_FS_TAT_1: INV_FS_TAT' ; 
        FS_FA_TAT_1: Decimal(16)  @title: 'FS_FA_TAT_1: FS_FA_TAT' ; 
        UNIT_1: String(50)  @title: 'UNIT_1: UNIT' ; 
        CREATE_INV_TAT_MIN_1: Decimal(16)  @title: 'CREATE_INV_TAT_MIN_1: CREATE_INV_TAT_MIN' ; 
        INV_FS_TAT_MIN_1: Decimal(16)  @title: 'INV_FS_TAT_MIN_1: INV_FS_TAT_MIN' ; 
        FS_FA_TAT_MIN_1: Decimal(16)  @title: 'FS_FA_TAT_MIN_1: FS_FA_TAT_MIN' ; 
        CREATE_INV_TAT_HRS_1: Decimal(16)  @title: 'CREATE_INV_TAT_HRS_1: CREATE_INV_TAT_HRS' ; 
        INV_FS_TAT_HRS_1: Decimal(16)  @title: 'INV_FS_TAT_HRS_1: INV_FS_TAT_HRS' ; 
        FS_FA_TAT_HRS_1: Decimal(16)  @title: 'FS_FA_TAT_HRS_1: FS_FA_TAT_HRS' ; 
        CREATE_INV_TAT_DAYS_1: Decimal(16)  @title: 'CREATE_INV_TAT_DAYS_1: CREATE_INV_TAT_DAYS' ; 
        INV_FS_TAT_DAYS_1: Decimal(16)  @title: 'INV_FS_TAT_DAYS_1: INV_FS_TAT_DAYS' ; 
        FS_FA_TAT_DAYS_1: Decimal(16)  @title: 'FS_FA_TAT_DAYS_1: FS_FA_TAT_DAYS' ; 
        STAGE_1: String(50)  @title: 'STAGE_1: STAGE_1' ; 
        CREATE_INV_TAT_2: Decimal(16)  @title: 'CREATE_INV_TAT_2: CREATE_INV_TAT' ; 
        INV_FS_TAT_2: Decimal(16)  @title: 'INV_FS_TAT_2: INV_FS_TAT' ; 
        FS_FA_TAT_2: Decimal(16)  @title: 'FS_FA_TAT_2: FS_FA_TAT' ; 
        UNIT_2: String(50)  @title: 'UNIT_2: UNIT' ; 
        CREATE_INV_TAT_MIN_2: Decimal(16)  @title: 'CREATE_INV_TAT_MIN_2: CREATE_INV_TAT_MIN' ; 
        INV_FS_TAT_MIN_2: Decimal(16)  @title: 'INV_FS_TAT_MIN_2: INV_FS_TAT_MIN' ; 
        FS_FA_TAT_MIN_2: Decimal(16)  @title: 'FS_FA_TAT_MIN_2: FS_FA_TAT_MIN' ; 
        CREATE_INV_TAT_HRS_2: Decimal(16)  @title: 'CREATE_INV_TAT_HRS_2: CREATE_INV_TAT_HRS' ; 
        INV_FS_TAT_HRS_2: Decimal(16)  @title: 'INV_FS_TAT_HRS_2: INV_FS_TAT_HRS' ; 
        FS_FA_TAT_HRS_2: Decimal(16)  @title: 'FS_FA_TAT_HRS_2: FS_FA_TAT_HRS' ; 
        CREATE_INV_TAT_DAYS_2: Decimal(16)  @title: 'CREATE_INV_TAT_DAYS_2: CREATE_INV_TAT_DAYS' ; 
        INV_FS_TAT_DAYS_2: Decimal(16)  @title: 'INV_FS_TAT_DAYS_2: INV_FS_TAT_DAYS' ; 
        FS_FA_TAT_DAYS_2: Decimal(16)  @title: 'FS_FA_TAT_DAYS_2: FS_FA_TAT_DAYS' ; 
        STAGE_2: String(50)  @title: 'STAGE_2: STAGE_2' ; 
        AVG_TAT_SEC: Decimal(13)  @title: 'AVG_TAT_SEC: AVG_TAT_SEC' ; 
        PROGRESS: String(50)  @title: 'PROGRESS: PROGRESS' ; 
        AVG_TAT_MIN: Decimal(13)  @title: 'AVG_TAT_MIN: AVG_TAT_MIN' ; 
        AVG_TAT_HRS: Decimal(13)  @title: 'AVG_TAT_HRS: AVG_TAT_HRS' ; 
        AVG_TAT_DAYS: Decimal(13)  @title: 'AVG_TAT_DAYS: AVG_TAT_DAYS' ; 
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity APPROVAL_PENDING {
        REQUEST_NO: Integer64  @title: 'Number Of Requests' ;        
        STATUS: Integer  @title: 'STATUS: STATUS' ;     
key     APPR_PENDING: String(50)  @title: 'APPR_PENDING: APPR_PENDING' ; 
}