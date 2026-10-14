Things go wrong: files are missing, input is invalid, networks fail. A good program notices and responds instead of crashing in a confusing way. How you catch an error in Node.js depends on the style of the code.

## try/catch for synchronous code

```js
try {
  const data = JSON.parse(text);
} catch (err) {
  console.error('Bad JSON:', err.message);
}
```

If anything inside `try` throws, execution jumps to `catch`. An error is an object: `err.message` explains the problem and many Node errors also have `err.code`, such as `'ENOENT'` for a missing file.

## Error-first callbacks

Older Node APIs take a **callback** and call it later with the error as the **first** argument:

```js
fs.readFile('a.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Could not read:', err.code);
    return;
  }
  console.log(data);
});
```

Always check `err` first. When it is `null` the read worked. A `try/catch` around `fs.readFile(...)` does **not** catch this error, because the failure happens later, after the `try` block has finished.

## Promises and await

With promises, a failure becomes a **rejected** promise. Handle it with `.catch`, or with `try/catch` around `await`:

```js
async function load() {
  try {
    const text = await fs.readFile('a.txt', 'utf8');
    return JSON.parse(text);
  } catch (err) {
    if (err.code === 'ENOENT') return null;  // missing file is fine
    throw err;                               // anything else is not
  }
}
```

`await` is what turns a rejection into a thrown error, so keep it inside the `try`. Notice the last line: if you cannot handle an error, **throw it again** so the caller can.

## The last resort

If an error is never caught, Node prints it and stops the program. You can listen for it:

```js
process.on('uncaughtException', (err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
```

Use this only to log and shut down. After such an error the program may be in a broken state, so do not carry on as if nothing happened. Similar rules apply to promises that reject with nobody listening (the `unhandledRejection` event).

## Make your own errors useful

`throw new Error('Invalid age')` gives a clear message. Throw `Error` objects, not plain strings, because errors carry a stack trace that shows where the problem began.
