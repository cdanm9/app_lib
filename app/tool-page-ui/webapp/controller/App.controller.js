sap.ui.define(
  [
    "sap/ui/core/mvc/Controller"
  ],
  function (Controller) {
    "use strict";
    let that;
    return Controller.extend("com.ibs.toolpageui.controller.App", {
      onInit: function () {
        that = this;
        that._oOwnerComponent = that.getOwnerComponent();
        that._oAppViewModel = that._oOwnerComponent.getModel("alAppView");
        let oRouter = that._oOwnerComponent.getRouter().getRoute("RouteApp")
        oRouter.attachPatternMatched(that._onObjectMatched)
      },
      _onObjectMatched: function (oEvent) {
        let oPage = that.getView().byId("idToolPage"), sUrl, oAppViewModel;  
        if (oPage.getContent().length)
          oPage.destroyContent(oPage.getContent())
        oAppViewModel = that.getOwnerComponent().getModel("alAppView")
        sUrl = oAppViewModel.getProperty("/appUrl")  
        let oHTMLContent = new sap.ui.core.HTML({
          content: "<iframe x-frame-options='ALLOWALL' height='100%' width='100%' src='" + sUrl + "'></iframe>"
        });
        oPage.addContent(oHTMLContent);
        let oOwnerComponent = that.getOwnerComponent();
        let oRouter = oOwnerComponent.getRouter().navTo("RouteMaster");

      }
    });
  }
);


