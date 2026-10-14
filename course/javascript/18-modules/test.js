check('The file exports a welcome function', () => {
  ok(typeof learner().welcome === 'function', 'Export welcome with module.exports = { welcome, VERSION }.');
});
check('welcome("Asha") uses shout from helpers.js', () => {
  eq(learner().welcome('Asha'), '** WELCOME, ASHA **', 'Call helpers.shout("welcome, " + name) and return its result.');
});
check('The file exports VERSION equal to 1', () => {
  eq(learner().VERSION, 1, 'Add VERSION to module.exports.');
});
check('The file uses require and module.exports', () => {
  learner();
  ok(/require\s*\(/.test(source) && /module\.exports/.test(source), 'Use require to load the helper and module.exports to share your code.');
});
