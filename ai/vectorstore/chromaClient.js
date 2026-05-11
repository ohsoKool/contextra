import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  host: "localhost",
  port: 8000,
});

export async function getCollection() {
  const collection = await client.getOrCreateCollection({
    name: "sap-cap-knowledge",

    embeddingFunction: null,
  });

  return collection;
}
