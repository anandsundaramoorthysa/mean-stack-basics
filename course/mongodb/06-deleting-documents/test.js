const seed = {
  tasks: [
    { title: 'Write report', done: true },
    { title: 'Pay fees', done: true },
    { title: 'Old draft', done: false },
    { title: 'Old draft', done: false },
    { title: 'Buy books', done: false },
    { title: 'Clean room', done: true },
    { title: 'Revise maths', done: false },
  ],
};
const left = () => mongo(seed).collection('tasks');
check('No finished task remains', () => {
  ok(left().every((t) => t.done === false), 'Use deleteMany({ done: true }) to remove every finished task.');
});
check('Exactly one Old draft is left', () => {
  const n = left().filter((t) => t.title === 'Old draft').length;
  eq(n, 1, 'deleteOne removes a single match. Two Old drafts existed, so one should remain.');
});
check('Unfinished tasks are kept', () => {
  const titles = left().map((t) => t.title).sort();
  eq(titles, ['Buy books', 'Old draft', 'Revise maths'], 'Buy books and Revise maths are not done and must stay.');
});
check('The collection was not emptied', () => {
  ok(left().length > 0, 'deleteMany({}) removes everything. Give it the filter { done: true }.');
});
check('Works on different data (no hard-coded titles)', () => {
  const other = { tasks: [{ title: 'x', done: true }, { title: 'Old draft', done: false }, { title: 'Old draft', done: false }, { title: 'y', done: false }, { title: 'z', done: true }] };
  const t = mongo(other).collection('tasks').map((d) => d.title).sort();
  eq(t, ['Old draft', 'y'], 'Delete done tasks with deleteMany and one Old draft with deleteOne.');
});
