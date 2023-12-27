
// using {
//   VENDOR_PORTAL
// } from '../db/MASTER_TABLES';


service copydmsService {

//Function
  function GetRepository(userId:String,userRole:String) returns many String;
function GetSubFolderItem(parentFolderID:String,folderName:String,userId:String,userRole:String) returns many String;

//Action
action CreateSubFolderItem(folderDetails:FolderDetail,userDetails:User_Details) returns many String;
action DeleteSubFolderItem(deleteFolderDetails:DeleteDataDetail,userDetails:User_Details) returns many String;   
 action CreateRepository(externalId:String,description:String,userDetails:User_Details) returns many String; 
 action DeleteRepository(cmisRepositoryId:String,userDetails:User_Details) returns many String;    
 action RenameFolder(renameFolderDetails:RenameFolderDetail,userDetails:User_Details) returns many String;
 action MoveObjectFTF(objectId:String,externalId:String,srcFolderId:String,trgFolderId:String,userDetails:User_Details) returns many String;
 action DeleteFile(deleteFileDetails:DeleteDataDetail,userDetails:User_Details) returns many String;      
//type
  type FolderDetail:{      
    cmisRepositoryId: String; //Repository ID
    externalId:String;     //Repository Name
    fname:String;           //Folder Name
  }
    
  type DeleteDataDetail:{   
    externalId: String; //Repository Name
    objectId:String;           //Folder ID
  }

  type RenameFolderDetail:{
    externalId: String; //Repository Name
    objectId:String;           //Folder ID
    newFname:String;           // New Folder Name
  }

  type User_Details:{
    USER_ROLE: String(50);
    USER_ID: String(50);
  }

}
