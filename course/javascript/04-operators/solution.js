function isEven(n) {
  return n % 2 === 0;
}

function canVote(age) {
  return age >= 18;
}

function isPassing(marks, attendance) {
  return marks >= 40 && attendance >= 75;
}

module.exports = { isEven, canVote, isPassing };
