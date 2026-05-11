import { generateEmbedding } from "../embeddings/generateEmbedding.js";

import { getCollection } from "../vectorstore/chromaClient.js";

export async function retrieveDocuments(question) {
  const embedding = await generateEmbedding(question);

  const collection = await getCollection();

  const results = await collection.query({
    queryEmbeddings: [embedding],

    nResults: 3,
  });

  return {
    documents: results.documents[0],

    metadatas: results.metadatas[0],
  };
}
