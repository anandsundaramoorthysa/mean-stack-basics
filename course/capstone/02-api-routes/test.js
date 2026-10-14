const good = { name: 'Chitra', department: 'IT', marks: 67 };

check('GET /students answers 200 with an array', async () => {
  const res = await request(learner()).get('/students');
  eq(res.status, 200, 'GET /students should answer with status 200.');
  ok(Array.isArray(res.json), 'The body should be a JSON array. Use res.json(students).');
});
check('GET /students includes the starting students', async () => {
  const res = await request(learner()).get('/students');
  const names = (res.json || []).map((s) => s.name);
  ok(names.includes('Asha') && names.includes('Bala'), 'The list should contain Asha and Bala from the students array.');
});
check('POST /students answers 201 with the new student and an id', async () => {
  const res = await request(learner()).post('/students', good);
  eq(res.status, 201, 'A successful POST should answer with status 201.');
  ok(res.json && res.json.name === 'Chitra' && res.json.marks === 67, 'Send the new student back as JSON.');
  ok(res.json && typeof res.json.id === 'number', 'The new student needs a numeric id. Use nextId++.');
});
check('A POSTed student appears in GET /students', async () => {
  const app = learner();
  const before = (await request(app).get('/students')).json.length;
  await request(app).post('/students', { name: 'Dev', department: 'CSE', marks: 85 });
  const after = (await request(app).get('/students')).json;
  eq(after.length, before + 1, 'The array should grow by one after a valid POST.');
  ok(after.some((s) => s.name === 'Dev'), 'Dev should be in the list. Did you push into students?');
});
check('POST without a name answers 400', async () => {
  const res = await request(learner()).post('/students', { department: 'CSE', marks: 50 });
  eq(res.status, 400, 'A missing name should answer 400.');
});
check('POST with marks outside 0 to 100 or not a number answers 400', async () => {
  const app = learner();
  eq((await request(app).post('/students', { ...good, marks: 150 })).status, 400, 'marks 150 is too high, expected 400.');
  eq((await request(app).post('/students', { ...good, marks: -5 })).status, 400, 'marks -5 is too low, expected 400.');
  eq((await request(app).post('/students', { ...good, marks: 'high' })).status, 400, 'marks must be a number, expected 400.');
});
check('Invalid POSTs are not stored', async () => {
  const app = learner();
  const before = (await request(app).get('/students')).json.length;
  await request(app).post('/students', { name: '', department: 'CSE', marks: 50 });
  const after = (await request(app).get('/students')).json.length;
  eq(after, before, 'Return early with res.status(400) before pushing to the array.');
});
