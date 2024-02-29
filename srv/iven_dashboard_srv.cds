
using {
  VENDOR_PORTAL,
  VIEW_REQUEST_COUNTER_STATUS,
  VIEW_REQUEST_TYPE_COUNT,
  VIEW_REG_PM_APPR,
  VIEW_ENTITY_CODE_COUNT,
  VIEW_PENDING_BYR_COUNT,
  VIEW_REQUEST_ACTION_STATUS,         
  VIEW_REQUEST_ALL_STATUS_COUNT,
  VIEW_REQUEST_PM_APPR,
  VIEW_REQUEST_REJECTED_STATUS,
  VIEW_SUPPLIER_TYPE_COUNT,
  VIEW_LG_SUPPL,
  VIEW_REG_APPROVE_PM,
  VIEW_TURN_AROUND_TIME,
  REQ_TURNAROUND,
  VIEW_REQUEST_ACTIVE_STATUS,
  REQUEST_TAT
} from '../db/MASTER_TABLES';
using {
    VENDOR_PORTAL.REQUEST_INFO,
  VENDOR_PORTAL.REGFORM_ADDRESS,
  VENDOR_PORTAL.REGFORM_CONTACTS,
  VENDOR_PORTAL.REGFORM_BANKS,
  VENDOR_PORTAL.REGFORM_FINANCIAL,
  VENDOR_PORTAL.REGFORM_OWNERS,
  VENDOR_PORTAL.REGFORM_PRODUCT_SERVICE,
  VENDOR_PORTAL.REGFORM_CAPACITY,
  VENDOR_PORTAL.REGFORM_CUSTOMERS,
  VENDOR_PORTAL.REGFORM_OEM,
  VENDOR_PORTAL.REGFORM_DISCLOSURE_FIELDS,
  VENDOR_PORTAL.REGFORM_DISCLOSURE_QACERT,
  VENDOR_PORTAL.REGFORM_DISCLOSURE_RELATIVES,
  VENDOR_PORTAL.REGFORM_ATTACH_FIELDS,
  VENDOR_PORTAL.REGFORM_ATTACHMENTS,
  VENDOR_PORTAL.REQUEST_SECURITY_CODE,
  VENDOR_PORTAL.REQUEST_EVENTS_LOG,
  VENDOR_PORTAL.VENDOR_MASTER_S4_HANA,
  VENDOR_PORTAL.REQUEST_ACTIVE_STATUS
} from '../db/TRANSACTION_TABLES';    
       
service dashboardService {             
    @Capabilities : {
   FilterRestrictions : {
      FilterExpressionRestrictions :
         [{
            Property : 'CREATED_ON',    
            AllowedExpressions : 'SingleRange'          
         },
         {
            Property : 'TRADE_LIC_NO_DATE',        
            AllowedExpressions : 'SingleRange'          
         }
         ]
      }
    }
  entity RequestInfo              as projection on VENDOR_PORTAL.REQUEST_INFO{
    *,
    REQUEST_NO as REQUEST_NUM: String,                                                   
    'Request No : '|| REQUEST_NO as REQUEST_HEADER: String,                         
    'Request Type : '|| TO_REQUEST_TYPE.DESCRIPTION as REQUEST_TYPE_HEADER: String,        
     TO_EVENTS: Association to many VENDOR_PORTAL.REQUEST_EVENTS_LOG on TO_EVENTS.REQUEST_NO=REQUEST_NO         
  };                     
  entity MasterAttachmentTypes     as projection on VENDOR_PORTAL.MASTER_ATTACHMENT_TYPES;
  entity MasterEntityCode          as projection on VENDOR_PORTAL.MASTER_ENTITY_CODE;
  entity MasterTelecode            as projection on VENDOR_PORTAL.MASTER_TELECODE;
  entity MasterPostalcode          as projection on VENDOR_PORTAL.MASTER_REGEX_POSTALCODE;
  entity MasterCountry             as projection on VENDOR_PORTAL.MASTER_COUNTRY;
  entity MasterRegion              as projection on VENDOR_PORTAL.MASTER_REGION;
  entity MasterIbanCountry         as projection on VENDOR_PORTAL.MASTER_IBAN_COUNTRY;
  entity MasteriVenAttachments     as projection on VENDOR_PORTAL.MASTER_IVEN_ATTACHMENTS;
  entity MasterIvenSettings        as projection on VENDOR_PORTAL.MASTER_IVEN_SETTINGS;          
  entity MasterRequestEvents       as projection on VENDOR_PORTAL.MASTER_REQUEST_EVENTS;
  entity MasterStatus              as projection on VENDOR_PORTAL.MASTER_STATUS{
    *,
    case when CODE = 1 then 1 
        when CODE = 2 then 3 
        when CODE = 3 then 1
        when CODE = 4 then 3 
        when CODE = 5 then 5 
        when CODE = 6 then 5 
        when CODE = 7 then 0 
        when CODE = 8 then 1 
        when CODE = 9 then 5 
        when CODE = 10 then 5 
        when CODE = 11 then 3   
        when CODE = 14 then 1
        else 2                      
         end as CRITICALITY:Integer,     
  };
  entity MasterClientInfo          as projection on VENDOR_PORTAL.MASTER_EMAIL_CONTACT_ID;
  entity MasterFormFieldsMandatory as projection on VENDOR_PORTAL.MASTER_REGFORM_FIELDS_MANDATORY;
  entity MasterFormFieldsVisible   as projection on VENDOR_PORTAL.MASTER_REGFORM_FIELDS_VISIBLE{
    *,        
           case when S1G1T1F1 = 'X' then false else true end as BS1G1T1F1:Boolean,                   
           case when S1G1T1F2   = 'X' then false else true end as BS1G1T1F2:Boolean, //Company Name (Arabic)
           case when S1G1T1F3   = 'X' then false else true end as BS1G1T1F3:Boolean, //Mailing Address
           case when S1G1T1F13  = 'X' then false else true end as BS1G1T1F13:Boolean, //Street 2
           case when S1G1T1F14  = 'X' then false else true end as BS1G1T1F14:Boolean, //Street 3
           case when S1G1T1F15  = 'X' then false else true end as BS1G1T1F15:Boolean, //Street 4
           case when S1G1T1F4   = 'X' then false else true end as BS1G1T1F4:Boolean, //City
           case when S1G1T1F5   = 'X' then false else true end as BS1G1T1F5:Boolean, //State
           case when S1G1T1F6   = 'X' then false else true end as BS1G1T1F6:Boolean, //Country
           case when S1G1T1F7   = 'X' then false else true end as BS1G1T1F7:Boolean, //Postal code
           case when S1G1T1F8   = 'X' then false else true end as BS1G1T1F8:Boolean, //Contact No.
           case when S1G1T1F9   = 'X' then false else true end as BS1G1T1F9:Boolean, //Fax No.
           case when S1G1T1F10  = 'X' then false else true end as BS1G1T1F10:Boolean, //Email
           case when S1G1T1F11  = 'X' then false else true end as BS1G1T1F11:Boolean, //Website
           case when S1G1T1F12  = 'X' then false else true end as BS1G1T1F12:Boolean, //District
           case when S1G1T1F16 = 'X' then false else true end as BS1G1T1F16:Boolean,  //Street No.
            
           case when S1G1T2F1   = 'X' then false else true end as BS1G1T2F1:Boolean, //Whole Table - Registering Office Details
           case when S1G1T2F2   = 'X' then false else true end as BS1G1T2F2:Boolean, //Add Additional Other Office Details
           case when S1G1T2F3   = 'X' then false else true end as BS1G1T2F3:Boolean, //Office Address - Street 1
           case when S1G1T2F12  = 'X' then false else true end as BS1G1T2F12:Boolean, //Street 2
           case when S1G1T2F13  = 'X' then false else true end as BS1G1T2F13:Boolean, //Street 3
           case when S1G1T2F14  = 'X' then false else true end as BS1G1T2F14:Boolean, //Street 4
           case when S1G1T2F15  = 'X' then false else true end as BS1G1T2F15:Boolean,//Street No.
           case when S1G1T2F4   = 'X' then false else true end as BS1G1T2F4:Boolean, //City
           case when S1G1T2F5   = 'X' then false else true end as BS1G1T2F5:Boolean, //State
           case when S1G1T2F6   = 'X' then false else true end as BS1G1T2F6:Boolean, //Country
           case when S1G1T2F7   = 'X' then false else true end as BS1G1T2F7:Boolean, //Postal code/ZIP Code/ PO Box No.
           case when S1G1T2F8   = 'X' then false else true end as BS1G1T2F8:Boolean, //Office Contact No.
           case when S1G1T2F9   = 'X' then false else true end as BS1G1T2F9:Boolean, //Fax No.
           case when S1G1T2F10  = 'X' then false else true end as BS1G1T2F10:Boolean, //Email
           case when S1G1T2F11  = 'X' then false else true end as BS1G1T2F11:Boolean, //District
              
            // Group 2: Contact Details
            // Type 1: Head of the company (MD / Chariman)
           case when S1G2T1F1   = 'X' then false else true end as BS1G2T1F1:Boolean, //Name
           case when S1G2T1F2   = 'X' then false else true end as BS1G2T1F2:Boolean, //Designation
           case when S1G2T1F3   = 'X' then false else true end as BS1G2T1F3:Boolean, //Email Address
           case when S1G2T1F4   = 'X' then false else true end as BS1G2T1F4:Boolean, //Contact Number
           case when S1G2T1F5   = 'X' then false else true end as BS1G2T1F5:Boolean, //Mobile Number
           case when S1G2T1F6   = 'X' then false else true end as BS1G2T1F6:Boolean, //Nationality
           case when S1G2T1F7   = 'X' then false else true end as BS1G2T1F7:Boolean, //City
           case when S1G2T1F8   = 'X' then false else true end as BS1G2T1F8:Boolean, //State
           case when S1G2T1F9   = 'X' then false else true end as BS1G2T1F9:Boolean, //Postal code/ZIP Code/ PO Box No.
            case when S1G2T1F10  = 'X' then false else true end as BS1G2T1F10:Boolean, //Last Name

            // Type 2: Authorised Contact Details
           case when S1G2T2F1   = 'X' then false else true end as BS1G2T2F1:Boolean, //Name
           case when S1G2T2F2   = 'X' then false else true end as BS1G2T2F2:Boolean, //Other Contact Details
           case when S1G2T2F3   = 'X' then false else true end as BS1G2T2F3:Boolean, //Designation
           case when S1G2T2F4   = 'X' then false else true end as BS1G2T2F4:Boolean, //Email Address
           case when S1G2T2F5   = 'X' then false else true end as BS1G2T2F5:Boolean, //Contact Number
           case when S1G2T2F6   = 'X' then false else true end as BS1G2T2F6:Boolean, //Nationality
           case when S1G2T2F7   = 'X' then false else true end as BS1G2T2F7:Boolean, //Passport #
           case when S1G2T2F8   = 'X' then false else true end as BS1G2T2F8:Boolean, //Mobile Number
           case when S1G2T2F9   = 'X' then false else true end as BS1G2T2F9:Boolean, //City
           case when S1G2T2F10  = 'X' then false else true end as BS1G2T2F10:Boolean, //State
           case when S1G2T2F11  = 'X' then false else true end as BS1G2T2F11:Boolean, //Postal code/ZIP Code/ PO Box No.
             case when S1G2T2F12  = 'X' then false else true end as BS1G2T2F12:Boolean,//Last Name

            // Group 3: Legal Structure
            // Type 1: Registering office legal structure
           case when S1G3T1F1   = 'X' then false else true end as BS1G3T1F1:Boolean, //Type of legal structure

            // Group 4: Business Information
            // Type 1: A;; same Business Information type
           case when S1G4T1F1   = 'X' then false else true end as BS1G4T1F1:Boolean, //Year of establishment
           case when S1G4T2F1   = 'X' then false else true end as BS1G4T2F1:Boolean, //No. of Employees
           case when S1G4T3F1   = 'X' then false else true end as BS1G4T3F1:Boolean, //No. of Employees in Engineering
           case when S1G4T4F1   = 'X' then false else true end as BS1G4T4F1:Boolean, //No. of Employees in Quality
           case when S1G4T5F1   = 'X' then false else true end as BS1G4T5F1:Boolean, //No. of Employees in Production
           case when S1G4T6F1   = 'X' then false else true end as BS1G4T6F1:Boolean, //No. of Employees in Administration
           case when S1G4T7F1   = 'X' then false else true end as BS1G4T7F1:Boolean, //No. of Employees in Other functions
           case when S1G4T8F1   = 'X' then false else true end as BS1G4T8F1:Boolean, //Type of Business
           case when S1G4T9F1   = 'X' then false else true end as BS1G4T9F1:Boolean, //Trade License No.

            // Group 5: Supplier Category
            // Type 1: Supplier Category's Information
           case when S1G5T1F1   = 'X' then false else true end as BS1G5T1F1:Boolean, //Supplier Category
           case when S1G5T2F1   = 'X' then false else true end as BS1G5T2F1:Boolean, //Supplier Type
           case when S1G5T3F1  = 'X' then false else true end as BS1G5T3F1:Boolean, //Certificate of Incorporation
            case when S1G5T4F1  = 'X' then false else true end as BS1G5T4F1:Boolean,//Vendor Sub Type

            // Section 2: Financial Information -------------------------------------------------------
            // Group 1: Payment Information
            // Type 1: Bank Account details
           case when S2G1T1F1   = 'X' then false else true end as BS2G1T1F1:Boolean, //Bank Name
           case when S2G1T1F2   = 'X' then false else true end as BS2G1T1F2:Boolean, //Beneficiary Name
           case when S2G1T1F3   = 'X' then false else true end as BS2G1T1F3:Boolean, //Account Number
           case when S2G1T1F4   = 'X' then false else true end as BS2G1T1F4:Boolean, //Branch Name
           case when S2G1T1F5   = 'X' then false else true end as BS2G1T1F5:Boolean, //IBAN Number
           case when S2G1T1F6   = 'X' then false else true end as BS2G1T1F6:Boolean, //Swift code
           case when S2G1T1F7   = 'X' then false else true end as BS2G1T1F7:Boolean, //BIC code
           case when S2G1T1F8   = 'X' then false else true end as BS2G1T1F8:Boolean, //Routing code
           case when S2G1T1F9   = 'X' then false else true end as BS2G1T1F9:Boolean, //Other Codes
           case when S2G1T1F10  = 'X' then false else true end as BS2G1T1F10:Boolean, //Bank Country
           case when S2G1T1F11  = 'X' then false else true end as BS2G1T1F11:Boolean, //Bank Currency
             case when S2G1T1F12  = 'X' then false else true end as BS2G1T1F12:Boolean,//Other Code Value

            // Type 2: Payment Type
           case when S2G1T2F10  = 'X' then false else true end as BS2G1T2F10:Boolean, //Payment Method
           case when S2G1T2F11  = 'X' then false else true end as BS2G1T2F11:Boolean, //Payment Terms / Credit Period
           case when S2G1T2F12  = 'X' then false else true end as BS2G1T2F12:Boolean, //Invoice Currency

            // Type 3: Value Added Tax (VAT) Information
           case when S2G1T3F13  = 'X' then false else true end as BS2G1T3F13:Boolean, //VAT Registration Number
           case when S2G1T3F14  = 'X' then false else true end as BS2G1T3F14:Boolean, //VAT Registration Date

            // Type 4: DUNS Number
           case when S2G1T4F15  = 'X' then false else true end as BS2G1T4F15:Boolean, //DUNS Number

            // Type 5: Additional Paymenr Details
           case when S2G1T5F1   = 'X' then false else true end as BS2G1T5F1:Boolean, //Bank Name
           case when S2G1T5F2   = 'X' then false else true end as BS2G1T5F2:Boolean, ////Other Payment Details
           case when S2G1T5F3   = 'X' then false else true end as BS2G1T5F3:Boolean, //Beneficiary Name
           case when S2G1T5F4   = 'X' then false else true end as BS2G1T5F4:Boolean, //Account Number
           case when S2G1T5F5   = 'X' then false else true end as BS2G1T5F5:Boolean, //Branch Name
           case when S2G1T5F6   = 'X' then false else true end as BS2G1T5F6:Boolean, //IBAN Number
           case when S2G1T5F7   = 'X' then false else true end as BS2G1T5F7:Boolean, //Swift code
           case when S2G1T5F8   = 'X' then false else true end as BS2G1T5F8:Boolean, //Routing code
           case when S2G1T5F9   = 'X' then false else true end as BS2G1T5F9:Boolean, //Other Codes
           case when S2G1T5F10  = 'X' then false else true end as BS2G1T5F10:Boolean, //Bank Country
           case when S2G1T5F11  = 'X' then false else true end as BS2G1T5F11:Boolean, //Bank Currency
           case when S2G1T5F12  = 'X' then false else true end as BS2G1T5F12:Boolean, //VAT Registration Number
           case when S2G1T5F13  = 'X' then false else true end as BS2G1T5F13:Boolean, //VAT Registration Date
           case when S2G1T5F14 = 'X' then false else true end as BS2G1T5F14:Boolean, //Other Code Value


            // Group 2: Financial Information
            // Type 1: Bank Account details
           case when S2G2T1F1   = 'X' then false else true end as BS2G2T1F1:Boolean, //Total Revenue
           case when S2G2T2F1   = 'X' then false else true end as BS2G2T2F1:Boolean, //Net Profit/Loss
           case when S2G2T3F1   = 'X' then false else true end as BS2G2T3F1:Boolean, //Total Assets
           case when S2G2T4F1   = 'X' then false else true end as BS2G2T4F1:Boolean, //Total Equity
           case when S2G2T5F1   = 'X' then false else true end as BS2G2T5F1:Boolean, //Currency

            // Group 3: Owner's Information
            // Type 1: Owner's Information
           case when S2G3T1F1   = 'X' then false else true end as BS2G3T1F1:Boolean, //Owner's name
           case when S2G3T1F2   = 'X' then false else true end as BS2G3T1F2:Boolean, //Add Additional Owner's information
           case when S2G3T1F3   = 'X' then false else true end as BS2G3T1F3:Boolean, //Owner's Nationality
           case when S2G3T1F4   = 'X' then false else true end as BS2G3T1F4:Boolean, //Owner's Phone No
           case when S2G3T1F5   = 'X' then false else true end as BS2G3T1F5:Boolean, //Owner's Passport  No
           case when S2G3T1F6   = 'X' then false else true end as BS2G3T1F6:Boolean, //Owner's % of ownership

            // Section 3: Operational Information -------------------------------------------------------
            // Group 1: Products / Service description
            // Type 1: Product/service details
           case when S3G1T1F1   = 'X' then false else true end as BS3G1T1F1:Boolean, // Product Name
           case when S3G1T1F2   = 'X' then false else true end as BS3G1T1F2:Boolean, // Add additional product information
           case when S3G1T1F3   = 'X' then false else true end as BS3G1T1F3:Boolean, // Product description
           case when S3G1T1F4   = 'X' then false else true end as BS3G1T1F4:Boolean, // Category of product
           case when S3G1T1F5   = 'X' then false else true end as BS3G1T1F5:Boolean, // Type (eg: Products/Services)

            // Group 2: Operational capacity
            // Type 1: Production details
           case when S3G2T1F1   = 'X' then false else true end as BS3G2T1F1:Boolean, // Production capacity
            // Type 2: Plant location
           case when S3G2T2F1   = 'X' then false else true end as BS3G2T2F1:Boolean, // Country
           case when S3G2T2F2   = 'X' then false else true end as BS3G2T2F2:Boolean, // Add additional Operational/production information
           case when S3G2T2F3   = 'X' then false else true end as BS3G2T2F3:Boolean, // City
           case when S3G2T2F4   = 'X' then false else true end as BS3G2T2F4:Boolean, // Will this plant will be used to manufacture products/services
           case when S3G2T2F5   = 'X' then false else true end as BS3G2T2F5:Boolean, // Production capacity
           case when S3G2T2F6   = 'X' then false else true end as BS3G2T2F6:Boolean, // Lead time to service

            // Group 3: Order Details
            // Type 1: Order size details
           case when S3G3T1F1   = 'X' then false else true end as BS3G3T1F1:Boolean, // Minimum Order size
           case when S3G3T1F2   = 'X' then false else true end as BS3G3T1F2:Boolean, // Maximum Order size

            // Group 4: Major Clients / customers
            // Type 1: Major Clients / customers details     
           case when S3G4T1F1   = 'X' then false else true end as BS3G4T1F1:Boolean, // Provide list of major clients / customers
            case when S3G4T1F2  = 'X' then false else true end as BS3G4T1F2:Boolean, //Customer Name
           case when S3G4T1F3  = 'X' then false else true end as BS3G4T1F3:Boolean, //Percentage Share of Business in Major Clients / Customers


            // Group 5: Original equipment manufacturer details
            // Type 1: Exclusive Distributor of OEM
           case when S3G5T1F1   = 'X' then false else true end as BS3G5T1F1:Boolean, // Company Name
           case when S3G5T1F2   = 'X' then false else true end as BS3G5T1F2:Boolean, // Add Addtional Exclusive Distributor of OEM
           case when S3G5T1F3   = 'X' then false else true end as BS3G5T1F3:Boolean, // Country
           case when S3G5T1F4   = 'X' then false else true end as BS3G5T1F4:Boolean, // Category of product

            // Type 2: Non Exclusive Distributor of OEM
           case when S3G5T2F1   = 'X' then false else true end as BS3G5T2F1:Boolean, // Company Name
           case when S3G5T2F2   = 'X' then false else true end as BS3G5T2F2:Boolean, // Add Addtional Non Exclusive Distributor of OEM
           case when S3G5T2F3   = 'X' then false else true end as BS3G5T2F3:Boolean, // Country
           case when S3G5T2F4   = 'X' then false else true end as BS3G5T2F4:Boolean, // Category of product
            // Section 4: Disclosures -------------------------------------------------------
            // Group 1: Conflict of Interest
           case when S4G1D1     = 'X' then false else true end as BS4G1D1:Boolean,
            // Group 2: Legal case disclosure
           case when S4G2D1     = 'X' then false else true end as BS4G2D1:Boolean,
            // Group 3: Supplier declaration
           case when S4G3D1     = 'X' then false else true end as BS4G3D1:Boolean,
            // Group 4: Academic Discount
           case when S4G4D1     = 'X' then false else true end as BS4G4D1:Boolean,
            // Group 5: Relatives Table
           case when S4G5D1     = 'X' then false else true end as BS4G5D1:Boolean,
            // Group 6: Validation of information submitted
            //   case when S4G6D1  = 'X' then false else true end as BS1G1T1F1:Boolean,
            // Group 7: REACH compliance
           case when S4G7D1     = 'X' then false else true end as BS4G7D1:Boolean,
            // Group 8: CLP compliance
           case when S4G8D1     = 'X' then false else true end as BS4G8D1:Boolean,
            // Group 9: ITAR and FCPA compliance
           case when S4G9D1     = 'X' then false else true end as BS4G9D1:Boolean,
           case when S4G9D2     = 'X' then false else true end as BS4G9D2:Boolean,
           case when S4G9D3     = 'X' then false else true end as BS4G9D3:Boolean,
           case when S4G9D4     = 'X' then false else true end as BS4G9D4:Boolean,
            // Group 10: IT Equipment and Tools
           case when S4G10D1    = 'X' then false else true end as BS4G10D1:Boolean,
           case when S4G10D2    = 'X' then false else true end as BS4G10D2:Boolean,
            // Group 11: Quality Certificates
           case when S4G11D1    = 'X' then false else true end as BS4G11D1:Boolean,
            // Group 12: Overview
           case when S4G12D1    = 'X' then false else true end as BS4G12D1:Boolean,
           case when S4G12D2    = 'X' then false else true end as BS4G12D2:Boolean,
           case when S4G12D3    = 'X' then false else true end as BS4G12D3:Boolean,
           case when S4G12D4    = 'X' then false else true end as BS4G12D4:Boolean,
           case when S4G12D5    = 'X' then false else true end as BS4G12D5:Boolean,
           case when S4G12D6    = 'X' then false else true end as BS4G12D6:Boolean,
           case when S4G12D7    = 'X' then false else true end as BS4G12D7:Boolean,
           case when S4G12D8    = 'X' then false else true end as BS4G12D8:Boolean,
           case when S4G12D9    = 'X' then false else true end as BS4G12D9:Boolean,
           case when S4G12D10   = 'X' then false else true end as BS4G12D10:Boolean,
            // Group 13: Suppliers/ input material
           case when S4G13D1    = 'X' then false else true end as BS4G13D1:Boolean,
           case when S4G13D2    = 'X' then false else true end as BS4G13D2:Boolean,
           case when S4G13D3    = 'X' then false else true end as BS4G13D3:Boolean,
           case when S4G13D4    = 'X' then false else true end as BS4G13D4:Boolean,
           case when S4G13D5    = 'X' then false else true end as BS4G13D5:Boolean,
           case when S4G13D6    = 'X' then false else true end as BS4G13D6:Boolean,
            // Group 14: Production
           case when S4G14D1    = 'X' then false else true end as BS4G14D1:Boolean,
           case when S4G14D2    = 'X' then false else true end as BS4G14D2:Boolean,
           case when S4G14D3    = 'X' then false else true end as BS4G14D3:Boolean,
           case when S4G14D4    = 'X' then false else true end as BS4G14D4:Boolean,
           case when S4G14D5    = 'X' then false else true end as BS4G14D5:Boolean,
           case when S4G14D6    = 'X' then false else true end as BS4G14D6:Boolean,
           case when S4G14D7    = 'X' then false else true end as BS4G14D7:Boolean,
           case when S4G14D8    = 'X' then false else true end as BS4G14D8:Boolean,
           case when S4G14D9    = 'X' then false else true end as BS4G14D9:Boolean,
           case when S4G14D10   = 'X' then false else true end as BS4G14D10:Boolean,
           case when S4G14D11   = 'X' then false else true end as BS4G14D11:Boolean,
           case when S4G14D12   = 'X' then false else true end as BS4G14D12:Boolean,
           case when S4G14D13   = 'X' then false else true end as BS4G14D13:Boolean,
            // Group 15: Storage
           case when S4G15D1    = 'X' then false else true end as BS4G15D1:Boolean,
           case when S4G15D2    = 'X' then false else true end as BS4G15D2:Boolean,
           case when S4G15D3    = 'X' then false else true end as BS4G15D3:Boolean,
           case when S4G15D4    = 'X' then false else true end as BS4G15D4:Boolean,
            // Group 16: Customer service
           case when S4G16D1    = 'X' then false else true end as BS4G16D1:Boolean,
            // Group 17: Customer service
           case when S4G17D1    = 'X' then false else true end as BS4G17D1:Boolean,
           case when S4G17D2    = 'X' then false else true end as BS4G17D2:Boolean,
            // Group 18: Health, Safety & Environment
           case when S4G18D1    = 'X' then false else true end as BS4G18D1:Boolean,
           case when S4G18D2    = 'X' then false else true end as BS4G18D2:Boolean,
           case when S4G18D3    = 'X' then false else true end as BS4G18D3:Boolean,
           case when S4G18D4    = 'X' then false else true end as BS4G18D4:Boolean,
            // Group 18: Export Complaince
           case when S4G19D1    = 'X' then false else true end as BS4G19D1:Boolean,
           case when S4G19D2    = 'X' then false else true end as BS4G19D2:Boolean,
            // Section 5: Attachments -------------------------------------------------------
            // Attachment 5.1: Company Profile
           case when S5A1F1     = 'X' then false else true end as BS5A1F1:Boolean,
            // Attachment 5.2: Catalogue of Products / services
           case when S5A2F1     = 'X' then false else true end as BS5A2F1:Boolean,
            // Attachment 5.3: Production/Quality Resources
           case when S5A3F1     = 'X' then false else true end as BS5A3F1:Boolean,
            // Attachment 5.4: Power of Attorney
           case when S5A4F1     = 'X' then false else true end as BS5A4F1:Boolean,
            // Attachment 5.5: Passport Copy of Authorized Signatory
           case when S5A5F1     = 'X' then false else true end as BS5A5F1:Boolean,
           case when S5A5F3     = 'X' then false else true end as BS5A5F3:Boolean, // UID copy
            // Attachment 5.6: Passport  Representative / Authorized person
           case when S5A5F2     = 'X' then false else true end as BS5A5F2:Boolean,
           case when S5A5F4     = 'X' then false else true end as BS5A5F4:Boolean, // UID copy

            // Attachment 5.7: Bank Account letter issued by the Bank (In Bank's letterhead)
           case when S5A6F1     = 'X' then false else true end as BS5A6F1:Boolean,
            // Attachment 5.8: If UAE Company
           case when S5A7F1     = 'X' then false else true end as BS5A7F1:Boolean,
            // Attachment 5.9: If UAE Company
           case when S5A7F2     = 'X' then false else true end as BS5A7F2:Boolean,
            // Attachment 5.10: Do you issue an Electronic Tax Invoice
           case when S5A9F1     = 'X' then false else true end as BS5A9F1:Boolean,
            // Attachment 5.11: TRN Certificate
           case when S5A10F1    = 'X' then false else true end as BS5A10F1:Boolean,
            // Attachment 5.12: Chamber of Commerce certificate
           case when S5A11F1    = 'X' then false else true end as BS5A11F1:Boolean,
            // Attachment 5.14: Are you a Sole Agent / Distributor / Dealer for a manufacturer / service provider
           case when S5A12F1    = 'X' then false else true end as BS5A12F1:Boolean,
            // Attachment 5.15: Signed  Non-disclosure Agreement (NDA)
           case when S5A13F1    = 'X' then false else true end as BS5A13F1:Boolean,
            // Attachment 5.16: Financial Statement of the past three recorded years
           case when S5A14F1    = 'X' then false else true end as BS5A14F1:Boolean,
            // Attachment 5.17: ISO Certificate
           case when S5A15F1    = 'X' then false else true end as BS5A15F1:Boolean,
            // Attachment 5.19: Other Quality certificates
           case when S5A16F1    = 'X' then false else true end as BS5A16F1:Boolean,
            // Attachment 5.20: List of Major Customers
           case when S5A17F1    = 'X' then false else true end as BS5A17F1:Boolean,
            // Attachment 5.21: List of Major Suppliers
           case when S5A18F1    = 'X' then false else true end as BS5A18F1:Boolean,
            // Attachment 5.22: List of references
           case when S5A19F1    = 'X' then false else true end as BS5A19F1:Boolean,
            // Attachment 5.23: Signed and stamped NIMR PO terms and conditions
           case when S5A20F1    = 'X' then false else true end as BS5A20F1:Boolean,
            // Attachment 5.24: all Agency /distributorship Agreement endorse by OEM
           case when S5A21F1    = 'X' then false else true end as BS5A21F1:Boolean,
            // Attachment for Other attachment
           case when S5A22F1    = 'X' then false else true end as BS5A22F1:Boolean,
            // Section 7: Acknowledgment -------------------------------------------------------
            // Attachment 5.1: Acknowledgment fields
           case when S7G1D1     = 'X' then false else true end as BS7G1D1:Boolean, // Completed by
           case when S7G1D2     = 'X' then false else true end as BS7G1D2:Boolean, // Designation
           case when S7G1D3     = 'X' then false else true end as BS7G1D3:Boolean, // Date
           case when S7G1D4     = 'X' then false else true end as BS7G1D4:Boolean // Validation of information submitted         
  };
  entity MasterFormFieldsUpdated   as projection on VENDOR_PORTAL.MASTER_REGFORM_FIELDS_UPDATED;
  entity RegFormDiscInfo           as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_FIELDS;
  entity MasterRequestType         as projection on VENDOR_PORTAL.MASTER_REQUEST_TYPE;
  entity MasterIvenUsers           as projection on VENDOR_PORTAL.MASTER_IVEN_USERS;
  entity MasterIvenUserEntity      as projection on VENDOR_PORTAL.MASTER_USER_ENTITY_CODES;
  entity RegFormDiscRelatives      as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_RELATIVES;
  entity RegFormDiscQaCertif       as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_QACERT;
  entity RegFormAttachFields       as projection on VENDOR_PORTAL.REGFORM_ATTACH_FIELDS;
  entity RegFormAttachments        as projection on VENDOR_PORTAL.REGFORM_ATTACHMENTS{
    *,
    TO_REGFORM_CMS:Composition of VENDOR_PORTAL.REGFORM_ATTACHMENTS_CMS on TO_REGFORM_CMS.DOC_ID=OT_DOC_ID            
  };                      
  entity RegFormCMS                as projection on VENDOR_PORTAL.REGFORM_ATTACHMENTS_CMS{
    *,    
    FILE_NAME as FILE_NAME_FE: String,
    @Core.IsMediaType: true FILE_MIMETYPE as FILE_MIMETYPE_FE :String,
    @Core.MediaType:FILE_MIMETYPE_FE FILE_CONTENT as FILE_CONTENT_FE: LargeBinary @Core.ContentDisposition.Filename: FILE_NAME_FE  @Core.ContentDisposition.Type: 'attachment'       
  };        
  entity RegFormAddress            as projection on VENDOR_PORTAL.REGFORM_ADDRESS{
    *,
    TO_MAIN : Association to one VENDOR_PORTAL.REQUEST_INFO
                                       on TO_MAIN.REQUEST_NO = REQUEST_NO       
  };
  entity RegFormContacts           as projection on VENDOR_PORTAL.REGFORM_CONTACTS{
    *,
    NAME1||' '||NAME2 as FULL_NAME:String,
    TO_MAIN : Association to one VENDOR_PORTAL.REQUEST_INFO
                                       on TO_MAIN.REQUEST_NO = REQUEST_NO               
  };
  entity RegFormBanks              as projection on VENDOR_PORTAL.REGFORM_BANKS{
    *,
    TO_MAIN : Association to one VENDOR_PORTAL.REQUEST_INFO
                                       on TO_MAIN.REQUEST_NO = REQUEST_NO           
  };
  entity RegFormFinancial          as projection on VENDOR_PORTAL.REGFORM_FINANCIAL{
    *,
    TO_MAIN : Association to one VENDOR_PORTAL.REQUEST_INFO
                                       on TO_MAIN.REQUEST_NO = REQUEST_NO           
  };
  entity RegFormOwners             as projection on VENDOR_PORTAL.REGFORM_OWNERS{
    *,
    TO_MAIN : Association to one VENDOR_PORTAL.REQUEST_INFO
                                       on TO_MAIN.REQUEST_NO = REQUEST_NO           
  };
  entity RegFormProdServ           as projection on VENDOR_PORTAL.REGFORM_PRODUCT_SERVICE{
    *,
    TO_MAIN : Association to one VENDOR_PORTAL.REQUEST_INFO
                                       on TO_MAIN.REQUEST_NO = REQUEST_NO           
  };
  entity RegFormCapacity           as projection on VENDOR_PORTAL.REGFORM_CAPACITY{
    *,
    TO_MAIN : Association to one VENDOR_PORTAL.REQUEST_INFO
                                       on TO_MAIN.REQUEST_NO = REQUEST_NO           
  };
  entity RegFormCustomers          as projection on VENDOR_PORTAL.REGFORM_CUSTOMERS{
    *,
    TO_MAIN : Association to one VENDOR_PORTAL.REQUEST_INFO
                                       on TO_MAIN.REQUEST_NO = REQUEST_NO           
  };    
  entity RegFormOEM                as projection on VENDOR_PORTAL.REGFORM_OEM{
    *,
    TO_MAIN : Association to one VENDOR_PORTAL.REQUEST_INFO
                                       on TO_MAIN.REQUEST_NO = REQUEST_NO           
  };    
  entity RegEventsLog              as projection on VENDOR_PORTAL.REQUEST_EVENTS_LOG;
  entity RegSupplierLog            as projection on VENDOR_PORTAL.SUPPLIER_PROFILE_LOG;
  entity VendorMasterS4Hana        as projection on VENDOR_PORTAL.VENDOR_MASTER_S4_HANA{
    *,
    TO_ENTITY:Association to VENDOR_PORTAL.MASTER_ENTITY_CODE on BUKRS=TO_ENTITY.BUKRS       
  }; 
  entity RequestActiveStatus       as projection on VENDOR_PORTAL.REQUEST_ACTIVE_STATUS;
  entity ViewRequestActiveStatus   as projection on VIEW_REQUEST_ACTIVE_STATUS;
  //calculation views     

  entity RequestStatusCount       as projection on VIEW_REQUEST_COUNTER_STATUS;
  entity RequestTypeCount         as projection on VIEW_REQUEST_TYPE_COUNT;
  entity PendingPMRegCount        as projection on VIEW_REG_PM_APPR;
  entity EntityCodeCount          as projection on VIEW_ENTITY_CODE_COUNT;         
  entity PendingByrCount          as projection on VIEW_PENDING_BYR_COUNT;
  entity RequestActionStatusCount as projection on VIEW_REQUEST_ACTION_STATUS;
  entity RequestAllStatusCount    as projection on VIEW_REQUEST_ALL_STATUS_COUNT;
  entity PendingPMReqCount        as projection on VIEW_REQUEST_PM_APPR;
  entity RequestRejStatusCount    as projection on VIEW_REQUEST_REJECTED_STATUS;
  entity SupplierTypeCount        as projection on VIEW_SUPPLIER_TYPE_COUNT;
  entity LegacySuppliers          as projection on VIEW_LG_SUPPL;     
  entity PendingPMRegisterCount   as projection on VIEW_REG_APPROVE_PM;    
  entity ReqTurnAroundTime        as projection on VIEW_TURN_AROUND_TIME;                  
  entity AvgTurnAroundTime        as projection on REQ_TURNAROUND;                 
  entity RequestAvgTurnAroundTime    as projection on REQUEST_TAT;      

  //Views
           
  //Value Help
  define view Vendor_F4 as
    select from RequestInfo distinct {
        key VENDOR_CODE
    }where VENDOR_CODE !='';        

  define view SupplierType_F4 as
    select from RequestInfo distinct {
        key SUPPL_TYPE,    
        key SUPPL_TYPE_DESC   
    }where SUPPL_TYPE !=''; 

  define view VendoSubType_F4 as
    select from RequestInfo distinct {
        key BP_TYPE_CODE,    
         BP_TYPE_DESC           
    } where BP_TYPE_CODE !='';                                       
}
