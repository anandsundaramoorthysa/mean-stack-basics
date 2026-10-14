const seed = {
  orders: [
    { item: 'Book', city: 'Madurai', status: 'shipped' },
    { item: 'Pen', city: 'Salem', status: 'shipped' },
    { item: 'Bag', city: 'Madurai', status: 'shipped' },
    { item: 'Lamp', city: 'Erode', status: 'pending' },
    { item: 'Desk', city: 'Chennai', status: 'cancelled' },
    { item: 'Cup', city: 'Salem', status: 'shipped' },
    { item: 'Shoes', city: 'Erode', status: 'shipped' },
  ],
};
const res = () => mongo(seed).result;
check('The result is an array with two values', () => {
  const r = res();
  ok(Array.isArray(r) && r.length === 2, 'End the file with [count, cities], an array of two values.');
});
check('The first value counts only shipped orders (5)', () => {
  eq((res() || [])[0], 5, 'Count the orders with status "shipped". There are 5 of them.');
});
check('The second value lists each shipped city once', () => {
  const c = (res() || [])[1];
  ok(Array.isArray(c), 'The second value should be an array of cities.');
  eq([...c].sort(), ['Erode', 'Madurai', 'Salem'], 'Use distinct("city", { status: "shipped" }). Chennai only has a cancelled order, and each city must appear once.');
});
check('Still correct on different data (no hard-coded values)', () => {
  const other = { orders: [
    { item: 'a', city: 'Goa', status: 'shipped' }, { item: 'b', city: 'Goa', status: 'shipped' },
    { item: 'c', city: 'Pune', status: 'pending' },
  ] };
  const r = mongo(other).result || [];
  eq(r[0], 2, 'Count only the shipped orders.');
  eq(r[1], ['Goa'], 'List only the cities of shipped orders.');
});
