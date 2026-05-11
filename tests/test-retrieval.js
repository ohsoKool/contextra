import { retrieveDocuments } from "../ai/rag/retrieveDocuments.js";

const results = await retrieveDocuments("How does CAP define services?");

console.log(results);
