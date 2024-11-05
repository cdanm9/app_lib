sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/HTML",
    "sap/m/Image"
], function (Controller,JSONModel,Filter,FilterOperator,HTML,Image) {   
	"use strict";
	let that;
	return Controller.extend("com.ibs.toolpageui.controller.Welcome", {
		onInit: function () {   
			that=this;
			that.oDataToolModel = this.getOwnerComponent().getModel();
			let appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
			let appPath = appId.replaceAll(".", "/");
			that.appModulePath = jQuery.sap.getModulePath(appPath);    
			// that._getAppWelcomeImage();
			let oRouter=this.getOwnerComponent().getRouter().getRoute("RouteWelcome")           
            oRouter.attachPatternMatched(that._onObjectWelcomeMatched)
		},
		_onObjectWelcomeMatched:function(oEvent){
			that._getAppWelcomeImage();
		},
		_getAppWelcomeImage:function(){
			let oCarousel=that.getView().byId("idCarousel")
			if(oCarousel.getPages().length){
				oCarousel.destroyPages()
			}
			
			let oList = that.oDataToolModel.bindList("/MasterAppResources",undefined,[],[
			  new Filter("resourceType", FilterOperator.Contains, "WLC")      
			],{});   
			oList.requestContexts().then((odata) => { 
				  let aWelcomeApps = [],i=0,oCarouselContent; 
				  odata.forEach(element => {     
					aWelcomeApps.push(element.getObject()); 
				  }); 
				  for(i in aWelcomeApps){          
					aWelcomeApps[i].url=that.appModulePath+aWelcomeApps[i].url 
					oCarouselContent=that._loadImage(aWelcomeApps[i].url);
					if(aWelcomeApps[i].mimeType=='text/html')  
						oCarouselContent=that._loadIframe(aWelcomeApps[i].url);   
					oCarousel.addPage(oCarouselContent);              
				  }
				  let oWelcomePage=new JSONModel(aWelcomeApps)                     
				  that.getView().setModel(oWelcomePage,"appWelcomePage")       
			}); 
		},
		_loadIframe:function(logoURL){   
			let sIframeContent = "<iframe x-frame-options='ALLOWALL' height='100%' width='100%' src='"+logoURL+"'></iframe>" 
			let oHtmlControl = new HTML({   
				content: sIframeContent 
			});
			return oHtmlControl;
		},
		_loadImage:function(logoURL){ 
			let oImageControl = new Image({
				densityAware:true,
				width:"auto",
				height:"auto",
				src:logoURL
			});
			return oImageControl;
		}
	});

});