const fs = require('node:fs/promises');

// Error-first callback: callback(null, age) or callback(new Error('Invalid age'))
function parseAge(text, callback) {
  const age = Number(text);
  if (String(text).trim() === '' || !Number.isInteger(age) || age < 0) {
    callback(new Error('Invalid age'));
    return;
  }
  callback(null, age);
}

// Resolve to { ok: true, data } or { ok: false, error }. Never reject.
async function safeReadJson(file) {
  try {
    const data = JSON.parse(await fs.readFile(file, 'utf8'));
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.code === 'ENOENT' ? 'File not found' : 'Invalid JSON' };
  }
}

module.exports = { parseAge, safeReadJson };
