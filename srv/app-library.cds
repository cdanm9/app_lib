using {app_lib} from '../db/app_lib';   
service appLibraryService { 
    @odata.draft.enabled:true
    entity MasterApps as projection on app_lib.MasterApps;
    entity MasterSubApps as projection on app_lib.MasterSubApps;  
    entity MasterAppTypes as projection on app_lib.MasterAppTypes;  
    entity MasterRoleCollections as projection on app_lib.MasterRoleCollections;
    
    @odata.draft.enabled:true
    entity MasterAppResources as projection on app_lib.MasterAppResources;    
    entity MasterAppResourceTypes as projection on app_lib.MasterAppResourceTypes;          
    function getAccessibleApps() returns many String;     
}


