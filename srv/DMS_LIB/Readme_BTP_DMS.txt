 
 Added by Darshan 15-12-23 
 BTP DMS intigration with iven
 
 SAMPLE CODE 
  const DMSlib = require("./DMS_LIB/BTP_DMS_LIB");
  
  
  1.  //     //to get main repositorie list in DMS with storage data
    //    // exmp ->>>> _GetRepositores();
    code---->>>>>>>>//     let a = await DMSlib._GetRepositores();

   2.  //to create main repositorie in DMS 
    //input is required exmp ->>>> _CreateRepositorie("iVEN","iVEN Main Folder");
    // return await DMSlib._CreateRepositorie(req.data.externalId,req.data.description);
      code---->>>>>>>>//let a = await DMSlib._CreateRepositorie("iVEN", "iVEN Main Folder");

   3. //to delete main repository folder - avoid to use this
    //pass repository id from the data set - field name ->> id
     code---->>>>>>>>let a = await DMSlib._DeleteRepositore("3ddb38a2-ee4c-4318-8170-3d02e24e4947");

   4. //create subfolder 
    // This is to create a folder in the repository for every new book that is getting created.


    // var id = "30029f8000b5d3cc4a212756";
    // var fname = "10000002";
    // var RepoID = 'iVEN';
      code---->>>>>>>> let a = await DMSlib._createSubFolder(id,RepoID, fname);


5.//read subfolder data of main repo and subfolder 

    // var fname = '10000001'; //optional if need to read main repo iVEN
    // var RepoID = 'iVEN';
    code---->>>>>>>> let a = await DMSlib._getSubFolderItems(RepoID, fname);

6.//Delete subfolder data of main repo and subfolder 

    // var id = 'BQ1ayzJ0aYlro-p-M2dm77-zT7RyDN9A_eCSL0PdsKQ'; //optional if need to read main repo iVEN
    // var RepoID = 'iVEN';
    code---->>>>>>>> let a = await DMSlib._DeleteSubFolder(id , RepoID);