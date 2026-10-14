check('POST /echo sends back the JSON body it received', async () => {
  const res = await request(learner()).post('/echo', { city: 'Pune', year: 2026 });
  eq(res.json, { city: 'Pune', year: 2026 }, 'Add app.use(express.json()) above your routes, then send req.body with res.json.');
});

check('POST /students answers with status 201', async () => {
  const res = await request(learner()).post('/students', { name: 'Asha', marks: 82 });
  eq(res.status, 201, 'POST /students should use res.status(201).');
});

check('The new student gets id 1 and keeps its name and marks', async () => {
  // The first POST above already created id 1, so look it up in the list.
  const list = await request(learner()).get('/students');
  eq(list.json[0], { id: 1, name: 'Asha', marks: 82 }, 'The first student should be { id: 1, name: "Asha", marks: 82 }.');
});

check('A second student gets the next id', async () => {
  const res = await request(learner()).post('/students', { name: 'Ravi', marks: 67 });
  eq(res.json, { id: 2, name: 'Ravi', marks: 67 }, 'Use students.length + 1 for the id before pushing.');
});

check('GET /students lists every student that was posted', async () => {
  const res = await request(learner()).get('/students');
  eq(res.json.map((s) => s.name), ['Asha', 'Ravi'], 'Push each new student into the students array.');
});
