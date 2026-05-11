import { loadDocuments } from "../ai/loaders/loadDocuments.js";
import { chunkDocuments } from "../ai/rag/chunkDocuments.js";

const text = await loadDocuments();

const chunks = await chunkDocuments(text);

console.log(chunks);
