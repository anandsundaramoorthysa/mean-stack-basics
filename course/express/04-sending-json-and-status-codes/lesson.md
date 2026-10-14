A modern web app often does not send pages. The browser or Angular front end asks for data and the server answers with **JSON**, a text format for objects and arrays that every language can read. Along with the data, every response carries a **status code**, a number that tells the caller how things went.

## res.json

```js
app.get('/api/student', (req, res) => {
  res.json({ name: 'Asha', marks: 82 });
});
```

`res.json(value)` turns the object into JSON text, sets the `Content-Type` header to `application/json`, and sends it. Use it instead of `res.send` whenever you send an object or array.

## Status codes

The default is `200`. Change it with `res.status(code)`, then send the body:

```js
res.status(201).json({ id: 5 });
```

The codes you will use most:

| Code | Meaning | Typical use |
|---|---|---|
| 200 | OK | Normal success |
| 201 | Created | A POST added something |
| 204 | No Content | Success with nothing to send back, such as a delete |
| 400 | Bad Request | The caller sent something invalid |
| 403 | Forbidden | You are known but not allowed |
| 404 | Not Found | That thing does not exist |
| 500 | Server Error | Your code failed |

The first digit tells the family: 2xx success, 4xx the caller made a mistake, 5xx the server failed.

## sendStatus for empty answers

When there is no body to send, `res.sendStatus(204)` sets the code and finishes the response in one step. For most codes it also sends the standard status text (for example `Not Found` for 404) as the body, but a 204 response never has a body.

```js
app.delete('/api/items/1', (req, res) => {
  res.sendStatus(204);
});
```

Pick the status that is true. A client can only react correctly if the number tells it what happened.
