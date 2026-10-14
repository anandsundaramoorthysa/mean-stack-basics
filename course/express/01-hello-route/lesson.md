Express is a small library for building web servers with Node.js. A server waits for **requests** from browsers and sends back **responses**. In Express you describe this with **routes**.

## A route

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express');
});

app.listen(3000);
```

- `app.get(path, handler)` runs `handler` when a browser asks for `path` with the **GET** method. GET is what a browser uses when you type an address.
- `req` describes the request. `res` is how you answer.
- `res.send(...)` sends text back with a `200` (OK) status. A string is sent as HTML (`Content-Type: text/html`).
- `app.listen(3000)` starts the server on port 3000.

## Exporting the app

In this course your exercise file ends with `module.exports = app;` instead of `app.listen`. The checker starts the server itself on a free port, so there is nothing to run and no port to clash. When you build a real project you will call `app.listen`.

## Express 5

This course uses Express 5, the current major version of Express.
