sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  function (Controller, MessageToast) {
    "use strict";

    return Controller.extend(
      "ui5app.controller.MainView",

      {
        onAsk: async function () {
          const question = this.byId("questionInput").getValue();

          const responseArea = this.byId("responseArea");

          responseArea.setValue("Thinking...");

          try {
            const response = await fetch(
              // eslint-disable-next-line fiori-custom/sap-no-hardcoded-url
              "/odata/v4/assistant/ask",
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify({
                  question,
                }),
              },
            );

            const data = await response.json();

            responseArea.setValue(data.answer);
          } catch (error) {
            responseArea.setValue("Error connecting to backend");
          }
        },

        onUploadComplete: function () {
          MessageToast.show("PDF uploaded successfully");
        },
      },
    );
  },
);
