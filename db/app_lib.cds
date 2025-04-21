using { cuid } from '@sap/cds/common';
context app_lib{   
    entity MasterAppResources:cuid{   
        resourceType:String(100);       
        appName:String(250);
        @Core.IsMediaType: true mimeType:String;        
        @Core.MediaType:mimeType resource:LargeBinary @Core.ContentDisposition.Filename: name @Core.ContentDisposition.Type: 'inline';    
        name: String(200);  
        url:String(200); 
        to_ResourceType: Association to one MasterAppResourceTypes on to_ResourceType.code=resourceType;         
    }

    entity MasterAppResourceTypes{
        key code:String(100);
        desc:String(300);
    }

    entity MasterApps:cuid{       
        @readonly sequence:Integer64;     
        name: String(100);
        iconUri:String(250);
        icon: String(100) @UI : {IsImageURL : true}; 
        btpRole:String(100); 
        appType:String(100); 

        to_AppType: Association to one MasterAppTypes on to_AppType.code=appType;                   
        to_SubApp: Composition of many MasterSubApps on to_SubApp.to_App=$self;                  
    }               

    entity MasterSubApps:cuid{                
        name: String(100);
        icon: String(100) @UI : {IsImageURL : true};                         
        iconUri: String(100);                            
        appUrl:String(2000); 
        to_App:Association to MasterApps;                     
    }

    entity MasterAppTypes{
        key code:String(20);    
        desc:String(500);        
    }
     
    entity MasterRoleCollections{
        key name:String(100);    
        description:String(500);        
        isReadOnly:Boolean;        
    }
}