const fs = require('node:fs');

const lines = fs.readFileSync('marks.txt', 'utf8').split('\n').filter((line) => line.trim() !== '');
const students = lines.map((line) => {
  const [name, mark] = line.split(',');
  return { name: name.trim(), mark: Number(mark) };
});
const total = students.reduce((sum, s) => sum + s.mark, 0);
const top = students.reduce((a, b) => (b.mark > a.mark ? b : a));

fs.writeFileSync('summary.txt', `Students: ${students.length}\nAverage: ${total / students.length}\nTop: ${top.name}\n`);
