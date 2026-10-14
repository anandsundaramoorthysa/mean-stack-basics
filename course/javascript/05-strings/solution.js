function greet(name) {
  return `Hello, ${name}! Your name has ${name.length} letters.`;
}

function shout(text) {
  return text.trim().toUpperCase() + '!';
}

module.exports = { greet, shout };
