const fs = require('node:fs/promises');

// Resolve to the number of words in a text file.
async function wordCount(file) {
  const text = await fs.readFile(file, 'utf8');
  return text.split(/\s+/).filter(Boolean).length;
}

// Resolve to the parsed contents of a JSON file.
async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

// Write each line to the file, followed by a newline.
async function writeLines(file, lines) {
  await fs.writeFile(file, lines.map((line) => line + '\n').join(''));
}

module.exports = { wordCount, readJson, writeLines };
