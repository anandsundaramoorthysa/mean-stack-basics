const EventEmitter = require('node:events');

check('setup returns { orders: [], opened: 0 } at the start', () => {
  const state = learner().setup(new EventEmitter());
  eq(state, { orders: [], opened: 0 });
});
check('Each order event adds the item to orders', () => {
  const e = new EventEmitter();
  const state = learner().setup(e);
  e.emit('order', 'tea');
  e.emit('order', 'samosa');
  eq(state.orders, ['tea', 'samosa'], 'Listen with emitter.on("order", ...) and push the item you receive.');
});
check('The first open event sets opened to 1', () => {
  const e = new EventEmitter();
  const state = learner().setup(e);
  e.emit('open');
  eq(state.opened, 1, 'Listen for "open" and add 1 to state.opened.');
});
check('A second open event is ignored (use once)', () => {
  const e = new EventEmitter();
  const state = learner().setup(e);
  e.emit('open');
  e.emit('open');
  e.emit('open');
  eq(state.opened, 1, 'The open listener should run only one time. Use emitter.once instead of emitter.on.');
});
check('Listeners are registered on the emitter that was passed in', () => {
  const e = new EventEmitter();
  learner().setup(e);
  eq(e.listenerCount('order'), 1, 'Add exactly one listener for "order".');
  eq(e.listenerCount('open'), 1, 'Add exactly one listener for "open".');
});
