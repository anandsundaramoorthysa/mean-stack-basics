function wait(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

function checkAge(age) {
  return new Promise((resolve, reject) => {
    if (age >= 18) resolve('allowed');
    else reject(new Error('too young'));
  });
}

function describeAge(age) {
  return checkAge(age)
    .then(() => 'Welcome')
    .catch((error) => error.message);
}

module.exports = { wait, checkAge, describeAge };
