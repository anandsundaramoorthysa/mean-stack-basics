function fn(name) {
  const f = learner()[name];
  ok(typeof f === 'function', `Export a function named ${name} with module.exports.`);
  return f;
}
check('square returns n times n', () => {
  eq(fn('square')(5), 25, 'square(5) should be 25. Did you use return?');
  eq(fn('square')(-3), 9);
  eq(fn('square')(0), 0);
});
check('average returns the mean of two numbers', () => {
  eq(fn('average')(4, 6), 5, 'average(4, 6) should be 5.');
  eq(fn('average')(1, 2), 1.5, 'average(1, 2) should be 1.5. Add first, then divide: (a + b) / 2.');
});
check('fullName joins first and last with one space', () => {
  eq(fn('fullName')('Asha', 'Rao'), 'Asha Rao');
  eq(fn('fullName')('A', 'B'), 'A B');
});
check('The functions return values instead of printing them', () => {
  learner();
  eq(printed().length, 0, 'Do not use console.log inside these functions. Use return.');
});
