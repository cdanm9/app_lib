using {
       // VENDOR_PORTAL,
       // USERMASTER_ENTITIES,
       CALC_HEIRARCHY_MATRIX
} from '../db/MASTER_TABLES';
    
service approvalHierarchyMatrixService {    
       // entity MasterEntityCode           as projection on VENDOR_PORTAL.MASTER_ENTITY_CODE;
       // entity MasterIvenSettings         as projection on VENDOR_PORTAL.MASTER_IVEN_SETTINGS;
       // entity MasterIvenUsers            as projection on VENDOR_PORTAL.MASTER_IVEN_USERS;
       // entity MasterIvenUserEntity       as projection on VENDOR_PORTAL.MASTER_USER_ENTITY_CODES;
       
       // entity MasterStatus               as projection on VENDOR_PORTAL.MASTER_STATUS;
       // entity MasterUserRole             as projection on VENDOR_PORTAL.MASTER_USER_ROLE;
       // entity MatrixRequestApproval      as projection on VENDOR_PORTAL.MATRIX_REQUEST_APPR;
       // entity MatrixRegistrationApproval as projection on VENDOR_PORTAL.MATRIX_REGISTRATION_APPR;
       // entity MasterApprovalHierarchy    as projection on VENDOR_PORTAL.MASTER_APPROVAL_HIERARCHY;
               
       // //Calculation View
       // entity userMasterEntities         as projection on USERMASTER_ENTITIES;
       entity calcHierarchyMatrix        as projection on CALC_HEIRARCHY_MATRIX;

       // type User_Details : {
       //        USER_ROLE : String(50);
       //        USER_ID   : String(50);
       // }         
       // action PostDynamicApprovalHierarchy(action : String, approvalHierarchy : many MasterApprovalHierarchy,userDetails : User_Details) returns String;
}
