function wait(ms, value) {
  // TODO: return a promise that fulfills with value after ms milliseconds
}

function checkAge(age) {
  // TODO: return a promise: 'allowed' if age >= 18, otherwise reject with new Error('too young')
}

function describeAge(age) {
  // TODO: use checkAge(age) with .then and .catch
  //       fulfill with 'Welcome' when allowed, or the error message when not
}

module.exports = { wait, checkAge, describeAge };
