const path = require('node:path');
const { average } = require('./grades.js');

function report(file, marks) {
  return path.basename(file) + ': ' + average(marks);
}

module.exports = { report };
