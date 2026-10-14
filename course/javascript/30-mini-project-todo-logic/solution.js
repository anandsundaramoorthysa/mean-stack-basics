function createTodoList() {
  let items = [];
  let nextId = 1;

  function add(text) {
    const clean = text.trim();
    if (clean === '') return null;
    const todo = { id: nextId, text: clean, done: false };
    nextId = nextId + 1;
    items.push(todo);
    return todo;
  }

  function toggle(id) {
    const todo = items.find((t) => t.id === id);
    if (!todo) return false;
    todo.done = !todo.done;
    return true;
  }

  function remove(id) {
    const before = items.length;
    items = items.filter((t) => t.id !== id);
    return items.length < before;
  }

  function list(filter = 'all') {
    if (filter === 'active') return items.filter((t) => !t.done);
    if (filter === 'done') return items.filter((t) => t.done);
    return items.slice();
  }

  function remaining() {
    return items.filter((t) => !t.done).length;
  }

  return { add, toggle, remove, list, remaining };
}

module.exports = { createTodoList };
