check('makeAdder(5) returns a function', () => {
  ok(typeof learner().makeAdder(5) === 'function', 'makeAdder(5) should return a function. Did you forget the return?');
});
check('makeAdder(5)(3) is 8', () => {
  const add5 = learner().makeAdder(5);
  eq(add5(3), 8, 'The returned function should add 5 to its argument.');
});
check('Two adders remember different numbers', () => {
  const { makeAdder } = learner();
  const add1 = makeAdder(1);
  const add10 = makeAdder(10);
  eq([add1(1), add10(1)], [2, 11]);
});
check('A counter returns 1, 2, 3 on successive calls', () => {
  const next = learner().makeCounter();
  eq([next(), next(), next()], [1, 2, 3], 'Each call should add 1 to the hidden number.');
});
check('makeCounter(10) continues from 11', () => {
  const next = learner().makeCounter(10);
  eq(next(), 11);
});
check('Two counters do not share their number', () => {
  const { makeCounter } = learner();
  const a = makeCounter();
  const b = makeCounter();
  a();
  a();
  eq(b(), 1, 'Create the hidden variable inside makeCounter so each counter gets its own.');
});
check('The count is private, not a property', () => {
  const next = learner().makeCounter();
  next();
  ok(next.count === undefined && Object.keys(next).length === 0, 'Keep the number in a normal variable, not as a property of the function.');
});
