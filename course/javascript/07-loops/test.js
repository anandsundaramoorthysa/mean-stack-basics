function fn(name) {
  const f = learner()[name];
  ok(typeof f === 'function', `Export a function named ${name} with module.exports.`);
  return f;
}
check('sumTo adds the numbers from 1 to n', () => {
  eq(fn('sumTo')(5), 15, 'sumTo(5) should be 1+2+3+4+5 = 15.');
  eq(fn('sumTo')(100), 5050);
});
check('sumTo(0) is 0', () => eq(fn('sumTo')(0), 0, 'With n = 0 the loop should not run, so the total stays 0.'));
check('sumTo uses a for loop', () => ok(/for\s*\(/.test(source), 'Use a for loop in sumTo.'));
check('countdown counts down to 1', () => {
  eq(fn('countdown')(3), [3, 2, 1], 'countdown(3) should be [3, 2, 1].');
  eq(fn('countdown')(1), [1]);
});
check('countdown(0) is an empty array', () => eq(fn('countdown')(0), []));
check('countdown uses a while loop', () => ok(/while\s*\(/.test(source), 'Use a while loop in countdown.'));
check('firstSquareOver finds the first square above the limit', () => {
  eq(fn('firstSquareOver')(10), 4, '4 * 4 = 16 is the first square greater than 10.');
  eq(fn('firstSquareOver')(16), 5, 'The square must be greater than the limit, so 16 is not enough.');
  eq(fn('firstSquareOver')(0), 1);
});
check('firstSquareOver stops with break', () => ok(/\bbreak\b/.test(source), 'Use break to leave the loop once you find the number.'));
