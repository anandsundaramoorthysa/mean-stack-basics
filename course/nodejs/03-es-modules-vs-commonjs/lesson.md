Node.js has **two** module systems. You will meet both, so you need to recognise each one.

| | CommonJS | ES modules |
|---|---|---|
| Share | `module.exports = { add }` | `export function add() {}` |
| Load | `const { add } = require('./math')` | `import { add } from './math.js'` |
| Origin | Node's original system | Part of the JavaScript language |

## The same code in both styles

CommonJS:

```js
const path = require('node:path');

function nameOf(file) {
  return path.basename(file);
}

module.exports = { nameOf };
```

ES module:

```js
import path from 'node:path';

export function nameOf(file) {
  return path.basename(file);
}
```

## How Node decides

Node looks at the file to decide which system it uses:

- `.mjs` is always an ES module, and `.cjs` is always CommonJS.
- `.js` follows the nearest `package.json`. With `"type": "module"` it is an ES module. With `"type": "commonjs"` it is CommonJS, and that is also the default when `"type"` is missing.

Recent Node.js versions (20.19, 22.7 and newer) also look inside a `.js` file that has no `"type"`: if it uses `import` or `export`, Node treats it as an ES module. The Node.js docs still list this feature as a release candidate and note that it costs some start-up time, so do not rely on this guess. Setting `"type"` or using `.mjs` makes your intention clear.

## Differences to remember

- `import` paths need the **full file name**, such as `'./math.js'`. `require` can skip the extension.
- `import` lines are read first, before the rest of the file runs, so they usually go at the top.
- Inside an ES module, `require`, `module` and `__dirname` are not available.
- A default export (`export default`) is loaded without braces: `import add from './add.js'`.

## Which one should you use?

New projects usually choose ES modules because they match the browser. Many Express tutorials and older projects use CommonJS, and most exercises in this course are plain `.js` files that use `require` and `module.exports`. Be ready to read both.
