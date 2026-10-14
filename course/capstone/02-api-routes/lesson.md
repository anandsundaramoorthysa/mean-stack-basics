The first API piece reads and creates students. For now the data lives in a JavaScript array, so you can focus on the routes. In lesson 5 the array is replaced by MongoDB.

## Sending JSON

```js
app.get('/students', (req, res) => {
  res.json(students);
});
```

`res.json(value)` turns an array or object into JSON text and sets the right headers. It is the usual way an API answers.

## Reading a request body

When a browser sends a new student it puts JSON in the request **body**. Express only reads it if you add this line once near the top:

```js
app.use(express.json());
```

After that, `req.body` is an object. If nobody sent a body it can be `undefined`, so write `req.body ?? {}` before you pull fields out of it.

## Validation and status codes

Never trust data from outside. **Validation** means checking it before use. When it is bad, stop early and answer **400** (Bad Request):

```js
if (typeof marks !== 'number' || marks < 0 || marks > 100) {
  return res.status(400).json({ error: 'marks must be 0 to 100' });
}
```

`return` matters: without it the function keeps running and tries to answer a second time. When everything is fine, answer **201** (Created) with the new item: `res.status(201).json(student)`.

Give each new student the next id from a counter, and `push` it into the array.
