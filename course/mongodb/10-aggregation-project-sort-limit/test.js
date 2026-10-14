const seed = {
  products: [
    { name: 'Watch', category: 'gadget', price: 300 },
    { name: 'Novel', category: 'book', price: 20 },
    { name: 'Laptop', category: 'gadget', price: 800 },
    { name: 'Earbuds', category: 'gadget', price: 100 },
    { name: 'Atlas', category: 'book', price: 900 },
    { name: 'Phone', category: 'gadget', price: 600 },
    { name: 'Tablet', category: 'gadget', price: 450 },
  ],
};
const rows = () => mongo(seed).result || [];
check('Returns two products in order: Phone then Tablet', () => {
  eq(rows().map((r) => r.name), ['Phone', 'Tablet'], 'Match gadgets, sort price descending, skip 1, limit 2. (Atlas is a book, so it must not appear.)');
});
check('Each product has name and price', () => {
  eq(rows().map((r) => r.price), [600, 450], 'Keep name and price in $project.');
});
check('priceWithDelivery is price + 50', () => {
  eq(rows().map((r) => r.priceWithDelivery), [650, 500], 'Use priceWithDelivery: { $add: ["$price", 50] }.');
});
check('The output has no _id and no category', () => {
  for (const r of rows()) {
    eq(Object.keys(r).sort(), ['name', 'price', 'priceWithDelivery'], 'Output only name, price and priceWithDelivery. Hide _id with _id: 0.');
  }
});
check('Still correct on different data (no hard-coded values)', () => {
  const other = { products: [10, 20, 30, 40].map((p, i) => ({ name: 'g' + i, category: 'gadget', price: p })).concat([{ name: 'b', category: 'book', price: 99 }]) };
  eq((mongo(other).result || []).map((r) => r.price + ':' + r.priceWithDelivery), ['30:80', '20:70'], 'Match gadgets, sort price descending, skip 1, limit 2.');
});
