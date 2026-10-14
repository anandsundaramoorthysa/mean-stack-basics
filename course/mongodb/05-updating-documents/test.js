const seed = {
  students: [
    { name: 'Asha', dept: 'CSE', marks: 90, city: 'Madurai', badges: ['early'], phone: '111' },
    { name: 'Bala', dept: 'ECE', marks: 70, city: 'Salem', badges: [], phone: '333' },
    { name: 'Chitra', dept: 'CSE', marks: 60, city: 'Madurai', badges: [], phone: '222' },
    { name: 'Dev', dept: 'ECE', marks: 80, city: 'Erode', badges: [], phone: '444' },
  ],
};
const by = (name) => mongo(seed).collection('students').find((d) => d.name === name);
check("Bala's city is Chennai", () => {
  eq(by('Bala').city, 'Chennai', "Use $set on Bala's city.");
});
check('Every CSE student gained 5 marks, ECE students did not', () => {
  eq([by('Asha').marks, by('Chitra').marks], [95, 65], 'Use updateMany with { dept: "CSE" } and $inc: { marks: 5 }.');
  eq([by('Bala').marks, by('Dev').marks], [70, 80], 'Only the CSE department should change.');
});
check("Asha's badges now end with 'topper' and keep the old badge", () => {
  eq(by('Asha').badges, ['early', 'topper'], 'Use $push so the existing badge stays.');
});
check("Chitra's phone is removed, other phones stay", () => {
  ok(!('phone' in by('Chitra')), 'Use $unset on phone for Chitra.');
  eq([by('Asha').phone, by('Dev').phone], ['111', '444'], 'Only Chitra loses the phone field.');
});
check('Nobody else was changed by accident', () => {
  eq([by('Dev').city, by('Asha').city, by('Bala').dept], ['Erode', 'Madurai', 'ECE'], 'Use filters that match only the intended students.');
});
check('Works when more CSE students exist (no hard-coded names)', () => {
  const other = { students: [
    { name: 'Asha', dept: 'CSE', marks: 1 }, { name: 'Bala', dept: 'ECE', marks: 1 }, { name: 'Chitra', dept: 'CSE', marks: 1 }, { name: 'Zed', dept: 'CSE', marks: 1 },
  ] };
  const m = Object.fromEntries(mongo(other).collection('students').map((d) => [d.name, d.marks]));
  eq(m.Zed, 6, 'Select students with { dept: "CSE" }, not by name.');
});
