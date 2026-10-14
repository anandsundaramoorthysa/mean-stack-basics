In the last lesson you found elements and changed their text. Now you will build new elements from scratch, which is how most modern pages show lists, cards and messages.

## Create, fill, attach

```js
const list = document.querySelector('#list');

const item = document.createElement('li'); // 1. create
item.textContent = 'Asha';                 // 2. fill
list.append(item);                         // 3. attach
```

`createElement` makes a new element that lives only in memory. It appears on the page once you attach it with `append` (add as the last child). `remove()` deletes an element from the page again: `item.remove()`.

## Classes

Styling is usually done with CSS classes. `classList` lets you control them:

```js
item.classList.add('done');
item.classList.remove('done');
item.classList.toggle('done');          // add if missing, remove if present
item.classList.contains('done');        // true or false
```

Prefer this over writing `className = '...'`, which replaces every class at once.

## Attributes

```js
link.setAttribute('href', 'https://example.com');
link.getAttribute('href');
```

Custom data attributes starting with `data-` are a handy place to remember a value, such as an id, on an element.

## Text, not HTML

Use `textContent` for user text. It treats everything as plain text, so a name like `<b>x</b>` shows up as typed. Putting user text into `innerHTML` can let someone inject harmful HTML, so avoid it for anything that did not come from you.

## Pattern to remember

Build elements in a loop, one per item of an array. The same idea powers the `@for` loop you will meet in Angular.
