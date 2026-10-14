// Set the environment before the learner's file is loaded for the first time.
process.env.APP_NAME = 'Campus API';
delete process.env.PORT;
delete process.env.NODE_ENV;

check('GET /config answers with JSON', async () => {
  const res = await request(learner()).get('/config');
  eq(res.status, 200, 'GET /config should answer with status 200.');
  ok(res.json && typeof res.json === 'object', 'Send the config object with res.json.');
});

check('appName comes from the APP_NAME environment variable', async () => {
  const res = await request(learner()).get('/config');
  eq(res.json.appName, 'Campus API', 'Read process.env.APP_NAME instead of typing the name in.');
});

check('port defaults to the number 3000 when PORT is not set', async () => {
  const res = await request(learner()).get('/config');
  eq(res.json.port, 3000, 'Use Number(process.env.PORT) || 3000 so the default is a number, not text.');
});

check('env defaults to "development" when NODE_ENV is not set', async () => {
  const res = await request(learner()).get('/config');
  eq(res.json.env, 'development', 'Use process.env.NODE_ENV || "development".');
});

check('The config has exactly appName, port and env', async () => {
  const res = await request(learner()).get('/config');
  eq(Object.keys(res.json).sort(), ['appName', 'env', 'port'], 'Send only { appName, port, env }.');
});

check('The settings are read from process.env, not hard-coded', () => {
  learner();
  ok(/process\s*\.\s*env/.test(source), 'Read the settings from process.env.');
  ok(/APP_NAME/.test(source), 'Read process.env.APP_NAME.');
  ok(/\bPORT\b/.test(source), 'Read process.env.PORT.');
  ok(/NODE_ENV/.test(source), 'Read process.env.NODE_ENV.');
});
