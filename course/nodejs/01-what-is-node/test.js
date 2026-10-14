check('A name is greeted: node greet.js Asha prints Hello, Asha!', async () => {
  const r = await runScript({ args: ['Asha'] });
  ok(!r.stderr.trim(), 'Your program crashed: ' + r.stderr.trim().split('\n').slice(-1)[0]);
  eq(r.stdout.trim(), 'Hello, Asha!', 'Use the first argument, process.argv[2].');
});
check('Another name works too (nothing is hard-coded)', async () => {
  const r = await runScript({ args: ['Ravi'] });
  eq(r.stdout.trim(), 'Hello, Ravi!', 'Read the name from process.argv[2] instead of typing it in the code.');
});
check('Without a name it prints Hello, stranger!', async () => {
  const r = await runScript();
  eq(r.stdout.trim(), 'Hello, stranger!', 'When process.argv[2] is undefined, use the word stranger.');
});
check('It prints exactly one line', async () => {
  const r = await runScript({ args: ['Meena'] });
  eq(r.stdout.trim().split('\n').length, 1, 'Print only one line.');
});
