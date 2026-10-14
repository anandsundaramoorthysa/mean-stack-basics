In `$group`, every key besides `_id` is an **accumulator**. You already know `$sum` and `$avg`. Here are more, which read one value from every document in a group.

| Accumulator | Result for each group |
|---|---|
| `$min` | The smallest value |
| `$max` | The largest value |
| `$first` | The value from the first document in the group |
| `$last` | The value from the last document in the group |
| `$push` | An array of all values, duplicates included |
| `$addToSet` | An array of the unique values only |

```js
db.sales.aggregate([
  { $sort: { amount: 1 } },
  {
    $group: {
      _id: '$region',
      lowest: { $min: '$amount' },
      biggestSale: { $max: '$amount' },
      reps: { $push: '$rep' },
      products: { $addToSet: '$product' }
    }
  }
])
```

## First and last need a sort

`$first` and `$last` depend on the order in which documents reach `$group`. Without a `$sort` before it, that order is not defined. To get "the rep with the biggest sale", sort by `amount` ascending and take `$last`, or sort descending and take `$first`.

```js
{ $sort: { amount: 1 } },
{ $group: { _id: '$region', topRep: { $last: '$rep' } } }
```

## push versus addToSet

Imagine three sales of the product Phone in one region. `$push: '$product'` gives `['Phone', 'Phone', 'Phone']`, while `$addToSet: '$product'` gives `['Phone']`. A set has no guaranteed order, so do not rely on the order of its values.

`$min` and `$max` also work on text (alphabetical order) and dates (earliest and latest).
