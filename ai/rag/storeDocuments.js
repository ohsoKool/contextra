import { loadDocuments } from "../loaders/loadDocuments.js";

import { chunkDocuments } from "../ingestion/chunkDocuments.js";

import { generateEmbedding } from "../embeddings/generateEmbedding.js";

import { addDocument } from "../vectorstore/hanaStore.js";

export async function storeDocuments() {
  const text = await loadDocuments();

  const chunks = await chunkDocuments(text);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    const embedding = await generateEmbedding(chunk.pageContent);

    await addDocument({
      id: `chunk-${i}`,

      content: chunk.pageContent,

      source: "local-document",

      embedding,
    });

    console.log(`Stored chunk-${i}`);
  }
}
