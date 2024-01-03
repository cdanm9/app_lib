
using {
  VENDOR_PORTAL,
  VIEW_REQUEST_ACTIVE_STATUS,
  VIEW_REQUEST_COUNTER_STATUS,
  VIEW_REQUEST_TYPE_COUNT,
  VIEW_REG_PM_APPR,
  VIEW_ENTITY_CODE_COUNT,
  VIEW_PENDING_BYR_COUNT,
  VIEW_REQUEST_ACTION_STATUS,
  VIEW_REQUEST_ALL_STATUS_COUNT,
  VIEW_REQUEST_PM_APPR,
  VIEW_REQUEST_REJECTED_STATUS,
  VIEW_SUPPLIER_TYPE_COUNT
} from '../db/MASTER_TABLES';
using {
  VENDOR_PORTAL.REQUEST_INFO,
  VENDOR_PORTAL.REGFORM_ADDRESS,
  VENDOR_PORTAL.REGFORM_CONTACTS,
  VENDOR_PORTAL.REGFORM_BANKS,
  VENDOR_PORTAL.REGFORM_FINANCIAL,
  VENDOR_PORTAL.REGFORM_OWNERS,
  VENDOR_PORTAL.REGFORM_PRODUCT_SERVICE,
  VENDOR_PORTAL.REGFORM_CAPACITY,
  VENDOR_PORTAL.REGFORM_CUSTOMERS,
  VENDOR_PORTAL.REGFORM_OEM,
  VENDOR_PORTAL.REGFORM_DISCLOSURE_FIELDS,
  VENDOR_PORTAL.REGFORM_DISCLOSURE_QACERT,
  VENDOR_PORTAL.REGFORM_DISCLOSURE_RELATIVES,
  VENDOR_PORTAL.REGFORM_ATTACH_FIELDS,
  VENDOR_PORTAL.REGFORM_ATTACHMENTS,
  VENDOR_PORTAL.REQUEST_SECURITY_CODE,
  VENDOR_PORTAL.REQUEST_EVENTS_LOG,
  VENDOR_PORTAL.VENDOR_MASTER_S4_HANA,
  VENDOR_PORTAL.REQUEST_ACTIVE_STATUS

} from '../db/TRANSACTION_TABLES';

service dashboardService {
  entity MasterEntityCode         as projection on VENDOR_PORTAL.MASTER_ENTITY_CODE;
  entity MasterStatus             as projection on VENDOR_PORTAL.MASTER_STATUS;
  entity RequestInfo              as projection on VENDOR_PORTAL.REQUEST_INFO;
  entity RegFormDiscInfo          as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_FIELDS;
  entity MasterRequestType        as projection on VENDOR_PORTAL.MASTER_REQUEST_TYPE;
  entity MasterIvenUsers          as projection on VENDOR_PORTAL.MASTER_IVEN_USERS;
  entity MasterIvenUserEntity     as projection on VENDOR_PORTAL.MASTER_USER_ENTITY_CODES;
  entity RegFormDiscRelatives     as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_RELATIVES;
  entity RegFormDiscQaCertif      as projection on VENDOR_PORTAL.REGFORM_DISCLOSURE_QACERT;
  entity RegFormAttachFields      as projection on VENDOR_PORTAL.REGFORM_ATTACH_FIELDS;
  entity RegFormAttachments       as projection on VENDOR_PORTAL.REGFORM_ATTACHMENTS;
  entity RegFormCMS               as projection on VENDOR_PORTAL.REGFORM_ATTACHMENTS_CMS;
  entity RegFormAddress           as projection on VENDOR_PORTAL.REGFORM_ADDRESS;
  entity RegFormContacts          as projection on VENDOR_PORTAL.REGFORM_CONTACTS;
  entity RegFormBanks             as projection on VENDOR_PORTAL.REGFORM_BANKS;
  entity RegFormFinancial         as projection on VENDOR_PORTAL.REGFORM_FINANCIAL;
  entity RegFormOwners            as projection on VENDOR_PORTAL.REGFORM_OWNERS;
  entity RegFormProdServ          as projection on VENDOR_PORTAL.REGFORM_PRODUCT_SERVICE;
  entity RegFormCapacity          as projection on VENDOR_PORTAL.REGFORM_CAPACITY;
  entity RegFormCustomers         as projection on VENDOR_PORTAL.REGFORM_CUSTOMERS;
  entity RegFormOEM               as projection on VENDOR_PORTAL.REGFORM_OEM;
  entity RegEventsLog             as projection on VENDOR_PORTAL.REQUEST_EVENTS_LOG;
  entity RegSupplierLog           as projection on VENDOR_PORTAL.SUPPLIER_PROFILE_LOG;
  entity RequestActiveStatus      as projection on VENDOR_PORTAL.REQUEST_ACTIVE_STATUS;
  entity ViewRequestActiveStatus  as projection on VIEW_REQUEST_ACTIVE_STATUS;

  //calculation views

  entity RequestStatusCount       as projection on VIEW_REQUEST_COUNTER_STATUS;
  entity RequestTypeCount         as projection on VIEW_REQUEST_TYPE_COUNT;
  entity PendingPMRegCount        as projection on VIEW_REG_PM_APPR;
  entity EntityCodeCount          as projection on VIEW_ENTITY_CODE_COUNT;
  entity PendingByrCount          as projection on VIEW_PENDING_BYR_COUNT;
  entity RequestActionStatusCount as projection on VIEW_REQUEST_ACTION_STATUS;
  entity RequestAllStatusCount    as projection on VIEW_REQUEST_ALL_STATUS_COUNT;
  entity PendingPMReqCount        as projection on VIEW_REQUEST_PM_APPR;
  entity RequestRejStatusCount    as projection on VIEW_REQUEST_REJECTED_STATUS;
  entity SupplierTypeCount        as projection on VIEW_SUPPLIER_TYPE_COUNT;

  //S4HANA


}
