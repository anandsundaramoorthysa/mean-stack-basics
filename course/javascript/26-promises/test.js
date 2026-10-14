function isPromise(p) {
  return p && typeof p.then === 'function';
}

check('wait returns a promise', () => {
  ok(isPromise(learner().wait(10, 'x')), 'wait should return a promise: return new Promise(...).');
});
check('wait fulfills with the value after the delay', async () => {
  const start = Date.now();
  const value = await learner().wait(40, 'hello');
  eq(value, 'hello', 'Call resolve(value) inside setTimeout.');
  ok(Date.now() - start >= 30, 'wait should really wait for ms milliseconds.');
});
check('checkAge(20) fulfills with "allowed"', async () => {
  const p = learner().checkAge(20);
  ok(isPromise(p), 'checkAge should return a promise.');
  eq(await p, 'allowed');
});
check('checkAge(18) is allowed (18 counts)', async () => {
  eq(await learner().checkAge(18), 'allowed');
});
check('checkAge(15) rejects with an Error "too young"', async () => {
  let error;
  try {
    await learner().checkAge(15);
  } catch (e) {
    error = e;
  }
  ok(error instanceof Error, 'Reject with new Error("too young") when age is below 18.');
  eq(error.message, 'too young');
});
check('describeAge(30) fulfills with "Welcome"', async () => {
  eq(await learner().describeAge(30), 'Welcome');
});
check('describeAge(10) fulfills with the error message', async () => {
  eq(await learner().describeAge(10), 'too young', 'Use .catch to turn the error into its message; the result must be fulfilled, not rejected.');
});
check('describeAge chains with then and catch', () => {
  learner();
  ok(/\.then\s*\(/.test(source) && /\.catch\s*\(/.test(source), 'Use .then(...) and .catch(...) on checkAge(age).');
});
