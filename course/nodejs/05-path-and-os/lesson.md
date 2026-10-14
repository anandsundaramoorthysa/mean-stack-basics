Programs constantly work with file locations, called **paths**. Windows writes them as `C:\Users\asha\notes.txt` and macOS or Linux as `/home/asha/notes.txt`. If you glue strings together yourself, your program works on one computer and breaks on another. The built-in **path** module solves this.

```js
const path = require('node:path');
```

## Building paths

```js
path.join('reports', 'asha', 'marks.txt');
// reports/asha/marks.txt on Mac and Linux
// reports\asha\marks.txt on Windows
```

`path.join` joins the pieces with the right separator and removes doubled slashes.

## Taking paths apart

```js
const file = '/home/asha/notes/summary.md';

path.basename(file);          // 'summary.md'
path.basename(file, '.md');   // 'summary'
path.extname(file);           // '.md'
path.dirname(file);           // '/home/asha/notes'
```

## Absolute paths

A **relative** path such as `data/marks.txt` depends on where the program was started. `path.resolve` turns it into an **absolute** path that starts at the root of the disk:

```js
path.resolve('data', 'marks.txt');
// for example /home/asha/project/data/marks.txt
```

Two related names you will see in CommonJS files: `__dirname` is the folder of the current file, and `process.cwd()` is the folder the program was started from. They are often different.

## The os module

The **os** module reports facts about the computer. You rarely need it, but it is easy to try:

```js
const os = require('node:os');
console.log(os.platform());  // for example 'win32', 'darwin' or 'linux'
console.log(os.homedir());   // the user's home folder
console.log(os.cpus().length);
```

Note that none of these functions read or change files. They only work with text or report information. Reading files comes in the next lesson.
