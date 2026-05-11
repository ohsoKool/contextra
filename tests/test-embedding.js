import { generateEmbedding } from "../ai/embeddings/generateEmbedding.js";

const embedding = await generateEmbedding("SAP CAP uses CDS models");

console.log(embedding.length);

console.log(embedding.slice(0, 10));
