function fn(name) {
  const f = learner()[name];
  ok(typeof f === 'function', `Export a function named ${name} with module.exports.`);
  return f;
}
check('swap exchanges the two items', () => {
  eq(fn('swap')([1, 2]), [2, 1]);
  eq(fn('swap')(['x', 'y']), ['y', 'x']);
});
check('swap uses array destructuring', () => {
  ok(/\[\s*\w+\s*,\s*\w+\s*\]\s*=/.test(source), 'Write something like: const [a, b] = pair;');
});
check('fullName joins first and last', () => {
  eq(fn('fullName')({ first: 'Asha', last: 'Rao' }), 'Asha Rao');
});
check('fullName destructures in the parameter list', () => {
  ok(/(function\s*\w*\s*\(|=\s*\()\s*\{[^}]*\bfirst\b[^}]*\}\s*\)/.test(source) || /fullName\s*\(\s*\{/.test(source) || /\(\s*\{\s*first\s*,\s*last\s*\}\s*\)/.test(source),
    'Write the parameter as ({ first, last }).');
});
check('mergeLists joins two arrays', () => {
  eq(fn('mergeLists')([1, 2], [3]), [1, 2, 3]);
  eq(fn('mergeLists')([], []), []);
});
check('mergeLists leaves the inputs unchanged', () => {
  const a = [1];
  const b = [2];
  fn('mergeLists')(a, b);
  eq(a, [1], 'Do not push into a. Build a new array with [...a, ...b].');
  eq(b, [2]);
});
check('withMarks returns a copy with the new marks', () => {
  eq(fn('withMarks')({ name: 'Asha', marks: 50 }, 90), { name: 'Asha', marks: 90 }, 'The new marks should replace the old ones.');
  eq(fn('withMarks')({ name: 'Ravi' }, 70), { name: 'Ravi', marks: 70 });
});
check('withMarks does not change the original student', () => {
  const s = { name: 'Asha', marks: 50 };
  const result = fn('withMarks')(s, 90);
  eq(s, { name: 'Asha', marks: 50 }, 'Do not assign to student.marks. Return { ...student, marks }.');
  ok(result !== s, 'Return a new object.');
});
