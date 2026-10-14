function fn(name) {
  const f = learner()[name];
  ok(typeof f === 'function', `Export a function named ${name} with module.exports.`);
  return f;
}
check('largest finds the biggest number', () => {
  eq(fn('largest')([3, 9, 2]), 9);
  eq(fn('largest')([5]), 5);
});
check('largest works with negative numbers', () => {
  eq(fn('largest')([-8, -3, -20]), -3, 'Do not start the best value at 0; negative numbers would lose.');
});
check('largest of an empty array is undefined', () => eq(fn('largest')([]), undefined));
check('makeCallbacks returns three functions', () => {
  const cbs = fn('makeCallbacks')();
  ok(Array.isArray(cbs) && cbs.length === 3, 'Return an array with exactly three functions.');
  ok(cbs.every(f => typeof f === 'function'), 'Every item in the array must be a function.');
});
check('The callbacks return 0, 1 and 2', () => {
  const cbs = fn('makeCallbacks')();
  eq(cbs.map(f => f()), [0, 1, 2], 'Declare the loop counter with let so each round keeps its own i.');
});
check('The var keyword is not used', () => {
  ok(!/\bvar\b/.test(source), 'Use let or const instead of var.');
});
