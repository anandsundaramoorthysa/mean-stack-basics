check('GET /greet/Asha sends Hello, Asha!', async () => {
  const res = await request(learner()).get('/greet/Asha');
  eq(res.status, 200, 'The route /greet/:name should answer with status 200.');
  eq(res.text, 'Hello, Asha!');
});

check('The greeting uses whatever name is in the URL', async () => {
  const res = await request(learner()).get('/greet/Ravi');
  eq(res.text, 'Hello, Ravi!', 'The name must come from req.params.name, not be fixed text.');
});

check('GET /users/2 sends the user Ravi as JSON', async () => {
  const res = await request(learner()).get('/users/2');
  eq(res.json, { id: 2, name: 'Ravi' }, 'Find the user whose id equals Number(req.params.id) and send it with res.json.');
});

check('GET /users/3 sends a different user', async () => {
  const res = await request(learner()).get('/users/3');
  eq(res.json, { id: 3, name: 'Meena' });
});

check('GET /courses/html/lessons/3 sends the course and lesson', async () => {
  const res = await request(learner()).get('/courses/html/lessons/3');
  eq(res.text, 'Course html, lesson 3', 'Use two parameters, :course and :lesson, in one path.');
});
