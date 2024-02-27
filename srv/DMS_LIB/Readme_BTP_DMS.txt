 
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

    // var fname = '10000001/100004'; //optional if need to read main repo iVEN only
    // var RepoID = 'iVEN';
    code---->>>>>>>> let a = await DMSlib._getSubFolderItems(RepoID, fname);

6.//Delete subfolder data of main repo and subfolder 

    // var id = 'BQ1ayzJ0aYlro-p-M2dm77-zT7RyDN9A_eCSL0PdsKQ'; //o
    // var RepoID = 'iVEN';
    code---->>>>>>>> let a = await DMSlib._DeleteSubFolder(id , RepoID);

7.    // to rename any folder - pass folder id
    //_RenameFolder: async function (ObjectId, RepoID, NewforlderName)
    var ObjectId = '427nKXGdTqb2-kxgLGpRzYe2k8m_lc3ubpRYfUXFhaY'; //
    var RepoID = 'iVEN';
    var NewforlderName = '700000001';
   code---->>>>>>>>  let a = await DMSlib._RenameFolder(ObjectId , RepoID,NewforlderName);

8. // Move file from one folder to another folder
    var RepoID = 'iVEN'; //main repository
    var sf = '427nKXGdTqb2-kxgLGpRzYe2k8m_lc3ubpRYfUXFhaY'; // source folder objcet id
    var tf = 'jE1Xgmc9LAHPKDZqiJOzGH_hzm75k7yIC9YJjci1DgE'; // target folder objcet id
    var ObjectId = 'BSARfyLKYktcDDkfAMgDxT0iEl0vNE71hS3DbM9LQbg'; // file object id

    code---->>>>>>>>  let a = await DMSlib._MoveObjectFTF(ObjectId, RepoID, tf, sf);
  
9.//Delete file from DMS

    // var ObjectId = 'BSARfyLKYktcDDkfAMgDxT0iEl0vNE71hS3DbM9LQbg'; // file object id
    // var RepoID = 'iVEN'; //main repository
    code---->>>>>>>> let a = await DMSlib._DeleteFile(ObjectId , RepoID);


10. download file   (still in testing use for function )
    var ObjectId = 'pZ4G52V9y9eZ1lG0E-QEoqJCoz2dxK8qNRzubbVnSsI'; //opt 
    var RepoID = 'iVEN';
  code-------->>>  let mediaObj = await DMSlib._DownloadFile(ObjectId, RepoID);

 // set response variable hardcoded to test download - file may not open
    req._.res.set('Content-disposition', 'attachment; filename=Quick_Time_Entry.pdf');
    req._.res.set('Content-type', 'application/pdf');
    var base64DataUri = 'data:application/pdf;base64,' + mediaObj;
    req._.res.send(base64DataUri);
    req._.res.end();