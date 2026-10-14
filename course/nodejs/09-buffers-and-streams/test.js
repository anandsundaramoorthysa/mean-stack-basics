const { Readable } = require('node:stream');

check('byteLength("hello") is 5', () => eq(learner().byteLength('hello'), 5));
check('byteLength counts bytes, not characters ("héllo" is 6)', () => {
  eq(learner().byteLength('héllo'), 6, 'Use Buffer.byteLength(text). text.length counts characters, not bytes.');
});
check('countLines counts the lines of a stream of strings', async () => {
  const r = await learner().countLines(Readable.from(['one\ntwo\n', 'three\n']));
  eq(r, 3, 'Count the lines in all chunks together.');
});
check('countLines ignores empty lines', async () => {
  const r = await learner().countLines(Readable.from(['a\n\n\nb\n\n']));
  eq(r, 2, 'Blank lines should not be counted.');
});
check('A line cut between two chunks is counted once', async () => {
  const r = await learner().countLines(Readable.from(['ab\ncd', 'e\nfg']));
  eq(r, 3, 'The lines are ab, cde and fg. Join the chunks before you split into lines.');
});
check('countLines also accepts Buffer chunks', async () => {
  const r = await learner().countLines(Readable.from([Buffer.from('x\ny'), Buffer.from('\nz\n')]));
  eq(r, 3, 'Convert each chunk with chunk.toString() before you add it to your text.');
});
