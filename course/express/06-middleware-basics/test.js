check('GET /whoami answers instead of hanging', async () => {
  const res = await request(learner()).get('/whoami');
  eq(res.status, 200, 'GET /whoami should answer with status 200. Does every middleware call next()?');
});

check('A middleware sets req.user so /whoami sends "Hello, guest"', async () => {
  const res = await request(learner()).get('/whoami');
  eq(res.text, 'Hello, guest', 'Set req.user = "guest" in a middleware that is registered above the route.');
});

check('The logger records "GET /whoami"', async () => {
  await request(learner()).get('/whoami');
  const res = await request(learner()).get('/log');
  ok(Array.isArray(res.json), 'GET /log should send the log array as JSON.');
  ok(res.json.includes('GET /whoami'), 'The log should contain "GET /whoami". Push req.method + " " + req.url in a middleware.');
});

check('The logger sees every request, including /log itself', async () => {
  const res = await request(learner()).get('/log');
  ok(res.json.includes('GET /log'), 'The logger must be registered before the routes, so it also records the request for /log.');
});

check('Requests to unknown paths are logged too and get a 404', async () => {
  const res = await request(learner()).get('/nowhere');
  eq(res.status, 404, 'A path without a route should give 404.');
  const log = await request(learner()).get('/log');
  ok(log.json.includes('GET /nowhere'), 'Use app.use without a path so the logger runs for every request.');
});
