sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller,JSONModel,Filter,FilterOperator) {   
	"use strict";
	let that;  
	return Controller.extend("com.ibs.toolpageui.controller.Help", {   
		onInit: function () {
			that=this;
			that.oDataToolModel = this.getOwnerComponent().getModel()
			let appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
			let appPath = appId.replaceAll(".", "/");
			that.appModulePath = jQuery.sap.getModulePath(appPath);
			that._getAppUserManual();
			let oRouter=this.getOwnerComponent().getRouter().getRoute("RouteHelp")          
            oRouter.attachPatternMatched(that._onObjectHelpMatched)
		},
		_onObjectHelpMatched:function(oEvent){
			that._getAppUserManual();
		},
		_getAppUserManual:function(){
			let oList = that.oDataToolModel.bindList("/MasterAppResources",undefined,[],[
			  new Filter("resourceType", FilterOperator.Contains, "HLP")   
			],{});   
			oList.requestContexts().then((odata) => { 
				  let aHelpApps = [],i=0; 
				  odata.forEach(element => {     
					aHelpApps.push(element.getObject());    
				  }); 
				  for(i in aHelpApps){          
					aHelpApps[i].url=that.appModulePath+aHelpApps[i].url            
				  }
				  let oHelpPDF=new JSONModel(aHelpApps)            
				  that.getView().setModel(oHelpPDF,"appUserManual")    
			}); 
		}
	});

});