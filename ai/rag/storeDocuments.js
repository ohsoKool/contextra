import { loadDocuments } from "../loaders/loadDocuments.js";
import { chunkDocuments } from "./chunkDocuments.js";
import { generateEmbedding } from "../embeddings/generateEmbedding.js";
import { getCollection } from "../vectorstore/chromaClient.js";

export async function storeDocuments() {
  const text = await loadDocuments();

  const chunks = await chunkDocuments(text);

  const collection = await getCollection();

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    const embedding = await generateEmbedding(chunk.pageContent);

    await collection.add({
      ids: [`chunk-${i}`],
      embeddings: [embedding],
      documents: [chunk.pageContent],
    });

    console.log(`Stored chunk-${i}`);
  }
}
