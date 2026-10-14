// setup receives an EventEmitter and returns { orders: [], opened: 0 }.
function setup(emitter) {
  const state = { orders: [], opened: 0 };

  emitter.on('order', (item) => {
    state.orders.push(item);
  });
  emitter.once('open', () => {
    state.opened += 1;
  });

  return state;
}

module.exports = { setup };
