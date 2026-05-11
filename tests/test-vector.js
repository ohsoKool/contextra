import { pipeline } from "@xenova/transformers";

const extractor = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2",
);

const output = await extractor("SAP HANA Vector Engine is powerful", {
  pooling: "mean",
  normalize: true,
});

console.log(output.data);
console.log(output.data.length);
