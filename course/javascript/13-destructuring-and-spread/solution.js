function swap(pair) {
  const [a, b] = pair;
  return [b, a];
}

function fullName({ first, last }) {
  return first + ' ' + last;
}

function mergeLists(a, b) {
  return [...a, ...b];
}

function withMarks(student, marks) {
  return { ...student, marks };
}

module.exports = { swap, fullName, mergeLists, withMarks };
