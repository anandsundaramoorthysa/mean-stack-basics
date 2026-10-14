function parseOrNull(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

function toPrettyJson(value) {
  return JSON.stringify(value, null, 2);
}

function copy(value) {
  return JSON.parse(JSON.stringify(value));
}

module.exports = { parseOrNull, toPrettyJson, copy };
