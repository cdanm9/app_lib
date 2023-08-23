using {VENDOR_PORTAL} from '../db/MASTER_TABLES';
using {VENDOR_PORTAL.IVEN_ERROR_LOG,  VENDOR_PORTAL.REGFORM_FOLDER_IDS} from '../db/TRANSACTION_TABLES';


service CopyadminPanelService {

    entity MasterTableNames as projection on VENDOR_PORTAL.MASTER_TABLENAMES;
    entity MasteriVenAttachments as projection on VENDOR_PORTAL.MASTER_IVEN_ATTACHMENTS;
    entity MasterAttachmentTypes as projection on VENDOR_PORTAL.MASTER_ATTACHMENT_TYPES;
    entity MasterRequestType as projection on VENDOR_PORTAL.MASTER_REQUEST_TYPE;
    entity MasterIvenSettings as projection on VENDOR_PORTAL.MASTER_IVEN_SETTINGS;
    entity IvenErrorLog as projection on VENDOR_PORTAL.IVEN_ERROR_LOG;
    entity RegFormFolderIds as projection on VENDOR_PORTAL.REGFORM_FOLDER_IDS; 
    entity MasterCountry    as projection on VENDOR_PORTAL.MASTER_COUNTRY;
    entity MasterEntityCode   as projection on VENDOR_PORTAL.MASTER_ENTITY_CODE;

      //Admin Panel PostDelete Data Payload
       type adminPanelPostDeleteDataPayload {
              ACTION: String;
             TABLE_NAME: String(50);
             TABLE_DESCRIPTION:String(100);
             INPUT_DATA:array of String;
       }
      
       function GetAdminPanelData(input : String) returns array of String;
       action PostDeleteAdminPanelData(input :adminPanelPostDeleteDataPayload) returns array of String; 
}