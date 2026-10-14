In the last lesson you used `$match` and `$group`. A pipeline has many more stages. Four small ones let you reshape and trim the output, much like the options of `find`.

```js
db.products.aggregate([
  { $match: { category: 'gadget' } },
  { $sort: { price: -1 } },
  { $skip: 1 },
  { $limit: 2 },
  { $project: { _id: 0, name: 1, price: 1 } }
])
```

## $sort, $skip and $limit

They work like the cursor methods you met earlier, but here they are stages, so the **order you write them is the order they run**. Sorting before limiting gives you "the top two". Limiting before sorting gives you "two documents in no particular order, then sorted", which is rarely what you want.

- `{ $sort: { price: -1 } }` sorts from largest to smallest.
- `{ $skip: 1 }` drops the first document.
- `{ $limit: 2 }` keeps two.

## $project

`$project` chooses the fields of the output, just like the projection argument of `find`. Aggregation lets you go further and **calculate new fields**:

```js
{ $project: { name: 1, priceWithDelivery: { $add: ['$price', 50] } } }
```

Inside a calculation, a field is written with a dollar sign (`'$price'`). `$add` adds its list of values. Other arithmetic operators are `$subtract`, `$multiply` and `$divide`.

## Tips

- `_id` appears unless you set `_id: 0`.
- A `$project` near the end keeps the output tidy. A `$match` near the start keeps the work small.
