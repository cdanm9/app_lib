using {VENDOR_PORTAL} from '../db/MASTER_TABLES';
service userMasterService {
    entity MasterIasUsers as projection on VENDOR_PORTAL.MASTER_IAS_USER;
    entity MasterIvenUsers as projection on VENDOR_PORTAL.MASTER_IVEN_USERS;
    entity MasterEntityCode as projection on VENDOR_PORTAL.MASTER_ENTITY_CODE;
    entity MasterUserRole as projection on VENDOR_PORTAL.MASTER_USER_ROLE;
    entity MasterIvenUserEntity as projection on VENDOR_PORTAL.MASTER_USER_ENTITY_CODES;

      //Calculation View
    //  entity userMasterEntities as projection on VENDOR_PORTAL.USERMASTER_ENTITIES;
}