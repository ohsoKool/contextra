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

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

log.success("LLM", "Groq client initialized");

/*
  Generate grounded AI response from the final RAG prompt.
*/

export async function generateLLMResponse(prompt) {
  const start = Date.now();

  try {
    if (!prompt || typeof prompt !== "string") {
      throw new Error("Invalid prompt provided to LLM");
    }

    log.info("LLM", "Sending prompt to Groq");

    const completion = await groq.chat.completions.create({
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
