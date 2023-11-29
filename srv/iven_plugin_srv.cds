using {
  VENDOR_PORTAL
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
  VENDOR_PORTAL.REGFORM_ATTACHMENTS
} from '../db/TRANSACTION_TABLES';


service pluginService {

  entity MasterIvenUsers           as projection on VENDOR_PORTAL.MASTER_IVEN_USERS;
  entity MasteriVenAttachments     as projection on VENDOR_PORTAL.MASTER_IVEN_ATTACHMENTS;
  entity MasterRequestType         as projection on VENDOR_PORTAL.MASTER_REQUEST_TYPE;
  entity MasterStatus              as projection on VENDOR_PORTAL.MASTER_STATUS;
  entity MasterEntityCode          as projection on VENDOR_PORTAL.MASTER_ENTITY_CODE;
  entity MasterCountry             as projection on VENDOR_PORTAL.MASTER_COUNTRY;
  entity MasterFormFieldsMandatory as projection on VENDOR_PORTAL.MASTER_REGFORM_FIELDS_MANDATORY;
  entity MasterFormFieldsVisible   as projection on VENDOR_PORTAL.MASTER_REGFORM_FIELDS_VISIBLE;
  entity MasterFormFieldsUpdated   as projection on VENDOR_PORTAL.MASTER_REGFORM_FIELDS_UPDATED;
  entity MasterRegion              as projection on VENDOR_PORTAL.MASTER_REGION;
  entity MasterCurrency            as projection on VENDOR_PORTAL.MASTER_CURRENCY;
  entity MasterRequestEvents       as projection on VENDOR_PORTAL.MASTER_REQUEST_EVENTS;
  entity RequestInfo               as projection on VENDOR_PORTAL.REQUEST_INFO;
  entity RegFormAddress            as projection on VENDOR_PORTAL.REGFORM_ADDRESS;
  entity RegFormContacts           as projection on VENDOR_PORTAL.REGFORM_CONTACTS;
  entity RegFormBanks              as projection on VENDOR_PORTAL.REGFORM_BANKS;
  entity RegFormFinancial          as projection on VENDOR_PORTAL.REGFORM_FINANCIAL;
  entity RegFormOwners             as projection on VENDOR_PORTAL.REGFORM_OWNERS;
  entity RegFormProdServ           as projection on VENDOR_PORTAL.REGFORM_PRODUCT_SERVICE;
  entity RegFormCapacity           as projection on VENDOR_PORTAL.REGFORM_CAPACITY;
  entity RegFormCustomers          as projection on VENDOR_PORTAL.REGFORM_CUSTOMERS;
  entity RegFormOEM                as projection on VENDOR_PORTAL.REGFORM_OEM;
  entity RegFormDiscInfo           as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_FIELDS;
  entity RegFormDiscRelatives      as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_RELATIVES;
  entity RegFormDiscQaCertif       as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_QACERT;
  entity RegFormAttachFields       as projection on VENDOR_PORTAL.REGFORM_ATTACH_FIELDS;
  entity RegFormAttachments        as projection on VENDOR_PORTAL.REGFORM_ATTACHMENTS;

  function getPluginData(action :String,loginEmail:String,isRequests:String,isSettings:String,userId:String,userRole:String) returns many String;

}
