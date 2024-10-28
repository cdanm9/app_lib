using {tools} from '../db/tools';   
service appSaInfoService { 
    @odata.draft.enabled:true
    entity MasterApps as projection on tools.MasterApps;
    entity MasterSubApps as projection on tools.MasterSubApps;  
    entity MasterAppTypes as projection on tools.MasterAppTypes;  
    entity MasterRoleCollections as projection on tools.MasterRoleCollections;
    
    @odata.draft.enabled:true
    entity MasterAppResources as projection on tools.MasterAppResources;    
    entity MasterAppResourceTypes as projection on tools.MasterAppResourceTypes;          
    function getAccessibleApps() returns many String;     
}
