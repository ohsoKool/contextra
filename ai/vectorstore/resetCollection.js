import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  host: process.env.CHROMA_HOST || "localhost",
  port: process.env.CHROMA_PORT || 8000,
});

async function resetCollection() {
  try {
    await client.deleteCollection({
      name: "sap-cap-knowledge",
    });

    console.log("ChromaDB collection deleted successfully");
  } catch (error) {
    console.error("Failed to delete collection", error);
  }
}

resetCollection();
