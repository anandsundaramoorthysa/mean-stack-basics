In the scope lesson you saw that a function can read variables from the block around it. A **closure** is what you get when that function leaves its home: it travels with those variables and keeps using them.

## A function that remembers

```js
function makeGreeter(greeting) {
  return (name) => greeting + ', ' + name + '!';
}

const sayHello = makeGreeter('Hello');
console.log(sayHello('Asha')); // Hello, Asha!
```

`makeGreeter` finished running long ago, yet `sayHello` still knows that `greeting` is `'Hello'`. The inner function and the variable it uses are bundled together. That bundle is the closure.

## Private state

Because nothing outside can reach the remembered variable, closures give you **private state**.

```js
function makeCounter() {
  let count = 0;
  return () => {
    count = count + 1;
    return count;
  };
}

const clicks = makeCounter();
clicks(); // 1
clicks(); // 2
```

You can only change `count` by calling `clicks`. Each call to `makeCounter` builds a new `count`, so two counters never disturb each other.

## Why you care

- Event handlers (later lessons) use closures to remember which button they belong to.
- Timers and promises use them to remember what to do when the result arrives.
- Express and Angular code is full of small functions created with remembered settings.

A good way to spot a closure: a function that returns a function, and the inner one uses a variable of the outer one.
