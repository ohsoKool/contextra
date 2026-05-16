sap.ui.define([], function () {
  "use strict";

  const ASK_ENDPOINT = "/odata/v4/Assistant/ask";
  return {
    askQuestion: async function (question) {
      try {
        const response = await fetch(ASK_ENDPOINT, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            question,
          }),
        });

        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        return await response.json();
      } catch (error) {
        throw new Error(`Chat service failed: ${error.message}`);
      }
    },
  };
});
