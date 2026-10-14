const squares = nums => nums.map(n => n * n);
const passed = marks => marks.filter(m => m >= 40);
const sum = nums => nums.reduce((total, n) => total + n, 0);
const firstLong = words => words.find(w => w.length > 5);
const sortedNumbers = nums => [...nums].sort((a, b) => a - b);

module.exports = { squares, passed, sum, firstLong, sortedNumbers };
