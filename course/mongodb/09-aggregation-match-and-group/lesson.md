`find` returns documents. When you want a **summary**, such as total sales per customer, use the **aggregation pipeline**. A pipeline is an array of **stages**. Documents enter the first stage, and each stage passes its output to the next, like items on a conveyor belt.

```js
db.orders.aggregate([
  { $match: { status: 'paid' } },
  { $group: { _id: '$customer', total: { $sum: '$amount' } } }
])
```

## $match

`$match` keeps only the documents that fit a filter. It uses the same filter syntax as `find`. Put it first so later stages have less work to do.

## $group

`$group` puts documents into buckets and calculates a value for each bucket.

- `_id` says what to group by. Write a field name with a dollar sign, such as `'$customer'`, to read that field from each document. Here you get one bucket per customer. The dollar sign is how aggregation tells a field apart from plain text.
- Every other key is an **accumulator** that calculates one value per bucket.

| Accumulator | Meaning |
|---|---|
| `{ $sum: '$amount' }` | Add up the field |
| `{ $sum: 1 }` | Count documents, by adding 1 for each |
| `{ $avg: '$amount' }` | Average of the field |

The result for the example is one document per customer, such as `{ _id: 'Asha', total: 300 }`.

## Remember

- The order of groups in the output is not guaranteed. Add a `$sort` stage if you need a specific order.
- Use `_id: null` to put everything in a single bucket and get a grand total.
