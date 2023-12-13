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
  VENDOR_PORTAL.REQUEST_SECURITY_CODE,
  VENDOR_PORTAL.REQUEST_EVENTS_LOG,
  VENDOR_PORTAL.VENDOR_MASTER_S4_HANA,
  VENDOR_PORTAL.REQUEST_ACTIVE_STATUS

} from '../db/TRANSACTION_TABLES';


service registrationProcessService {

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
  entity MasterStatus              as projection on VENDOR_PORTAL.MASTER_STATUS;
  entity MasterClientInfo          as projection on VENDOR_PORTAL.MASTER_EMAIL_CONTACT_ID;
  entity RequestInfo               as projection on VENDOR_PORTAL.REQUEST_INFO;
  entity MasterFormFieldsMandatory as projection on VENDOR_PORTAL.MASTER_REGFORM_FIELDS_MANDATORY;
  entity MasterFormFieldsVisible   as projection on VENDOR_PORTAL.MASTER_REGFORM_FIELDS_VISIBLE;
  entity MasterFormFieldsUpdated   as projection on VENDOR_PORTAL.MASTER_REGFORM_FIELDS_UPDATED;
  entity RegFormDiscInfo           as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_FIELDS;
  entity MasterRequestType         as projection on VENDOR_PORTAL.MASTER_REQUEST_TYPE;
  entity MasterIvenUsers           as projection on VENDOR_PORTAL.MASTER_IVEN_USERS;
  entity MasterIvenUserEntity      as projection on VENDOR_PORTAL.MASTER_USER_ENTITY_CODES;
  entity RegFormDiscRelatives      as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_RELATIVES;
  entity RegFormDiscQaCertif       as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_QACERT;
  entity RegFormAttachFields       as projection on VENDOR_PORTAL.REGFORM_ATTACH_FIELDS;
  entity RegFormAttachments        as projection on VENDOR_PORTAL.REGFORM_ATTACHMENTS;
  entity RegFormCMS                as projection on VENDOR_PORTAL.REGFORM_ATTACHMENTS_CMS;
  entity RegFormAddress            as projection on VENDOR_PORTAL.REGFORM_ADDRESS;
  entity RegFormContacts           as projection on VENDOR_PORTAL.REGFORM_CONTACTS;
  entity RegFormBanks              as projection on VENDOR_PORTAL.REGFORM_BANKS;
  entity RegFormFinancial          as projection on VENDOR_PORTAL.REGFORM_FINANCIAL;
  entity RegFormOwners             as projection on VENDOR_PORTAL.REGFORM_OWNERS;
  entity RegFormProdServ           as projection on VENDOR_PORTAL.REGFORM_PRODUCT_SERVICE;
  entity RegFormCapacity           as projection on VENDOR_PORTAL.REGFORM_CAPACITY;
  entity RegFormCustomers          as projection on VENDOR_PORTAL.REGFORM_CUSTOMERS;
  entity RegFormOEM                as projection on VENDOR_PORTAL.REGFORM_OEM;
  entity RegEventsLog              as projection on VENDOR_PORTAL.REQUEST_EVENTS_LOG;
  entity RegSupplierLog            as projection on VENDOR_PORTAL.SUPPLIER_PROFILE_LOG;
  entity VendorMasterS4Hana        as projection on VENDOR_PORTAL.VENDOR_MASTER_S4_HANA;
  entity RequestActiveStatus       as projection on VENDOR_PORTAL.REQUEST_ACTIVE_STATUS;
  entity ViewRequestActiveStatus   as projection on VIEW_REQUEST_ACTIVE_STATUS;

  type securityPinResponse {
    
    CREATED_ON    : Timestamp;
    IS_MATCH:Boolean;
    RESPONSE_MESSAGE:String(30);
  }

  type User_Details : {
    USER_ROLE : String(50);
    USER_ID   : String(50);
  }

  // Functions
  function GetDraftData(requestNo : Integer, entityCode : String, creationType : Integer, userId : String, userRole : String)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            returns many String;
  function GetSecurityPin(vendorName : String, vendorEmail : String, requesterId : String, userId : String, userRole : String)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           returns many String;
  function CheckSecurityPin(vendorEmail : String,securityPin:String, userId : String, userRole : String)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    returns securityPinResponse;
  
  // Actions for Posting
  action   PostRegFormData(action : String, stepNo : Integer, reqHeader : many RequestInfo, addressData : many RegFormAddress, contactsData : many RegFormContacts, bankData : many RegFormBanks, financeData : many RegFormFinancial, ownersData : many RegFormOwners, prodServData : many RegFormProdServ, capacityData : many RegFormCapacity, customerData : many RegFormCustomers, oemData : many RegFormOEM, discFieldsData : many RegFormDiscInfo, discRelativesData : many RegFormDiscRelatives, discQaCertiData : many RegFormDiscQaCertif, attachmentFieldsData : many RegFormAttachFields, attachmentData : many RegFormAttachments, updatedFields : many String, eventsData : many RegEventsLog, userDetails : User_Details) returns many String;

  action   EditRegFormData(action : String, // APPROVER | VENDOR
                           stepNo : Integer,
                           reqHeader : many RequestInfo,
                           addressData : many RegFormAddress,
                           contactsData : many RegFormContacts,
                           updatedFields : many String,
                           editLog : many RegSupplierLog,
                           userDetails : User_Details)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   returns many String;

  //Action for Approval
  action   RegFormDataApproval(action : String,
                               inputData : many RequestInfo,
                               addressData : many RegFormAddress,
                               contactsData : many RegFormContacts,
                               bankData : many RegFormBanks,
                               eventsData : many RegEventsLog,
                               userDetails : User_Details)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               returns many String;

  type MessengerData {
    loginId : String;
    mailTo  : String;
  }

  //Action for  Messenger
  action   MessengerService(action : String, messengerData : MessengerData, inputData : many RequestInfo, eventsData : many RegEventsLog, userDetails : User_Details)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    returns many String;

  type AttachmentID {
    REQUEST_NO : Integer64;
    SR_NO      : Integer;
    DOC_ID     : Integer64;
  }

  action   ManageCMS(action : String, attachmentId : AttachmentID, inputData : many RegFormCMS, userDetails : User_Details)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              returns many String;

// test security pin
// function getEncryptedSecurityPin(pin:String) returns many String;

}
