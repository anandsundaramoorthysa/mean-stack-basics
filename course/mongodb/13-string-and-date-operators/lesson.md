Inside `$project` (and other stages) you can write **expressions** that build new values from existing fields. This lesson covers the ones for text and dates. Remember to write a field as `'$name'` inside an expression.

## Text operators

| Operator | What it does | Example |
|---|---|---|
| `$concat` | Joins strings | `{ $concat: ['$first', ' ', '$last'] }` |
| `$toUpper` / `$toLower` | Changes case | `{ $toUpper: '$last' }` |
| `$substrCP` | Takes part of a string: the string, a start position, a length | `{ $substrCP: ['$first', 0, 1] }` |
| `$split` | Splits a string into an array | `{ $split: ['$email', '@'] }` |

Positions start at 0, so `$substrCP: ['Asha', 0, 1]` gives `'A'`. `CP` stands for code point, which means each code point counts as one, so a letter such as the single character "é" is not split into bytes.

`$split` returns an array. To pick one element, use `$arrayElemAt` with a position:

```js
{ $arrayElemAt: [{ $split: ['$email', '@'] }, 1] }   // the part after the @
```

## Dates

`$dateToString` turns a date into text in the format you choose.

```js
{ $dateToString: { format: '%Y-%m-%d', date: '$joined' } }   // 2024-03-15
```

`%Y` is the four digit year, `%m` the month, `%d` the day. Add `%H:%M` for hour and minute. Dates are shown in UTC unless you add a `timezone` option.

## Using them

```js
db.users.aggregate([
  { $project: { _id: 0, fullName: { $concat: ['$first', ' ', '$last'] } } }
])
```

Each operator can be nested inside another, as in the `$arrayElemAt` example above. Read nested expressions from the inside out.
