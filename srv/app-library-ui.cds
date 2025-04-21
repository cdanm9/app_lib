using {appLibraryService} from './app-library';

annotate appLibraryService.MasterApps @(
    Common.SideEffects #IconView : {
        SourceProperties : [
            iconUri   
        ],
        TargetProperties:[
            icon
        ]   
    }
);

annotate appLibraryService.MasterApps@(
    Common.SideEffects #SubIconView: {
        SourceEntities  : [
            to_SubApp
        ],    
        TargetEntities: [       
            to_SubApp              
        ]                  
});