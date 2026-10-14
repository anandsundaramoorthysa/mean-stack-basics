**Scope** is the area of code where a variable can be seen. Understanding it explains many "x is not defined" errors.

## Block scope (let and const)

A **block** is any code inside curly braces: an `if`, a loop or a function body. A variable created with `let` or `const` exists only inside its block.

```js
if (true) {
  const message = 'inside';
  console.log(message); // works
}
console.log(message);   // ReferenceError: message is not defined
```

Inner code can see variables of the outer blocks around it, but outer code cannot see inside. A variable that must be used after a loop therefore has to be declared **before** the loop.

## Function scope

Variables declared inside a function are private to it:

```js
function area() {
  const pi = 3.14;
  return pi * 2 * 2;
}
console.log(pi); // ReferenceError
```

Variables declared outside every function are **global** in a browser script. In Node.js each file is its own module, so they are visible everywhere in that file but not in other files. Keep them to a minimum, because any code in reach can change them.

## Hoisting and why to avoid var

Before running, JavaScript notes down all declarations. With `var`, the name is available from the top of its function, with the value `undefined`:

```js
console.log(count); // undefined, no error
var count = 3;
```

`var` also ignores blocks, so it leaks out of `if` and `for`. A classic trap:

```js
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => i);
}
console.log(fns[0]()); // 3, not 0
```

There is only one `i`, and it ends at 3. With `let i` every round has its own copy, so you get 0, 1, 2 as expected.

`let` and `const` are also hoisted, but reading them before their line throws an error. That error is a feature: it shows the mistake instead of hiding it.

Rule: **use `const` by default, `let` when you must reassign, and avoid `var` in new code.**
