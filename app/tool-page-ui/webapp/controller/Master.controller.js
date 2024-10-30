sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/base/security/URLListValidator"  
],
function (Controller,Fragment,Filter,FilterOperator,JSONModel,MessageBox,MessageToast,URLListValidator) {
    "use strict";
    let that,localStorage;
    return Controller.extend("com.ibs.toolpageui.controller.Master", {
        onInit: function() {  
            that=this;    
            // that.oDataModel = this.getOwnerComponent().getModel("checkServiceAvailibilty")    
            that.oDataToolModel = this.getOwnerComponent().getModel();          
            that.idNavigationList=this.getView().byId("idNavigationList");  
            // URLListValidator.add("https", "ibs-portal-dev.launchpad.cfapps.us10.hana.ondemand.com", undefined, "/8526cdcb-5c31-4934-a365-72dce07a9b8d.ibs_bs_iven_po.comibsibsappiveninvoicepaymentrpt-0.0.1/index.html");
            // URLListValidator.add("https", "ibs-portal-dev.launchpad.cfapps.us10.hana.ondemand.com");
            // URLListValidator.add(undefined, "ibs-portal-dev.launchpad.cfapps.us10.hana.ondemand.com");
            // URLListValidator.add("https", "ibs-portal-dev.launchpad.cfapps.us10.hana.ondemand.com", undefined, "/8526cdcb-5c31-4934-a365-72dce07a9b8d.ibs_bs_iven_po.comibsibsappiveninvoicepaymentrpt-0.0.1/index.html");
            // URLListValidator.add("https", "ibs-portal-dev-ibs-portal-dev-ibs-mta-iven-sa-approuter.cfapps.us10.hana.ondemand.com/comibsibsappivensaanalytical/odata/v4/app-sa-info/MasterIvenSAInfo(ID=d0f10c33-8ab4-4daf-9d82-ee57e9c8414a,IsActiveEntity=true)/LOGO");
            // URLListValidator.add("https", "ibs-portal-dev-ibs-portal-dev-ibs-mta-iven-sa-approuter.cfapps.us10.hana.ondemand.com",undefined,"/comibsibsappivensaanalytical/odata/v4/app-sa-info/MasterIvenSAInfo(ID=d0f10c33-8ab4-4daf-9d82-ee57e9c8414a,IsActiveEntity=true)/LOGO");
            // URLListValidator.add("https://ibs-portal-dev-ibs-portal-dev-ibs-mta-iven-sa-approuter.cfapps.us10.hana.ondemand.com/comibsibsappivensaanalytical/odata/v4/app-sa-info/MasterIvenSAInfo(ID=d0f10c33-8ab4-4daf-9d82-ee57e9c8414a,IsActiveEntity=true)/LOGO");      
            
            let oAppDetails = {    
              UserFullName:"",    
              UserInitials:"",      
              AppList: []  
            };
            let oAppInfoModel = new JSONModel(oAppDetails);
            that.getOwnerComponent().setModel(oAppInfoModel,"appInfo")  
  
            this.oView = this.getView();
            this.oMyAvatar = this.oView.byId("myAvatar");
            this._oPopover = Fragment.load({
              id: this.oView.getId(),      
              name: "com.ibs.toolpageui.fragment.UserPopover",    
              controller: this
            }).then(function(oPopover) {
              this.oMyAvatar.addDependent(oPopover);      
              this._oPopover = oPopover;
            }.bind(this));
            jQuery.sap.require("jquery.sap.storage");
            localStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);  
  
            this.handleRouteMatched();     
  
            that._getApps();
            that._getUserID();
            that._navigationListItem();
            that._getAppResources()
          },
          _getAppResources:function(){
            let oList = that.oDataToolModel.bindList("/MasterAppResources",undefined,[],[
              new Filter("resourceType", FilterOperator.EQ, "LGO")   
            ],{});   
            oList.requestContexts().then((odata) => { 
                  let aMasterApps = [],i=0; 
                  odata.forEach(element => {     
                    aMasterApps.push(element.getObject()); 
                  }); 
                  for(i in aMasterApps){          
                    aMasterApps[i].url=that.appModulePath+aMasterApps[i].url         
                  }
                  let oMasterModel=new JSONModel(aMasterApps)      
                  that.getView().setModel(oMasterModel,"appSAHeader")    
            }); 
          },
          _navigationListItem:function(oEvent){      
  
            that.idNavigationList.onAfterRendering = function () {
              sap.tnt.NavigationList.prototype.onAfterRendering.apply(this, arguments);
              that.idNavigationList.getItems().forEach(function (oItem) {
                  if (oItem.getItems && oItem.getItems().length > 0) {
                      var iRowCount = 0;
                      oItem.getItems().forEach(function (oSubItem) {  
                        oSubItem.$().css("background-color", "cornflowerblue");  
                      });
                  }
              });
            };   
          },
          _getUserID:function(){
            var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
            var appPath = appId.replaceAll(".", "/");
            that.appModulePath = jQuery.sap.getModulePath(appPath);
            var attr = that.appModulePath + "/user-api/attributes";
  
            return new Promise(function (resolve, reject) {
              $.ajax({
                url: attr,
                type: 'GET',
                contentType: 'application/json',
                success: function (data, response) {
                
                  that._sUserName = data.firstname;
                  that._sFLetter = data.firstname[0];
                  that._sSLetter = data.lastname[0];
                  that._sInitials=that._sFLetter+that._sSLetter
                  that._sFullName=data.firstname + " " + data.lastname  
                  that.getOwnerComponent().getModel("appInfo").setProperty("/UserInitials",that._sInitials)  
                  that.getOwnerComponent().getModel("appInfo").setProperty("/UserFullName",that._sFullName)     
                  that.getOwnerComponent().getModel("appInfo").setProperty("/UserFirstName",data.firstname)     
                  that.getOwnerComponent().getModel("appInfo").setProperty("/UserLastName",data.lastname)        
                  that.getOwnerComponent().getModel("appInfo").setProperty("/UserEMail",data.email)              
                  that._sUserID = data.email.toLowerCase().trim();   
                  that._sCode = data.name;    
    
                  var oModel = new JSONModel({
                    userId: that._sUserID,
                    userName: that._sUserName,
                    code: that._sCode         
                  });
                  that.getOwnerComponent().setModel(oModel, "userAttriJson");   
                },
                error: function (oError) {
                  MessageBox.error("Error while reading User Attributes");
                }
              });
            });    
          },
          _getApps:  function(){  
            let sBindingFnPath="/getAccessibleApps(...)"   
            let oAppODataPath =  that.oDataToolModel.bindContext(sBindingFnPath);   
            oAppODataPath.execute().then(function (exec) {  
              that.getOwnerComponent().getRouter().navTo("RouteWelcome");      
              let oAppInfoData = oAppODataPath.getBoundContext().getObject();
              let oResponse=oAppInfoData.value
              let i=0;
              if(!oResponse.length){          
                
                that.oAppPlugin=oResponse
                that.userMenuList(oResponse)  
                return 0
              }
              for(i in oResponse){
                let aNoGrpAppType=['APP','PLG','LNK']
                if(aNoGrpAppType.includes(oResponse[i].appType)){
                  oResponse[i].appUrl=oResponse[i].to_SubApp[0].appUrl
                  oResponse[i].to_SubApp=[]
                }else  
                  oResponse[i].appUrl=null             
              } 
              that.oAppPlugin=oResponse.filter(function(oAppInfo){
                return oAppInfo.appType=='PLG'  
              })      
              oResponse=oResponse.filter(function(oAppInfo){
                return oAppInfo.appType!='PLG'    
              })
  
              that.userMenuList(oResponse)
  
            }.bind(this), function (oError) {   
              sap.ui.core.UIComponent.getRouterFor(that).navTo("RouteService"); 
              MessageBox.error("Failed to read "+sBindingFnPath+" function");   
            });           
          },
          userMenuList: function(oResponse){     
            that.oAppInfoDetails=JSON.parse(JSON.stringify(oResponse))           
            that.getOwnerComponent().getModel("appInfo").setProperty("/AppList",oResponse) 
            that.oAppPlugin.unshift({icon: "sap-icon://person-placeholder", name: "About"})          
            that.oAppPlugin.push({icon: "sap-icon://log", name: "Sign Out"})    
  
            let oUserListModel = new JSONModel(that.oAppPlugin);                 
            this.getView().setModel(oUserListModel,"uLMenu");
          },
          handleRouteMatched: function (oEvent) {    
            // debugger
            // if (oStorage.get("mySessionData")) {
            //   var oData = oStorage.get("mySessionData");
            //   sLoginId = oData.Collection[0].id;
            //   sLoginType = oData.Collection[0].type;
            //   that._user();
            //           that.readData();
            // } else {
            //   //get user attributes  
            //     this._getLoginDetails();
            // }
            
          },
          onLogout:function(oEvent){      
            // sap.m.URLHelper.redirect("https://9da603b4trial.launchpad.cfapps.us10.hana.ondemand.com/a22d66b3-3e78-4e57-ba53-762df11839fe.comibsibsappivensaanalytical.comibsibsappivensaanalytical-0.0.1/logout-page.html", false); 
            sap.m.URLHelper.redirect("/logout-page.html", false);                
          },
          onSideNavButtonPress: function() {
            var oToolPage = this.getView().byId("toolPage");
            var bSideExpanded = oToolPage.getSideExpanded();
            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());   
          },     
          onItemSelect: function(oEvent){
            debugger
            var oItem=oEvent.getParameter("item")
            var oBindingContext=oItem.getBindingContext("appInfo")
            var oObject=oBindingContext.getObject()
            
            if(oItem?.getItems()?.length&&oObject.appType=='GRP')      
              oObject.name=''; 
            else
              this.getOwnerComponent().getRouter().navTo("RouteApp");
            var oAppViewModel=new JSONModel(oObject)   
            that.getOwnerComponent().setModel(oAppViewModel,"alAppView");
          },
          onPress: function(oEvent) {
            var oEventSource = oEvent.getSource(),
            bActive;           
      
            if (bActive) {
              this._oPopover.close();
            } else {
              this._oPopover.openBy(oEventSource);
            }
          },
          //User Simulation Start
          onListItemPress: function (oEvent) {     
            let oSource=oEvent.getSource()
            let sTitle=oSource.getProperty("title")
            let oBindingContext=oSource.getBindingContext('uLMenu')
            let oObject=oBindingContext.getObject()
            if(sTitle=='Simulate User Login')
              that._openLoginFragment()
            else if(sTitle=='Sign Out'){        
              sap.m.URLHelper.redirect("/app-logout", false);           
            }else if(sTitle=='Manage Site'){   
              let oAppViewModel=new JSONModel(oObject);             
              that.getOwnerComponent().setModel(oAppViewModel,"alAppView");    
              that.getOwnerComponent().getRouter().navTo("RouteApp");
            }else if(sTitle=='About'){
              that._openAboutFragment()                  
            }
     
          },
          _openAboutFragment:function(){
            if (!that.oAbout) {
              Fragment.load({
                  id: ""+that.getView().getId()+"about", 
                  name: "com.ibs.toolpageui.fragment.About", 
                  controller: that   
              }).then(function (oAbout) {      
                  that.oAbout = oAbout;
                  that.getView().addDependent(that.oAbout); 
                  that.oAbout.open();
              }.bind(that));
            } else {           
                that.oAbout.open();
            }
          },
          _openLoginFragment:function(){
            if (!that.oDialog) {
              Fragment.load({
                  id: that.getView().getId(), 
                  name: "com.ibs.toolpageui.fragment.loginDialog", 
                  controller: that
              }).then(function (oDialog) {   
                  that.oDialog = oDialog;
                  that.getView().addDependent(that.oDialog); 
                  that.oDialog.open();
              }.bind(that));
            } else {  
                that.oDialog.open();
            }
          },
  
          onClosePress: function () {
            this.oDialog.close();
          },
          onCloseUserProfile: function () {
            this.oAbout.close();
          },
  
          onLoginIdChange: function (oEvent) {
            this.eventInput = oEvent.getParameter("value");
          },
  
          onLoginTypeChange: function (oEvent) {
            this.selEvent = oEvent.getParameter("selectedItem").getKey();
          },
  
          onSubmitPress: function () {  
              if (!this.eventInput || !this.selEvent) {
                  MessageToast.show("Please fill all the required fields");
                  return;
              }
  
              var data = {
                  "Collection": [{
                      "id": this.eventInput,
                      "type": this.selEvent
                  }]
              };
  
              var oModel = new JSONModel();
              oModel.setData(data);
              sap.ui.getCore().setModel(oModel,"mySession");
  
              var oData = oModel.getData();
              localStorage.put("mySessionData", oData);                
              MessageToast.show("User login details saved.");               
              this.oDialog.close();
          },
  
          onClearPress: function () {
            var oModel = new JSONModel({});
            this.oDialog.setModel(oModel);
            localStorage.clear();
          },
          onWelcomePage:function(){
            that.getOwnerComponent().getRouter().navTo("RouteWelcome");       
          },
  
          onDialogClose: function () {
            this.oDialog.destroy(); // Destroy dialog after close
            this.oDialog = null; // Reset dialog reference
          },
          onHelpBtn: function(oEvent){    
            this.getOwnerComponent().getRouter().navTo("RouteHelp");   
          }
    });
});
