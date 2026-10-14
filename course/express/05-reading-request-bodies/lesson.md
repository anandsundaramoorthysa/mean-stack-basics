So far the browser only asked for things. To **send** data, such as a new student, it uses a **POST** request and puts the data in the **request body**. In an API the body is usually JSON.

## Turning the body into an object

Express does not read the body by default. You add a ready-made piece of middleware called `express.json()`:

```js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/students', (req, res) => {
  console.log(req.body); // { name: 'Asha', marks: 82 }
  res.status(201).json(req.body);
});
```

- `app.use(express.json())` says "for every request, look at the body and, if it is JSON, parse it".
- The result is placed on `req.body` as a normal JavaScript object.
- Order matters. The `app.use` line has to come before the routes that need `req.body`.

## Saving into an array

Until you learn databases, an array in memory is a fine place to keep data:

```js
const students = [];

app.post('/students', (req, res) => {
  const student = { id: students.length + 1, name: req.body.name, marks: req.body.marks };
  students.push(student);
  res.status(201).json(student);
});
```

The array resets whenever the server restarts. That is acceptable for learning.

## When there is no body

In Express 5, `req.body` is `undefined` unless a body parser filled it in: for example `express.json()` was not used, the client sent no body, or the `Content-Type` was not JSON (Express 4 gave an empty object `{}` here). Reading `req.body.name` then crashes the route. In the validation lesson you will guard against that. For now, remember that a POST route needs `express.json()` above it.

You can try POST requests from VS Code with the REST Client extension, or with `fetch` in the browser console.
