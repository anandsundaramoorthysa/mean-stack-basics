An **array** is an ordered list of values. Use it whenever you have many related items, such as marks of a class or names of cities.

## Creating and reading

```js
const marks = [72, 85, 64];

console.log(marks[0]);      // 72  (first item)
console.log(marks[2]);      // 64
console.log(marks.length);  // 3
console.log(marks[3]);      // undefined (no such item)
```

Each position is an **index**, and counting starts at **0**. The last item is always at `marks.length - 1`.

## Changing an array

```js
const fruits = ['apple', 'mango'];

fruits.push('banana');       // add to the end
console.log(fruits);         // ['apple', 'mango', 'banana']

const removed = fruits.pop(); // remove from the end
console.log(removed);         // 'banana'

fruits[0] = 'guava';          // replace an item
```

`push` and `pop` **change the original array**. A `const` array allows this, because `const` only forbids pointing the name at a different array.

## Looping over an array

```js
const marks = [72, 85, 64];

for (let i = 0; i < marks.length; i++) {
  console.log(i, marks[i]);
}

for (const mark of marks) {
  console.log(mark);
}
```

The second form, `for...of`, hands you each item directly and is easier to read when you do not need the index.

## Mixing and nesting

An array can hold any values, even other arrays: `[[1, 2], [3, 4]]`. In the next lesson you will learn methods that transform whole arrays in one line.
