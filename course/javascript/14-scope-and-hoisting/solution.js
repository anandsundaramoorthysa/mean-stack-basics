function largest(numbers) {
  let best;
  for (const n of numbers) {
    if (best === undefined || n > best) {
      best = n;
    }
  }
  return best;
}

function makeCallbacks() {
  const callbacks = [];
  for (let i = 0; i < 3; i++) {
    callbacks.push(() => i);
  }
  return callbacks;
}

module.exports = { largest, makeCallbacks };
