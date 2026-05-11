import { generateEmbedding } from "../embeddings/generateEmbedding.js";

import { getCollection } from "../vectorstore/chromaClient.js";

import log from "../../utils/logger.js";

/*
  Retrieve semantically relevant document chunks
  from the vector database using similarity search.
*/

export async function retrieveDocuments(question) {
  const start = Date.now();

  try {
    if (!question || typeof question !== "string") {
      throw new Error("Invalid question provided for retrieval");
    }

    log.info("RETRIEVAL", "Generating query embedding");

    const embedding = await generateEmbedding(question);

    const collection = await getCollection();

    log.info("RETRIEVAL", "Performing semantic similarity search");

    const results = await collection.query({
      queryEmbeddings: [embedding],

      nResults: 5,
    });

    const documents = results.documents?.[0] || [];

    const metadatas = results.metadatas?.[0] || [];

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
