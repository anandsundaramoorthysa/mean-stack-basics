const seed = {
  sales: [
    { region: 'North', rep: 'Asha', product: 'Laptop', amount: 800 },
    { region: 'North', rep: 'Bala', product: 'Phone', amount: 300 },
    { region: 'North', rep: 'Chitra', product: 'Laptop', amount: 500 },
    { region: 'South', rep: 'Dev', product: 'Tablet', amount: 400 },
    { region: 'South', rep: 'Esha', product: 'Phone', amount: 700 },
    { region: 'South', rep: 'Farid', product: 'Phone', amount: 100 },
  ],
};
const rows = () => [...(mongo(seed).result || [])].sort((a, b) => String(a._id).localeCompare(String(b._id)));
check('There is one group per region', () => {
  eq(rows().map((r) => r._id), ['North', 'South'], 'Group by "$region".');
});
check('lowest and highest are the smallest and largest amounts', () => {
  eq(rows().map((r) => [r.lowest, r.highest]), [[300, 800], [100, 700]], 'Use $min and $max on "$amount".');
});
check('topRep is the rep with the largest sale', () => {
  eq(rows().map((r) => r.topRep), ['Asha', 'Esha'], 'Sort by amount ascending first, then use $last on "$rep".');
});
check('reps lists every rep in sorted order of amount', () => {
  eq(rows().map((r) => r.reps), [['Bala', 'Chitra', 'Asha'], ['Farid', 'Dev', 'Esha']], 'Use $push on "$rep" after the $sort stage.');
});
check('products lists each product once', () => {
  eq(rows().map((r) => [...(r.products || [])].sort()), [['Laptop', 'Phone'], ['Phone', 'Tablet']], 'Use $addToSet on "$product" so duplicates are removed.');
});
check('Still correct on different data (no hard-coded values)', () => {
  const other = { sales: [
    { region: 'East', rep: 'A', product: 'p', amount: 5 },
    { region: 'East', rep: 'B', product: 'p', amount: 9 },
  ] };
  const r = mongo(other).result || [];
  eq(r.length, 1, 'One group for East.');
  eq([r[0].lowest, r[0].highest, r[0].topRep, r[0].reps, r[0].products], [5, 9, 'B', ['A', 'B'], ['p']], 'Check the accumulators.');
});
