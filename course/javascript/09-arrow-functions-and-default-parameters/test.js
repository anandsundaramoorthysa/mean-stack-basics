function fn(name) {
  const f = learner()[name];
  ok(typeof f === 'function', `Export a function named ${name} with module.exports.`);
  return f;
}
check('double returns n * 2', () => {
  eq(fn('double')(21), 42);
  eq(fn('double')(-4), -8);
});
check('add returns a + b', () => {
  eq(fn('add')(2, 3), 5);
  eq(fn('add')(-1, 1), 0);
});
check('greet uses the given name', () => eq(fn('greet')('Asha'), 'Hello, Asha!'));
check('greet falls back to friend when no name is given', () => {
  eq(fn('greet')(), 'Hello, friend!', 'Give name a default: (name = \'friend\') => ...');
});
check('power uses the exponent when given', () => eq(fn('power')(2, 3), 8, 'power(2, 3) should be 8.'));
check('power squares by default', () => eq(fn('power')(5), 25, 'power(5) should be 25: the default exponent is 2.'));
check('The functions are written as arrow functions', () => {
  const arrows = (source.match(/=>/g) || []).length;
  ok(arrows >= 4, 'Use => for all four functions.');
  ok(!/\bfunction\b/.test(source.replace(/\/\/.*$/gm, '')), 'Write arrow functions instead of the function keyword.');
});
