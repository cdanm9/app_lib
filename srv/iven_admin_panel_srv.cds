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
}