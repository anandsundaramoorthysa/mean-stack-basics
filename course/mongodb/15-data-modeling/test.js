const seed = { orders: [{ orderNo: 'Z001', customer: { name: 'Old', city: 'Salem' }, items: [] }] };
const added = () => mongo(seed).collection('orders').filter((o) => o.orderNo === 'A100');
check('One order A100 was inserted', () => {
  eq(added().length, 1, 'Insert exactly one document with orderNo "A100" using insertOne.');
});
check('The customer is an embedded object', () => {
  const o = added()[0];
  ok(o, 'Order A100 was not found.');
  eq(o.customer, { name: 'Asha', city: 'Madurai' }, 'customer should be an object: { name: "Asha", city: "Madurai" }.');
});
check('items is an array of two objects with sku, qty and price', () => {
  const o = added()[0];
  ok(o && Array.isArray(o.items), 'items should be an array.');
  eq(o.items, [{ sku: 'PEN', qty: 2, price: 10 }, { sku: 'BOOK', qty: 1, price: 50 }], 'items should hold PEN (qty 2, price 10) then BOOK (qty 1, price 50), with numbers not text.');
});
check('Only one new document was added', () => {
  eq(mongo(seed).collection('orders').length, 2, 'The collection started with one order, so it should now have two.');
});
