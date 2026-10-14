// Checks run in order and share one app, so later checks build on earlier ones.
const hasError = (res) => !!res.json && typeof res.json.error === 'string' && res.json.error.length > 0;

check('GET /tasks starts as an empty list', async () => {
  const res = await request(learner()).get('/tasks');
  eq(res.status, 200, 'GET /tasks should answer with status 200.');
  eq(res.json, [], 'With no tasks yet, send an empty array.');
});

check('POST /tasks creates a task: status 201, done false, id 1', async () => {
  const res = await request(learner()).post('/tasks', { title: 'Read lesson' });
  eq(res.status, 201, 'A created task should answer with status 201.');
  eq(res.json, { id: 1, title: 'Read lesson', done: false });
});

check('POST /tasks rejects a missing, blank or non-string title with 400', async () => {
  const missing = await request(learner()).post('/tasks', {});
  eq(missing.status, 400, 'A missing title should give 400.');
  ok(hasError(missing), 'Send { error: "..." } with the 400.');
  const blank = await request(learner()).post('/tasks', { title: '   ' });
  eq(blank.status, 400, 'A blank title should give 400.');
  const wrong = await request(learner()).post('/tasks', { title: 42 });
  eq(wrong.status, 400, 'A title that is not a string should give 400.');
});

check('Rejected tasks are not stored, valid ones get the next id', async () => {
  await request(learner()).post('/tasks', { title: 'Write API' });
  const res = await request(learner()).get('/tasks');
  eq(res.json.map((t) => t.id), [1, 2], 'Only valid tasks are stored, and nextId goes up by one per task.');
});

check('GET /tasks/2 sends that task', async () => {
  const res = await request(learner()).get('/tasks/2');
  eq(res.status, 200);
  eq(res.json, { id: 2, title: 'Write API', done: false });
});

check('GET /tasks/99 answers 404 with an error message', async () => {
  const res = await request(learner()).get('/tasks/99');
  eq(res.status, 404, 'An unknown id should give 404.');
  ok(hasError(res), 'Send { error: "Task not found" }.');
});

check('GET /tasks/abc answers 400', async () => {
  const res = await request(learner()).get('/tasks/abc');
  eq(res.status, 400, 'An id that is not a number should give 400 (check Number.isNaN).');
});

check('PATCH /tasks/1 can mark a task done and keeps the title', async () => {
  const res = await request(learner()).patch('/tasks/1', { done: true });
  eq(res.status, 200, 'PATCH should answer with status 200.');
  eq(res.json, { id: 1, title: 'Read lesson', done: true }, 'Change only the fields that were sent.');
});

check('PATCH /tasks/2 can change only the title', async () => {
  const res = await request(learner()).patch('/tasks/2', { title: 'Write the API' });
  eq(res.json, { id: 2, title: 'Write the API', done: false });
});

check('PATCH rejects a done value that is not a boolean', async () => {
  const res = await request(learner()).patch('/tasks/2', { done: 'yes' });
  eq(res.status, 400, 'done must be true or false, otherwise answer 400.');
  const after = await request(learner()).get('/tasks/2');
  eq(after.json.done, false, 'A rejected PATCH must not change the task.');
});

check('PATCH on an unknown id answers 404', async () => {
  const res = await request(learner()).patch('/tasks/99', { done: true });
  eq(res.status, 404);
});

check('GET /tasks?done=true and ?done=false filter the list', async () => {
  const done = await request(learner()).get('/tasks?done=true');
  eq(done.json.map((t) => t.id), [1], '?done=true should keep only finished tasks.');
  const open = await request(learner()).get('/tasks?done=false');
  eq(open.json.map((t) => t.id), [2], '?done=false should keep only unfinished tasks.');
});

check('DELETE /tasks/1 answers 204 and the task is gone', async () => {
  const res = await request(learner()).delete('/tasks/1');
  eq(res.status, 204, 'A successful delete answers with status 204.');
  const list = await request(learner()).get('/tasks');
  eq(list.json.map((t) => t.id), [2], 'Remove the task from the array.');
});

check('DELETE on an unknown id answers 404', async () => {
  const res = await request(learner()).delete('/tasks/1');
  eq(res.status, 404, 'Task 1 no longer exists, so deleting it again should give 404.');
});

check('An unknown path answers 404 with a JSON error', async () => {
  const res = await request(learner()).get('/nope');
  eq(res.status, 404);
  eq(res.json, { error: 'Not found' }, 'Add a catch-all app.use below the routes.');
});

check('Invalid JSON in a request answers 400 with a JSON error', async () => {
  const res = await request(learner()).post('/tasks', '{ "title": ', { 'content-type': 'application/json' });
  eq(res.status, 400, 'express.json() gives the error a status of 400. Use err.status || 500 in your error handler.');
  ok(hasError(res), 'The error handler should send { error: err.message }.');
});
