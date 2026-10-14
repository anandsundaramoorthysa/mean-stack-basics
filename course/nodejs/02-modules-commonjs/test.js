check('The module exports average, isPassing and passMark', () => {
  const m = learner();
  ok(typeof m.average === 'function', 'average is not exported. Add it to module.exports.');
  ok(typeof m.isPassing === 'function', 'isPassing is not exported. Add it to module.exports.');
  ok('passMark' in m, 'passMark is not exported. Add it to module.exports.');
});
check('passMark is 40', () => eq(learner().passMark, 40));
check('average([60, 70, 80]) is 70', () => eq(learner().average([60, 70, 80]), 70, 'Add the marks and divide by how many there are.'));
check('average([]) is 0', () => eq(learner().average([]), 0, 'An empty array should give 0, not NaN.'));
check('isPassing is true from 40 upwards', () => {
  const { isPassing } = learner();
  eq(isPassing(40), true, '40 equals the pass mark, so it passes.');
  eq(isPassing(75), true);
});
check('isPassing is false below 40', () => eq(learner().isPassing(39), false));
