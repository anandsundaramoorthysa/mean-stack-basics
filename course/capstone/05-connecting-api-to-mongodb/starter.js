const { MongoClient } = require('mongodb');

// TODO 1: read the connection string from process.env.MONGODB_URI
// TODO 2: create a MongoClient with it

async function main() {
  // TODO 3: connect, then get the "students" collection of the "marks" database

  // TODO 4: insert one student with insertOne

  // TODO 5: read every student with find({}).toArray() and print them

  // TODO 6: close the client
}

main().catch(console.error);
