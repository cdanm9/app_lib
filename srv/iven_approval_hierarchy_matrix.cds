using {
       VENDOR_PORTAL
} from '../db/MASTER_TABLES';
    
service approvalHierarchyMatrixService {   
       @odata.draft.enabled  
       // @restrict: [
       // { grant: '*', to:['Admin','Approver','PM']}
       // ]          
       entity MasterEntityType           as projection on VENDOR_PORTAL.MASTER_ENTITY_TYPE_FE; 
       // @restrict: [
       // { grant: '*', to:['Admin','Approver','PM']}
       // ]    
       entity MasterApprovalHierarchy    as projection on VENDOR_PORTAL.MASTER_APPROVAL_HIERARCHY_FE;  
       // @restrict: [
       // { grant: 'READ', to:['Admin','Approver','PM']}
       // ]   
       entity MasterApprovalType         as projection on VENDOR_PORTAL.MASTER_APPROVAL_TYPE;  
       // @restrict: [
       // { grant: 'READ', to:['Admin','Approver','PM']}
       // ]   
       entity MasterEntityCode           as projection on VENDOR_PORTAL.MASTER_ENTITY_CODE;
       // @restrict: [
       // { grant: 'READ', to:['Admin','Approver','PM']}
       // ] 
       entity MasterIvenSettings         as projection on VENDOR_PORTAL.MASTER_IVEN_SETTINGS;
       // @restrict: [
       // { grant: 'READ', to:['Admin','Approver','PM']}
       // ] 
       // entity MasterIvenUsers            as projection on VENDOR_PORTAL.MASTER_IVEN_USERS;
       // @restrict: [
       // { grant: 'READ', to:['Admin','Approver','PM']}
       // ] 
       entity MasterIvenUserEntity       as projection on VENDOR_PORTAL.MASTER_USER_ENTITY_CODES{
              *,
              TO_ENTITY:Association to VENDOR_PORTAL.MASTER_ENTITY_CODE
                                   on TO_ENTITY.BUKRS = ENTITY_CODE,
              TO_ROLE:Association to VENDOR_PORTAL.MASTER_USER_ROLE
                                   on TO_ROLE.CODE = USER_ROLE                 
       };         
       // @restrict: [
       // { grant: 'READ', to:['Admin','Approver','PM']}
       // ] 
       entity MasterStatus               as projection on VENDOR_PORTAL.MASTER_STATUS;
       // @restrict: [
       // { grant: 'READ', to:['Admin','Approver','PM']}
       // ] 
       entity MasterUserRole             as projection on VENDOR_PORTAL.MASTER_USER_ROLE;                
       // entity MatrixRequestApproval      as projection on VENDOR_PORTAL.MATRIX_REQUEST_APPR;
       // entity MatrixRegistrationApproval as projection on VENDOR_PORTAL.MATRIX_REGISTRATION_APPR;
        
       
       // type User_Details : {
       //        USER_ROLE : String(50);
       //        USER_ID   : String(50);
       // }         
       // action PostDynamicApprovalHierarchy(action : String, approvalHierarchy : many MasterApprovalHierarchy,userDetails : User_Details) returns String;
}
