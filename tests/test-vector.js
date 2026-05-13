import { generateEmbedding } from "../srv/ai/embeddings/generateEmbedding.js";

const embedding = await generateEmbedding("SAP HANA Vector Engine is powerful");

console.log(embedding);
console.log(embedding.length);
