import { loadPdf } from "../loaders/loadPdf.js";

import { chunkDocuments } from "./chunkDocuments.js";

import { generateEmbedding } from "../embeddings/generateEmbedding.js";

import { getCollection } from "../vectorstore/chromaClient.js";

export async function storePdfDocuments(fileName) {
  const pdfDocs = await loadPdf(fileName);

  const collection = await getCollection();

  let counter = 0;

  for (const doc of pdfDocs) {
    const chunks = await chunkDocuments(doc.pageContent);

    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk.pageContent);

      await collection.add({
        ids: [`pdf-chunk-${counter}`],

        embeddings: [embedding],

        documents: [chunk.pageContent],

        metadatas: [
          {
            source: doc.metadata.source,
            page: doc.metadata.loc?.pageNumber,
          },
        ],
      });

      console.log(`Stored pdf-chunk-${counter}`);

      counter++;
    }
  }
}
