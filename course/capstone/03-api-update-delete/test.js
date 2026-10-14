const change = { name: 'Bala K', department: 'ECE', marks: 80 };

check('PUT /students/2 answers 200 with the updated student', async () => {
  const res = await request(learner()).put('/students/2', change);
  eq(res.status, 200, 'A successful PUT should answer 200.');
  ok(res.json && res.json.name === 'Bala K' && res.json.marks === 80, 'Send the updated student back with res.json(student).');
  eq(res.json && res.json.id, 2, 'The id must stay 2.');
});
check('The change shows up in GET /students', async () => {
  const app = learner();
  await request(app).put('/students/1', { name: 'Asha', department: 'CSE', marks: 99 });
  const list = (await request(app).get('/students')).json;
  eq(list.find((s) => s.id === 1).marks, 99, 'Asha should now have 99 marks. Update the object inside the array.');
});
check('PUT for an unknown id answers 404', async () => {
  const res = await request(learner()).put('/students/999', change);
  eq(res.status, 404, 'No student has id 999, so answer 404.');
});
check('PUT with invalid marks answers 400', async () => {
  const res = await request(learner()).put('/students/2', { ...change, marks: 500 });
  eq(res.status, 400, 'marks 500 is invalid. Use validate(req.body) and answer 400.');
});
check('DELETE /students/3 answers 204 and removes the student', async () => {
  const app = learner();
  const res = await request(app).delete('/students/3');
  eq(res.status, 204, 'A successful DELETE should answer 204 (No Content). Use res.status(204).end().');
  const list = (await request(app).get('/students')).json;
  ok(!list.some((s) => s.id === 3), 'Student 3 should be gone from the array. Try splice.');
});
check('DELETE for an id that no longer exists answers 404', async () => {
  const app = learner();
  await request(app).delete('/students/1');
  const again = await request(app).delete('/students/1');
  eq(again.status, 404, 'Deleting the same student twice should answer 404 the second time.');
});
check('Other students are untouched by DELETE', async () => {
  const app = learner();
  const before = (await request(app).get('/students')).json.length;
  await request(app).delete('/students/2');
  const after = (await request(app).get('/students')).json.length;
  eq(after, before - 1, 'Exactly one student should be removed.');
});
