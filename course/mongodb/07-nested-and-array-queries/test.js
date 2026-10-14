const seed = {
  students: [
    { name: 'Asha', address: { city: 'Madurai', pin: 625001 }, scores: [{ subject: 'maths', mark: 88 }, { subject: 'physics', mark: 71 }] },
    { name: 'Bala', address: { city: 'Madurai', pin: 625002 }, scores: [{ subject: 'maths', mark: 60 }, { subject: 'physics', mark: 90 }] },
    { name: 'Chitra', address: { city: 'Salem', pin: 636001 }, scores: [{ subject: 'maths', mark: 95 }] },
    { name: 'Dev', address: { city: 'Madurai', pin: 625003 }, scores: [{ subject: 'maths', mark: 80 }] },
    { name: 'Esha', address: { city: 'Madurai', pin: 625004 }, scores: [{ subject: 'chemistry', mark: 99 }] },
  ],
};
const names = () => (mongo(seed).result || []).map((d) => d.name).sort();
check('Returns Asha and Dev', () => {
  eq(names(), ['Asha', 'Dev'], 'Madurai students with a maths mark of 80 or more are Asha (88) and Dev (80).');
});
check('Leaves out Chitra, who lives in Salem', () => {
  ok(!names().includes('Chitra'), "Chitra's city is Salem. Filter on 'address.city'.");
});
check('Leaves out Bala, whose maths mark is only 60', () => {
  ok(!names().includes('Bala'), 'Bala has 90 in physics but 60 in maths. One score entry must have subject maths AND mark 80 or more: use $elemMatch.');
});
check('Uses dot notation and $elemMatch', () => {
  ok(/['"]address\.city['"]/.test(source), "Write the nested field as 'address.city'.");
  ok(/\$elemMatch/.test(source), 'Use $elemMatch for the scores array.');
});
check('Still correct on different data (no hard-coded names)', () => {
  const other = { students: [
    { name: 'U', address: { city: 'Madurai' }, scores: [{ subject: 'maths', mark: 99 }] },
    { name: 'V', address: { city: 'Madurai' }, scores: [{ subject: 'maths', mark: 10 }, { subject: 'art', mark: 99 }] },
    { name: 'W', address: { city: 'Erode' }, scores: [{ subject: 'maths', mark: 99 }] },
  ] };
  eq((mongo(other).result || []).map((d) => d.name), ['U'], 'Match the city and one scores entry with subject maths and mark >= 80.');
});
