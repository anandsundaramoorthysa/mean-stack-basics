const fs = require('node:fs');

check('wordCount returns a promise', () => {
  const r = learner().wordCount('story.txt');
  ok(r && typeof r.then === 'function', 'wordCount must be an async function that returns a promise.');
  return r.catch(() => undefined);
});
check('wordCount("story.txt") is 9', async () => {
  eq(await learner().wordCount('story.txt'), 9, 'Count every word on both lines of story.txt.');
});
check('wordCount works on another file', async () => {
  fs.writeFileSync('short.txt', '  one   two\n\nthree  ');
  eq(await learner().wordCount('short.txt'), 3, 'Extra spaces and blank lines must not count as words.');
});
check('readJson returns the parsed object', async () => {
  eq(await learner().readJson('config.json'), { port: 3000, name: 'demo' }, 'Use JSON.parse on the text you read.');
});
check('writeLines writes one line per item', async () => {
  await learner().writeLines('out.txt', ['alpha', 'beta', 'gamma']);
  eq(fs.readFileSync('out.txt', 'utf8'), 'alpha\nbeta\ngamma\n', 'Put a newline after every line, including the last. Did you await the write?');
});
check('writeLines replaces an existing file', async () => {
  await learner().writeLines('out.txt', ['one']);
  eq(fs.readFileSync('out.txt', 'utf8'), 'one\n');
});
