function isPhone(text) {
  return /^\d{10}$/.test(text);
}

function findNumbers(text) {
  return (text.match(/\d+/g) ?? []).map(Number);
}

function isCollegeEmail(text) {
  return /^[\w.]+@college\.edu$/.test(text);
}

function cleanSpaces(text) {
  return text.replace(/\s+/g, ' ').trim();
}

module.exports = { isPhone, findNumbers, isCollegeEmail, cleanSpaces };
