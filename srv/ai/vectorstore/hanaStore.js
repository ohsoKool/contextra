import cds from "@sap/cds";

/*
  Lazy database initialization.

  WHY?
  CAP internally manages HANA connection pooling.
  We should avoid eager/double connections at module load time.
*/

let db;

/*
  Reuse single CAP-managed DB connection.
*/

async function getDb() {
  if (!db) {
    db = await cds.connect.to("db");

    console.log("Connected to SAP HANA Cloud");
  }

  return db;
}

/*
  Store document chunk + embedding inside SAP HANA Vector Engine.
*/

export async function addDocument({ id, content, source, embedding }) {
  try {
    const database = await getDb();

    const vectorString = `[${embedding.join(",")}]`;

    await database.run(
      `
      INSERT INTO DB_DOCUMENTCHUNKS (
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

/*
  Perform semantic similarity search using cosine similarity.
*/

export async function similaritySearch({ embedding, limit = 5 }) {
  try {
    const database = await getDb();

    const vectorString = `[${embedding.join(",")}]`;

    const result = await database.run(
      `
      SELECT TOP ${limit}
        ID,
        CONTENT,
        SOURCE,

        COSINE_SIMILARITY(
          EMBEDDING,
          TO_REAL_VECTOR(?)
        ) AS SCORE

      FROM DB_DOCUMENTCHUNKS

      ORDER BY SCORE DESC
      `,
      [vectorString],
    );

    console.log(`Retrieved ${result.length} semantic matches`);

    return result;
  } catch (error) {
    console.error("Failed semantic similarity search");

    console.error(error);

    throw error;
  }
}

export default getDb;
