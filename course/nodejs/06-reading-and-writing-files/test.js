const fs = require('node:fs');

function summaryLines() {
  ok(fs.existsSync('summary.txt'), 'summary.txt was not created. Use fs.writeFileSync(\'summary.txt\', ...).');
  return fs.readFileSync('summary.txt', 'utf8').trim().split(/\r?\n/);
}

check('Your program runs without errors', async () => {
  const r = await runScript();
  ok(!r.timedOut, 'The program did not finish in time.');
  ok(!r.stderr.trim(), 'Your program crashed: ' + r.stderr.trim().split('\n').slice(-1)[0]);
});
check('summary.txt has three lines', async () => {
  fs.rmSync('summary.txt', { force: true });
  await runScript();
  eq(summaryLines().length, 3, 'summary.txt should have exactly three lines: Students, Average and Top.');
});
check('Students: 3', async () => {
  eq(summaryLines()[0], 'Students: 3', 'Count the non-empty lines of marks.txt.');
});
check('Average: 80', async () => {
  eq(summaryLines()[1], 'Average: 80', 'Add all marks (82 + 67 + 91) and divide by the number of students.');
});
check('Top: Meena', async () => {
  eq(summaryLines()[2], 'Top: Meena', 'Find the name with the highest mark.');
});
check('It works for a different marks.txt (nothing is hard-coded)', async () => {
  fs.writeFileSync('marks.txt', 'Kiran,50\nLata,70\n');
  fs.rmSync('summary.txt', { force: true });
  await runScript();
  eq(summaryLines(), ['Students: 2', 'Average: 60', 'Top: Lata'], 'Read the numbers from marks.txt instead of typing them in the code.');
});
