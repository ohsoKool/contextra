import { retrieveDocuments } from "./retrieveDocuments.js";

import { buildPrompt } from "../prompts/buildPrompt.js";

import { askGroq } from "../groq.js";

import { chatHistory } from "../memory/chat-memory.js";

export async function askQuestion(question) {
  const retrieval = await retrieveDocuments(question);

  const prompt = buildPrompt(question, retrieval.documents, chatHistory);

  const answer = await askGroq(prompt);

  chatHistory.push(`User: ${question}`);

  chatHistory.push(`Assistant: ${answer}`);

  return {
    answer,

    sources: retrieval.metadatas,
  };
}
