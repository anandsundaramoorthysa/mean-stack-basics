Until now your JavaScript ran inside a browser. **Node.js** is a program that runs JavaScript on its own, so you can write tools, scripts and web servers with the same language. It uses the same engine as Google Chrome (called V8), but it has no web page, so there is no `document` or `window`.

## Running a file

Save this as `hello.js`:

```js
console.log('Hello from Node!');
```

Open a terminal in the same folder and type:

```
node hello.js
```

Node reads the file, runs it from top to bottom, prints the output in the terminal and stops. `console.log` works exactly as before.

## Command-line arguments

You can pass extra words after the file name. Node collects them in an array called **process.argv**.

```js
// run with: node args.js Asha 21
console.log(process.argv);
```

The array has the form `[path to node, path to your file, 'Asha', '21']`. The first two items are always there, so your own arguments start at index `2`.

```js
const name = process.argv[2]; // 'Asha'
```

Every argument arrives as a **string**, even `21`. Convert it with `Number(...)` when you need a number.

## What Node adds

Node gives you built-in **modules** for things a browser cannot do freely: reading files, talking to the network, starting servers. The next lessons cover them one by one. You also get the global object `process`, which describes the running program.

In this course the checker runs your file with the same command for you. Your job is to write the program.
