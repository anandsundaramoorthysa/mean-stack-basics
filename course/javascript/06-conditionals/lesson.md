Programs need to make decisions. A **conditional** runs some code only when a condition is true.

## if, else if, else

```js
const marks = 72;

if (marks >= 80) {
  console.log('Distinction');
} else if (marks >= 60) {
  console.log('First class');
} else {
  console.log('Keep going');
}
```

JavaScript checks the conditions from top to bottom and runs only the **first** block whose condition is true. The `else` block runs when none matched. This is why you test the highest limit first.

## switch

When one value is compared against many exact options, `switch` is tidier:

```js
const light = 'red';

switch (light) {
  case 'red':
    console.log('Stop');
    break;
  case 'green':
    console.log('Go');
    break;
  default:
    console.log('Wait');
}
```

`switch` compares with strict equality (`===`), so `'5'` does not match `case 5`. `break` leaves the switch. Without it, execution **falls through** into the next case. Inside a function, `return` also works instead of `break`.

## Truthy and falsy

An `if` accepts any value, not only booleans. JavaScript converts it to true or false:

- **Falsy** values: `false`, `0`, `''` (empty text), `null`, `undefined`, `NaN`. (The complete list also has `-0` and `0n`, which you will rarely meet.)
- Everything else is **truthy**, including `'0'`, `'false'` and `[]`.

```js
const name = '';
if (name) {
  console.log('Hello ' + name);
} else {
  console.log('No name given');
}
```

This prints `No name given` because the empty string is falsy.
