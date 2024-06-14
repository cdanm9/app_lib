using {fioriUserMasterService} from './iven_fiori_user_master_srv';

annotate fioriUserMasterService.MasterIvenUsers @(
    Common.SideEffects #UserCredentialsChange : {
        SourceProperties : [
            USER_ID    
        ],
        TargetEntities : [
            TO_USER_ROLES,
            TO_USER_ENTITIES                     
        ]
    }
);          

annotate fioriUserMasterService.MasterIvenUsers@(
    Common.SideEffects #UserChanges: {   
        SourceProperties  : [
            USER_ID  
        ],    
        TargetProperties: [
            USER_NAME,
            EMAIL   
        ]                  
});
