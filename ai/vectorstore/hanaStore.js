import cds from "@sap/cds";

await cds.connect.to("db");

const db = await cds.connect.to("db");

console.log("Connected to SAP HANA Cloud");

export async function addDocument({ id, content, source, embedding }) {
  try {
    const vectorString = `[${embedding.join(",")}]`;

    await db.run(
      `
      INSERT INTO DOCUMENT_CHUNKS (
        ID,
        CONTENT,
        SOURCE,
        EMBEDDING
      )
      VALUES (
        ?,
        ?,
        ?,
        TO_REAL_VECTOR(?)
      )
      `,
      [id, content, source, vectorString],
    );

    console.log(`Stored document chunk: ${id}`);
  } catch (error) {
    console.error("Failed to store document in HANA");
    console.error(error);

    throw error;
  }
}

export async function similaritySearch({ embedding, limit = 5 }) {
  try {
    const vectorString = `[${embedding.join(",")}]`;

    const result = await db.run(
      `
      SELECT TOP ${limit}
        ID,
        CONTENT,
        SOURCE,
        COSINE_SIMILARITY(
          EMBEDDING,
          TO_REAL_VECTOR(?)
        ) AS SCORE
      FROM DOCUMENT_CHUNKS
      ORDER BY SCORE DESC
      `,
      [vectorString],
    );

    console.log(`Retrieved ${result.length} semantic matches`);

    return result;
  } catch (error) {
    console.error("❌ Failed semantic similarity search");
    console.error(error);

    throw error;
  }
}

export default db;

// CAP:
// - resolves CF bindings
// - injects credentials
// - initializes HANA service
// - internally uses hana-client
// - executes SQL

// IMPORTANT:
// Standalone Node.js scripts must run using:
// cds bind --exec -- node tests/test-hana.js
