using {
       VENDOR_PORTAL,
       USERMASTER_ENTITIES,
       CALC_HEIRARCHY_MATRIX
} from '../db/MASTER_TABLES';

service approvalMatrixService {

       entity MasterCountry              as projection on VENDOR_PORTAL.MASTER_COUNTRY;
       // entity MasterCredential as projection on VENDOR_PORTAL.MASTER_CREDENTIAL;
       entity MasterCurrency             as projection on VENDOR_PORTAL.MASTER_CURRENCY;
       // entity MasterEmailClientInfo as projection on VENDOR_PORTAL.MASTER_EMAIL_CONTACT_ID;
       entity MasterEntityCode           as projection on VENDOR_PORTAL.MASTER_ENTITY_CODE;
       // entity MASTER_FORMFIELDS_ID_DESC as projection on VENDOR_PORTAL.MASTER_FORMFIELDS_ID_DESC;
       // entity MASTER_IAS_USER as projection on VENDOR_PORTAL.MASTER_IAS_USER;
       // entity MasterIbanCountry as projection on VENDOR_PORTAL.MASTER_IBAN_COUNTRY;
       // entity MASTER_IVEN_SAP_VENDOR_NO as projection on VENDOR_PORTAL.MASTER_IVEN_SAP_VENDOR_NO;
       entity MasterIvenSettings         as projection on VENDOR_PORTAL.MASTER_IVEN_SETTINGS;
       entity MasterIvenUsers            as projection on VENDOR_PORTAL.MASTER_IVEN_USERS;
       entity MasterIvenUserEntity       as projection on VENDOR_PORTAL.MASTER_USER_ENTITY_CODES;
       // entity MASTER_ONBOARDING_ATTACHMENTS as projection on VENDOR_PORTAL.MASTER_ONBOARDING_ATTACHMENTS;
       entity MasterPostalcode           as projection on VENDOR_PORTAL.MASTER_REGEX_POSTALCODE;
       entity MasterRegion               as projection on VENDOR_PORTAL.MASTER_REGION;
       entity MasterRequestEvents        as projection on VENDOR_PORTAL.MASTER_REQUEST_EVENTS;
       entity MasterRequestType          as projection on VENDOR_PORTAL.MASTER_REQUEST_TYPE;
       // entity MASTER_SAP_CLIENT as projection on VENDOR_PORTAL.MASTER_SAP_CLIENT;
       entity MasterStatus               as projection on VENDOR_PORTAL.MASTER_STATUS;
       // entity MASTER_SUBACCOUNT as projection on VENDOR_PORTAL.MASTER_SUBACCOUNT;
       entity MasterTableNames           as projection on VENDOR_PORTAL.MASTER_TABLENAMES;
       entity MasterTelecode             as projection on VENDOR_PORTAL.MASTER_TELECODE;
       entity MasterUserRole             as projection on VENDOR_PORTAL.MASTER_USER_ROLE;
       entity MasterAttachmentTypes      as projection on VENDOR_PORTAL.MASTER_ATTACHMENT_TYPES;
       entity MasteriVenAttachments      as projection on VENDOR_PORTAL.MASTER_IVEN_ATTACHMENTS;
       entity MatrixRequestApproval      as projection on VENDOR_PORTAL.MATRIX_REQUEST_APPR;
       entity MatrixRegistrationApproval as projection on VENDOR_PORTAL.MATRIX_REGISTRATION_APPR;
       entity MasterApprovalHierarchy    as projection on VENDOR_PORTAL.MASTER_APPROVAL_HIERARCHY;
      
       //Calculation View
       entity userMasterEntities         as projection on USERMASTER_ENTITIES;
       entity calcHierarchyMatrix        as projection on CALC_HEIRARCHY_MATRIX;

       //CRUD Payload
       type approvalMatrixPayload {
              ACTION                : String;
              APP_TYPE              : String(30);
              USER_DETAILS          : User_Details;
              VALUE                 : array of {
                     APPROVER_LEVEL : Integer;
                     USER_ROLE      : String(10);
                     USER_ID        : String(100);
                     ENTITY_CODE    : String(50);
              }
       }

       type User_Details : {
              USER_ROLE : String(50);
              USER_ID   : String(50);
       }

       //CRUD operation action
       action PostApprovalMatrix(input : approvalMatrixPayload)                                       returns String;
       // action PostDynamicApprovalMatrix(action : String, approvalHierarchy : many MasterApprovalHierarchy,userId:String(1000),userDetails : User_Details) returns String;
}
