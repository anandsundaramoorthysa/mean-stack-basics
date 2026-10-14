// Remove comments so a comment cannot satisfy the pattern checks.
const code = source.replace(/\/\/.*$/gm, '');
const seed = {
  students: [
    { name: 'Asha', department: 'CSE', marks: 90 },
    { name: 'Bala', department: 'ECE', marks: 70 },
    { name: 'Chitra', department: 'IT', marks: 75 },
    { name: 'Dev', department: 'CSE', marks: 80 },
    { name: 'Esha', department: 'ECE', marks: 50 },
  ],
};
check('The top scorers query uses find with a filter on marks', () => {
  ok(/db\.students\.find\s*\(\s*\{[^)]*marks\s*:\s*\{\s*\$gte\s*:\s*75/.test(code), 'Query 1 should be db.students.find({ marks: { $gte: 75 } }) followed by sort and limit.');
});
check('The top scorers are sorted by marks, highest first', () => {
  ok(/\.sort\s*\(\s*\{\s*marks\s*:\s*-1\s*\}\s*\)/.test(code), 'Add .sort({ marks: -1 }) after find. -1 means descending.');
});
check('The top scorers query is limited to 3', () => {
  ok(/\.limit\s*\(\s*3\s*\)/.test(code), 'Add .limit(3) so only three students come back.');
});
check('The last query returns one result per department', () => {
  const rows = mongo(seed).result;
  ok(Array.isArray(rows) && rows.length === 3, 'The aggregate should return 3 rows (CSE, ECE, IT). Group by "$department".');
});
check('Each row has department and average (no _id)', () => {
  const rows = mongo(seed).result || [];
  eq(rows[0] && Object.keys(rows[0]).sort(), ['average', 'department'], 'Use $project to rename _id to department and hide _id.');
});
check('Averages are correct and sorted highest first', () => {
  eq(mongo(seed).result, [
    { department: 'CSE', average: 85 },
    { department: 'IT', average: 75 },
    { department: 'ECE', average: 60 },
  ], 'Use $avg: "$marks" in $group and add a $sort stage with average: -1.');
});
