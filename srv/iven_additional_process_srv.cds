using {
  VENDOR_PORTAL,
  VIEW_REQUEST_ACTIVE_STATUS
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
  VIEW_DATA_MIGRATION_FIELDS

} from '../db/TRANSACTION_TABLES';

service addtionalProcessService {   

  entity MasterClientInfo                as projection on VENDOR_PORTAL.MASTER_EMAIL_CONTACT_ID;
  entity MasterIvenUsers                 as projection on VENDOR_PORTAL.MASTER_IVEN_USERS;   
  @cds.query.limit.max: 5000 
  entity RequestInfo                     as projection on VENDOR_PORTAL.REQUEST_INFO;
  entity MasterIbanCountry               as projection on VENDOR_PORTAL.MASTER_IBAN_COUNTRY;
  entity RegSupplierLog                  as projection on VENDOR_PORTAL.SUPPLIER_PROFILE_LOG;
  entity ViewRequestActiveStatus         as projection on VIEW_REQUEST_ACTIVE_STATUS;
  entity RegFormCMS                      as projection on VENDOR_PORTAL.REGFORM_ATTACHMENTS_CMS;
  entity RegFormDiscQaCertif             as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_QACERT;
  entity MasterCountry                   as projection on VENDOR_PORTAL.MASTER_COUNTRY;
  //  entity NdaAttachments          as projection on VENDOR_PORTAL.NDA_ATTACHMENTS;
  entity MasterStatus                    as projection on VENDOR_PORTAL.MASTER_STATUS;
  entity RegFormAddress                  as projection on VENDOR_PORTAL.REGFORM_ADDRESS;
  entity RegFormContacts                 as projection on VENDOR_PORTAL.REGFORM_CONTACTS;
  entity RegFormBanks                    as projection on VENDOR_PORTAL.REGFORM_BANKS;
  entity RegFormFinancial                as projection on VENDOR_PORTAL.REGFORM_FINANCIAL;
  entity RegFormOwners                   as projection on VENDOR_PORTAL.REGFORM_OWNERS;
  entity RegFormProdServ                 as projection on VENDOR_PORTAL.REGFORM_PRODUCT_SERVICE;
  entity RegFormCapacity                 as projection on VENDOR_PORTAL.REGFORM_CAPACITY;
  entity RegFormCustomers                as projection on VENDOR_PORTAL.REGFORM_CUSTOMERS;
  entity RegFormOEM                      as projection on VENDOR_PORTAL.REGFORM_OEM;
  entity MasterFormFieldsMandatory       as projection on VENDOR_PORTAL.MASTER_REGFORM_FIELDS_MANDATORY;
  entity MasterFormFieldsVisible         as projection on VENDOR_PORTAL.MASTER_REGFORM_FIELDS_VISIBLE;
  entity MasterFormFieldsUpdated         as projection on VENDOR_PORTAL.MASTER_REGFORM_FIELDS_UPDATED;
  entity RegFormDiscInfo                 as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_FIELDS;
  entity RegFormDiscRelatives            as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_RELATIVES;
  entity RegFormAttachFields             as projection on VENDOR_PORTAL.REGFORM_ATTACH_FIELDS;
  entity RegFormAttachments              as projection on VENDOR_PORTAL.REGFORM_ATTACHMENTS;
  entity MasterRequestType               as projection on VENDOR_PORTAL.MASTER_REQUEST_TYPE;
  entity MasterEntityCode                as projection on VENDOR_PORTAL.MASTER_ENTITY_CODE;
  entity MasterTelecode                  as projection on VENDOR_PORTAL.MASTER_TELECODE;
  entity MasterPostalcode                as projection on VENDOR_PORTAL.MASTER_REGEX_POSTALCODE;
  entity MasterRegion                    as projection on VENDOR_PORTAL.MASTER_REGION;
  entity RequestActiveStatus             as projection on VENDOR_PORTAL.REQUEST_ACTIVE_STATUS;
  entity RegEventsLog                    as projection on VENDOR_PORTAL.REQUEST_EVENTS_LOG;
  entity MasteriVenAttachments           as projection on VENDOR_PORTAL.MASTER_IVEN_ATTACHMENTS;
  entity DataMigrationFieldConfiguration as projection on VENDOR_PORTAL.DATA_MIGRATION_FIELD_CONFIGURATION;
  entity ViewDataMigrationFields         as projection on VIEW_DATA_MIGRATION_FIELDS;
  entity EmailActionlog                   as projection on VENDOR_PORTAL.IVEN_EMAIL_LOG;
  entity EmailConfig                  as projection on VENDOR_PORTAL.EMAIL_CONFIG;

  type User_Details:{
    USER_ROLE: String(50);
    USER_ID: String(50);
  }
  type sapVendorCodeDetails:{
     ADDRESS_CODE : String(10);
    CONTACTS_CODE : String(10);
    BANK_CODE:String(10);
  }

  action   VendorInternalRequest(action : String, stepNo : Integer, comment : String, srNo : Integer, attachCode : Integer, ndaStatus : String, reqHeader : many RequestInfo, addressData : many RegFormAddress, contactsData : many RegFormContacts, bankData : many RegFormBanks, financeData : many RegFormFinancial, ownersData : many RegFormOwners, prodServData : many RegFormProdServ, capacityData : many RegFormCapacity, customerData : many RegFormCustomers, oemData : many RegFormOEM, discFieldsData : many RegFormDiscInfo, discRelativesData : many RegFormDiscRelatives, discQaCertiData : many RegFormDiscQaCertif, attachmentFieldsData : many RegFormAttachFields, attachmentData : many RegFormAttachments, updatedFields : many String, eventsData : many RegEventsLog, supplierLogData : many RegSupplierLog,userDetails:User_Details) returns many String;  
  action   VendorDataMigration(action : String, reqHeader : many RequestInfo, addressData : many RegFormAddress, contactsData : many RegFormContacts, bankData : many RegFormBanks,sapCodeData: many sapVendorCodeDetails,userDetails:User_Details)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   returns many String;
  function getDataMigrationConfiguration()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             returns many String;
  action   DataMigrationConfiguration(action : String, DMFieldConfiguration : many DataMigrationFieldConfiguration, DMLimit : Integer,userDetails:User_Details)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                returns many String;
  function checkServiceAvailability(cloudSrv:Boolean,onPremiseSrv:Boolean) returns many String;
  function triggerEmailBulk()  returns many String;                            
}
