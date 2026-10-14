function typeName(v) {
  const f = learner().typeName;
  ok(typeof f === 'function', 'Export a function named typeName with module.exports = { typeName };');
  return f(v);
}
check('Numbers give \'number\'', () => {
  eq(typeName(42), 'number', 'typeName(42) should be \'number\'.');
  eq(typeName(3.5), 'number', 'typeName(3.5) should be \'number\'.');
});
check('Text gives \'string\'', () => eq(typeName('hello'), 'string', 'typeName(\'hello\') should be \'string\'.'));
check('true and false give \'boolean\'', () => {
  eq(typeName(true), 'boolean');
  eq(typeName(false), 'boolean');
});
check('undefined gives \'undefined\'', () => eq(typeName(undefined), 'undefined'));
check('null gives \'null\', not \'object\'', () => {
  eq(typeName(null), 'null', 'typeof null is \'object\', so test value === null before using typeof.');
});
