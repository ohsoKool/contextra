sap.ui.define([], function () {
  "use strict";

  const SERVICE_URL = "/odata/v4/Assistant/";
  const ASK_ENDPOINT = "/odata/v4/Assistant/ask";

  async function getCsrfToken() {
    const response = await fetch(SERVICE_URL, {
      method: "HEAD",
      headers: {
        "X-CSRF-Token": "Fetch",
      },
    });

    return response.headers.get("X-CSRF-Token");
  }

  return {
    askQuestion: async function (question) {
      try {
        const token = await getCsrfToken();

        const response = await fetch(ASK_ENDPOINT, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": token,
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
