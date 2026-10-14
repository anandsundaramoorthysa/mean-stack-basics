function fn(name) {
  const f = learner()[name];
  ok(typeof f === 'function', `Export a function named ${name} with module.exports.`);
  return f;
}
function messageOf(f, ...args) {
  try {
    f(...args);
  } catch (e) {
    return e instanceof Error ? e.message : 'not an Error: ' + String(e);
  }
  return undefined;
}
check('safeParse returns the parsed object for valid JSON', () => {
  eq(fn('safeParse')('{"a":1,"b":[2,3]}'), { a: 1, b: [2, 3] });
  eq(fn('safeParse')('42'), 42);
});
check('safeParse returns null for invalid JSON instead of crashing', () => {
  let result;
  try {
    result = fn('safeParse')('{oops');
  } catch (e) {
    throw new Error('safeParse crashed with "' + e.message + '". Wrap JSON.parse in try/catch.');
  }
  eq(result, null, 'Return null from the catch block.');
});
check('safeParse handles empty text', () => eq(fn('safeParse')(''), null));
check('safeParse uses try and catch', () => {
  ok(/try\s*\{/.test(source) && /catch\s*(\(|\{)/.test(source), 'Use try { ... } catch (error) { ... }.');
});
check('withdraw subtracts the amount', () => {
  eq(fn('withdraw')(100, 30), 70);
  eq(fn('withdraw')(50, 50), 0, 'Withdrawing the exact balance is allowed.');
});
check('withdraw throws Insufficient funds when amount is too large', () => {
  eq(messageOf(fn('withdraw'), 100, 150), 'Insufficient funds', 'withdraw(100, 150) should throw new Error(\'Insufficient funds\').');
});
check('withdraw throws Amount must be positive for zero or negative amounts', () => {
  eq(messageOf(fn('withdraw'), 100, 0), 'Amount must be positive');
  eq(messageOf(fn('withdraw'), 100, -5), 'Amount must be positive');
});
