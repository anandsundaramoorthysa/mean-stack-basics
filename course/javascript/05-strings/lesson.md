A **string** is a piece of text. You already know how to write one; now you will build and change strings.

## Template literals

Backticks `` ` `` let you put values inside text with `${ }`. This is called a **template literal**.

```js
const name = 'Ravi';
const marks = 82;
console.log(`${name} scored ${marks} marks`);
// Ravi scored 82 marks
```

Anything inside `${ }` is evaluated, so `${marks + 5}` works too. Compare this with joining pieces using `+`, which is harder to read.

## Length and positions

```js
const word = 'Chennai';
console.log(word.length); // 7
console.log(word[0]);     // C   (counting starts at 0)
console.log(word[6]);     // i
```

## Handy methods

A **method** is a function attached to a value. You call it with a dot and round brackets.

```js
const text = '  Hello World  ';
console.log(text.trim());        // 'Hello World'
console.log(text.toUpperCase()); //   HELLO WORLD
console.log(text.toLowerCase());
console.log('banana'.includes('nan')); // true
console.log('a-b-c'.split('-'));       // ['a', 'b', 'c']
console.log('hello'.slice(1, 3));      // 'el'
console.log('ha'.repeat(3));           // 'hahaha'
```

## Strings do not change

Methods return a **new** string and leave the original untouched. If you want the result, store it or use it right away:

```js
let s = '  hi  ';
s = s.trim(); // now s is 'hi'
```
