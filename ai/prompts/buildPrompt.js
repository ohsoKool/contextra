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
You are a GENERAL purpose assistant.

Answer ONLY using the provided context and conversation history.

If the answer is not available in the context, respond with:
"I could not find the answer in the provided documents."

Do not fabricate information.
Do not make assumptions outside the provided context.

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
