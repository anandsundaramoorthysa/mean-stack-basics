function roundTo2(n) {
  return Math.round(n * 100) / 100;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function daysBetween(a, b) {
  const ms = new Date(b) - new Date(a);
  return Math.round(ms / (24 * 60 * 60 * 1000));
}

function isWeekend(year, month, day) {
  const d = new Date(year, month - 1, day).getDay();
  return d === 0 || d === 6;
}

module.exports = { roundTo2, randomInt, daysBetween, isWeekend };
