// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
const lib_common = require('./LIB/iven_library')
const res = require('express/lib/response')

module.exports = cds.service.impl(function (srv) {
     const {MasterIvenSettings,MasterApprovalHierarchy,MasterEntityType}=this.entities;
     this.before('NEW',MasterEntityType,async req=>{

     });
          
     this.before('NEW',MasterApprovalHierarchy.drafts,async req=>{   
          try{       
               const { TO_ENTITY_TYPE_ID } = req.data 
               const { apprType } = await SELECT `APPR_TYPE as apprType` .from (MasterEntityType.drafts, TO_ENTITY_TYPE_ID);    
               const { entityCode } = await SELECT `ENTITY_CODE as entityCode` .from (MasterEntityType.drafts, TO_ENTITY_TYPE_ID);

               if(!entityCode)             
                  req.error(400, "Please Enter Entity", "in/TO_ENTITY_TYPE_ID")  
               else if(!apprType)         
                  req.error(400, "Please Enter Approval Type", "in/TO_ENTITY_TYPE(ID="+TO_ENTITY_TYPE_ID+",IsActiveEntity=false)/APPR_TYPE")            
                   
               const { maxApprLevel } = await SELECT.one `max(APPROVER_LEVEL) as maxApprLevel` .from (MasterApprovalHierarchy.drafts) .where ({TO_ENTITY_TYPE_ID});
               const { maxLevel } = await SELECT.one `SETTING as maxLevel` .from(MasterIvenSettings) .where({CODE:'MAX_APPR_LEVEL_LIMIT'});     
               if(maxLevel<=maxApprLevel)                                  
                throw req.reject (404,'Max Approver Level Reached. Cannot Add More');                    
                    
               req.data.APPR_TYPE=apprType;            
               req.data.ENTITY_CODE=entityCode;              
               req.data.APPROVER_LEVEL = maxApprLevel + 1;            

          }catch(error){    
               // return error;               
          }
     });

     this.after('UPDATE',MasterEntityType.drafts,async (_,req)=>{   
          try{         
               const {ID,ENTITY_CODE,APPR_TYPE}=req.data;
               if(ENTITY_CODE)
                    await this._update_Entity(ID,ENTITY_CODE)
               if(APPR_TYPE)
                    await this._update_Approval_Type(ID,APPR_TYPE)           
          }catch(error){   
               req.error(error);      
          }    
     });    

     this.after('UPDATE',MasterApprovalHierarchy.drafts,async (_,req)=>{   
          try{         
               // const data=req.data;    
          }catch(error){   
               // req.error(error);  
          }    
     });

     this.on('CANCEL', MasterApprovalHierarchy.drafts, async (req, next) => {
          try{          
               const { ID } = req.data      
               const { TO_ENTITY_TYPE_ID } = await SELECT.one .from(MasterApprovalHierarchy.drafts,['TO_ENTITY_TYPE_ID']) .where({ID});
               const res = await next();                              
               const aHierarchy= await SELECT .from(MasterApprovalHierarchy.drafts) .where({TO_ENTITY_TYPE_ID});    
                             
               for(var i=0;i<aHierarchy.length;i++){                                
                    let updateLevel=await UPDATE(MasterApprovalHierarchy.drafts).set({ APPROVER_LEVEL: i+1}).where({ID: aHierarchy[i].ID});                 
               }                               
               return res;    
                        
          }catch(oError){       

          }
     })

     this.before ("SAVE",MasterEntityType, req => {   
          const { ID, APPR_TYPE, ENTITY_CODE,TO_HIERARCHY} = req.data;  
          if (!ENTITY_CODE) req.error(400, "Please Enter Entity", "in/ENTITY_CODE")    
            if (!APPR_TYPE) req.error(400, "Please Enter Approver Type", "in/APPR_TYPE") 
            for (const Hierarchy of TO_HIERARCHY) {                              
              const {ID, APPR_TYPE, ENTITY_CODE, APPROVER_LEVEL, USER_ID, USER_ROLE} = Hierarchy   
              if (!APPR_TYPE) req.error(400, "Please Enter Approver Type", "in/TO_HIERARCHY(ID="+ID+",IsActiveEntity=false)/APPR_TYPE")
              if (!ENTITY_CODE) req.error(400, "Please Enter Entity Code", "in/TO_HIERARCHY(ID="+ID+",IsActiveEntity=false)/ENTITY_CODE")
              if (!APPROVER_LEVEL) req.error(400, "Please Enter Level", "in/TO_HIERARCHY(ID="+ID+",IsActiveEntity=false)/APPROVER_LEVEL")
              if (!USER_ID) req.error(400, "Please Enter User", "in/TO_HIERARCHY(ID="+ID+",IsActiveEntity=false)/USER_ID")
              if (!USER_ROLE) req.error(400, "Please Enter Role", "in/TO_HIERARCHY(ID="+ID+",IsActiveEntity=false)/USER_ROLE")        
            }
        });

     this._update_Entity =async function (id,entityCode) {
          await UPDATE(MasterApprovalHierarchy.drafts).set({ENTITY_CODE: entityCode }).where({ TO_ENTITY_TYPE_ID: id });
     }

     this._update_Approval_Type = async function (id,apprType) {       
          await UPDATE(MasterApprovalHierarchy.drafts).set({APPR_TYPE: apprType}).where({ TO_ENTITY_TYPE_ID: id });
     }
    
     this.on('error',async (req,res)=>{
    
     });

})