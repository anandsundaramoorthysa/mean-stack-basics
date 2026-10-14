Forms are how users give your page information: sign-ups, logins, searches. JavaScript lets you check that information before it goes anywhere, and answer politely if something is wrong.

## The submit event

A form fires a **submit** event when the user presses its submit button, or hits Enter inside a field (Enter works when the form has a submit button, or only one text field). Listen for it on the `<form>` element.

```js
const form = document.querySelector('#signup');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // read, check, respond
});
```

`event.preventDefault()` cancels the browser's usual reaction, which is to send the data and reload the page. Call it first, so your code stays in control.

## Reading the fields

```js
const email = document.querySelector('#email').value.trim();
const age = Number(document.querySelector('#age').value);
```

- `value` is the current text of an input. It is **always a string**, so use `Number(...)` when you need a number.
- `trim()` removes spaces at both ends, so `"   "` counts as empty.

## Validate, then tell the user

**Validation** means checking that input is acceptable. Show the problem in the page, where the user will see it, instead of only printing to the console.

```js
const message = document.querySelector('#message');

if (email === '') {
  message.textContent = 'Please type your email.';
} else {
  message.textContent = 'Thanks!';
}
```

Check one rule at a time and stop at the first problem, which is what `if / else if / else` does.

## Remember

- Browser checks (`required`, `type="email"`) are helpful but can be bypassed. Servers must always validate again.
- Never trust input, and use `textContent`, not `innerHTML`, when you put it back into the page rather than building HTML from it.
