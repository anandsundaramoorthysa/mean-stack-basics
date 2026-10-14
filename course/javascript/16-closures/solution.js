function makeAdder(n) {
  return (x) => x + n;
}

function makeCounter(start = 0) {
  let count = start;
  return () => {
    count = count + 1;
    return count;
  };
}

module.exports = { makeAdder, makeCounter };
