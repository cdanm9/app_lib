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
  action   FileUpload(action:String,fileDetails:FileUploadDetail,userDetails : User_Details)                                                  returns many String;
    
  // type   
  type FileUploadDetail:{    
    externalId            : String;       //Repository Name
    fname                 : String;       //File Name   
    objectId              : String;       //Folder ID
    contentStreamMimeType : String;       //File Mime Type
    fileContent           : LargeBinary;  //File Content      
  }

  type FolderDetail    : {
    cmisRepositoryId : String; //Repository ID
    externalId       : String; //Repository Name
    fname            : String; //Folder Name
  }

  type ObjDetail : {
    fname                  : String;
    externalId             : String; //Repository Name
    objectId               : String; //Folder ID
    objectTypeId           : String; //File Type
    contentStreamMimeType  : String; //Mime Type   
  }    

  type FileObjDetail:{     
    objectId: String(100); 
    versionSeriesContentLength: Integer;
    versionLabel: String(5);
    lastModifiedBy: String(500);
    contentStreamId: String(500);
    objectTypeId: String(100);
    contentStreamMimeType: String(50);
    createdBy: String(500);
    baseTypeId: String(100);
    sap_owner: String(500);
    creationDate: Integer;
    changeToken: String(5);
    isVersionSeriesCheckedOut: Boolean;
    isMajorVersion: Boolean;
    name: String(250);
    isLatestVersion: Boolean;
    lastModificationDate: Integer;
    versionSeriesId: String(100);
    isLatestMajorVersion: Boolean;
    contentStreamLength: Integer;   
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
