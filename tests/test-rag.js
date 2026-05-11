import { askQuestion } from "../ai/rag/askQuestion.js";

const response = await askQuestion("How does CAP define services?");

console.log(response);
