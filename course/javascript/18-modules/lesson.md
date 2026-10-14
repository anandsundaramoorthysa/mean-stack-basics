A real program is never one giant file. A **module** is a file that keeps its own variables private and shares only what you choose to export. Other files then load it.

## CommonJS: module.exports and require

Node.js has used **CommonJS** since the beginning, and most Express code you will read uses it.

```js
// math.js
function add(a, b) {
  return a + b;
}
const secret = 42; // stays private

module.exports = { add };
```

```js
// main.js
const { add } = require('./math.js');
console.log(add(2, 3)); // 5
```

- `module.exports` is the one thing a file hands out.
- `require('./math.js')` returns that thing. The `./` means "in this folder". Names without it, such as `require('express')`, are installed packages (or built-in modules such as `fs`).
- Anything you do not export is invisible to other files.

## ES modules

Browsers and newer Node.js projects use **ES modules**, written with different words:

```js
// math.mjs
export function add(a, b) {
  return a + b;
}

// main.mjs
import { add } from './math.mjs';
```

The main differences:

- `export` and `import` instead of `module.exports` and `require`.
- `import` statements are allowed only at the top level of the file (not inside functions or blocks) and are read before the code runs. Putting them at the top is the usual habit.
- In Node.js a file counts as an ES module when it ends in `.mjs` or the nearest `package.json` has `"type": "module"`.
- Angular and the browser use ES modules, while this course's Express lessons use CommonJS. The idea is identical: private by default, share on purpose.

Do not mix the two styles inside one file. In an ES module, `require` and `module.exports` are not available.

## In the exercise

The helper file lives in the exercise folder, so the starter builds the path from the current working folder. Normally you would simply write `require('./helpers.js')`.
