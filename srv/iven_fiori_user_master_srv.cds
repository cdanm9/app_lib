using {VENDOR_PORTAL} from '../db/MASTER_TABLES';
using {
  VENDOR_PORTAL.REQUEST_INFO
} from '../db/TRANSACTION_TABLES';

service fioriUserMasterService {

  entity MasterIasUsers       as projection on VENDOR_PORTAL.MASTER_IAS_USER;
     
  @odata.draft.enabled   
  entity MasterIvenUsers      as projection on VENDOR_PORTAL.MASTER_IVEN_USERS_FIORI;
  entity MasterIvenUserRoles  as projection on VENDOR_PORTAL.MASTER_USER_ROLE_CODES_FIORI;
  entity MasterEntityCode     as projection on VENDOR_PORTAL.MASTER_ENTITY_CODE;
  entity MasterUserRole       as projection on VENDOR_PORTAL.MASTER_USER_ROLE;
  entity MasterIvenUserEntity as projection on VENDOR_PORTAL.MASTER_USER_ENTITY_CODES_FIORI;   
  // entity RequestInfo          as projection on VENDOR_PORTAL.REQUEST_INFO;                
  type User_Details:{
    USER_ROLE: String(50);
    USER_ID: String(50);
  }
}  