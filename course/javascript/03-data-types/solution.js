function typeName(value) {
  if (value === null) {
    return 'null';
  }
  return typeof value;
}

module.exports = { typeName };
