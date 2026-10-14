const http = require('http');

// request() has no OPTIONS helper, so this check talks to the app directly.
async function options(path) {
  const server = http.createServer(learner());
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  try {
    const res = await fetch(`http://127.0.0.1:${server.address().port}${path}`, {
      method: 'OPTIONS',
      headers: { connection: 'close' },
    });
    return { status: res.status, headers: Object.fromEntries(res.headers.entries()) };
  } finally {
    server.closeAllConnections?.();
    server.close();
  }
}

check('GET /api/info sets the X-App-Name header to Campus API', async () => {
  const res = await request(learner()).get('/api/info');
  eq(res.status, 200, 'GET /api/info should answer with status 200.');
  eq(res.headers['x-app-name'], 'Campus API', 'Use res.set("X-App-Name", "Campus API") before sending.');
});

check('GET /api/info sends JSON { ok: true }', async () => {
  const res = await request(learner()).get('/api/info');
  eq(res.json, { ok: true });
});

check('GET /api/hello uses the x-name request header', async () => {
  const res = await request(learner()).get('/api/hello', { 'x-name': 'Asha' });
  eq(res.text, 'Hello, Asha', 'Read the header with req.get("x-name").');
});

check('GET /api/hello without the header says Hello, stranger', async () => {
  const res = await request(learner()).get('/api/hello');
  eq(res.text, 'Hello, stranger', 'req.get gives undefined when the header is missing. Use || "stranger".');
});

check('Responses allow any origin with Access-Control-Allow-Origin: *', async () => {
  const res = await request(learner()).get('/api/hello');
  eq(res.headers['access-control-allow-origin'], '*', 'Set Access-Control-Allow-Origin to * in a middleware above the routes, and call next().');
});

check('Responses list the allowed methods and headers', async () => {
  const res = await request(learner()).get('/api/info');
  eq(res.headers['access-control-allow-methods'], 'GET,POST,OPTIONS', 'Set Access-Control-Allow-Methods to GET,POST,OPTIONS.');
  eq(res.headers['access-control-allow-headers'], 'Content-Type', 'Set Access-Control-Allow-Headers to Content-Type.');
});

check('An OPTIONS preflight request answers 204 with the CORS headers', async () => {
  const res = await options('/api/info');
  eq(res.status, 204, 'For req.method === "OPTIONS" answer with res.sendStatus(204) inside the middleware.');
  eq(res.headers['access-control-allow-origin'], '*', 'Set the CORS headers before answering the preflight.');
});
