import cds from "@sap/cds";

import { askQuestion } from "../ai/rag/askQuestion.js";

export default cds.service.impl(function () {
  this.on("ask", async (req) => {
    const { question } = req.data;

    const response = await askQuestion(question);

    return response;
  });
});
