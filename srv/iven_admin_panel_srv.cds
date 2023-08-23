using {VENDOR_PORTAL} from '../db/MASTER_TABLES';
using {VENDOR_PORTAL.IVEN_ERROR_LOG,  VENDOR_PORTAL.REGFORM_FOLDER_ID_DESC} from '../db/TRANSACTION_TABLES';


service adminPanelService {

    entity MasterTableNames as projection on VENDOR_PORTAL.MASTER_TABLENAMES;
    entity MasteriVenAttachments as projection on VENDOR_PORTAL.MASTER_IVEN_ATTACHMENTS;
    entity MasterAttachmentTypes as projection on VENDOR_PORTAL.MASTER_ATTACHMENT_TYPES;
    entity MasterRequestType as projection on VENDOR_PORTAL.MASTER_REQUEST_TYPE;
    entity MasterIvenSettings as projection on VENDOR_PORTAL.MASTER_IVEN_SETTINGS;
    entity IvenErrorLog as projection on VENDOR_PORTAL.IVEN_ERROR_LOG;
    entity FormFolderIdDesc as projection on VENDOR_PORTAL.REGFORM_FOLDER_ID_DESC; 
    entity MasterCountry    as projection on VENDOR_PORTAL.MASTER_COUNTRY;
    entity MasterEntityCode   as projection on VENDOR_PORTAL.MASTER_ENTITY_CODE;

      //Admin Panel GetData Payload
       type adminPanelGetDataPayload {
              ACTION: String;
             TABLE_CODE: String(25);
             REQUEST_NO:Integer64;
       }
       //CRUD operation action
       action GetAdminPanelData(input : adminPanelGetDataPayload) returns array of String;  
       // function simpleFunc(input :String) returns String;
}