import { retrieveDocuments } from "../retrieval/retrieveDocuments.js";

import { buildPrompt } from "../prompts/buildPrompt.js";

import { generateLLMResponse } from "../llm/groqClient.js";

import { addToChatHistory, getChatHistory } from "../memory/chatMemory.js";

import log from "../../utils/logger.js";

/*
  Main AI orchestration flow.

  FLOW:
  Question
  → Retrieve relevant documents
  → Build grounded prompt
  → Generate LLM response
  → Store conversation history
*/

export async function askQuestion(question) {
  const start = Date.now();

  try {
    if (!question || typeof question !== "string") {
      throw new Error("Invalid question provided");
    }

    log.info("RAG", "Starting question orchestration");

    const retrieval = await retrieveDocuments(question);

    if (!retrieval.documents?.length) {
      log.warn("RETRIEVAL", "No relevant documents found");

      return {
        answer: "I could not find the answer in the provided documents.",

        sources: [],
      };
    }

    log.success(
      "RETRIEVAL",
      `Retrieved ${retrieval.documents.length} relevant chunks`,
    );

    const prompt = buildPrompt(question, retrieval.documents, getChatHistory());

    const answer = await generateLLMResponse(prompt);

    addToChatHistory("User", question);

    addToChatHistory("Assistant", answer);

    const duration = Date.now() - start;

    log.success("RAG", `Question answered successfully in ${duration}ms`);

    return {
      answer,

      sources: JSON.stringify(retrieval.metadatas),
    };
  } catch (error) {
    log.error("RAG", "Question orchestration failed", error);

    throw new Error(`Failed to process question: ${error.message}`);
  }
}
