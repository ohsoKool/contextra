import { ChromaClient } from "chromadb";

import dotenv from "dotenv";

import log from "../../utils/logger.js";

dotenv.config();

/*
  Initialize ChromaDB client.

  Environment variables are used instead of hardcoded
  values to keep the application cloud-ready and
  deployment-friendly.
*/

const client = new ChromaClient({
  host: process.env.CHROMA_HOST || "localhost",

  port: process.env.CHROMA_PORT || 8000,
});

/*
  Retrieve or create the vector collection
  used for semantic document storage.
*/

export async function getCollection() {
  try {
    log.info("VECTORSTORE", "Connecting to ChromaDB collection");

    const collection = await client.getOrCreateCollection({
      name: "sap-cap-knowledge",

      /*
        Embeddings are generated manually
        using Xenova transformers.
      */
      embeddingFunction: null,
    });

    log.success("VECTORSTORE", "ChromaDB collection ready");

    return collection;
  } catch (error) {
    log.error("VECTORSTORE", "Failed to connect to ChromaDB", error);

    throw new Error(`Vector store connection failed: ${error.message}`);
  }
}
