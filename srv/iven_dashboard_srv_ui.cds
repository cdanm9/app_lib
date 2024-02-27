using {dashboardService} from './iven_dashboard_srv';

//Hide SearchBar from Overview Page
annotate dashboardService.RequestInfo with @(
    Capabilities.SearchRestrictions : {
        Searchable : false,
    }            
);

//Measure - Dimension Annotation(X-Y Axis)
annotate dashboardService.RequestRejStatusCount with {
  @Analytics.Dimension      : true
  DESCRIPTION @(title  : 'Status');
   @Analytics.Dimension      : true
  STATUS @(title  : 'Status');
  @Analytics.Measure        : true   
  @Core.Computed
  REJ_STATUS_COUNT @(title                   : 'Total Rejected Request');        
}

annotate dashboardService.RequestActionStatusCount with {
  @Analytics.Dimension      : true
  DESCRIPTION @(title  : 'Status');
  @Analytics.Dimension      : true
  STATUS @(title  : 'Status');
  @Analytics.Measure        : true   
  @Core.Computed
  ACT_STATUS_COUNT @(title                   : 'Total Request');        
}



annotate dashboardService.EntityCodeCount with {
  @Analytics.Dimension      : true
  BUTXT @(title  : 'Entity');
  @Analytics.Dimension      : true       
  ENTITY_CODE @(title  : 'Entity Code');        
  @Analytics.Measure        : true   
  @Core.Computed
  ENTITY_COUNT @(title                   : 'Total Request');        
}




annotate dashboardService.RequestTypeCount with {
  @Analytics.Dimension      : true
  DESCRIPTION @(title  : 'Request Type');
   @Analytics.Dimension      : true
  REQUEST_TYPE @(title  : 'Request Type');
  @Analytics.Measure        : true   
  @Core.Computed
  REQ_TYPE_COUNT @(title                   : 'Total Request');        
}




annotate dashboardService.PendingByrCount with {
  @Analytics.Dimension      : true
  DESCRIPTION @(title  : 'Buyer Status');
  @Analytics.Dimension      : true
  STATUS @(title  : 'Buyer Status');   
  @Analytics.Measure        : true      
  @Core.Computed
  PND_BYR_COUNT @(title                   : 'Total Request Pending ');        
}   

annotate dashboardService.PendingPMRegCount with {
  @Analytics.Dimension      : true
  STATUS @(title  : 'Status');    
  @Analytics.Dimension      : true
  DESCRIPTION @(title  : 'Status Description');    
  @Analytics.Measure        : true   
  @Core.Computed
  STATUS_COUNT @(title                   : 'Total Registration Approval Pending ');        
}   

annotate dashboardService.PendingPMReqCount with {
  @Analytics.Dimension      : true
  STATUS @(title  : 'Status');
  @Analytics.Dimension      : true
  DESCRIPTION @(title  : 'PM Status');
  @Analytics.Measure        : true   
  @Core.Computed
  PM_REQ_COUNT @(title                   : 'Total Request Approval Pending');        
}    
   
annotate dashboardService.SupplierTypeCount with {
  @Analytics.Dimension      : true
  SUPPL_TYPE_DESC @(title  : 'Supplier Type Desc');
  @Analytics.Dimension      : true
  SUPPL_TYPE @(title  : 'Supplier Type');   
  @Analytics.Measure        : true   
  @Core.Computed
  REQUEST_NO @(title                   : 'Total Requests');                
} 

annotate dashboardService.LegacySuppliers with{
  @Analytics.Dimension      : true
  STATUS @(title  : 'Status'); 
  @Analytics.Dimension      : true
  DESCRIPTION @(title  : 'Status');   
  @Analytics.Dimension      : true
  VEN_DESC @(title  : 'Vendor');
  @Analytics.Measure        : true   
  @Core.Computed
  REQ_COUNT @(title                   : 'Total Requests');     
}   

annotate dashboardService.PendingPMRegisterCount with{
  @Analytics.Dimension      : true
  PM_PENDING @(title  : 'Pending By PM');            
  @Analytics.Measure        : true     
  REQUEST_NO @(title                   : 'Total Requests');     
}

annotate dashboardService.RequestAvgTurnAroundTime with {       
        @Analytics.Dimension      : true
        STAGE @(title: 'Stage');                
        @Analytics.Measure        : true  
        AVG_TAT_SEC   @(title: 'Average Turn Around Time (Seconds)');         
        @Analytics.Measure        : true  
        AVG_TAT_MIN   @(title: 'Average Turn Around Time (Minutes)');         
        @Analytics.Measure        : true  
        AVG_TAT_HRS   @(title: 'Average Turn Around Time (Hours)');     
         @Analytics.Measure        : true  
        AVG_TAT_DAYS   @(title: 'Average Turn Around Time (Days)');          
}


   