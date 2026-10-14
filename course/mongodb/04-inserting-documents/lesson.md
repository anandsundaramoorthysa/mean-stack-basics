So far you have only read data. To add new documents to a collection, use an **insert** method.

## insertOne

`insertOne` adds a single document. Pass the document as an object.

```js
db.products.insertOne({ name: 'Pen', price: 10, stock: 100 })
```

MongoDB answers with an acknowledgement that includes `insertedId`, the `_id` of the new document.

## insertMany

`insertMany` adds several documents in one call. Pass an **array** of objects, so remember the square brackets.

```js
db.products.insertMany([
  { name: 'Eraser', price: 5, stock: 300 },
  { name: 'Ruler', price: 20, stock: 150 }
])
```

## About _id

Every document needs a unique `_id`. If you do not give one, MongoDB creates an **ObjectId** for you. If you do give one and it already exists in the collection, the insert fails with a duplicate key error.

## Things to know

- A collection is created the first time you insert into it. You do not have to set it up first.
- Documents in one collection do not need identical fields, but keeping them similar makes queries easier.
- Write numbers without quotes. `price: 10` is a number, and `price: '10'` is text. Text and numbers sort and compare differently, so a wrong type causes confusing results later.
