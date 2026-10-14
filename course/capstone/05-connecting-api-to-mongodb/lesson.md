So far the students live in an array and vanish when the server restarts. Now the server will talk to MongoDB using the official **Node.js driver**, a package called `mongodb` that you add with `npm install mongodb`.

## Connection strings

A **connection string** is one line of text that says where the database is. A local one looks like this:

```
mongodb://localhost:27017
```

A hosted database (for example MongoDB Atlas) uses `mongodb+srv://` and usually includes a username and password inside the text. That makes the string a **secret**: anyone who sees it can read and change your data.

## Keep secrets in environment variables

If you write the string in your code and upload the project to GitHub, the whole world can read it. Instead, store it in an **environment variable**, a named value that belongs to the running process and not to the source code. In Node.js you read it with:

```js
const uri = process.env.MONGODB_URI;
```

During development you can put it in a `.env` file that is listed in `.gitignore`, and start Node with `node --env-file=.env server.js` (this flag needs Node.js 20.6 or newer). Never commit that file.

## The driver in five steps

```js
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);

try {
  await client.connect();
  const students = client.db('marks').collection('students');

  await students.insertOne({ name: 'Asha', department: 'CSE', marks: 91 });
  const all = await students.find({}).toArray();
} finally {
  await client.close();
}
```

This code must run inside an `async` function (or a module with top-level `await`). `client.close()` sits in `finally` so the connection is released even when an error happens. Since driver version 4.7, calling `client.connect()` yourself is optional, because the driver connects on the first operation, but calling it shows connection problems early.

Every call that talks to the database returns a **promise**, so you `await` it. `find` returns a cursor, and `toArray()` turns it into a normal array. The shell commands you practised have the same names, but in the driver they are methods on a collection object.

## Two things to know when you join this to the routes

- A `MongoClient` is a pool of connections. Create it once when the server starts and reuse it for every request. Do not create a new client inside each route.
- When you do not supply an `_id`, the driver generates one as an `ObjectId`, not a number. A route such as `PUT /students/:id` must turn the string from `req.params.id` into one with `new ObjectId(req.params.id)` (import `ObjectId` from `mongodb`). That call throws if the text is not a valid id, so check with `ObjectId.isValid(req.params.id)` first and answer 400 or 404 when it fails. The `Number(...)` conversion from lesson 3 only fits the in-memory array.

## What this exercise checks

The course cannot start a database for you, so this exercise only reads your file as text and looks for the right pieces. To really run it you need MongoDB installed (or an Atlas cluster), the `mongodb` package, and `MONGODB_URI` set.

In the exercise, complete `db.js`. A local fallback is allowed, but no password may appear in the file.
