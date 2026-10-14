A website rarely has one fixed page per user. Instead of writing `/users/1`, `/users/2`, `/users/3` as separate routes, you write one route with a **route parameter**: a named slot in the path that matches whatever the browser sends.

## Writing a parameter

```js
app.get('/users/:id', (req, res) => {
  res.send('You asked for user ' + req.params.id);
});
```

- The colon in `:id` marks a parameter. `id` is just the name you choose.
- A request for `/users/7` matches, and Express stores `"7"` in `req.params.id`.
- `req.params` is an object holding every parameter of the route.

## Parameters are always strings

The URL is text, so `req.params.id` is the **string** `"7"`, not the number 7. If your data uses number ids, convert before comparing:

```js
const users = [{ id: 7, name: 'Asha' }];

app.get('/users/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  res.json(user);
});
```

## More than one parameter

Use several slots, separated by fixed words:

```js
app.get('/courses/:course/lessons/:lesson', (req, res) => {
  res.send(req.params.course + ' / ' + req.params.lesson);
});
```

Each `:name` matches one segment, meaning the text between two slashes. It does not match a slash, so `/users/7/extra` would not match `/users/:id`.

## What if nothing matches?

When no user has that id, `find` gives `undefined`. A later lesson shows how to answer with a proper 404. For now, test with ids that exist.
