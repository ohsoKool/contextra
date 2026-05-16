sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "contextragen/ui/services/ChatService",
    "sap/ui/unified/FileUploaderParameter",
  ],

  function (Controller, MessageToast, ChatService, FileUploaderParameter) {
    "use strict";

    return Controller.extend(
      "contextragen.ui.controller.MainView",

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

            oChatModel.setProperty("/response", data.value);
          } catch (error) {
            oChatModel.setProperty("/response", this.getText("backendError"));

            MessageToast.show(error.message);
          } finally {
            oChatModel.setProperty("/loading", false);
          }
        },

        onUploadPress: function () {
          const oUploader = this.byId("pdfUploader");

          oUploader.removeAllHeaderParameters();

          oUploader.addHeaderParameter(
            new FileUploaderParameter({
              name: "X-Requested-With",
              value: "XMLHttpRequest",
            }),
          );

          oUploader.upload();
        },

        onUploadComplete: function () {
          MessageToast.show(this.getText("uploadSuccess"));
        },
      },
    );
  },
);
