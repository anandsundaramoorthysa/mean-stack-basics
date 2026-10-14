function fn(name) {
  const f = learner()[name];
  ok(typeof f === 'function', `Export a function named ${name} with module.exports.`);
  return f;
}
check('greet builds the full sentence', () => {
  eq(fn('greet')('Asha'), 'Hello, Asha! Your name has 4 letters.');
});
check('greet counts the letters of any name', () => {
  eq(fn('greet')('Venkatesh'), 'Hello, Venkatesh! Your name has 9 letters.', 'Use name.length for the number.');
});
check('greet uses a template literal', () => {
  ok(/`[^`]*\$\{[^}]+\}[^`]*`/.test(source), 'Write the sentence with backticks and ${ } placeholders.');
});
check('shout converts to upper case and adds !', () => {
  eq(fn('shout')('hello'), 'HELLO!');
});
check('shout removes spaces at both ends', () => {
  eq(fn('shout')('  hi there '), 'HI THERE!', 'Call trim() before adding the exclamation mark.');
});
