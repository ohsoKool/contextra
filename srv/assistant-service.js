import cds from "@sap/cds";

import { askQuestion } from "./ai/orchestration/askQuestion.js";

import log from "./utils/logger.js";

/*
  CAP service implementation for AI assistant queries.

  FLOW:
  UI5
  → CAP Action
  → RAG orchestration
  → AI response
*/

export default cds.service.impl(function () {
  this.on("ask", async (req) => {
    const start = Date.now();

    try {
      const { question } = req.data;

      if (!question || typeof question !== "string") {
        req.reject(400, "A valid question is required");
      }

      log.info("CAP", "Received assistant question");

      const response = await askQuestion(question);

      const answer = response?.answer ?? "";
      const sources = JSON.stringify(response?.sources ?? []);

      const duration = Date.now() - start;

      log.success("CAP", `Assistant request completed in ${duration}ms`);

      return {
        answer,
        sources,
      };
    } catch (error) {
      log.error("CAP", "Assistant service request failed", error);

      req.reject(500, "Failed to process assistant request");
    }
  });
});
