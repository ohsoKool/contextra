import fs from "fs";
import path from "path";

export async function loadDocuments() {
  const filePath = path.join(process.cwd(), "ai", "documents", "sap-cap.txt");

  const text = fs.readFileSync(filePath, "utf-8");

  return text;
}
