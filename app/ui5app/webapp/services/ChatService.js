sap.ui.define([], function () {
  "use strict";

  const SERVICE_URL = "/odata/v4/Assistant";
  const ASK_URL = `${SERVICE_URL}/ask`;

  async function getCsrfToken() {
    const response = await fetch(SERVICE_URL, {
      method: "GET",
      credentials: "include",
      headers: {
        "X-CSRF-Token": "Fetch",
      },
    });

    return response.headers.get("X-CSRF-Token");
  }

  return {
    getCsrfToken,

    async askQuestion(question) {
      const token = await getCsrfToken();

      const response = await fetch(ASK_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      return response.json();
    },
  };
});
