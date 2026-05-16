namespace db;

entity DocumentChunks {
    key ID        : String(100);

        CONTENT   : LargeString;

        SOURCE    : String(255);

        EMBEDDING : Vector(384);
}