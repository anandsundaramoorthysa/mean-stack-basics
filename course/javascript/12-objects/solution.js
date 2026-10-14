function makeStudent(name, marks) {
  return { name: name, marks: marks, passed: marks >= 40 };
}

function getCity(student) {
  return student.address.city;
}

function getField(obj, key) {
  return obj[key];
}

function countFields(obj) {
  return Object.keys(obj).length;
}

module.exports = { makeStudent, getCity, getField, countFields };
