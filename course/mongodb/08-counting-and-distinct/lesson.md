Sometimes you do not need the documents themselves, only a number or a list of unique values.

## countDocuments

`countDocuments` takes a filter and returns how many documents match it.

```js
db.orders.countDocuments({ status: 'shipped' })   // for example 5
db.orders.countDocuments({})                       // every order
```

It is better than fetching the documents and counting them yourself, because MongoDB does the counting and sends back one number.

## distinct

`distinct` returns the unique values of one field as an array. Its first argument is the field name as a string. An optional second argument is a filter.

```js
db.orders.distinct('city')
// [ 'Erode', 'Madurai', 'Salem' ]   (the order is not guaranteed)

db.orders.distinct('city', { status: 'shipped' })
// only the cities that have shipped orders
```

If the field holds an array, `distinct` looks at each element, so each element is treated as a separate value. The result must also fit in one 16 MB document, so for very large result sets use `$group`.

## Putting two answers together

A mongosh script can end with any JavaScript expression. For this course you can finish with an array that holds two results:

```js
[db.orders.countDocuments({}), db.orders.distinct('city')]
```

## Good to know

- To get a count and the unique values for each group in one go, you will use the aggregation pipeline later in this track.
- There is also `estimatedDocumentCount()`, which is fast but takes no filter. Prefer `countDocuments` while you are learning.
