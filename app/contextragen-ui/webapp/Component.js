/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/Device", "contextragen/ui/model/models"],

  function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend(
      "contextragen.ui.Component",

      {
        metadata: {
          manifest: "json",
        },

        init: function () {
          UIComponent.prototype.init.apply(this, arguments);

          sap.ui.require(
            ["sap/ui/dom/includeStylesheet"],

            function (includeStylesheet) {
              includeStylesheet("css/style.css");
            },
          );

          this.getRouter().initialize();

          this.setModel(models.createDeviceModel(), "device");

          this.setModel(models.createChatModel(), "chat");
        },
      },
    );
  },
);
