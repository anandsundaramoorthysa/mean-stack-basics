Without help, MongoDB answers a query by reading **every document** in the collection and testing it against your filter. With ten documents that is instant. With ten million it is slow. An **index** is a separate, sorted structure that lets MongoDB jump straight to the matching documents, like the index at the back of a textbook.

MongoDB always indexes `_id`. You add the others with `createIndex`. The number says the sort direction: `1` ascending, `-1` descending.

```js
db.students.createIndex({ marks: 1 })
```

## Index types

- **Single field**: one field, as above. Good for filters and sorts on that field.
- **Compound**: several fields in a fixed order. `{ customerId: 1, createdAt: -1 }` serves queries on `customerId`, and on `customerId` plus `createdAt`. It does not help a query on `createdAt` alone, because the order of the fields matters.
- **Unique**: no two documents may hold the same value. Add the option `{ unique: true }`. Inserting a duplicate then fails.

  ```js
  db.users.createIndex({ email: 1 }, { unique: true })
  ```
- **Text**: lets you search words inside strings with the `$text` operator. A collection may have only one text index. Write `'text'` instead of 1.

  ```js
  db.products.createIndex({ description: 'text' })
  ```
- **Hashed**: stores a hash of the value. It only supports exact equality, not ranges or sorting, and is mainly used for even data spreading (sharding).

  ```js
  db.sessions.createIndex({ userId: 'hashed' })
  ```

## The price of an index

Each index takes storage and must be updated on every insert, update and delete. Add indexes for the queries your app really runs, not for every field. In this course the practice database ignores indexes, so the exercise here only checks that you write the commands correctly.
