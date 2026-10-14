function fn(name) {
  const f = learner()[name];
  ok(typeof f === 'function', `Export a function named ${name} with module.exports.`);
  return f;
}
check('lastItem returns the last item', () => {
  eq(fn('lastItem')([4, 8, 15]), 15);
  eq(fn('lastItem')(['a']), 'a');
});
check('lastItem of an empty array is undefined', () => {
  eq(fn('lastItem')([]), undefined, 'An empty array has no last item, so list[list.length - 1] gives undefined.');
});
check('addItem pushes onto the original array', () => {
  const list = [1, 2];
  fn('addItem')(list, 3);
  eq(list, [1, 2, 3], 'addItem should change the array you pass in, using push.');
});
check('addItem returns the new length', () => {
  eq(fn('addItem')(['x'], 'y'), 2, 'addItem should return the length after adding.');
});
check('removeLast pops and returns the last item', () => {
  const list = ['a', 'b', 'c'];
  eq(fn('removeLast')(list), 'c', 'removeLast should return the removed item.');
  eq(list, ['a', 'b'], 'The original array should be shorter afterwards.');
});
check('total adds up the numbers', () => {
  eq(fn('total')([10, 20, 30]), 60);
  eq(fn('total')([-5, 5, 7]), 7);
});
check('total of an empty array is 0', () => eq(fn('total')([]), 0));
