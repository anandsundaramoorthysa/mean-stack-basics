This lesson has no new ideas. It asks you to combine what you learned in the track into one small, complete API: a task list that a front end could use.

## What you will use

- **Routes and parameters**: `/tasks` and `/tasks/:id`.
- **Query strings**: `?done=true` to filter.
- **Request bodies**: `express.json()` and `req.body` for creating and changing tasks.
- **Status codes**: 200 for success, 201 for created, 204 for deleted, 400 for bad input, 404 for missing.
- **Validation**: check each field before you trust it.
- **Error handling**: one handler at the bottom that always answers with JSON.

## The resource

A task is a small object. Ids are given out by `nextId`:

```js
{ id: 1, title: 'Finish Express track', done: false }
```

| Request | Meaning | Success |
|---|---|---|
| `GET /tasks` | list, optionally `?done=true` or `?done=false` | 200 |
| `POST /tasks` | create from `{ title }` | 201 |
| `GET /tasks/:id` | read one | 200 |
| `PATCH /tasks/:id` | change `title` and/or `done` | 200 |
| `DELETE /tasks/:id` | remove | 204 |

`PATCH` differs from `PUT`: the client sends only the fields it wants to change, so you must check for each field with `!== undefined` before you validate and assign it.

## Tips

1. Build one route at a time and read the failing check names. They describe exactly what each route should do.
2. The same three steps repeat for every route with an id: convert the id, find the task, answer 404 if it is missing. Put them in a small helper.
3. Always `return` when you send an error, so the function stops.
4. Order matters at the bottom of the file: routes, then the catch-all 404, then the four-argument error handler.
5. For the invalid JSON case, remember `express.json()` already creates an error with `status` 400. Your handler only has to use `err.status`.

When you finish, your API is ready for a real database. In the MongoDB track you will replace the array with a collection.
