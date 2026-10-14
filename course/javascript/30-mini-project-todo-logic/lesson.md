Time to combine what you know. A to-do app has two parts: the **logic** (what a list of tasks can do) and the **screen** (buttons and HTML). Good programmers write the logic first, on its own, so it can be tested without any page. In this project you write only the logic. Later you can connect it to the DOM lessons you just finished, or to Angular.

## The design

Each task is a small object:

```js
{ id: 1, text: 'Buy notebook', done: false }
```

The list lives in a **closure**. Nothing outside can touch the array. They can only call the functions you hand out:

```js
function createTodoList() {
  let items = [];

  function add(text) {
    items.push({ id: items.length + 1, text, done: false });
  }

  return { add };
}

const todos = createTodoList();
todos.add('Revise closures');
```

(The real exercise needs a better way to choose ids. Think about what happens to `items.length + 1` after a removal.)

## Tools you will need

- `push` to add to the array.
- `find` to locate one task by id: `items.find((t) => t.id === id)` gives the task or `undefined`.
- `filter` to keep some todos and drop others. It builds a **new** array, so for removal you assign it back to `items`.
- `!` to flip a boolean.
- `slice()` to return a copy, so callers cannot change your hidden array.

## How to work

1. Read the task and the list of checks. Each check is a small requirement.
2. Do one function at a time. Run the checks after each.
3. When one check fails, read its message. It tells you what was expected.

Handling bad input, like an empty text or an id that does not exist, is part of the job. Real users will click in ways you did not plan.
