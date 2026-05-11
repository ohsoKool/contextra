sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/ui/Device"],

  /**
   * Provide application models used across the UI5 app.
   *
   * @param {typeof sap.ui.model.json.JSONModel} JSONModel
   * @param {typeof sap.ui.Device} Device
   */

  function (JSONModel, Device) {
    "use strict";

    return {
      /*
        Device model used for responsive behavior.
      */

      createDeviceModel: function () {
        var oModel = new JSONModel(Device);

        oModel.setDefaultBindingMode("OneWay");

        return oModel;
      },

      /*
        Chat model used for conversational UI state.
      */

      createChatModel: function () {
        return new JSONModel({
          question: "",

          response: "",

          loading: false,
        });
      },
    };
  },
);
