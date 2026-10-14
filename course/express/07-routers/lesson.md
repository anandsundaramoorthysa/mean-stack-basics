One file with forty routes is hard to read. Express lets you put related routes into a **router**, a small bundle of routes that you plug into the main app under a path prefix.

## Creating and mounting a router

```js
const express = require('express');
const app = express();

const router = express.Router();

router.get('/', (req, res) => {
  res.json(['Wings of Fire', 'Malgudi Days']);
});

router.get('/:id', (req, res) => {
  res.send('Book ' + req.params.id);
});

app.use('/books', router);
```

- `express.Router()` gives you an object with the same methods as `app`: `get`, `post`, `put`, `delete` and `use`.
- `app.use('/books', router)` **mounts** it. Every URL that starts with `/books` is handed to the router.
- Inside the router, paths are relative to the mount point. `'/'` answers `/books` and `'/:id'` answers `/books/3`.

## Why this helps

- All book routes live together. You can see at a glance what the books part of the API does.
- The prefix is written once, in the `app.use` line. If you rename `/books` to `/library`, you change one word.
- A router can have its own middleware with `router.use(...)`, which only affects its routes.

## In real projects

A router usually sits in its own file and is exported:

```js
// routes/books.js
const router = require('express').Router();
// ... routes ...
module.exports = router;

// app.js
app.use('/books', require('./routes/books'));
```

In this lesson everything stays in `app.js` so the checker can load it, but the idea is the same.
