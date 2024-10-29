sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.ibs.managesite',
            componentId: 'MasterSubAppsObjectPage',
            contextPath: '/MasterApps/to_SubApp'
        },
        CustomPageDefinitions
    );
});