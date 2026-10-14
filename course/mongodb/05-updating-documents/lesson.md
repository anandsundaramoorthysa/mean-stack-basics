To change documents that already exist, use `updateOne` or `updateMany`. Both take two arguments: a **filter** that picks documents, and an **update** that says what to change.

```js
db.students.updateOne({ name: 'Bala' }, { $set: { city: 'Chennai' } })
```

- `updateOne` changes only the first document that matches, even if many match.
- `updateMany` changes every document that matches.

The update must use **update operators**, which start with `$`. If you write a plain object such as `{ city: 'Chennai' }`, MongoDB reports an error.

## The common operators

| Operator | What it does | Example |
|---|---|---|
| `$set` | Sets a field to a value, adding the field if it is missing | `{ $set: { city: 'Salem' } }` |
| `$inc` | Adds a number to a field (use a negative number to subtract) | `{ $inc: { marks: 5 } }` |
| `$unset` | Removes a field | `{ $unset: { phone: '' } }` |
| `$push` | Appends a value to an array field | `{ $push: { badges: 'topper' } }` |

You can combine operators in one update, for example `{ $set: { city: 'Salem' }, $inc: { marks: 2 } }`.

## Reading the result

An update returns counts. `matchedCount` is how many documents the filter found, and `modifiedCount` is how many actually changed. If the filter matches nothing, nothing changes and no error appears, so check the counts when something seems to do nothing.

```js
db.students.updateMany({ dept: 'CSE' }, { $inc: { marks: 5 } })
```

A tight filter matters. A filter of `{}` on `updateMany` changes every document in the collection.
