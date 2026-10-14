Look at a search URL such as `/products?q=pen&max=50`. The part after the question mark is the **query string**. It carries optional extras like search words, filters, sorting and page numbers.

## Reading the query string

Express reads it for you and puts the pairs on `req.query`:

```js
// GET /products?q=pen&max=50
app.get('/products', (req, res) => {
  console.log(req.query); // { q: 'pen', max: '50' }
  res.send('ok');
});
```

- `?` starts the query string.
- Each pair is `key=value`, and `&` separates pairs.
- You do not write anything in the route path for the query string. The path is still just `/products`.

## Values are strings, and may be missing

Two facts matter every time:

1. Every value is a **string**. `max` above is `"50"`, so use `Number(req.query.max)` before comparing prices.
2. A key the browser did not send is `undefined`. That makes filters easy to make optional:

```js
app.get('/products', (req, res) => {
  let list = products;
  if (req.query.max) {
    list = list.filter((p) => p.price <= Number(req.query.max));
  }
  res.json(list);
});
```

If there is no `max`, the `if` is skipped and the whole list is sent.

## Path or query?

Use a route parameter to say **which** thing (`/products/7`). Use the query string for **optional refinements** (`/products?max=50`).

Note: in Express 5 the query string is read with the simple parser from Node.js, so `?a=1&a=2` gives an array `['1', '2']`. Nested forms such as `?a[b]=1` are not expanded unless you change the `query parser` setting.
