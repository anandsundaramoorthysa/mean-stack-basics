check('roundTo2(3.14159) is 3.14', () => {
  near(learner().roundTo2(3.14159), 3.14, 'Multiply by 100, round, then divide by 100.');
});
check('roundTo2 rounds up when needed', () => {
  near(learner().roundTo2(2.678), 2.68);
});
check('randomInt gives the smallest value when Math.random is 0', () => {
  const real = Math.random;
  Math.random = () => 0;
  try {
    eq(learner().randomInt(3, 8), 3);
  } finally {
    Math.random = real;
  }
});
check('randomInt can give the largest value (max is included)', () => {
  const real = Math.random;
  Math.random = () => 0.999999;
  try {
    eq(learner().randomInt(3, 8), 8, 'max must be possible: multiply by (max - min + 1).');
  } finally {
    Math.random = real;
  }
});
check('randomInt always gives whole numbers inside the range', () => {
  const { randomInt } = learner();
  for (let i = 0; i < 200; i++) {
    const n = randomInt(1, 6);
    ok(Number.isInteger(n) && n >= 1 && n <= 6, `randomInt(1, 6) returned ${n}.`);
  }
});
check('daysBetween counts whole days', () => {
  const { daysBetween } = learner();
  eq(daysBetween('2026-01-01', '2026-01-10'), 9);
  eq(daysBetween('2026-02-27', '2026-03-02'), 3);
});
check('daysBetween is negative when b is before a', () => {
  eq(learner().daysBetween('2026-01-10', '2026-01-01'), -9);
});
check('isWeekend knows Saturday, Sunday and weekdays', () => {
  const { isWeekend } = learner();
  eq(isWeekend(2026, 1, 3), true, '3 January 2026 is a Saturday.');
  eq(isWeekend(2026, 1, 4), true, '4 January 2026 is a Sunday.');
  eq(isWeekend(2026, 1, 5), false, '5 January 2026 is a Monday. Remember the month is 1-12 for you but 0-11 for Date.');
});
