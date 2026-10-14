The global **process** object describes the program that is running right now and how it talks to the outside world. You met `process.argv` in the first lesson. Here are the other parts you will use all the time.

## Environment variables

An **environment variable** is a named setting that lives outside your code, provided by the operating system when the program starts. Node exposes them as strings on `process.env`.

```js
const port = process.env.PORT || 3000;
```

Run it like this:

```
PORT=8080 node server.js        (macOS, Linux)
$env:PORT = 8080; node server.js  (Windows PowerShell)
```

Use environment variables for anything that changes between computers, such as ports and database addresses, and for **secrets** such as passwords and API keys. Secrets must never be written into code that you share. Remember that values are always strings, and a missing variable is `undefined`.

## Standard input and output

A program has three channels: **stdin** (input), **stdout** (normal output) and **stderr** (error output). `console.log` writes to stdout and `console.error` writes to stderr. Both appear in the terminal, but they can be separated, which matters in scripts.

Reading stdin uses events, which you saw in the events lesson:

```js
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  input += chunk;          // pieces arrive over time
});
process.stdin.on('end', () => {
  console.log('Got ' + input.length + ' characters');
});
```

Data can arrive in several chunks, so collect it and work with it in the `end` handler. The shell can feed a file into stdin: `node sum.js < numbers.txt`.

## Exit codes

When a program ends it reports a number to the operating system: `0` for success, anything else for failure.

```js
process.exitCode = 1;   // finish normally, then exit with 1
process.exit(1);        // stop immediately
```

Prefer `process.exitCode`, because `process.exit` can cut off output that is still being written. Tools such as `npm test` read this code to decide if a run passed.
