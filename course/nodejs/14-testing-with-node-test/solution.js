// Turn a mark out of 100 into a letter grade.
function gradeFor(mark) {
  if (typeof mark !== 'number' || Number.isNaN(mark) || mark < 0 || mark > 100) {
    throw new RangeError('Mark must be between 0 and 100');
  }
  if (mark >= 75) return 'A';
  if (mark >= 60) return 'B';
  if (mark >= 40) return 'C';
  return 'F';
}

module.exports = { gradeFor };
