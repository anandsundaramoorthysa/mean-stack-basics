A web address is more than a string. It has parts, and your server often needs to read them: which page is wanted, which search term was typed. Node.js (like the browser) has a global class called **URL** that splits an address for you, so you never have to cut strings by hand.

## The parts of a URL

```js
const u = new URL('https://shop.example.com:8080/items/tea?page=2&sort=price#top');

u.protocol; // 'https:'
u.hostname; // 'shop.example.com'
u.port;     // '8080'
u.pathname; // '/items/tea'
u.search;   // '?page=2&sort=price'
u.hash;     // '#top'
```

The part after the `?` is the **query string**. It carries extra information as `name=value` pairs joined with `&`.

`new URL(...)` needs a complete address. If you only have a path such as `/items?page=2`, pass a base as the second argument: `new URL(req.url, 'http://localhost')`. You will do exactly this in a server.

## Reading the query

`u.searchParams` is a **URLSearchParams** object:

```js
u.searchParams.get('page');      // '2' (a string)
u.searchParams.get('missing');   // null
u.searchParams.has('sort');      // true
```

All values are strings, so convert numbers with `Number(...)`. If a name repeats, as in `?tag=a&tag=b`, `get` returns the first and `getAll('tag')` returns `['a', 'b']`.

## Building a query

```js
const params = new URLSearchParams();
params.set('q', 'node js');
params.append('tag', 'a');
params.toString(); // 'q=node+js&tag=a'
```

Special characters are **encoded** for you: a space becomes `+`, and `&` or `=` inside a value become `%26` and `%3D`, so they cannot be confused with the separators. Writing `'?q=' + term` by hand skips this step, and a search for `Tom & Jerry` would silently break.

You can also change a URL object directly. `u.searchParams.set('page', '3')` updates `u.search`, and `u.toString()` (or `u.href`) gives the new address.

## Bad input

`new URL('not a url')` throws a `TypeError`. When the address comes from a user, wrap it in `try/catch` or use `URL.canParse(text)`, which returns `true` or `false`.
