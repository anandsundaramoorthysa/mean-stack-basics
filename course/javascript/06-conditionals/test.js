function fn(name) {
  const f = learner()[name];
  ok(typeof f === 'function', `Export a function named ${name} with module.exports.`);
  return f;
}
check('grade gives A from 80', () => {
  eq(fn('grade')(80), 'A', 'grade(80) should be \'A\' (80 itself counts).');
  eq(fn('grade')(100), 'A');
});
check('grade gives B from 60 to 79', () => {
  eq(fn('grade')(79), 'B');
  eq(fn('grade')(60), 'B', 'grade(60) should be \'B\'.');
});
check('grade gives C from 40 to 59', () => {
  eq(fn('grade')(59), 'C');
  eq(fn('grade')(40), 'C', 'grade(40) should be \'C\'.');
});
check('grade gives F below 40', () => {
  eq(fn('grade')(39), 'F');
  eq(fn('grade')(0), 'F');
});
check('dayType returns weekend for saturday and sunday', () => {
  eq(fn('dayType')('saturday'), 'weekend');
  eq(fn('dayType')('sunday'), 'weekend');
});
check('dayType returns weekday for other days', () => {
  eq(fn('dayType')('monday'), 'weekday');
  eq(fn('dayType')('friday'), 'weekday');
});
check('dayType is written with a switch', () => {
  ok(/switch\s*\(/.test(source), 'Use a switch statement in dayType.');
});
check('displayName keeps a real name', () => eq(fn('displayName')('Asha'), 'Asha'));
check('displayName gives Guest for falsy values', () => {
  eq(fn('displayName')(''), 'Guest', 'An empty string is falsy.');
  eq(fn('displayName')(null), 'Guest');
  eq(fn('displayName')(undefined), 'Guest');
});
