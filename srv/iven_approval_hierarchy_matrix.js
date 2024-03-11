// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
const lib_common = require('./LIB/iven_library')
const res = require('express/lib/response')

module.exports = cds.service.impl(function (srv) {
     const {MasterApprovalHierarchy,MasterEntityType}=this.entities;
     this.before('NEW',MasterEntityType,async req=>{

     });

     this.before('NEW',MasterApprovalHierarchy.drafts,async req=>{   
          try{                    
            const { TO_ENTITY_TYPE_ID } = req.data
            const { maxLevel } = await SELECT.one `max(LEVEL) as maxLevel` .from (MasterApprovalHierarchy.drafts) .where ({TO_ENTITY_TYPE_ID});
            req.data.LEVEL = maxLevel + 1;                 
          }catch(error){
               return error;          
          }
     });

     this.on('error',async (req,res)=>{
    
     });

})