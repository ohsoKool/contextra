import { pipeline } from "@xenova/transformers";

import log from "../../utils/logger.js";

/*
  Initialize embedding model once during application startup.

  WHY?
  Loading transformer models is expensive.
  If we initialize inside the function, the model would reload
  for every embedding request which would severely hurt performance.

*/

log.info("EMBEDDING", "Loading embedding model: Xenova/all-MiniLM-L6-v2");

const extractor = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2",
);

log.success("EMBEDDING", "Embedding model loaded successfully");

/*
  Converts text into vector embeddings
  used for semantic similarity search.
*/

export async function generateEmbedding(text) {
  const start = Date.now();

  try {
    if (!text || typeof text !== "string") {
      throw new Error("Invalid text provided for embedding generation");
    }

    log.info(
      "EMBEDDING",
      `Generating embedding for text length: ${text.length}`,
    );

    const output = await extractor(text, {
      pooling: "mean",

      /*
        Normalize improves cosine similarity comparisons.

        WHY?
        Vector databases compare embeddings mathematically.
        Normalized vectors improve semantic similarity consistency.
      */
      normalize: true,
    });

    const duration = Date.now() - start;

    log.success(
      "EMBEDDING",
      `Embedding generated successfully in ${duration}ms`,
    );

    return Array.from(output.data);
  } catch (error) {
    log.error("EMBEDDING", "Failed to generate embedding", error);

    throw new Error(`Embedding generation failed: ${error.message}`);
  }
}
