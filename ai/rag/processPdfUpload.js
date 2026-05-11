import path from "path";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { chunkDocuments } from "./chunkDocuments.js";

import { generateEmbedding } from "../embeddings/generateEmbedding.js";

import { getCollection } from "../vectorstore/chromaClient.js";

export async function processPdfUpload(filePath) {
  const loader = new PDFLoader(filePath);

  const docs = await loader.load();

  const collection = await getCollection();

  let counter = Date.now();

  for (const doc of docs) {
    const chunks = await chunkDocuments(doc.pageContent);

    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk.pageContent);

      await collection.add({
        ids: [`upload-${counter}`],

        embeddings: [embedding],

        documents: [chunk.pageContent],

        metadatas: [
          {
            source: path.basename(filePath),

            page: doc.metadata.loc?.pageNumber,
          },
        ],
      });

      counter++;
    }
  }
}
