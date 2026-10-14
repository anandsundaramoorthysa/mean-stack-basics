JavaScript ships with two helpers that you never have to install: **Math** for numbers and **Date** for time.

## The Math object

`Math` is not something you create. You just call its methods.

```js
Math.round(4.6);   // 5   nearest whole number
Math.floor(4.9);   // 4   always down
Math.ceil(4.1);    // 5   always up
Math.max(3, 8, 5); // 8
Math.min(3, 8, 5); // 3
Math.abs(-7);      // 7
Math.sqrt(49);     // 7
Math.PI;           // 3.14159...
```

To find the largest item of an array, spread it: `Math.max(...marks)`.

### Random numbers

`Math.random()` gives a decimal from 0 up to (but not including) 1. Scale it and cut it:

```js
const dice = Math.floor(Math.random() * 6) + 1; // 1 to 6
```

## The Date object

```js
const now = new Date();                 // this moment
const exam = new Date('2026-03-15');    // from text
const diwali = new Date(2026, 10, 8);   // year, month, day
```

Useful methods: `getFullYear()`, `getMonth()`, `getDate()` (day of the month) and `getDay()` (0 is Sunday, 6 is Saturday).

Two traps:

- **Months start at 0.** January is 0 and December is 11.
- Subtracting two dates gives **milliseconds**. Divide by `1000 * 60 * 60 * 24` to get days.

```js
const days = (new Date('2026-01-10') - new Date('2026-01-01')) / 86400000;
console.log(days); // 9
```

A date written as `'2026-01-01'` is read as midnight in UTC, which makes whole-day maths reliable.
