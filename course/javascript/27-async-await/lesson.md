Promise chains work, but long ones become hard to read. `async` and `await` let you write the same logic as plain, top-to-bottom code.

## async functions

Put the word `async` before a function. It will now always return a **promise**, and inside it you may use `await`.

```js
async function getGreeting() {
  return 'Hello';
}

getGreeting().then((text) => console.log(text)); // Hello
```

## await

`await` placed before a promise pauses **that function** until the promise settles, and gives you the value.

```js
async function showStudent(loadStudent) {
  const student = await loadStudent();
  console.log(student.name);
}
```

The rest of the program is not frozen. Only this function waits. Compare with the same code using `then`:

```js
loadStudent().then((student) => console.log(student.name));
```

You can only use `await` inside an `async` function (or at the top of an ES module).

## Handling errors

A promise that rejects makes `await` throw, so use `try...catch`, exactly like normal errors.

```js
async function safeStudent(loadStudent) {
  try {
    return await loadStudent();
  } catch (error) {
    return null;
  }
}
```

## Doing things at the same time

Two awaits in a row run one after the other. If the tasks do not depend on each other, start them together:

```js
const [marks, fees] = await Promise.all([loadMarks(), loadFees()]);
```

`Promise.all` fulfills with an array of results in the same order, and rejects if any one fails.

## Summary

- `async` makes a function return a promise.
- `await` waits for a promise inside it.
- `try...catch` replaces `.catch`.
- `Promise.all` runs independent work in parallel.
