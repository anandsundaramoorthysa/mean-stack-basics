check('GET / answers 200 with the text Welcome', async () => {
  const res = await request(learner()).get('/');
  eq(res.status, 200, 'GET / should answer with status 200.');
  eq(res.text, 'Welcome');
});
check('GET /health answers 200', async () => {
  const res = await request(learner()).get('/health');
  eq(res.status, 200, 'GET /health should answer with status 200.');
});
check('GET /health sends the JSON {"status":"ok"}', async () => {
  const res = await request(learner()).get('/health');
  eq(res.json, { status: 'ok' }, 'The body must be the text {"status":"ok"}. Use JSON.stringify.');
});
check('GET /health sets the Content-Type header to application/json', async () => {
  const res = await request(learner()).get('/health');
  ok(String(res.headers['content-type'] || '').includes('application/json'), 'Add { "Content-Type": "application/json" } in res.writeHead.');
});
check('Another path answers 404 with Not Found', async () => {
  const res = await request(learner()).get('/nothing-here');
  eq(res.status, 404, 'Unknown paths should answer with status 404.');
  eq(res.text, 'Not Found');
});
check('The file exports the server and does not listen by itself', () => {
  const s = learner();
  ok(s && typeof s.listen === 'function', 'End the file with module.exports = server;');
  ok(!s.listening, 'Remove server.listen(...). The checker starts the server for you.');
});
