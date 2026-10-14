Until now your script ran once from top to bottom. Real pages wait for the user: a click, a key press, a typed letter. Each of these is an **event**, and you react to it with an **event listener**.

## addEventListener

```js
const button = document.querySelector('#add');

button.addEventListener('click', () => {
  console.log('The button was clicked');
});
```

It takes two things: the **event name** (`'click'`) and a **handler**, a function the browser calls each time the event happens. Because the handler is a function you pass along to be called later, it is also called a **callback**.

Pass the function itself. Writing `show()` calls it immediately; writing `show` hands it over.

## The event object

The browser gives your handler an `event` argument describing what happened.

```js
const box = document.querySelector('#name');

box.addEventListener('input', (event) => {
  console.log(event.target.value); // the text typed so far
});
```

`event.target` is the element that triggered the event. For text boxes `value` holds what the user typed. (`box.value` works too.)

## Common events

| Event | Fires when |
|---|---|
| `click` | an element is clicked |
| `input` | the value of a field changes while typing |
| `change` | a change is committed: a select option is chosen, or a text box that was edited loses focus |
| `submit` | a form is submitted (next lesson) |
| `keydown` | a key is pressed |

## Remembering things between clicks

A handler runs again and again, so a variable declared inside it starts fresh each time. Declare the counter outside the handler to keep its value, just like in the closures lesson:

```js
let clicks = 0;
button.addEventListener('click', () => {
  clicks = clicks + 1;
});
```
