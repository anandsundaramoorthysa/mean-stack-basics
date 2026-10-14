const later = (value, ms = 20) => () => new Promise((resolve) => setTimeout(() => resolve(value), ms));
const failing = () => Promise.reject(new Error('network down'));

check('addAsync adds the two loaded numbers', async () => {
  eq(await learner().addAsync(later(20), later(22)), 42, 'await both loaders, then return a + b.');
});
check('addAsync returns a promise', () => {
  const result = learner().addAsync(later(1), later(2));
  ok(result && typeof result.then === 'function', 'Declare the function with the async keyword.');
});
check('safeLoad returns the loaded value on success', async () => {
  eq(await learner().safeLoad(later('Asha'), 'nobody'), 'Asha');
});
check('safeLoad returns the fallback when the loader rejects', async () => {
  eq(await learner().safeLoad(failing, 'nobody'), 'nobody', 'Wrap await load() in try...catch and return the fallback in catch.');
});
check('loadAll gathers the results in order', async () => {
  eq(await learner().loadAll([later('a', 40), later('b', 5), later('c', 20)]), ['a', 'b', 'c']);
});
check('loadAll runs the loaders at the same time', async () => {
  const start = Date.now();
  await learner().loadAll([later(1, 100), later(2, 100), later(3, 100)]);
  ok(Date.now() - start < 250, 'The three loaders take 100 ms each. Use Promise.all so they run together instead of one after another.');
});
check('The code uses async and await', () => {
  learner();
  ok(/async\s+function/.test(source) && /await\s/.test(source), 'Write async functions and use await inside them.');
});
