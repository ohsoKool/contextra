sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/unified/FileUploaderParameter",
    "ui5app/services/ChatService",
  ],
  function (Controller, MessageToast, FileUploaderParameter, ChatService) {
    "use strict";

    return Controller.extend("ui5app.controller.MainView", {
      getText: function (key) {
        return this.getView().getModel("i18n").getResourceBundle().getText(key);
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

          oChatModel.setProperty("/response", data.answer || "");
        } catch (error) {
          oChatModel.setProperty("/response", this.getText("backendError"));

          MessageToast.show(error.message);
        } finally {
          oChatModel.setProperty("/loading", false);
        }
      },

      onFileChange: async function () {
        const oUploader = this.byId("pdfUploader");

        try {
          const token = await ChatService.getCsrfToken();

          oUploader.removeAllHeaderParameters();

          oUploader.addHeaderParameter(
            new FileUploaderParameter({
              name: "X-CSRF-Token",
              value: token,
            }),
          );

          oUploader.upload();
        } catch (error) {
          MessageToast.show(this.getText("uploadError"));
        }
      },

      onUploadComplete: function (oEvent) {
        const status = oEvent.getParameter("status");

        if (status === 200) {
          MessageToast.show(this.getText("uploadSuccess"));

          this.byId("pdfUploader").clear();
        } else {
          MessageToast.show(this.getText("uploadError"));
        }
      },
    });
  },
);
