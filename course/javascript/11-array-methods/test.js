function fn(name) {
  const f = learner()[name];
  ok(typeof f === 'function', `Export a function named ${name} with module.exports.`);
  return f;
}
check('squares maps every number to its square', () => {
  eq(fn('squares')([1, 2, 3]), [1, 4, 9]);
  eq(fn('squares')([]), []);
});
check('passed keeps marks of 40 or more', () => {
  eq(fn('passed')([35, 80, 40, 12]), [80, 40], 'Keep 40 itself: use m >= 40.');
  eq(fn('passed')([10, 20]), []);
});
check('sum adds all numbers with a starting value', () => {
  eq(fn('sum')([1, 2, 3, 4]), 10);
  eq(fn('sum')([]), 0, 'Pass 0 as the second argument of reduce so an empty array gives 0.');
});
check('firstLong finds the first word longer than 5 letters', () => {
  eq(fn('firstLong')(['cat', 'elephant', 'giraffe']), 'elephant');
  eq(fn('firstLong')(['sixsix', 'abc']), 'sixsix');
});
check('firstLong returns undefined when nothing matches', () => {
  eq(fn('firstLong')(['hello', 'cat']), undefined, 'Five letters is not longer than 5.');
});
check('sortedNumbers sorts numerically', () => {
  eq(fn('sortedNumbers')([10, 9, 1, 100]), [1, 9, 10, 100], 'Use sort((a, b) => a - b); the default sort compares text.');
});
check('sortedNumbers does not change the original array', () => {
  const original = [3, 1, 2];
  fn('sortedNumbers')(original);
  eq(original, [3, 1, 2], 'sort changes the array it is called on. Copy it first with [...nums].');
});
check('The array methods are used instead of loops', () => {
  ok(/\.map\(/.test(source) && /\.filter\(/.test(source) && /\.reduce\(/.test(source) && /\.find\(/.test(source) && /\.sort\(/.test(source),
    'Use map, filter, reduce, find and sort.');
  ok(!/\bfor\s*\(/.test(source) && !/\bwhile\s*\(/.test(source), 'Do not use for or while loops here.');
});
