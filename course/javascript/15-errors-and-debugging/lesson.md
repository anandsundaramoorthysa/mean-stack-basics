Every programmer sees errors daily. The skill is not avoiding them but reading them and reacting calmly.

## Reading an error message

```
ReferenceError: total is not defined
    at sum (C:\project\app.js:4:15)
    at Object.<anonymous> (C:\project\app.js:8:1)
```

- The first line has the **type** (`ReferenceError`) and a **message**.
- The lines below are the **stack trace**: file name, line number and column where it happened. Start with the first location that is in your own file.

Common types: `SyntaxError` (the code is written wrongly, so it cannot even run), `ReferenceError` (an unknown name), `TypeError` (a wrong kind of value, such as calling `undefined` as a function or reading a property of `null`).

## try / catch

When you expect that something may fail, wrap it so the program does not crash:

```js
try {
  const data = JSON.parse('{ not json');
  console.log(data);
} catch (error) {
  console.log('Could not read the data:', error.message);
}
```

If anything in `try` throws, JavaScript jumps straight to `catch`. Code after the whole statement carries on.

## throw

Your own functions can raise an error when they receive something unacceptable:

```js
function setAge(age) {
  if (age < 0) {
    throw new Error('Age cannot be negative');
  }
  return age;
}
```

`throw` stops the function immediately. The caller can handle the error with `try/catch` or let it stop the program.

## Debugging with the console

- `console.log(value)` shows a value. Label it: `console.log('total is', total)`.
- `console.table(array)` prints a list of objects as a table.
- `console.error('message')` logs at error level: red in browser DevTools, and sent to stderr instead of stdout in Node.js.

Work like a detective: guess what should be true at one point in the code, print it, and see if you were right. Fix the first place where reality differs from your expectation, then run again.
