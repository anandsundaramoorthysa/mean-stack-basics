Deleting works like finding: you give a **filter**, and MongoDB removes the documents that match it.

```js
db.tasks.deleteOne({ title: 'Buy books' })
db.tasks.deleteMany({ done: true })
```

- `deleteOne` removes only the first document that matches, even if many match.
- `deleteMany` removes every document that matches.

Both return `deletedCount`, the number of documents removed. A count of `0` means the filter matched nothing.

## Why the filter matters

A deleted document is gone. There is no undo and no recycle bin. That makes the filter the most important part of the call.

- `deleteMany({})` has an empty filter, which matches **everything**. It empties the collection.
- A typo in a field name matches nothing, so the delete silently does nothing.
- A filter that is too loose deletes more than you meant to.

A safe habit: run the same filter with `find` first, check that the result is what you expect, then change `find` into `deleteMany`.

```js
db.tasks.find({ done: true })        // look first
db.tasks.deleteMany({ done: true })  // then delete
```

## Delete or mark?

Many real apps do not delete at all. They use `updateOne` to set `{ deleted: true }` and hide those documents in queries. This is called a **soft delete**, and it lets you recover from mistakes.
