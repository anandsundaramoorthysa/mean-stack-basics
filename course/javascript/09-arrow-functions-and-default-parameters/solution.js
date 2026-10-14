const double = n => n * 2;
const add = (a, b) => a + b;
const greet = (name = 'friend') => 'Hello, ' + name + '!';
const power = (base, exponent = 2) => base ** exponent;

module.exports = { double, add, greet, power };
