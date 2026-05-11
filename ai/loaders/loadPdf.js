import path from "path";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function loadPdf(fileName) {
  const filePath = path.join(process.cwd(), "ai", "pdf", fileName);

  const loader = new PDFLoader(filePath);

  const docs = await loader.load();

  return docs;
}
