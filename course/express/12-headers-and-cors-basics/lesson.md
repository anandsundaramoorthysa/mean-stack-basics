Every request and response carries **headers**: small name and value pairs that describe the message. `Content-Type: application/json` tells the receiver what the body is. You have already been setting headers without knowing, because `res.json` sets `Content-Type` for you.

## Reading and writing headers

```js
app.get('/api/hello', (req, res) => {
  const name = req.get('x-name');          // read a request header
  res.set('X-App-Name', 'Campus API');     // write a response header
  res.send('Hello, ' + (name || 'stranger'));
});
```

- `req.get('name')` is not case sensitive and gives `undefined` when the header is absent.
- `res.set('Name', 'value')` adds a header to the response. Call it before sending.
- Custom headers have often started with `X-` by convention, as in `X-App-Name`. This course uses that style. Newer standards no longer require the prefix.

## Why browsers block some calls: CORS

Say your Angular app runs at `http://localhost:4200` and your API at `http://localhost:3000`. These are different **origins**, because the port differs. For safety, a browser will not let page code read a response from another origin unless that server agrees. The agreement is made with **CORS** (Cross-Origin Resource Sharing) headers on the response.

The simplest form lets any site read your answers:

```js
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
```

Requests that send a JSON body or custom headers (anything beyond a plain GET or simple form POST) make the browser first send a **preflight**: an `OPTIONS` request that asks "may I?". Answering `204` with the headers above is the "yes".

## Be careful with *

`*` means every website may read the response. That is fine for public data, but for an API that uses cookies or private data you should name the exact origin, for example `http://localhost:4200`.

By hand is good for learning. In a real project most people install the `cors` package, which does this for you with more options. The Network tab in your browser's developer tools shows every header of every request, which is the best way to debug CORS.
