const seed = {
  students: [
    { name: 'Asha', marks: 91, city: 'Madurai' },
    { name: 'Bala', marks: 70, city: 'Salem' },
    { name: 'Chitra', marks: 67, city: 'Madurai' },
    { name: 'Dev', marks: 85, city: 'Erode' },
    { name: 'Esha', marks: 78, city: 'Salem' },
    { name: 'Farid', marks: 55, city: 'Salem' },
    { name: 'Gita', marks: 95, city: 'Chennai' },
    { name: 'Hari', marks: 72, city: 'Madurai' },
  ],
};
const names = () => (mongo(seed).result || []).map((d) => d.name).sort();
check('Returns exactly Asha, Bala, Esha and Hari', () => {
  eq(names(), ['Asha', 'Bala', 'Esha', 'Hari'], 'Keep students from Madurai or Salem with marks of 70 or more.');
});
check('Leaves out students from other cities', () => {
  const n = names();
  ok(!n.includes('Dev') && !n.includes('Gita'), 'Dev (Erode) and Gita (Chennai) live outside Madurai and Salem.');
});
check('Leaves out students below 70 marks, and keeps exactly 70', () => {
  const n = names();
  ok(!n.includes('Chitra') && !n.includes('Farid'), 'Chitra and Farid have fewer than 70 marks.');
  ok(n.includes('Bala'), 'Bala has exactly 70 marks, so use $gte, not $gt.');
});
check('Uses the $in operator for the cities', () => {
  ok(/\$in\b/.test(source), 'Use $in with an array of cities.');
});
check('Still correct on different data (no hard-coded names)', () => {
  const other = { students: [
    { name: 'P', marks: 70, city: 'Salem' }, { name: 'Q', marks: 69, city: 'Salem' },
    { name: 'R', marks: 99, city: 'Madurai' }, { name: 'S', marks: 99, city: 'Erode' },
  ] };
  eq((mongo(other).result || []).map((d) => d.name).sort(), ['P', 'R'], 'Filter on city and marks instead of listing names.');
});
