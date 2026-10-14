const seed = {
  students: [
    { name: 'Asha', marks: 91, city: 'Madurai' },
    { name: 'Bala', marks: 80, city: 'Salem' },
    { name: 'Chitra', marks: 67, city: 'Madurai' },
    { name: 'Dev', marks: 85, city: 'Erode' },
  ],
};
check('Returns the students with marks above 80', () => {
  const names = (mongo(seed).result || []).map((d) => d.name).sort();
  eq(names, ['Asha', 'Dev'], 'Only Asha and Dev have more than 80 marks.');
});
check('Does not include a student with exactly 80 marks', () => {
  const names = (mongo(seed).result || []).map((d) => d.name);
  ok(!names.includes('Bala'), 'Bala has exactly 80 marks, so use "greater than", not "greater than or equal".');
});
check('Still correct on different data (no hard-coded names)', () => {
  const other = { students: [{ name: 'Xin', marks: 81 }, { name: 'Yara', marks: 80 }, { name: 'Zed', marks: 100 }, { name: 'Wes', marks: 5 }] };
  eq((mongo(other).result || []).map((d) => d.name).sort(), ['Xin', 'Zed'], 'Filter with marks and $gt instead of listing names.');
});
