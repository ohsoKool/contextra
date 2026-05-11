sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "ui5app/services/ChatService",
  ],

  function (Controller, MessageToast, ChatService) {
    "use strict";

    return Controller.extend(
      "ui5app.controller.MainView",

      {
        /*
          Helper function for retrieving i18n texts.
        */

        getText: function (key) {
          return this.getView()
            .getModel("i18n")
            .getResourceBundle()
            .getText(key);
        },

        /*
          Handle AI question submission flow.
        */

        onAsk: async function () {
          const oChatModel = this.getView().getModel("chat");

          const question = oChatModel.getProperty("/question");

          if (!question) {
            MessageToast.show(this.getText("questionRequired"));

            return;
          }

          // Set loading state
          oChatModel.setProperty("/loading", true);

          // Show temporary loading message
          oChatModel.setProperty("/response", this.getText("thinkingMessage"));

          try {
            const data = await ChatService.askQuestion(question);

            oChatModel.setProperty("/response", data.answer);
          } catch (error) {
            oChatModel.setProperty("/response", this.getText("backendError"));

            MessageToast.show(error.message);
          } finally {
            oChatModel.setProperty("/loading", false);
          }
        },

        /*
          Handle successful PDF upload.
        */

        onUploadComplete: function () {
          MessageToast.show(this.getText("uploadSuccess"));
        },
      },
    );
  },
);
