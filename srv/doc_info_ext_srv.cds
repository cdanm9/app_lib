using {DOC_INFO_EXT} from '../db/DOC_INFO_EXT';
service docInfoExtService {

    //ENTITY 
    entity ATTACHMENT as projection on DOC_INFO_EXT.ATTACHMENT;
    entity HeaderSet as projection on  DOC_INFO_EXT.DOC_HEADER;   
    entity ItemSet as projection on DOC_INFO_EXT.DOC_LINEITEMS;      

    action AttachmentPost(ACTION:String,DOC_ATTACHMENT:many ATTACHMENT) returns many String;   
    action POUpdate(ACTION:String,DOC_HEADER: HeaderSet,DOC_LINEITEMS: many ItemSet,ATTACHMENT: ATTACHMENT) returns many String;           

    action DocInfoExtTrigger() returns many String;           
}
