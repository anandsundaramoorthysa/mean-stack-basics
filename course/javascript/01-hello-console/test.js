check('Prints two lines', () => {
  learner();
  eq(printed().length, 2, 'Your program should print exactly 2 lines.');
});
check('The first line is Hello, MEAN!', () => {
  learner();
  eq(printed()[0], 'Hello, MEAN!');
});
check('The second line is 42, calculated with 6 * 7', () => {
  learner();
  eq(printed()[1], '42');
  ok(/6\s*\*\s*7/.test(source), 'Let JavaScript calculate it: write 6 * 7 inside console.log.');
});
