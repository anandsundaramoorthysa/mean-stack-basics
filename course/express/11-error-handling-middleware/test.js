check('A normal route still works', async () => {
  const res = await request(learner()).get('/ok');
  eq(res.json, { ok: true });
});

check('GET /boom answers 500 with JSON { error: "Something broke" }', async () => {
  const res = await request(learner()).get('/boom');
  eq(res.status, 500, 'A thrown error without a status should give 500.');
  eq(res.json, { error: 'Something broke' }, 'Add app.use((err, req, res, next) => { ... }) below the routes and send err.message as JSON.');
});

check('The error handler has four parameters', () => {
  learner();
  ok(/\(\s*\w+\s*,\s*\w+\s*,\s*\w+\s*,\s*\w+\s*\)\s*(=>|\{)/.test(source), 'Express only treats a function as an error handler if it declares four parameters: (err, req, res, next).');
});

check('GET /async-boom (async route) is caught and answers 500 with JSON', async () => {
  const res = await request(learner()).get('/async-boom');
  eq(res.status, 500);
  eq(res.json, { error: 'Database is down' }, 'Express 5 forwards async errors to your error handler, so no try/catch is needed.');
});

check('GET /forbidden uses the error status 403', async () => {
  const res = await request(learner()).get('/forbidden');
  eq(res.status, 403, 'Use res.status(err.status || 500) so errors can carry their own status.');
  eq(res.json, { error: 'No access' });
});

check('An unknown path answers 404 with JSON { error: "Not found" }', async () => {
  const res = await request(learner()).get('/does-not-exist');
  eq(res.status, 404, 'Add an app.use((req, res) => { ... }) below the routes that sends status 404.');
  eq(res.json, { error: 'Not found' });
});

check('Unknown paths for other methods also answer with the JSON 404', async () => {
  const res = await request(learner()).post('/ok', {});
  eq(res.status, 404, 'There is no POST /ok route, so the catch-all should answer 404.');
  ok(res.json && typeof res.json.error === 'string', 'Use app.use (not app.get) for the catch-all so every method is covered.');
});
