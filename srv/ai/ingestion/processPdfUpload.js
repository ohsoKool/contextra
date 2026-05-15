import path from "path";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { chunkDocuments } from "./chunkDocuments.js";

import { generateEmbedding } from "../embeddings/generateEmbedding.js";

import { addDocument } from "../vectorstore/hanaStore.js";

import log from "../../utils/logger.js";

/*
  Process uploaded PDF documents and store
  vector embeddings inside SAP HANA Vector Engine.

  FLOW:
  PDF
  → Extract text
  → Chunk document
  → Generate embeddings
  → Store vectors
*/

export async function processPdfUpload(filePath) {
  const start = Date.now();

  try {
    if (!filePath) {
      throw new Error("PDF file path is required");
    }

    log.info("INGESTION", `Processing PDF: ${filePath}`);

    const loader = new PDFLoader(filePath);

    const docs = await loader.load();

    log.success("INGESTION", `Loaded ${docs.length} PDF pages`);

    let counter = Date.now();

    for (const doc of docs) {
      const chunks = await chunkDocuments(doc.pageContent);

      log.info("CHUNKING", `Generated ${chunks.length} chunks for page`);

      for (const chunk of chunks) {
        const embedding = await generateEmbedding(chunk.pageContent);

        await addDocument({
          id: `upload-${counter}`,

          content: chunk.pageContent,

          source: path.basename(filePath),

          embedding,
        });

        log.success("VECTORSTORE", `Stored chunk upload-${counter}`);

        counter++;
      }
    }

    const duration = Date.now() - start;

    log.success("INGESTION", `PDF processed successfully in ${duration}ms`);
  } catch (error) {
    log.error("INGESTION", "Failed to process uploaded PDF", error);

    throw new Error(`PDF ingestion failed: ${error.message}`);
  }
}
