A **function** is a named, reusable block of code. You write the steps once and run them whenever you need.

## Declaring and calling

```js
function greet(name) {
  console.log('Hello, ' + name);
}

greet('Asha');  // Hello, Asha
greet('Ravi');  // Hello, Ravi
```

- `function` starts the **declaration**, followed by the name and round brackets.
- `name` inside the brackets is a **parameter**: a placeholder for a value the caller will supply.
- `'Asha'` in `greet('Asha')` is an **argument**: the actual value. Writing `greet(...)` is called **calling** the function.

## Returning a value

`console.log` only shows something on the screen. To hand a result back to the code that called the function, use `return`:

```js
function square(n) {
  return n * n;
}

const area = square(5);
console.log(area); // 25
```

The call `square(5)` is replaced by the returned value. Because it is a value, you can store it, print it, or pass it to another function.

## Good habits

- `return` ends the function at once. Lines after it never run.
- A function without `return` gives back `undefined`.
- Give a function one clear job and a verb-style name such as `calculateTotal`.
- Functions can have several parameters, separated by commas: `function add(a, b)`.

Functions that only calculate and return are easy to test, which is exactly how the exercises in this course check your work.
