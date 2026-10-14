check('GET /hello.txt serves public/hello.txt', async () => {
  const res = await request(learner()).get('/hello.txt');
  eq(res.status, 200, 'GET /hello.txt should find public/hello.txt. Use app.use(express.static("public")).');
  eq(res.text.trim(), 'Hello from a static file');
});

check('GET / serves public/index.html', async () => {
  const res = await request(learner()).get('/');
  eq(res.status, 200, 'GET / should send public/index.html.');
  ok(res.text.includes('<h1>Campus Home</h1>'), 'The home page should contain the heading from index.html.');
});

check('HTML files are sent with an HTML Content-Type', async () => {
  const res = await request(learner()).get('/index.html');
  ok(String(res.headers['content-type']).includes('text/html'), 'express.static sets the Content-Type from the file extension.');
});

check('GET /guide/guide.txt serves docs/guide.txt', async () => {
  const res = await request(learner()).get('/guide/guide.txt');
  eq(res.status, 200, 'Mount the docs folder under a prefix: app.use("/guide", express.static("docs")).');
  eq(res.text.trim(), 'Read the guide');
});

check('The docs folder is not also served at the root', async () => {
  const res = await request(learner()).get('/guide.txt');
  eq(res.status, 404, '/guide.txt should not exist. Only /guide/guide.txt should work.');
});

check('The existing GET /api/hi route still works', async () => {
  const res = await request(learner()).get('/api/hi');
  eq(res.json, { hi: true });
});
