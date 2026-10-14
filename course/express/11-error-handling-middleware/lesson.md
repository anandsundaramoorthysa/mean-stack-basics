Sooner or later a route fails: a bug, a missing value, a database that is down. Without a plan Express shows an ugly HTML error page, which is useless to a front end that expects JSON. The plan is a single place that catches every error: an **error-handling middleware**.

## The four-argument function

```js
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

Express recognises an error handler by its **four** parameters. The first one, `err`, is the error that was thrown. Keep all four even if `next` is unused, otherwise Express treats it as ordinary middleware.

Register it **last**, below every route and every other `app.use`. Errors travel forward through the chain, so a handler placed earlier would never see them.

## How errors reach it

- Throwing inside a route: `throw new Error('Oops')`.
- Calling `next(err)` with an error object.
- In Express 5, an `async` function that throws, or awaits a promise that rejects, is forwarded automatically:

```js
app.get('/users/:id', async (req, res) => {
  const user = await findUser(req.params.id); // if this rejects, the error handler runs
  res.json(user);
});
```

Express 4 needed `try/catch` plus `next(err)` for this. You no longer do.

## Choosing the status

Some errors carry their own status. For example, malformed JSON sent to `express.json()` produces an error with `status` 400. You can set one yourself:

```js
const err = new Error('No access');
err.status = 403;
throw err;
```

Then the handler can use it:

```js
res.status(err.status || 500).json({ error: err.message });
```

## Unknown routes

A path with no route is not an error to Express, it just runs out of handlers. Add an ordinary `app.use((req, res) => { ... })` right above the error handler to send your own 404. It has no `err` parameter, because nothing went wrong yet.

In production, avoid sending internal details such as stack traces to the client for 500 errors.
