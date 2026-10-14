function thrown(fn) {
  try {
    fn();
  } catch (e) {
    return e;
  }
  return null;
}

check('Clear cases: 90 is A, 65 is B, 50 is C, 10 is F', () => {
  const { gradeFor } = learner();
  eq(gradeFor(90), 'A');
  eq(gradeFor(65), 'B');
  eq(gradeFor(50), 'C');
  eq(gradeFor(10), 'F');
});
check('Boundary: 75 is an A', () => eq(learner().gradeFor(75), 'A', 'A mark of exactly 75 earns an A. Use >= instead of >.'));
check('Boundary: 74 is a B', () => eq(learner().gradeFor(74), 'B'));
check('Boundary: 60 is a B', () => eq(learner().gradeFor(60), 'B', 'A mark of exactly 60 earns a B. Use >= instead of >.'));
check('Boundary: 40 is a C and 39 is an F', () => {
  eq(learner().gradeFor(40), 'C', 'A mark of exactly 40 earns a C. Use >= instead of >.');
  eq(learner().gradeFor(39), 'F');
});
check('0 and 100 are valid marks', () => {
  eq(learner().gradeFor(0), 'F');
  eq(learner().gradeFor(100), 'A');
});
check('Marks below 0 or above 100 throw a RangeError', () => {
  const { gradeFor } = learner();
  for (const bad of [-1, 101]) {
    const e = thrown(() => gradeFor(bad));
    ok(e instanceof RangeError, `gradeFor(${bad}) should throw a RangeError.`);
    eq(e.message, 'Mark must be between 0 and 100');
  }
});
check('A value that is not a number throws a RangeError', () => {
  const { gradeFor } = learner();
  for (const bad of ['80', NaN, undefined]) {
    ok(thrown(() => gradeFor(bad)) instanceof RangeError, `gradeFor(${String(bad)}) should throw a RangeError.`);
  }
});
