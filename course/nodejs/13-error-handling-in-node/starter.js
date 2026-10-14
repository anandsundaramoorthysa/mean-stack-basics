const fs = require('node:fs/promises');

// Error-first callback: callback(null, age) or callback(new Error('Invalid age'))
function parseAge(text, callback) {
  // your code here
}

// Resolve to { ok: true, data } or { ok: false, error }. Never reject.
async function safeReadJson(file) {
  // your code here
}

module.exports = { parseAge, safeReadJson };
