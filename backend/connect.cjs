const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

async function main() {
  const Db = process.env.ATLAS_URI;
  const client = new MongoClient(Db);

  try {
    await client.connect();
    const db = client.db("test");  // Replace with the database name
    const collections = await db.collections(); // List all collections in the database

    for (let collection of collections) {
      console.log(`Collection: ${collection.collectionName}`);
      const documents = await collection.find({}, { projection: { name: 1 } }).toArray();  // Retrieve all documents from the collection
      console.log(documents);  // Show the documents (data) in the collection
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main();
