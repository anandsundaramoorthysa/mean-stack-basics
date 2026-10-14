function lastItem(list) {
  return list[list.length - 1];
}

function addItem(list, item) {
  list.push(item);
  return list.length;
}

function removeLast(list) {
  return list.pop();
}

function total(numbers) {
  let sum = 0;
  for (const n of numbers) {
    sum += n;
  }
  return sum;
}

module.exports = { lastItem, addItem, removeLast, total };
