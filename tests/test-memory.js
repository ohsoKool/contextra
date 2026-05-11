import { askQuestion } from "../ai/rag/askQuestion.js";

const response1 = await askQuestion("What are the benefits of SAP CAP?");

console.log(response1);

const response2 = await askQuestion("What databases does it support?");

console.log(response2);
