Many programs need to read data from a file or save results to one. Node's built-in **fs** module (file system) does this.

```js
const fs = require('node:fs');
```

## Reading a file

```js
const text = fs.readFileSync('notes.txt', 'utf8');
console.log(text);
```

- The first argument is the path. A relative path starts from the folder where the program was **started**.
- `'utf8'` tells Node to decode the bytes as text. Leave it out and you get a `Buffer` of raw bytes instead of a string.
- The `Sync` in the name means the program **waits** until the file is read before running the next line. This is simple and fine for small scripts. The next lesson shows the non-blocking style.

If the file does not exist, `readFileSync` throws an error with `code: 'ENOENT'`. You will learn to handle that later.

## Working with lines

A text file is one long string with `\n` between lines. Split it to get an array:

```js
const lines = text.trim().split('\n');
```

`trim()` removes the empty line that appears when a file ends with a newline. Files saved on Windows may use `
` between lines, which leaves a stray `` at the end of each line; `trim()` each line if that matters. Each line can be split again, for example `'Asha,82'.split(',')` gives `['Asha', '82']`. Notice that `'82'` is still a string, so use `Number('82')` before doing arithmetic.

## Writing a file

```js
fs.writeFileSync('summary.txt', 'Students: 3\n');
```

This **creates** the file, or **replaces** it completely if it exists. To add to the end instead:

```js
fs.appendFileSync('log.txt', 'Started\n');
```

## Checking before you read

`fs.existsSync('notes.txt')` returns `true` or `false`. It is handy for a quick check, but it is better to read inside a `try/catch` and handle the error, because the file could disappear between the check and the read.
