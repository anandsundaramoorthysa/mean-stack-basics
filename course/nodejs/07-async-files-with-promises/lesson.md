The functions in the last lesson ended in `Sync`: the program stood still until the disk answered. Disks and networks are slow compared with the processor, and Node runs your code on a single thread. A server that freezes during every file read could not serve anyone else. So Node also offers an **asynchronous** version that does not block.

## fs/promises

```js
const fs = require('node:fs/promises');
```

Every function here, such as `readFile` and `writeFile`, returns a **promise**: an object that stands for a result that will arrive later. You already know two ways to use one.

With `.then`:

```js
fs.readFile('notes.txt', 'utf8').then((text) => {
  console.log(text);
});
console.log('This prints first');
```

With `async` and `await`, which reads like normal top-to-bottom code:

```js
async function show() {
  const text = await fs.readFile('notes.txt', 'utf8');
  console.log(text);
}

show();
```

## The rules of async functions

- In a CommonJS file, `await` can only be used inside a function marked `async`. (ES modules also allow `await` at the top level of the file, outside any function.)
- An `async` function **always returns a promise**. Whatever you `return` becomes the value the promise resolves to.
- If the awaited promise fails, `await` throws an error at that line. Wrap it in `try/catch` to handle it, or let the caller handle it.

## Several files at once

If two reads do not depend on each other, start both and wait for both:

```js
// inside an async function
const [a, b] = await Promise.all([
  fs.readFile('a.txt', 'utf8'),
  fs.readFile('b.txt', 'utf8'),
]);
```

## Writing

```js
await fs.writeFile('out.txt', 'line one\nline two\n');
await fs.appendFile('log.txt', 'done\n');
```

Remember that `writeFile` replaces the old content, and that without `await` the function returns before the file is written.
