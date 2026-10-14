const seed = {
  students: [
    { name: 'Asha', marks: 91, city: 'Madurai' },
    { name: 'Bala', marks: 80, city: 'Salem' },
    { name: 'Chitra', marks: 67, city: 'Madurai' },
    { name: 'Dev', marks: 85, city: 'Erode' },
    { name: 'Esha', marks: 78, city: 'Salem' },
    { name: 'Farid', marks: 55, city: 'Salem' },
    { name: 'Gita', marks: 95, city: 'Chennai' },
    { name: 'Hari', marks: 72, city: 'Madurai' },
  ],
};
const result = () => mongo(seed).result || [];
check('Returns exactly 3 students', () => {
  eq(result().length, 3, 'Page 2 has 3 students. Use skip(3) and limit(3).');
});
check('Returns Bala, Esha and Hari in that order', () => {
  eq(result().map((d) => d.name), ['Bala', 'Esha', 'Hari'], 'Sort by marks descending, skip the top 3, keep the next 3.');
});
check('Shows only name and marks', () => {
  for (const d of result()) {
    eq(Object.keys(d).sort(), ['marks', 'name'], 'Each result should have only name and marks (hide _id with _id: 0, and leave out city).');
  }
});
check('Still correct on different data (no hard-coded names)', () => {
  const other = { students: ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((n, i) => ({ name: n, marks: 10 * (i + 1), city: 'X' })) };
  eq((mongo(other).result || []).map((d) => d.name), ['d', 'c', 'b'], 'Sort by marks descending, skip 3, limit 3.');
});
