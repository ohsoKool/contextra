import { generateEmbedding } from "../embeddings/generateEmbedding.js";

import { similaritySearch } from "../vectorstore/hanaStore.js";

import log from "../../utils/logger.js";

/*
  Retrieve semantically relevant document chunks
  from SAP HANA Vector Engine using similarity search.
*/

export async function retrieveDocuments(question) {
  const start = Date.now();

  try {
    if (!question || typeof question !== "string") {
      throw new Error("Invalid question provided for retrieval");
    }

    log.info("RETRIEVAL", "Generating query embedding");

    const embedding = await generateEmbedding(question);

    log.info("RETRIEVAL", "Performing semantic similarity search");

    const results = await similaritySearch({
      embedding,
      limit: 5,
    });

    const documents = results.map((row) => row.CONTENT);

    const metadatas = results.map((row) => ({
      source: row.SOURCE,
      score: row.SCORE,
    }));

    const duration = Date.now() - start;

    log.success(
      "RETRIEVAL",
      `Retrieved ${documents.length} relevant chunks in ${duration}ms`,
    );

    return {
      documents,

      metadatas,
    };
  } catch (error) {
    log.error("RETRIEVAL", "Document retrieval failed", error);

    throw new Error(`Retrieval failed: ${error.message}`);
  }
}
