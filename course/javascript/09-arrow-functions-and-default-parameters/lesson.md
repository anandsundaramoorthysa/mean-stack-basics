JavaScript offers a shorter way to write functions, called an **arrow function**. You will see it constantly in Angular and Express code.

## Arrow syntax

These two do the same job:

```js
function square(n) {
  return n * n;
}

const square2 = n => n * n;
```

The arrow `=>` separates the parameters from the body. The rules:

- One parameter: brackets are optional (`n => n * n`). Zero or several parameters need brackets: `() => 5`, `(a, b) => a + b`.
- A body without curly braces is a single expression and its value is **returned automatically**.
- A body with curly braces needs an explicit `return`:

```js
const total = (a, b) => {
  const sum = a + b;
  return sum;
};
```

To return an object literal from a short arrow function, wrap it in round brackets: `() => ({ ok: true })`. Otherwise the curly braces are read as a function body.

Because the function has no name of its own, you store it in a variable, usually with `const`.

## Default parameters

A parameter can have a fallback value that is used when the caller leaves the argument out (or passes `undefined`). Other values such as `null`, `0` or `''` do not trigger it:

```js
const greet = (name = 'friend') => 'Hello, ' + name;

console.log(greet());        // Hello, friend
console.log(greet('Asha'));  // Hello, Asha
```

Defaults work in normal functions too: `function power(base, exponent = 2) { ... }`.

## Using them together

Arrow functions shine when you pass a small function to another function, which you will do in the lessons on array methods:

```js
[1, 2, 3].map(n => n * 10); // [10, 20, 30]
```
