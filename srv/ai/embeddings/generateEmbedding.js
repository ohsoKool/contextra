import log from "../../utils/logger.js";

/*
  Lightweight, dependency-free embedding generation.

  This keeps the deployment artifact small and avoids native
  runtime packages that cause Cloud Foundry droplet extraction issues.
*/

const EMBEDDING_DIMENSION = 384;

function normalizeVector(vector) {
  let magnitude = 0;

  for (const value of vector) {
    magnitude += value * value;
  }

  magnitude = Math.sqrt(magnitude);

  if (!magnitude) {
    return vector;
  }

  return vector.map((value) => value / magnitude);
}

function hashToken(token) {
  let hash = 2166136261;

  for (let index = 0; index < token.length; index++) {
    hash ^= token.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

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

    const vector = new Array(EMBEDDING_DIMENSION).fill(0);

    const tokens = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    for (const token of tokens) {
      const index = hashToken(token) % EMBEDDING_DIMENSION;
      vector[index] += 1;
    }

    const normalizedVector = normalizeVector(vector);

    const duration = Date.now() - start;

    log.success(
      "EMBEDDING",
      `Embedding generated successfully in ${duration}ms`,
    );

    return normalizedVector;
  } catch (error) {
    log.error("EMBEDDING", "Failed to generate embedding", error);

    throw new Error(`Embedding generation failed: ${error.message}`);
  }
}
