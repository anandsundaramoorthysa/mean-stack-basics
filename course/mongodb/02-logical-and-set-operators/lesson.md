A filter with several fields already means **AND**: every condition must be true.

```js
db.students.find({ city: 'Madurai', marks: { $gte: 70 } })
```

When you need something different, use **logical operators**. They take an array of smaller filters.

```js
// marks below 50 OR above 90
db.students.find({ $or: [{ marks: { $lt: 50 } }, { marks: { $gt: 90 } }] })
```

`$and` also takes an array. You need it when the same field must appear twice, because an object cannot hold the same key two times. The second key silently replaces the first:

```js
// Wrong: only the $lt condition survives
db.students.find({ marks: { $gt: 50 }, marks: { $lt: 90 } })
// Right: put both operators in one object
db.students.find({ marks: { $gt: 50, $lt: 90 } })
```

## Set operators

**`$in`** matches when a field equals any value in a list. It is a short way to write several `$or` conditions on one field. **`$nin`** is the opposite: the value must not be in the list. It also matches documents that have no such field at all.

```js
db.students.find({ city: { $in: ['Madurai', 'Salem'] } })
db.students.find({ city: { $nin: ['Madurai', 'Salem'] } })
```

## $not

`$not` reverses an operator expression. `{ marks: { $not: { $gt: 50 } } }` matches students whose marks are 50 or less, and also students that have no `marks` field at all.

Tip: when you can say it with `$in` or a single object, prefer that over a long `$and`/`$or`.
