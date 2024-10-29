sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/ibs/managesite/test/integration/FirstJourney',
		'com/ibs/managesite/test/integration/pages/MasterAppsList',
		'com/ibs/managesite/test/integration/pages/MasterAppsObjectPage',
		'com/ibs/managesite/test/integration/pages/MasterSubAppsObjectPage'
    ],
    function(JourneyRunner, opaJourney, MasterAppsList, MasterAppsObjectPage, MasterSubAppsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/ibs/managesite') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheMasterAppsList: MasterAppsList,
					onTheMasterAppsObjectPage: MasterAppsObjectPage,
					onTheMasterSubAppsObjectPage: MasterSubAppsObjectPage
                }
            },
            opaJourney.run
        );
    }
);