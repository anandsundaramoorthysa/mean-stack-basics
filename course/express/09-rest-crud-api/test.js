// The checks run in order and share one app, so each one builds on the last.

check('GET /todos lists the starting todo', async () => {
  const res = await request(learner()).get('/todos');
  eq(res.status, 200, 'GET /todos should answer with status 200.');
  eq(res.json, [{ id: 1, title: 'Learn Express', done: false }], 'Send the todos array with res.json.');
});

check('GET /todos/1 sends that one todo', async () => {
  const res = await request(learner()).get('/todos/1');
  eq(res.json, { id: 1, title: 'Learn Express', done: false }, 'Find the todo with Number(req.params.id).');
});

check('POST /todos creates a todo with id 2 and status 201', async () => {
  const res = await request(learner()).post('/todos', { title: 'Write routes' });
  eq(res.status, 201, 'POST /todos should answer with status 201.');
  eq(res.json, { id: 2, title: 'Write routes', done: false }, 'New todos start with done: false and use nextId.');
});

check('A second POST gets id 3, so ids are not reused', async () => {
  const res = await request(learner()).post('/todos', { title: 'Test routes' });
  eq(res.json.id, 3, 'Increase nextId after every new todo (nextId++).');
});

check('GET /todos now lists all three', async () => {
  const res = await request(learner()).get('/todos');
  eq(res.json.map((t) => t.title), ['Learn Express', 'Write routes', 'Test routes']);
});

check('PUT /todos/2 updates the title and done flag and sends the result', async () => {
  const res = await request(learner()).put('/todos/2', { title: 'Write more routes', done: true });
  eq(res.status, 200, 'PUT should answer with status 200.');
  eq(res.json, { id: 2, title: 'Write more routes', done: true });
  const again = await request(learner()).get('/todos/2');
  eq(again.json, { id: 2, title: 'Write more routes', done: true }, 'The change must be stored in the array, not only sent back.');
});

check('DELETE /todos/2 answers with status 204', async () => {
  const res = await request(learner()).delete('/todos/2');
  eq(res.status, 204, 'DELETE should answer with res.sendStatus(204).');
});

check('The deleted todo is gone from the list', async () => {
  const res = await request(learner()).get('/todos');
  eq(res.json.map((t) => t.id), [1, 3], 'Remove the todo from the array, for example with filter.');
});
