Node.js can act as a web server without any extra library. The built-in **http** module is what Express is built on, so seeing it once makes Express much easier to understand.

## A minimal server

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node');
});

server.listen(3000);
```

- `http.createServer(handler)` makes a server. The `handler` function runs **once for every request**.
- `req` is the **request**. Useful fields are `req.method` (`'GET'`, `'POST'`, ...) and `req.url` (the path and query, such as `/students?page=2`).
- `res` is the **response** you build.
- `res.writeHead(status, headers)` sets the **status code** and the headers.
- `res.end(body)` sends the body and finishes. Always call it, or the browser keeps waiting.
- `server.listen(3000)` starts waiting for connections on port 3000. Open `http://localhost:3000` in a browser to try it.

## Status codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | The request was wrong |
| 404 | Not found |
| 500 | The server failed |

## Choosing what to send

Look at `req.url` (and `req.method`) and branch:

```js
if (req.url === '/') {
  res.end('Home');
} else {
  res.writeHead(404);
  res.end('Not Found');
}
```

## Sending JSON

The body must be text, so convert objects with `JSON.stringify` and say what you are sending in the `Content-Type` header:

```js
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ status: 'ok' }));
```

## In the exercise

Your file ends with `module.exports = server;` and never calls `listen`. The checker starts the server on a free port itself. In your own projects you call `server.listen(3000)` and run `node server.js`.

Writing every branch by hand gets long, which is exactly the problem Express solves later in the course.
