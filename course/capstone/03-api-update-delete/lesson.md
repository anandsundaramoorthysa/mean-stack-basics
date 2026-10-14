Two routes are missing: changing a student and removing one. Both act on a single student, so the address includes the id.

## Route parameters

```js
app.put('/students/:id', (req, res) => {
  console.log(req.params.id); // '2' for PUT /students/2
});
```

`:id` is a **route parameter**. Express puts its value in `req.params.id`, always as a **string**. The ids in our array are numbers, so convert with `Number(req.params.id)` before comparing with `===`. Forgetting this is the classic reason a student is "never found".

## Finding the student

```js
const student = students.find((s) => s.id === Number(req.params.id));
if (!student) return res.status(404).json({ error: 'student not found' });
```

`find` returns the matching object or `undefined`. Answering **404** tells the caller the id does not exist. For deleting, use `findIndex` (it returns `-1` when nothing matches) and then `students.splice(index, 1)`.

## PUT and DELETE

- **PUT** replaces the student's data. Check that the student exists (404), then validate the body (400), then update and send the student back with status 200.
- **DELETE** removes the student and answers **204** (No Content), meaning success with nothing to send: `res.status(204).end()`.

The starter already has a small `validate` function so you do not repeat the checks from last lesson.
