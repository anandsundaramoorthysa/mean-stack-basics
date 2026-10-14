Imagine a request walking down a corridor with doors. At each door someone can look at it, write on it, send it away, or wave it through. In Express those doors are **middleware**: functions that run between the request arriving and your route answering.

## The shape of middleware

```js
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
```

- It receives `req`, `res` and a third argument, `next`.
- It can do some work, such as logging or checking something.
- Calling `next()` passes the request on to the next function in line.
- If it never calls `next()` and never sends a response, the request hangs.
- If it sends a response (`res.send`, `res.json`), the chain stops there.

`app.use(fn)` runs `fn` for every request. `app.use('/admin', fn)` runs it only for paths that begin with `/admin`.

## Sharing data with later steps

All steps for one request share the same `req` object, so middleware can attach information:

```js
app.use((req, res, next) => {
  req.user = 'guest';
  next();
});

app.get('/whoami', (req, res) => {
  res.send('Hello, ' + req.user);
});
```

## Order matters

Express goes through your `app.use` and `app.get` lines from top to bottom and stops at the first one that sends a response. So:

- A logger must be written **above** the routes it should see.
- A route written above a middleware finishes the request, and the middleware never runs.

This is also why `express.json()` from the last lesson has to come before your POST routes: it is middleware too.
