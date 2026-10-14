A project that works in one file grows messy quickly. Two habits keep it tidy: splitting code into small files, and keeping settings outside the code.

## A common layout

```
task-api/
  server.js          starts the server (app.listen)
  app.js             builds the app and exports it
  config.js          reads settings from the environment
  routes/
    tasks.js         a router with the task routes
  package.json
```

- `app.js` creates the Express app, adds middleware and mounts routers, then does `module.exports = app`.
- `server.js` is tiny: it requires `app` and calls `app.listen`. Because starting the server lives elsewhere, a test can load `app.js` alone. That is why every exercise here ends in `module.exports = app`.
- `routes/` holds one router file per resource, like the books router in the routers lesson.

You do not need more structure than your project requires. Start small and split when a file feels crowded.

## Settings from the environment

Things that change between machines, such as the port, a database address or a secret key, should not be typed into the code. Programs receive them as **environment variables**, available in Node.js on `process.env`:

```js
const config = {
  appName: process.env.APP_NAME || 'Task Manager',
  port: Number(process.env.PORT) || 3000,
  env: process.env.NODE_ENV || 'development',
};
```

- A variable that is not set is `undefined`, so `|| 'default'` supplies a fallback.
- Every value is a **string**. Convert numbers yourself with `Number(...)`.
- Defaults keep the app running on a fresh laptop with no setup.

You can set variables when starting Node. In PowerShell: `$env:PORT = 4000; node server.js`. Node.js 20.6 and later can also load a file of `NAME=value` lines with `node --env-file=.env server.js`, so no extra package is needed.

## Keep secrets out of Git

Put the `.env` file in `.gitignore` so passwords and keys are never uploaded. Commit a sample file such as `.env.example` with fake values so teammates know which variables exist.
