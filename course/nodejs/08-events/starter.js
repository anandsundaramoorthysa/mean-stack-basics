// setup receives an EventEmitter and returns { orders: [], opened: 0 }.
function setup(emitter) {
  const state = { orders: [], opened: 0 };

  // Listen for 'order' events and 'open' events here.

  return state;
}

module.exports = { setup };
