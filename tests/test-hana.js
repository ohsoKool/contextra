import { addDocument } from "../ai/vectorstore/hanaStore.js";

const embedding = [0.1, 0.2, 0.3];

await addDocument({
  id: "1",
  content: "SAP HANA Vector Engine is powerful",
  source: "test",
  embedding,
});
