using {approvalHierarchyMatrixService} from './iven_approval_hierarchy_matrix';

annotate approvalHierarchyMatrixService.MasterEntityType @(
    Common.SideEffects #EntityApprTypeChange : {
        SourceProperties : [
            ENTITY_CODE,    
            APPR_TYPE        
        ],
        TargetEntities : [
            TO_HIERARCHY                     
        ]
    }
);

annotate approvalHierarchyMatrixService.MasterEntityType@(
    Common.SideEffects #ReactionHierarchyCreationOrDeletion: {
        SourceEntities  : [
            TO_HIERARCHY
        ],    
        TargetEntities: [
            TO_HIERARCHY              
        ]                  
});

