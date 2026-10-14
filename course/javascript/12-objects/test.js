function fn(name) {
  const f = learner()[name];
  ok(typeof f === 'function', `Export a function named ${name} with module.exports.`);
  return f;
}
check('makeStudent returns name, marks and passed', () => {
  eq(fn('makeStudent')('Asha', 88), { name: 'Asha', marks: 88, passed: true });
});
check('makeStudent marks passed as false below 40', () => {
  eq(fn('makeStudent')('Ravi', 39), { name: 'Ravi', marks: 39, passed: false }, 'passed should be false for marks under 40.');
});
check('makeStudent counts exactly 40 as passed', () => {
  eq(fn('makeStudent')('Meena', 40).passed, true, 'Use marks >= 40 so 40 itself passes.');
});
check('getCity reads the nested city', () => {
  eq(fn('getCity')({ name: 'Ravi', address: { city: 'Pune', pin: '411001' } }), 'Pune');
  eq(fn('getCity')({ address: { city: 'Kochi' } }), 'Kochi');
});
check('getField reads the property named by the key variable', () => {
  const o = { name: 'Asha', marks: 88 };
  eq(fn('getField')(o, 'marks'), 88, 'Use obj[key] with square brackets.');
  eq(fn('getField')(o, 'name'), 'Asha');
  eq(fn('getField')(o, 'missing'), undefined);
});
check('countFields counts the properties', () => {
  eq(fn('countFields')({ a: 1, b: 2, c: 3 }), 3);
  eq(fn('countFields')({}), 0);
});
check('countFields uses Object.keys', () => {
  ok(/Object\.keys\s*\(/.test(source), 'Use Object.keys(obj).length.');
});
