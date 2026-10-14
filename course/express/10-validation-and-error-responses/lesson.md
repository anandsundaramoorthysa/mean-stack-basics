Never trust what a client sends. People make typos, scripts send junk, and some users try to break things. A good API checks input and answers clearly when something is wrong. That is **validation**.

## Two kinds of error answers

- **400 Bad Request**: the client sent something invalid, such as a missing name or marks of 500. They can fix it and try again.
- **404 Not Found**: the request was fine, but the thing does not exist, such as student 99.

Send a small JSON body so the caller knows why:

```js
res.status(400).json({ error: 'name is required' });
```

## Guard clauses with return

Check for problems first and leave the function as soon as you find one:

```js
app.post('/students', (req, res) => {
  const { name, marks } = req.body ?? {};

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name is required' });
  }
  if (typeof marks !== 'number' || marks < 0 || marks > 100) {
    return res.status(400).json({ error: 'marks must be 0 to 100' });
  }

  const student = { id: nextId++, name: name.trim(), marks };
  students.push(student);
  res.status(201).json(student);
});
```

- `return` is important. Without it, Express would send the 400 and then carry on and try to send a 201, which fails with the error "Cannot set headers after they are sent to the client".
- `req.body ?? {}` falls back to an empty object when no body was parsed.
- Test the type explicitly (`typeof marks === 'number'`) because `0` is a valid mark but is falsy.

## Missing items and bad ids

```js
app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'id must be a number' });
  }
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json(student);
});
```

`Number('abc')` gives `NaN` (not a number), and `Number.isNaN` detects it. Real projects often use a validation library, but these checks are the idea behind all of them.
