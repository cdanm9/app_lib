using {VENDOR_PORTAL} from '../db/MASTER_TABLES';
using {
    VENDOR_PORTAL.REQUEST_INFO,
  VENDOR_PORTAL.IVEN_ERROR_LOG,
  VENDOR_PORTAL.REGFORM_FOLDER_IDS,
  VENDOR_PORTAL.REGFORM_ADDRESS
} from '../db/TRANSACTION_TABLES';


service adminPanelService {

  entity MasterTableNames      as projection on VENDOR_PORTAL.MASTER_TABLENAMES;
  entity MasteriVenAttachments as projection on VENDOR_PORTAL.MASTER_IVEN_ATTACHMENTS;
  entity MasterAttachmentTypes as projection on VENDOR_PORTAL.MASTER_ATTACHMENT_TYPES;
  entity MasterRequestType     as projection on VENDOR_PORTAL.MASTER_REQUEST_TYPE;
  entity MasterIvenSettings    as projection on VENDOR_PORTAL.MASTER_IVEN_SETTINGS;
  entity IvenErrorLog          as projection on VENDOR_PORTAL.IVEN_ERROR_LOG;
  entity RegFormFolderIds      as projection on VENDOR_PORTAL.REGFORM_FOLDER_IDS;
  entity MasterCountry         as projection on VENDOR_PORTAL.MASTER_COUNTRY;
  entity MasterEntityCode      as projection on VENDOR_PORTAL.MASTER_ENTITY_CODE;
  entity EmailConfig           as projection on VENDOR_PORTAL.EMAIL_CONFIG;
  entity RequestInfo               as projection on VENDOR_PORTAL.REQUEST_INFO;
  entity MasterStatus              as projection on VENDOR_PORTAL.MASTER_STATUS;
 

  //TEST
  // entity region as projection on VENDOR_PORTAL.MASTER_REGION;
  // entity address as projection on VENDOR_PORTAL.REGFORM_ADDRESS;

  //Get data for Admin Panel
  // function GetAdminPanelData(action : String, tableCode : MasterTableNames:TABLE_CODE, requestNo : Integer) returns array of String;
  function GetAdminPanelData(action : String, tableCode : String, requestNo : Integer) returns array of String;
  //Get Visible and Mandatory Fields
  function GetVisbleMandatoryFields(requestType : Integer, entityCode : String)        returns array of String;
  //Post Data for Admin Panel
  action   PostAdminPanelData(input : String)                                          returns array of String;
  //Post Admin Panel Edits
  action   EditAdminPanelData(input : String)                                          returns array of String;
  function TestOnPremiseConnection(sapClient : String, destFileName : String)          returns array of String;

//Dynamic Logic
//  action   DynamicPostAdminPanelData(input : String)                                          returns array of String;
//   action   DynamicEditAdminPanelData(input : String)                                          returns array of String;
 
}
