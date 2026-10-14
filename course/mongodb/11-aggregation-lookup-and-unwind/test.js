const seed = {
  customers: [
    { _id: 1, name: 'Asha', city: 'Madurai' },
    { _id: 2, name: 'Bala', city: 'Salem' },
    { _id: 3, name: 'Chitra', city: 'Erode' },
  ],
  orders: [
    { item: 'Book', customerId: 1 },
    { item: 'Pen', customerId: 2 },
    { item: 'Lamp', customerId: 1 },
    { item: 'Ghost', customerId: 99 },
    { item: 'Bag', customerId: 3 },
  ],
};
const rows = () => [...(mongo(seed).result || [])].sort((a, b) => String(a.item).localeCompare(String(b.item)));
check('Each order is paired with the right customer name', () => {
  eq(
    rows().map((r) => [r.item, r.customerName]),
    [['Bag', 'Chitra'], ['Book', 'Asha'], ['Lamp', 'Asha'], ['Pen', 'Bala']],
    'Join orders to customers with $lookup (localField customerId, foreignField _id), then $unwind and project customerName from "$customer.name".'
  );
});
check('The order with an unknown customer is left out', () => {
  ok(!rows().some((r) => r.item === 'Ghost'), 'After $unwind the "Ghost" order has no customer, so it should disappear.');
});
check('Only item and customerName are returned', () => {
  for (const r of rows()) {
    eq(Object.keys(r).sort(), ['customerName', 'item'], 'Project only item and customerName, with _id: 0.');
  }
});
check('Still correct on different data (no hard-coded values)', () => {
  const other = { customers: [{ _id: 7, name: 'Kim' }], orders: [{ item: 'Cup', customerId: 7 }, { item: 'Mug', customerId: 8 }] };
  eq(mongo(other).result, [{ item: 'Cup', customerName: 'Kim' }], 'Join with $lookup and read the name from "$customer.name".');
});
