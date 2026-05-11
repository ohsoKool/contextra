import { loadPdf } from "../ai/loaders/loadPdf.js";

const docs = await loadPdf("capm-test.pdf");

console.log(docs);
