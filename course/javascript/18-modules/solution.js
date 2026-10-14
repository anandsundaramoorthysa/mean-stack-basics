const path = require('path');

// helpers.js sits in the working folder. Normally you would write require('./helpers.js').
const helpers = require(path.join(process.cwd(), 'helpers.js'));

const VERSION = 1;

function welcome(name) {
  return helpers.shout('welcome, ' + name);
}

module.exports = { welcome, VERSION };
