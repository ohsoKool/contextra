export function buildPrompt(question, documents, history) {
  const context = documents.join("\n\n");

  const conversation = history.join("\n");

  return `
You are an SAP CAP expert assistant.

Use the provided context and conversation history
to answer naturally.

If the answer is unavailable in the context,
say:
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
