const { MongoClient } = require('mongodb');

// The connection string comes from the environment, never from the source code.
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const students = client.db('marks').collection('students');

    await students.insertOne({ name: 'Asha', department: 'CSE', marks: 91 });

    const all = await students.find({}).toArray();
    console.log(all);
  } finally {
    // Runs even if an error happened, so the connection is always released.
    await client.close();
  }
}

main().catch(console.error);
