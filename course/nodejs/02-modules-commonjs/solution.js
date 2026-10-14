const passMark = 40;

// Return the average of an array of numbers (0 for an empty array).
function average(marks) {
  if (marks.length === 0) return 0;
  return marks.reduce((sum, m) => sum + m, 0) / marks.length;
}

// Return true when mark is at least passMark.
function isPassing(mark) {
  return mark >= passMark;
}

module.exports = { average, isPassing, passMark };
