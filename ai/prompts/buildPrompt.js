import log from "../../utils/logger.js";

/*
  Build the final RAG prompt using:
  - retrieved document context
  - conversation history
  - current user question
*/

export function buildPrompt(question, documents = [], history = []) {
  log.info("PROMPT", "Building grounded RAG prompt");

  const context = documents.join("\n\n");

  const conversation = history.join("\n");

  return `
You are an enterprise document assistant.

Your task is to answer questions ONLY using the provided context.

RULES:
- Answer strictly from the provided context
- Prefer direct definitions and explanations from the documents
- Keep answers concise and accurate
- Do not generalize outside the context
- Do not invent information
- If the answer is not present, clearly say:
  "I could not find the answer in the provided documents."

------------------------
CONVERSATION HISTORY:
${conversation}

------------------------
CONTEXT:
${context}

------------------------
QUESTION:
${question}

------------------------
ANSWER:
`;
}
