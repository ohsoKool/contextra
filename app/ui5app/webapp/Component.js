/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/Device", "ui5app/model/models"],
  function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("ui5app.Component", {
      metadata: {
        manifest: "json",
      },

      /**
       * Initialize UI5 application component.
       */
      init: function () {
        // Call base component initialization
        UIComponent.prototype.init.apply(this, arguments);

        // Enable application routing
        this.getRouter().initialize();

        /*
        Device model used for responsive behavior.
      */
        this.setModel(models.createDeviceModel(), "device");

        /*
        Chat model used for conversational UI state.
      */
        this.setModel(models.createChatModel(), "chat");
      },
    });
  },
);
