function sumTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

function countdown(n) {
  const result = [];
  while (n >= 1) {
    result.push(n);
    n--;
  }
  return result;
}

function firstSquareOver(limit) {
  let i = 1;
  while (true) {
    if (i * i > limit) {
      break;
    }
    i++;
  }
  return i;
}

module.exports = { sumTo, countdown, firstSquareOver };
