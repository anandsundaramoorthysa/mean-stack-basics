check('GET / answers with status 200', async () => {
  const res = await request(learner()).get('/');
  eq(res.status, 200, 'GET / should answer with status 200.');
});
check('GET / sends the text Hello from Express', async () => {
  const res = await request(learner()).get('/');
  eq(res.text, 'Hello from Express');
});
