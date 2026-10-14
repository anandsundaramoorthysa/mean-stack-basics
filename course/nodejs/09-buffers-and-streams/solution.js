// Return the size of the text in bytes (UTF-8).
function byteLength(text) {
  return Buffer.byteLength(text);
}

// Resolve to the number of non-empty lines in a readable stream.
async function countLines(stream) {
  let text = '';
  for await (const chunk of stream) {
    text += chunk.toString();
  }
  return text.split('\n').filter((line) => line.trim() !== '').length;
}

module.exports = { byteLength, countLines };
