import { askQuestion } from "../ai/rag/askQuestion.js";

const response = await askQuestion("What are the benefits of SAP CAP?");

console.log(response);
