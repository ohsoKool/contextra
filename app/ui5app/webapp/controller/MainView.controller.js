sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "contextra/ui5app/services/ChatService",
  ],

  function (Controller, MessageToast, ChatService) {
    "use strict";

    return Controller.extend(
      "contextra.ui5app.controller.MainView",

      {
        getText: function (key) {
          return this.getView()
            .getModel("i18n")
            .getResourceBundle()
            .getText(key);
        },

        onAsk: async function () {
          const oChatModel = this.getView().getModel("chat");

          const question = oChatModel.getProperty("/question");

          if (!question) {
            MessageToast.show(this.getText("questionRequired"));

            return;
          }

          oChatModel.setProperty("/loading", true);

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

        onUploadComplete: function () {
          MessageToast.show(this.getText("uploadSuccess"));
        },
      },
    );
  },
);
