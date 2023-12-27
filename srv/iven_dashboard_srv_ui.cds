using {dashboardService} from './iven_dashboard_srv';

//Chart Annotation  
annotate dashboardService.RequestRejStatusCount with @(
  Aggregation: {
    ApplySupported: {
      PropertyRestrictions: true
    }
  },         
  UI: {
    SelectionFields: [DESCRIPTION],
    PresentationVariant #Chart1: {Visualizations: ['@UI.Chart#DescByRejStatus']},
    Chart #DescByRejStatus : {
      ChartType                 : #Bar,   
      Dimensions                : ['DESCRIPTION'],
      DimensionAttributes       : [{
        Dimension               : 'DESCRIPTION',
        Role                    : #Category
      }],
      Measures                  : ['REJ_STATUS_COUNT'],
      MeasureAttributes         : [{
        Measure                 : 'REJ_STATUS_COUNT',
        Role                    : #Axis1
      }]
    }
  }
);

//Measure - Dimension Annotation(X-Y Axis)
annotate dashboardService.RequestRejStatusCount with {
  @Analytics.Dimension      : true
  DESCRIPTION @(title  : 'Status');
  @Analytics.Measure        : true   
  @Core.Computed
  REJ_STATUS_COUNT @(title                   : 'Total Rejected Request');        
}

annotate dashboardService.RequestActionStatusCount with @(
  Aggregation: {
    ApplySupported: {
      PropertyRestrictions: true
    }
  },         
  UI: {
    SelectionFields: [DESCRIPTION],
    PresentationVariant #Chart1: {Visualizations: ['@UI.Chart#DescByActStatus']},
    Chart #DescByActStatus : {
      ChartType                 : #Column,   
      Dimensions                : ['DESCRIPTION'],
      DimensionAttributes       : [{
        Dimension               : 'DESCRIPTION',
        Role                    : #Category
      }],
      Measures                  : ['ACT_STATUS_COUNT'],
      MeasureAttributes         : [{
        Measure                 : 'ACT_STATUS_COUNT',
        Role                    : #Axis1
      }]
    }   
  }
);    

annotate dashboardService.RequestActionStatusCount with {
  @Analytics.Dimension      : true
  DESCRIPTION @(title  : 'Status');
  @Analytics.Measure        : true   
  @Core.Computed
  ACT_STATUS_COUNT @(title                   : 'Total Request');        
}


annotate dashboardService.EntityCodeCount with @(
  Aggregation: {
    ApplySupported: {
      PropertyRestrictions: true
    }
  },         
  UI: {
    SelectionFields: [BUTXT],
    PresentationVariant #Chart1: {Visualizations: ['@UI.Chart#DescByEntity']},
    Chart #DescByEntity : {
      ChartType                 : #VerticalBullet,   
      Dimensions                : ['BUTXT'],
      DimensionAttributes       : [{
        Dimension               : 'BUTXT',
        Role                    : #Category
      }],
      Measures                  : ['ENTITY_COUNT'],
      MeasureAttributes         : [{
        Measure                 : 'ENTITY_COUNT',
        Role                    : #Axis1
      }]
    }   
  }
);

annotate dashboardService.EntityCodeCount with {
  @Analytics.Dimension      : true
  BUTXT @(title  : 'Entity');
  @Analytics.Measure        : true   
  @Core.Computed
  ENTITY_COUNT @(title                   : 'Total Request');        
}


annotate dashboardService.RequestTypeCount with @(
  Aggregation: {
    ApplySupported: {
      PropertyRestrictions: true
    }
  },         
  UI: {
    SelectionFields: [DESCRIPTION],
    PresentationVariant #Chart1: {Visualizations: ['@UI.Chart#DescByReqType']},
    Chart #DescByReqType : {
      ChartType                 : #Line,   
      Dimensions                : ['DESCRIPTION'],
      DimensionAttributes       : [{
        Dimension               : 'DESCRIPTION',
        Role                    : #Category
      }],
      Measures                  : ['REQ_TYPE_COUNT'],
      MeasureAttributes         : [{
        Measure                 : 'REQ_TYPE_COUNT',
        Role                    : #Axis1
      }]
    }   
  }
);

annotate dashboardService.RequestTypeCount with {
  @Analytics.Dimension      : true
  DESCRIPTION @(title  : 'Request Type');
  @Analytics.Measure        : true   
  @Core.Computed
  REQ_TYPE_COUNT @(title                   : 'Total Request');        
}


annotate dashboardService.PendingByrCount with @(
  Aggregation: {
    ApplySupported: {
      PropertyRestrictions: true
    }
  },         
  UI: {
    SelectionFields: [DESCRIPTION],
    PresentationVariant #Chart1: {Visualizations: ['@UI.Chart#DescByPendingByr']},
    Chart #DescByPendingByr : {
      ChartType                 : #Donut,   
      Dimensions                : ['DESCRIPTION'],
      DimensionAttributes       : [{
        Dimension               : 'DESCRIPTION',
        Role                    : #Category
      }],
      Measures                  : ['PND_BYR_COUNT'],
      MeasureAttributes         : [{
        Measure                 : 'PND_BYR_COUNT',
        Role                    : #Axis1
      }]
    }   
  }
);

annotate dashboardService.PendingByrCount with {
  @Analytics.Dimension      : true
  DESCRIPTION @(title  : 'Buyer Status');
  @Analytics.Measure        : true   
  @Core.Computed
  PND_BYR_COUNT @(title                   : 'Total Request Pending ');        
}   


annotate dashboardService.PendingPMRegCount with @(
  Aggregation: {
    ApplySupported: {
      PropertyRestrictions: true
    }
  },         
  UI: {
    SelectionFields: [DESCRIPTION],
    PresentationVariant #Chart1: {Visualizations: ['@UI.Chart#DescByPendingPMReg']},
    Chart #DescByPendingPMReg : {
      ChartType                 : #Waterfall,   
      Dimensions                : ['DESCRIPTION'],
      DimensionAttributes       : [{
        Dimension               : 'DESCRIPTION',
        Role                    : #Category
      }],
      Measures                  : ['STATUS_COUNT'],
      MeasureAttributes         : [{
        Measure                 : 'STATUS_COUNT',
        Role                    : #Axis1
      }]
    }   
  }
);   

annotate dashboardService.PendingPMRegCount with {
  @Analytics.Dimension      : true
  DESCRIPTION @(title  : 'PM Status');
  @Analytics.Measure        : true   
  @Core.Computed
  STATUS_COUNT @(title                   : 'Total Registration Approval Pending ');        
}   


annotate dashboardService.PendingPMReqCount with @(
  Aggregation: {
    ApplySupported: {
      PropertyRestrictions: true
    }
  },         
  UI: {
    SelectionFields: [DESCRIPTION],
    PresentationVariant #Chart1: {Visualizations: ['@UI.Chart#DescByPendingPMReq']},
    Chart #DescByPendingPMReq : {   
      ChartType                 : #Waterfall,   
      Dimensions                : ['DESCRIPTION'],
      DimensionAttributes       : [{
        Dimension               : 'DESCRIPTION',
        Role                    : #Category
      }],
      Measures                  : ['PM_REQ_COUNT'],
      MeasureAttributes         : [{
        Measure                 : 'PM_REQ_COUNT',
        Role                    : #Axis1
      }]
    }   
  }
);   

annotate dashboardService.PendingPMReqCount with {
  @Analytics.Dimension      : true
  DESCRIPTION @(title  : 'PM Status');
  @Analytics.Measure        : true   
  @Core.Computed
  PM_REQ_COUNT @(title                   : 'Total Request Approval Pending');        
}      

