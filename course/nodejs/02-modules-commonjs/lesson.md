A real program is too big for one file. A **module** is a file whose code you can load from another file. Node's original module system is called **CommonJS**, and it uses two things: `module.exports` to share and `require` to load.

## Sharing with module.exports

Everything inside a file is private by default. To share something, put it on `module.exports`.

```js
// math.js
function double(n) {
  return n * 2;
}
const version = 1;

module.exports = { double, version };
```

## Loading with require

```js
// main.js
const math = require('./math');
console.log(math.double(21)); // 42
```

or take the pieces out right away with destructuring:

```js
const { double } = require('./math');
```

## Three kinds of require

- `require('./math')`: your own file. The path starts with `./` or `../`, and `.js` may be left out.
- `require('node:path')`: a **built-in** module that comes with Node. The `node:` prefix makes that clear.
- `require('express')`: a package installed with npm (a later lesson).

## Good to know

- Node runs each module **once** and remembers the result. Requiring the same file twice gives you the same object.
- You can share a single thing: `module.exports = double;`. Then `require` returns the function itself.
- A shortcut `exports.double = ...` also works, but never assign to plain `exports = ...`; that does nothing.

In the exercise, other files will `require` your `grades.js`. If you forget to export something, they get `undefined`.
