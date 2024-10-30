using {toolPage} from './tool-page';

annotate toolPage.MasterApps @(
    Common.SideEffects #IconView : {
        SourceProperties : [
            iconUri   
        ],
        TargetProperties:[
            icon
        ]   
    }
);

annotate toolPage.MasterApps@(
    Common.SideEffects #SubIconView: {
        SourceEntities  : [
            to_SubApp
        ],    
        TargetEntities: [       
            to_SubApp              
        ]                  
});