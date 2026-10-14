check('GET /api/ping sends JSON { message: "pong" }', async () => {
  const res = await request(learner()).get('/api/ping');
  eq(res.status, 200, 'GET /api/ping should answer with status 200.');
  eq(res.json, { message: 'pong' }, 'Use res.json({ message: "pong" }).');
});

check('The ping answer has a JSON Content-Type', async () => {
  const res = await request(learner()).get('/api/ping');
  ok(String(res.headers['content-type']).includes('application/json'), 'Send the object with res.json so the Content-Type is application/json.');
});

check('POST /api/ping answers with status 201 and { created: true }', async () => {
  const res = await request(learner()).post('/api/ping', {});
  eq(res.status, 201, 'POST /api/ping should use res.status(201).');
  eq(res.json, { created: true });
});

check('GET /api/secret answers with status 403 and an error message', async () => {
  const res = await request(learner()).get('/api/secret');
  eq(res.status, 403, 'Use res.status(403) before res.json.');
  eq(res.json, { error: 'Forbidden' });
});

check('DELETE /api/ping answers with status 204 and an empty body', async () => {
  const res = await request(learner()).delete('/api/ping');
  eq(res.status, 204, 'DELETE /api/ping should answer with status 204.');
  eq(res.text, '', 'A 204 answer has no body. Use res.sendStatus(204).');
});
