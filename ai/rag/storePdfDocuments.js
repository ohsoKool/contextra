import { loadPdf } from "../loaders/loadPdf.js";

import { chunkDocuments } from "./chunkDocuments.js";

import { generateEmbedding } from "../embeddings/generateEmbedding.js";

import { addDocument } from "../vectorstore/hanaStore.js";

export async function storePdfDocuments(fileName) {
  const pdfDocs = await loadPdf(fileName);

  let counter = 0;

  for (const doc of pdfDocs) {
    const chunks = await chunkDocuments(doc.pageContent);

    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk.pageContent);

      await addDocument({
        id: `pdf-chunk-${counter}`,

        content: chunk.pageContent,

        source: doc.metadata.source,

        embedding,
      });

      console.log(`Stored pdf-chunk-${counter}`);

      counter++;
    }
  }
}
