// using {
//   VENDOR_PORTAL
// } from '../db/MASTER_TABLES';


service dmsService {

  function GetRepository(userId : String, userRole : String)                                                                             returns many String;
  function GetSubFolderItem(externalId : String, folderName : String, userId : String, userRole : String)                                returns many String;
  action   CreateSubFolderItem(folderDetails : FolderDetail, userDetails : User_Details)                                                 returns many String;
  // action DeleteSubFolderItem(deleteFolderDetails:DeleteDataDetail,userDetails:User_Details) returns many String;


  action   CreateRepository(externalId : String, description : String, userDetails : User_Details)                                       returns many String;
  action   DeleteRepository(id : String, userDetails : User_Details)                                                       returns many String;
  //  action RenameFolder(renameFolderDetails:RenameFolderDetail,userDetails:User_Details) returns many String;
  action   RenameObject(renameObjDetails : RenameObjDetail, userDetails : User_Details)                                                  returns many String;
  action   MoveObjectFTF(objectId : String, externalId : String, srcFolderId : String, trgFolderId : String, userDetails : User_Details) returns many String;
  //  action DeleteFile(deleteFileDetails:DeleteDataDetail,userDetails:User_Details) returns many String;
  action   DeleteObject(deleteObjDetails : ObjDetail, userDetails : User_Details)                                                  returns many String;
  action   FileAccess(action:String,fileDetails:ObjDetail,userDetails : User_Details)                                                  returns many String;
    
  type FolderDetail    : {
    cmisRepositoryId : String; //Repository ID
    externalId       : String; //Repository Name
    fname            : String; //Folder Name
  }

  type ObjDetail : {
    externalId   : String; //Repository Name
    objectId     : String; //Folder ID
    objectTypeId : String; //File Type
  }

  type RenameObjDetail : {
    externalId : String; //Repository Name
    objectId   : String; //Folder ID
    newFname   : String; // New Folder Name
  }

  type User_Details    : {
    USER_ROLE : String(50);
    USER_ID   : String(50);
  }

}
