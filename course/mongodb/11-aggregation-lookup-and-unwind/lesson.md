MongoDB keeps related data in separate collections when it makes sense. An `orders` document might store only `customerId: 1`, while the customer's name lives in `customers`. To bring them together, use `$lookup`.

## $lookup

`$lookup` is MongoDB's version of a join. For each incoming document it looks in another collection and attaches the matches as an **array**.

```js
db.orders.aggregate([
  {
    $lookup: {
      from: 'customers',        // the other collection
      localField: 'customerId', // field in the orders documents
      foreignField: '_id',      // field in the customers documents
      as: 'customer'            // name of the new array field
    }
  }
])
```

Each order now has a `customer` array. It holds one customer, or it is empty when no customer matched.

## $unwind

An array of one item is awkward to use. `$unwind` takes an array field and produces **one output document per element**.

```js
{ $unwind: '$customer' }
```

After unwinding, `customer` is a plain object, so you can write `'$customer.name'`.

Two things to remember:

- A document whose array is empty or missing is **dropped** by `$unwind`. Orders with an unknown customer disappear. (The option `preserveNullAndEmptyArrays: true` keeps them.)
- When the array has three elements, the document appears three times, once for each. This is also how you can count or group tags, items or skills stored in arrays.

## Together

`$lookup`, then `$unwind`, then `$project` is the most common way to build a readable joined result. Note that joins cost more than simple queries, which is one reason why data modelling (a later lesson) matters.
