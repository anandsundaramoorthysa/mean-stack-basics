check('10, 20 and 5 give Total: 35', async () => {
  const r = await runScript({ stdin: '10\n20\n5\n' });
  ok(!r.timedOut, 'The program did not finish. Handle the "end" event of process.stdin.');
  eq(r.stdout.trim(), 'Total: 35', 'Add up the numbers and print Total: <sum> with console.log.');
});
check('It works for other numbers and a missing final newline', async () => {
  const r = await runScript({ stdin: '1.5\n2.5' });
  eq(r.stdout.trim(), 'Total: 4');
});
check('Empty lines are skipped', async () => {
  const r = await runScript({ stdin: '\n7\n\n3\n\n' });
  eq(r.stdout.trim(), 'Total: 10', 'Filter out empty lines before you convert to numbers.');
});
check('Success exits with code 0', async () => {
  const r = await runScript({ stdin: '4\n' });
  eq(r.code, 0, 'A successful run should exit with code 0.');
});
check('No input prints No numbers given on stderr', async () => {
  const r = await runScript({ stdin: '' });
  eq(r.stderr.trim(), 'No numbers given', 'Use console.error for the message.');
  eq(r.stdout.trim(), '', 'Nothing should be written to normal output when there are no numbers.');
});
check('No input exits with code 1', async () => {
  const r = await runScript({ stdin: '\n\n' });
  eq(r.code, 1, 'Set process.exitCode = 1 when there are no numbers.');
});
