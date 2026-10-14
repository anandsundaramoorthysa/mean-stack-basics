function ageResult(text) {
  let args;
  learner().parseAge(text, (...a) => {
    args = a;
  });
  ok(args, 'parseAge never called its callback for ' + JSON.stringify(text) + '. Call callback(...) in every case.');
  return args;
}

check('parseAge("19") calls callback(null, 19)', () => {
  const [err, age] = ageResult('19');
  eq(err ?? null, null, 'On success the first argument must be null.');
  eq(age, 19, 'The second argument should be the number 19, not a string.');
});
check('parseAge("0") is allowed', () => {
  const [err, age] = ageResult('0');
  eq(err ?? null, null);
  eq(age, 0);
});
check('parseAge("abc") passes an Error with the message Invalid age', () => {
  const [err] = ageResult('abc');
  ok(err instanceof Error, 'Pass new Error("Invalid age") as the first argument.');
  eq(err.message, 'Invalid age');
});
check('Negative, decimal and empty ages are invalid', () => {
  for (const t of ['-5', '2.5', '']) {
    const [err] = ageResult(t);
    ok(err instanceof Error, JSON.stringify(t) + ' should be an invalid age.');
  }
});
check('safeReadJson resolves { ok: true, data } for a good file', async () => {
  eq(await learner().safeReadJson('good.json'), { ok: true, data: { name: 'Asha' } });
});
check('A missing file resolves { ok: false, error: "File not found" }', async () => {
  eq(await learner().safeReadJson('nothing.json'), { ok: false, error: 'File not found' }, 'Use err.code === "ENOENT" in the catch.');
});
check('Broken JSON resolves { ok: false, error: "Invalid JSON" }', async () => {
  eq(await learner().safeReadJson('bad.json'), { ok: false, error: 'Invalid JSON' }, 'Any other failure should give "Invalid JSON".');
});
