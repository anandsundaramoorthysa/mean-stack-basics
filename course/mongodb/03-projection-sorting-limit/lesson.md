`find` takes two arguments: a filter (which documents) and a **projection** (which fields to show).

## Projection

Put `1` next to the fields you want. Every other field is left out, except `_id`, which MongoDB adds by default. Write `_id: 0` to hide it.

```js
db.students.find({}, { name: 1, marks: 1, _id: 0 })
```

You can also list the fields to hide with `0`, such as `{ city: 0 }`. Do not mix `1` and `0` in one projection. The only exception is `_id`.

## sort, skip and limit

These three **cursor methods** are chained after `find`:

```js
db.students.find({}).sort({ marks: -1 }).skip(3).limit(3)
```

- `sort({ field: 1 })` sorts from smallest to largest. `-1` sorts from largest to smallest.
- `skip(n)` jumps over the first `n` results.
- `limit(n)` returns at most `n` results.

MongoDB always sorts first, then skips, then limits. The order you type the methods in does not change that.

## Pagination

Skip and limit together give you pages. With 3 results per page, page 1 is `skip(0).limit(3)`, page 2 is `skip(3).limit(3)`, and page 3 is `skip(6).limit(3)`. The rule is `skip = (page - 1) * pageSize`.

Always sort before you skip. Without a sort, the order of documents is not guaranteed, so pages could repeat or miss documents.
