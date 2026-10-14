const fresh = () => learner().createTodoList();

check('add returns the new todo with done false', () => {
  const t = fresh().add('Buy notebook');
  eq(t, { id: 1, text: 'Buy notebook', done: false }, 'add should return { id, text, done: false }.');
});
check('add trims the text', () => {
  eq(fresh().add('  Revise  ').text, 'Revise');
});
check('add rejects empty or blank text', () => {
  const todos = fresh();
  eq(todos.add(''), null, 'Empty text should return null.');
  eq(todos.add('   '), null, 'Blank text should return null after trimming.');
  eq(todos.list(), [], 'Nothing should have been added.');
});
check('ids count up 1, 2, 3', () => {
  const todos = fresh();
  eq([todos.add('a').id, todos.add('b').id, todos.add('c').id], [1, 2, 3]);
});
check('Ids are never reused after a removal', () => {
  const todos = fresh();
  todos.add('a');
  todos.add('b');
  todos.remove(2);
  eq(todos.add('c').id, 3, 'Use a separate nextId counter instead of items.length + 1.');
});
check('toggle flips done and reports success', () => {
  const todos = fresh();
  todos.add('a');
  eq(todos.toggle(1), true);
  eq(todos.list()[0].done, true, 'After one toggle the todo should be done.');
  todos.toggle(1);
  eq(todos.list()[0].done, false, 'A second toggle should undo it.');
});
check('toggle returns false for an unknown id', () => {
  const todos = fresh();
  todos.add('a');
  eq(todos.toggle(99), false);
});
check('remove deletes the matching todo only', () => {
  const todos = fresh();
  todos.add('a');
  todos.add('b');
  todos.add('c');
  eq(todos.remove(2), true);
  eq(todos.list().map((t) => t.text), ['a', 'c']);
});
check('remove returns false for an unknown id', () => {
  const todos = fresh();
  todos.add('a');
  eq(todos.remove(5), false);
  eq(todos.list().length, 1, 'An unknown id must not delete anything.');
});
check('list filters all, active and done', () => {
  const todos = fresh();
  todos.add('a');
  todos.add('b');
  todos.add('c');
  todos.toggle(2);
  eq(todos.list().map((t) => t.text), ['a', 'b', 'c'], 'The default filter is "all".');
  eq(todos.list('all').length, 3);
  eq(todos.list('active').map((t) => t.text), ['a', 'c']);
  eq(todos.list('done').map((t) => t.text), ['b']);
});
check('remaining counts the todos that are not done', () => {
  const todos = fresh();
  eq(todos.remaining(), 0, 'An empty list has 0 remaining.');
  todos.add('a');
  todos.add('b');
  todos.toggle(1);
  eq(todos.remaining(), 1);
});
check('Two lists are independent', () => {
  const one = fresh();
  const two = fresh();
  one.add('a');
  eq(two.list(), [], 'Declare items inside createTodoList so every list has its own.');
});
check('list() returns a copy, so the hidden array stays private', () => {
  const todos = fresh();
  todos.add('a');
  todos.list().push({ id: 99, text: 'hack', done: false });
  eq(todos.list().length, 1, 'Return items.slice() (or a filtered array), never items itself.');
});
