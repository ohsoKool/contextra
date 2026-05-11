import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import log from "../../utils/logger.js";

/*
  Split large documents into smaller chunks
  for embedding generation and semantic retrieval.

  Chunk overlap preserves context continuity
  between neighboring chunks.
*/

export async function chunkDocuments(text) {
  try {
    if (!text || typeof text !== "string") {
      throw new Error("Invalid text provided for chunking");
    }

    log.info("CHUNKING", "Starting document chunking");

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,

      /*
        Overlap helps preserve semantic continuity
        across chunk boundaries.
      */
      chunkOverlap: 200,
    });

    const chunks = await splitter.createDocuments([text]);

    log.success("CHUNKING", `Generated ${chunks.length} chunks`);

    return chunks;
  } catch (error) {
    log.error("CHUNKING", "Document chunking failed", error);

    throw new Error(`Chunking failed: ${error.message}`);
  }
}
