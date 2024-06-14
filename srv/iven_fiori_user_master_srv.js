// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
// const lib = require('./LIB/EMPLOYEE_LIB')
const lib_common = require('./LIB/iven_library')

module.exports = cds.service.impl(function (srv) {
     const {MasterIvenUsers,MasterIvenUserRoles,MasterIvenUserEntity,MasterIasUsers}=this.entities;
     this.before('NEW',MasterIvenUsers,async req=>{     

     });                       
          
     this.before('NEW',MasterIvenUserRoles.drafts,async req=>{   
          try{       
               const { TO_USER_ID } = req.data 
               const { userId } = await SELECT `USER_ID as userId` .from (MasterIvenUsers.drafts, TO_USER_ID);    
               const { emailId } = await SELECT `EMAIL as emailId` .from (MasterIvenUsers.drafts, TO_USER_ID);

               if(!userId)             
               req.error(400, "Please Enter User ID", "in/TO_USER_ID")  
               else if(!emailId)         
               req.error(400, "Please Enter Email Address", "in/TO_USER_ID(ID="+TO_USER_ID+",IsActiveEntity=false)/EMAIL")            
               
               req.data.USER_ID=userId;            
               req.data.EMAIL=emailId;           
          }catch(error){    
               // return error;               
          }
     });

     this.before('NEW',MasterIvenUserEntity.drafts,async req=>{   
          try{       
               const { TO_USER_ID } = req.data 
               const { userId } = await SELECT `USER_ID as userId` .from (MasterIvenUsers.drafts, TO_USER_ID);    
               const { emailId } = await SELECT `EMAIL as emailId` .from (MasterIvenUsers.drafts, TO_USER_ID);

               if(!userId)             
                    req.error(400, "Please Enter User ID", "in/TO_USER_ID")  
               else if(!emailId)         
                    req.error(400, "Please Enter E-Mail Address", "in/TO_USER_ID(ID="+TO_USER_ID+",IsActiveEntity=false)/EMAIL")            
               
               req.data.USER_ID=userId;            
               req.data.EMAIL=emailId;           
          }catch(error){    
               // return error;               
          }
     });

     this.after('UPDATE',MasterIvenUsers.drafts,async (_,req)=>{   
          try{         
               const {ID,USER_ID}=req.data;
               if(USER_ID){
                    let aUserDetails=await SELECT .from(MasterIasUsers) .where({USER_ID:USER_ID});
                    //Fetch E-Mail ID and User Name from IAS
                    if(aUserDetails.length){
                         req.data.USER_NAME=aUserDetails[0].FIRST_NAME+' '+aUserDetails[0].LAST_NAME;
                         req.data.EMAIL=aUserDetails[0].EMAIL;
                    }          
                         
                    return this._update_User_Id(ID,USER_ID,req.data.EMAIL,req.data.USER_NAME);
               }

          }catch(error){   
               req.error(error);      
          }    
     });    

     this.after('UPDATE',MasterIvenUserRoles.drafts,async (_,req)=>{   
          try{         
               // const data=req.data;    
          }catch(error){   
               // req.error(error);  
          }    
     });

     this.on('CANCEL', MasterIvenUserRoles.drafts, async (req, next) => {
          try{          
                         
          }catch(oError){       

          }      
     })

     this.before ("SAVE",MasterIvenUsers, req => {   
          const { ID, USER_ID, EMAIL,TO_USER_ROLES,TO_USER_ENTITIES} = req.data;  
          if (!USER_ID) req.error(400, "Please Enter User ID", "in/USER_ID")    
          if (!EMAIL) req.error(400, "Please Enter E-Mail Address", "in/EMAIL") 
          for (const userRole of TO_USER_ROLES) {                              
               let {ID, USER_ID, EMAIL, USER_ROLE} = userRole  
               if (!EMAIL) req.error(400, "Please Enter E-Mail Address", "in/TO_USER_ROLES(ID="+ID+",IsActiveEntity=false)/EMAIL")
               if (!USER_ROLE) req.error(400, "Please Enter User Role", "in/TO_USER_ROLES(ID="+ID+",IsActiveEntity=false)/USER_ROLE")
               if (!USER_ID) req.error(400, "Please Enter User ID", "in/TO_USER_ROLES(ID="+ID+",IsActiveEntity=false)/USER_ID")         
          }
          for (const userEntity of TO_USER_ENTITIES) {                              
               let {ID, USER_ID, EMAIL, ENTITY_CODE} = userEntity   
               if (!EMAIL) req.error(400, "Please Enter E-Mail Address", "in/TO_USER_ENTITIES(ID="+ID+",IsActiveEntity=false)/EMAIL")
               if (!ENTITY_CODE) req.error(400, "Please Enter Entity", "in/TO_USER_ENTITIES(ID="+ID+",IsActiveEntity=false)/ENTITY_CODE")
               if (!USER_ID) req.error(400, "Please Enter User ID", "in/TO_USER_ENTITIES(ID="+ID+",IsActiveEntity=false)/USER_ID")   
          }
     });

     this._update_User_Id =async function (id,userId,emailId,userName) {        
          //Updating Iven Users          
          await UPDATE(MasterIvenUsers.drafts).set({USER_NAME: userName,EMAIL:emailId }).where({ USER_ID: userId });     

          //Updating Roles And Entities
          await UPDATE(MasterIvenUserRoles.drafts).set({USER_ID: userId,EMAIL:emailId }).where({ TO_USER_ID: id });
          await UPDATE(MasterIvenUserEntity.drafts).set({USER_ID: userId,EMAIL:emailId }).where({ TO_USER_ID: id });
     }
     
     this.on('error',async (req,res)=>{
     
     });

})