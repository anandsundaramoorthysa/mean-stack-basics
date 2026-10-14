Every value in JavaScript has a **type**. The type decides what you can do with the value. Adding two numbers works differently from joining two pieces of text.

## The basic types

```js
const name = 'Ravi';     // string: text in quotes
const age = 19;          // number: whole numbers and decimals
const price = 99.5;      // number
const isPassed = true;   // boolean: only true or false
let nickname;            // undefined: no value given yet
const middleName = null; // null: deliberately empty
```

- **string**: text. Use single quotes, double quotes or backticks.
- **number**: one type for integers and decimals.
- **boolean**: `true` or `false`. Quotes would turn them into strings.
- **undefined**: JavaScript's own marker for "nothing was assigned".
- **null**: you write it yourself to say "no value on purpose".

## Checking a type with typeof

```js
console.log(typeof 'hi');      // string
console.log(typeof 5);         // number
console.log(typeof true);      // boolean
console.log(typeof undefined); // undefined
console.log(typeof null);      // object  (a long-standing quirk)
```

`typeof null` is `'object'` by accident of history, and it can never be fixed without breaking old websites. So to test for null, write `value === null`.

## Why types matter

`'5' + 1` gives `'51'` (the number is joined onto the text), but `5 + 1` gives `6`. When a result looks strange, check the types first.

JavaScript also has `bigint` (very large whole numbers) and `symbol` types, which you will rarely need at the start.

Arrays and objects are also values, and you meet them in lessons 10 and 12.
