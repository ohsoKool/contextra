import Groq from "groq-sdk";

import dotenv from "dotenv";

import log from "../../utils/logger.js";

dotenv.config();

/*
  Initialize Groq client once during startup.

  The LLM layer should only be responsible for:
  - sending prompts
  - receiving completions

  It should NOT handle:
  - retrieval
  - memory
  - chunking
  - orchestration
*/

let groq;

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return null;
  }

  if (!groq) {
    groq = new Groq({
      apiKey,
    });

    log.success("LLM", "Groq client initialized");
  }

  return groq;
}

/*
  Generate grounded AI response from the final RAG prompt.
*/

export async function generateLLMResponse(prompt) {
  const start = Date.now();

  try {
    if (!prompt || typeof prompt !== "string") {
      throw new Error("Invalid prompt provided to LLM");
    }

    const groqClient = getGroqClient();

    if (!groqClient) {
      log.warn("LLM", "GROQ_API_KEY is missing; returning fallback response");

      return "The LLM is not configured in this deployment. Please set GROQ_API_KEY to enable answer generation.";
    }

    log.info("LLM", "Sending prompt to Groq");

    const completion = await groqClient.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      model: "llama-3.3-70b-versatile",
    });

    const duration = Date.now() - start;

    log.success("LLM", `LLM response generated in ${duration}ms`);

    return completion.choices[0].message.content;
  } catch (error) {
    log.error("LLM", "Failed to generate LLM response", error);

    throw new Error(`LLM response generation failed: ${error.message}`);
  }
}
