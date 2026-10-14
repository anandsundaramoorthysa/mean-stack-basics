const path = require('node:path');

// Return the path reports/<student>.txt
function reportPath(student) {
  return path.join('reports', student + '.txt');
}

// Return { name, ext, folder } for a file path.
function fileInfo(file) {
  return {
    name: path.basename(file),
    ext: path.extname(file),
    folder: path.basename(path.dirname(file)),
  };
}

// Return the absolute version of a path.
function absolute(file) {
  return path.resolve(file);
}

module.exports = { reportPath, fileInfo, absolute };
