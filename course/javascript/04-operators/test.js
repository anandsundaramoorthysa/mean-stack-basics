function fn(name) {
  const f = learner()[name];
  ok(typeof f === 'function', `Export a function named ${name} with module.exports.`);
  return f;
}
check('isEven is true for even numbers', () => {
  eq(fn('isEven')(4), true, 'isEven(4) should be true.');
  eq(fn('isEven')(0), true, 'isEven(0) should be true.');
});
check('isEven is false for odd numbers', () => {
  eq(fn('isEven')(7), false, 'isEven(7) should be false.');
  eq(fn('isEven')(-3), false, 'isEven(-3) should be false. Remember n % 2 is -1 for negative odd numbers, which is not 0.');
});
check('canVote is true from age 18', () => {
  eq(fn('canVote')(18), true, 'canVote(18) should be true. Use >= so 18 counts.');
  eq(fn('canVote')(30), true);
});
check('canVote is false under 18', () => eq(fn('canVote')(17), false, 'canVote(17) should be false.'));
check('isPassing needs marks >= 40 and attendance >= 75', () => {
  const f = fn('isPassing');
  eq(f(40, 75), true, 'isPassing(40, 75) should be true (both limits are included).');
  eq(f(39, 90), false, 'isPassing(39, 90) should be false: marks are too low.');
  eq(f(80, 74), false, 'isPassing(80, 74) should be false: attendance is too low.');
});
check('The functions return booleans using ===', () => {
  eq(fn('isPassing')(50, 80), true);
  ok(!/[^=!<>]==[^=]/.test(source), 'Use === instead of ==.');
});
