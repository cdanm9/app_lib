using {VENDOR_PORTAL} from '../db/MASTER_TABLES';
using {
  VENDOR_PORTAL.REQUEST_INFO
} from '../db/TRANSACTION_TABLES';

service userMasterService {

  entity MasterIasUsers       as projection on VENDOR_PORTAL.MASTER_IAS_USER;
  entity MasterIvenUsers      as projection on VENDOR_PORTAL.MASTER_IVEN_USERS;
  entity MasterEntityCode     as projection on VENDOR_PORTAL.MASTER_ENTITY_CODE;
  entity MasterUserRole       as projection on VENDOR_PORTAL.MASTER_USER_ROLE;
  entity MasterIvenUserEntity as projection on VENDOR_PORTAL.MASTER_USER_ENTITY_CODES{
    *,
    TO_ROLE:Association to one MasterUserRole on TO_ROLE.CODE=USER_ROLE       
  };
  entity RequestInfo          as projection on VENDOR_PORTAL.REQUEST_INFO;            
   
  //CRUD Payload         
  type UserMasterPayload {
    ACTION         : String;
    // SR_NO          : Integer;
    USER_DETAILS : User_Details;
    VALUE          : array of {
      USERMASTER     : array of {   
      SR_NO        : Integer;
      USER_ID      : String(50);
      USER_ROLE    : String(50);
      USER_NAME    : String(500);
      EMAIL        : String(150);
      COMPANY_CODE : String(500);
      EMP_NO       : String(100);
      CREATED_ON   : Timestamp;
      UPDATED_ON   : Timestamp;
      ACTIVE       : String(1);
    };
    ENTITYDATA     : array of {
      USER_ID      : String(50);
      USER_ROLE    : String(50);
      ENTITY_CODE  : String(50);
      EMAIL        : String(150);
      ENTITY_DESC  : String(100);
    }
    };        
  }
  type User_Details:{
    USER_ROLE: String(50);
    USER_ID: String(50);
  }

//CRUD operation action      
// action PostUserMaster(input : UserMasterPayload) returns String;
action PostUserMaster(action: String,userMaster:many MasterIvenUsers,entityData:many MasterIvenUserEntity,userDetails:User_Details)  returns String;
}  