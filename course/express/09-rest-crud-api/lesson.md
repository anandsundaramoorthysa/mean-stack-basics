Almost every app does the same four things to its data: **C**reate, **R**ead, **U**pdate and **D**elete, called **CRUD**. A **REST** API maps those actions onto HTTP in a predictable way, so anyone can guess how to use it.

## The pattern

Name the collection with a plural noun, then let the method say what to do:

| Action | Method and path | Success status |
|---|---|---|
| List all | `GET /todos` | 200 |
| Read one | `GET /todos/3` | 200 |
| Create | `POST /todos` | 201 |
| Replace or update | `PUT /todos/3` | 200 |
| Remove | `DELETE /todos/3` | 204 |

`PUT` usually sends the whole item. `PATCH` is the variant for changing only some fields. This lesson uses `PUT`.

## Keeping data in memory

A plain array works as a temporary database:

```js
let todos = [{ id: 1, title: 'Learn Express', done: false }];
let nextId = 2;
```

`let` is used because deleting reassigns the array with `filter`. `nextId` hands out ids that are never reused.

## The routes

```js
app.post('/todos', (req, res) => {
  const item = { id: nextId++, title: req.body.title, done: false };
  todos.push(item);
  res.status(201).json(item);
});

app.put('/todos/:id', (req, res) => {
  const item = todos.find((t) => t.id === Number(req.params.id));
  item.title = req.body.title;
  item.done = req.body.done;
  res.json(item);
});

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter((t) => t.id !== Number(req.params.id));
  res.sendStatus(204);
});
```

`nextId++` uses the current value and then adds one. You can reuse the `find` line for `GET /todos/:id`.

## What is missing

These routes crash if the id does not exist, and they accept any body. Real APIs check both. That is the next lesson.
