function createTodoList() {
  let items = [];
  let nextId = 1;

  function add(text) {
    // TODO: trim the text; empty -> return null
    //       otherwise add { id, text, done: false } and return it
  }

  function toggle(id) {
    // TODO: flip done; return true, or false if the id does not exist
  }

  function remove(id) {
    // TODO: delete the todo; return true, or false if the id does not exist
  }

  function list(filter = 'all') {
    // TODO: 'all' -> everything, 'active' -> not done, 'done' -> done (return a new array)
  }

  function remaining() {
    // TODO: how many todos are not done
  }

  return { add, toggle, remove, list, remaining };
}

module.exports = { createTodoList };
