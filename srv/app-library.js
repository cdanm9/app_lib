const cds=require('@sap/cds')
const fs=require('fs')
const nodePath=require('path')
const simpleGit = require('simple-git');
// const lib = require('../srv/samples/userEntity.json')
module.exports=cds.service.impl(function(srv){  
    const {path}=srv 
    const {MasterApps,MasterSubApps,MasterRoleCollections,MasterAppResources}=this.entities;  
    this.on('getAccessibleApps', async (req) => {  
        try {
          let connRoleConfig = await cds.connect.to('RoleConfig');         
          let userEmail=req?.req?.authInfo?.getEmail();
          if(!userEmail)
              userEmail=req.user.attr.email       

          // let sDecodeToken=Buffer.from(req.req.authInfo.getAppToken().split('.')[1], 'base64').toString();
          let sDecodeToken=Buffer.from(req.user.tokenInfo['jwt'].split('.')[1], 'base64').toString();
          let oDecodedToken=JSON.parse(sDecodeToken)
          let aRoleCollections=oDecodedToken["xs.system.attributes"]["xs.rolecollections"];
          // let aAllApps=await SELECT .from(MasterIvenPOSubAppInfo[`S_btpRole in ${aRoleCollections}`].MasterIvenPOAppInfo);
        
          let aAllAppsRole=await SELECT.from (MasterApps, appInfo => {   
            appInfo.name,
            appInfo.icon,   
            appInfo.btpRole,  
            appInfo.appType,     
            appInfo.to_SubApp(subInfo => {   
              subInfo`.*`  
            })     
          }).where({ btpRole: { in: aRoleCollections } }) .orderBy('sequence');        
                             
          req.reply(aAllAppsRole)  

        } catch (error) {       
          var iErrorCode = error.code ?? 500;
          req.error({ code: iErrorCode, message: error.message ? error.message : error });
        }
      })

    this.on('READ',MasterRoleCollections, async (req) => {
      try {  
        let connRoleConfig = await cds.connect.to('RoleConfig');  
        let aAllAppsRole = await connRoleConfig.send({
          method: 'GET',
          path: "/rolecollections",
          headers: { 'Content-Type': 'application/json',   
                "accept": "application/json",
                "X-Requested-With": "XMLHttpRequest"}
        })      
        let i=0;         
        for(i in aAllAppsRole){
          delete aAllAppsRole[i].roleReferences   
        }     
        return aAllAppsRole;         
      } catch (error) {       
        var iErrorCode = error.code ?? 500;
        req.error({ code: iErrorCode, message: error.message ? error.message : error });
      }
    })

    this.before ('CREATE', MasterApps, async req => {
    })

    this.before('NEW', MasterApps.drafts, async req => {
      try{
          let isequence;     
          const { sequence } = await SELECT.one `max(sequence) as sequence` .from (MasterApps);   
          req.data.sequence = sequence + 1;                   
      }catch(oError){   
        let iErrorCode = error.code ?? 500;
        req.error({ code: iErrorCode, message: error.message ? error.message : error }); 
      }
    })  

    this.after('UPDATE',MasterApps.drafts,async (_,req)=>{   
      try{         
        const {ID,iconUri}=req.data;
        if(iconUri)
          await this._updateIcon(ID,iconUri)         
      }catch(error){   
        let iErrorCode = error.code ?? 500;
        req.error({ code: iErrorCode, message: error.message ? error.message : error });     
      }    
    });  

    this.after('UPDATE',MasterSubApps.drafts,async (_,req)=>{   
      try{         
        const {ID,iconUri}=req.data;
        if(iconUri)
          await this._updateSubIcon(ID,iconUri)         
      }catch(error){   
        let iErrorCode = error.code ?? 500;
        req.error({ code: iErrorCode, message: error.message ? error.message : error });     
      }    
    });  

    this._updateIcon =async function (id,appIconUri) {
      await UPDATE(MasterApps.drafts).set({icon: appIconUri }).where({ ID: id });  
    }  
    
    this._updateSubIcon =async function (id,appSubIconUri) {         
      await UPDATE(MasterSubApps.drafts).set({icon: appSubIconUri }).where({ ID: id });  
    }  

    this.before('CREATE',MasterAppResources, req => {                  
           
      req.data.url = `${path}/MasterAppResources(ID=${req.data.ID},IsActiveEntity=true)/resource`           
    })

    this.before ("SAVE",MasterApps, req => {   
      const { ID,sequence, name,iconUri, btpRole,appType,to_SubApp} = req.data; 
      let bIsLink=false,aAppLinkType=['APP','GRP'];
      if (!sequence) req.error(400, "Please Enter Sequence Number", "in/sequence") 
      if (!name) req.error(400, "Please Enter Application Name", "in/name") 
      if (!iconUri) req.error(400, "Please Enter Application Icon URI", "in/iconUri") 
      if (!btpRole) req.error(400, "Please Enter Application Role", "in/btpRole") 
      if (!appType) req.error(400, "Please Enter Application Type", "in/appType")
      if (!to_SubApp) req.error(400, "Please Enter Sub Application Information", "in/to_SubApp")
      
      if(aAppLinkType.includes(appType))       
        bIsLink=true;
      for (const SubAppInfo of to_SubApp) {                              
        const {ID,name,iconUri,appUrl} = SubAppInfo       
        if (!name) req.error(400, "Please Enter Application Name", "in/to_SubApp(ID="+ID+",IsActiveEntity=false)/name")
        if (!iconUri) req.error(400, "Please Enter Application Icon URI", "in/to_SubApp(ID="+ID+",IsActiveEntity=false)/iconUri")
        if (!appUrl && bIsLink) req.error(400, "Please Enter Application Link", "in/to_SubApp(ID="+ID+",IsActiveEntity=false)/appUrl")   
      }  
    });

    this.before ("SAVE",MasterAppResources, req => {   
      const { ID,appName,resourceType} = req.data; 
      if (!appName) req.error(400, "Please Enter Application Name", "in/appName")       
      if (!resourceType) req.error(400, "Please Enter Resource Type", "in/resourceType")                      
    });

    this.on('error',async (req,res)=>{
       
    });
    this.on('getUserData',async (req,res)=>{
      try {
        const fileName = 'userEntity.json';
        const filePath = nodePath.join("./srv/samples/userEntity.json");  
        if (!fs.existsSync(filePath)) {
          return 'Text file not found.';
        }
        const content = fs.readFileSync(filePath, 'utf8');
        // console.log(content);
        var a = content.replaceAll('\n',"");
        return JSON.parse(a);
      }
      catch(error){
        return error;
      }
    });
    this.on('createUserData',async (req,res)=>{
      try {
        // console.log(req)
        if(req.data.fileName){
          var oldData = await fetchTextData(req.data.fileName);
          console.log(oldData);
          // var newData = {
          //     Name : req.data.Name,
          //     Email : req.data.Email,
          //     Age : req.data.Age
          // }
          var newData = {
            "code":"AB",
            "name":" About",
            "description":"About Section"
          }
          console.log(21);
          var content;
          // if(oldData.Data.length >= 0){
          oldData.userEntity.push(newData);
          console.log(23);
          content = JSON.stringify(oldData);
          const fileName = 'userEntity.json';
          console.log(28);
          // const filePath = nodePath.join("./srv/samples/"+fileName+""); 
          const filePath = nodePath.join("./srv/samples/userEntity.json")
          fs.writeFileSync(filePath, content, 'utf8');
          await githubFetch();
          return "Text File As Been Created";
        }
      }
      catch(error){
        return error;
      }
    });


    async function fetchTextData(fileName){
      // const fileName = 'userEntity.json';
      // const filePath = nodePath.join("./srv/samples/"+fileName+"");  
      const filePath = nodePath.join("./srv/samples/userEntity.json")
      if (!fs.existsSync(filePath)) {
        return 'Text file not found.';
      }
      const content = fs.readFileSync(filePath, 'utf8');
      // console.log(content);
      var a = content.replaceAll('\n',"");
      return JSON.parse(a);
    }


    async function githubFetch(req) {
      try {
        console.log(32);
        const filePath = nodePath.join('../srv/samples/userEntity.json')
        console.log(34);
        var oldData = await fetchTextData();
        console.log(filePath);
        var content = JSON.stringify(oldData);
        fs.writeFileSync(filePath, content);
        console.log(filePath);
        const git = simpleGit(nodePath.join(__dirname,'..'));
        // const status = await git.status();
        // console.log(status);
        console.log(45);
        await git.add('../srv/samples/userEntity.json');
        await git.commit('Updated file via githubFetch function');
        await git.push('app_lib', 'main');
      } catch (err) {
        console.error('Git operation failed:', err);
        req.error(500, 'Git push failed');
      }
      return 'File updated and pushed to GitHub';
  }
})