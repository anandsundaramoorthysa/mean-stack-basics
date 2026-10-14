Instead of writing a loop every time, arrays come with **methods** that do the common jobs. Most of them take a small function (usually an arrow function) that they call for each item.

## map: change every item

```js
const marks = [50, 60, 70];
const bonus = marks.map(m => m + 5);
console.log(bonus); // [55, 65, 75]
```

`map` returns a **new array** with the same length. The original is untouched.

## filter: keep some items

```js
const passed = [35, 80, 42].filter(m => m >= 40);
console.log(passed); // [80, 42]
```

The function should give a truthy value to keep an item and a falsy value to drop it (a comparison like `m >= 40` gives `true` or `false`). `filter` also returns a new array and leaves the original untouched.

## reduce: combine into one value

```js
const total = [1, 2, 3].reduce((sum, n) => sum + n, 0);
console.log(total); // 6
```

The function receives the running value (`sum`) and the current item (`n`). The `0` after the function is the starting value.

## find and includes

```js
const names = ['Asha', 'Ravi', 'Meena'];
console.log(names.find(n => n.startsWith('R'))); // 'Ravi'  (first match or undefined)
console.log(names.includes('Meena'));            // true
```

## sort

```js
const nums = [10, 9, 1];
nums.sort((a, b) => a - b);
console.log(nums); // [1, 9, 10]
```

Two warnings:

1. `sort` **changes the original array**. Copy first when you need to keep it: `[...nums].sort(...)`. (Newer JavaScript also has `toSorted()`, which returns a sorted copy.)
2. Without the compare function, `sort` orders items as text, so `10` comes before `9`. For numbers always pass `(a, b) => a - b`.

## Chaining

`map` and `filter` return arrays, so you can chain another array method onto them: `marks.filter(m => m >= 40).map(m => m + 5)`.
