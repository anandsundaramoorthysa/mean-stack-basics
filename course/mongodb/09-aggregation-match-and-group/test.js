const seed = {
  orders: [
    { customer: 'Asha', status: 'paid', amount: 100 },
    { customer: 'Asha', status: 'paid', amount: 200 },
    { customer: 'Asha', status: 'pending', amount: 500 },
    { customer: 'Bala', status: 'paid', amount: 50 },
    { customer: 'Bala', status: 'paid', amount: 150 },
    { customer: 'Bala', status: 'cancelled', amount: 70 },
    { customer: 'Chitra', status: 'pending', amount: 300 },
    { customer: 'Chitra', status: 'paid', amount: 80 },
  ],
};
const rows = () => [...(mongo(seed).result || [])].sort((a, b) => String(a._id).localeCompare(String(b._id)));
check('There is one group per customer with paid orders', () => {
  eq(rows().map((r) => r._id), ['Asha', 'Bala', 'Chitra'], 'Group by "$customer" (with the dollar sign) after matching status "paid".');
});
check('total is the sum of the paid amounts', () => {
  eq(rows().map((r) => r.total), [300, 200, 80], 'Asha 100+200, Bala 50+150, Chitra 80. Pending and cancelled orders must not count: add a $match stage.');
});
check('average is the mean of the paid amounts', () => {
  eq(rows().map((r) => r.average), [150, 100, 80], 'Use { $avg: "$amount" } for average.');
});
check('orders counts the paid orders', () => {
  eq(rows().map((r) => r.orders), [2, 2, 1], 'Count with { $sum: 1 }.');
});
check('Still correct on different data (no hard-coded values)', () => {
  const other = { orders: [{ customer: 'Zoe', status: 'paid', amount: 10 }, { customer: 'Zoe', status: 'paid', amount: 30 }, { customer: 'Max', status: 'open', amount: 5 }] };
  eq(mongo(other).result, [{ _id: 'Zoe', total: 40, average: 20, orders: 2 }], 'Match paid orders, then group by "$customer".');
});
