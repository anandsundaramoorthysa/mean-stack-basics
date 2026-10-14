// Turn a mark out of 100 into a letter grade.
// This version has bugs. Fix it using the rules in the task.
function gradeFor(mark) {
  if (mark > 75) return 'A';
  if (mark > 60) return 'B';
  if (mark > 40) return 'C';
  return 'F';
}

module.exports = { gradeFor };
