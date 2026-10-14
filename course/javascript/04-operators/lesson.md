An **operator** is a symbol that does something with values. `+` adds, `>` compares, and so on.

## Arithmetic

```js
console.log(7 + 2);  // 9
console.log(7 - 2);  // 5
console.log(7 * 2);  // 14
console.log(7 / 2);  // 3.5
console.log(7 % 2);  // 1  (remainder)
console.log(2 ** 3); // 8  (power)
```

The **remainder** operator `%` is very useful. `n % 2 === 0` is how programmers test for an even number, and `n % 10` gives the last digit.

## Comparison

Comparisons give a boolean (`true` or `false`): `<`, `>`, `<=`, `>=`.

For equality there are two choices:

```js
console.log(5 === '5'); // false: different types
console.log(5 == '5');  // true: JavaScript converts the text first
```

`===` (strict equality) never converts. `==` converts types behind your back and produces surprises such as `0 == ''` being `true`. MDN says strict equality is almost always the right choice, so use `===` and `!==` by default.

## Logical operators

- `a && b` is true only if both are true (AND).
- `a || b` is true if at least one is true (OR).
- `!a` flips the value (NOT).

```js
const marks = 55;
const attendance = 80;
console.log(marks >= 40 && attendance >= 75); // true
```

## Watch out for +

`+` adds numbers but joins text. If either side is text, the result is text: `'3' + 4` is `'34'`.
