const hasError = (res) => res.json && typeof res.json.error === 'string' && res.json.error.length > 0;

check('A valid POST /students answers 201 with the new student', async () => {
  const res = await request(learner()).post('/students', { name: 'Ravi', marks: 67 });
  eq(res.status, 201, 'A valid student should be created with status 201.');
  eq(res.json, { id: 2, name: 'Ravi', marks: 67 }, 'Use nextId for the id and send the new student.');
});

check('A mark of 0 is accepted', async () => {
  const res = await request(learner()).post('/students', { name: 'Meena', marks: 0 });
  eq(res.status, 201, 'Marks of 0 are valid. Check typeof marks === "number", not just if (marks).');
});

check('A missing name gives 400 with an error message', async () => {
  const res = await request(learner()).post('/students', { marks: 50 });
  eq(res.status, 400, 'A student without a name should give status 400.');
  ok(hasError(res), 'Send JSON like { error: "name is required" }.');
});

check('An empty or blank name gives 400', async () => {
  const res = await request(learner()).post('/students', { name: '   ', marks: 50 });
  eq(res.status, 400, 'Use name.trim() === "" to catch names that are only spaces.');
});

check('Marks outside 0 to 100 give 400', async () => {
  const high = await request(learner()).post('/students', { name: 'Kiran', marks: 101 });
  eq(high.status, 400, 'Marks of 101 should give 400.');
  const low = await request(learner()).post('/students', { name: 'Kiran', marks: -1 });
  eq(low.status, 400, 'Marks of -1 should give 400.');
});

check('Marks that are text give 400', async () => {
  const res = await request(learner()).post('/students', { name: 'Kiran', marks: '80' });
  eq(res.status, 400, 'The string "80" is not a number. Check typeof marks === "number".');
});

check('A POST with no body at all gives 400 instead of crashing', async () => {
  const res = await request(learner()).post('/students', undefined, { 'content-type': 'application/json' });
  eq(res.status, 400, 'req.body is undefined here. Read it with req.body ?? {} before checking.');
});

check('Rejected students are not stored', async () => {
  const res = await request(learner()).get('/students');
  eq(res.json.map((s) => s.name), ['Asha', 'Ravi', 'Meena'], 'Only valid students should be added to the array.');
});

check('GET /students/2 sends that student', async () => {
  const res = await request(learner()).get('/students/2');
  eq(res.status, 200);
  eq(res.json.name, 'Ravi');
});

check('GET /students/99 gives 404 with an error message', async () => {
  const res = await request(learner()).get('/students/99');
  eq(res.status, 404, 'When find returns undefined, answer with status 404.');
  ok(hasError(res), 'Send JSON like { error: "Student not found" }.');
});

check('GET /students/abc gives 400', async () => {
  const res = await request(learner()).get('/students/abc');
  eq(res.status, 400, 'Number("abc") is NaN. Check Number.isNaN(id) and answer with 400.');
});
