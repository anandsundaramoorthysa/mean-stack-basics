A **form** collects information from the visitor and sends it somewhere. It is built from a few elements.

```html
<form action="/register" method="post">
  <label for="name">Name</label>
  <input id="name" name="name" type="text">

  <label for="email">Email</label>
  <input id="email" name="email" type="email">

  <button type="submit">Register</button>
</form>
```

## The parts

- `<form>` wraps the fields. `action` is the address that receives the data and `method` is how it is sent (`get` or `post`). Use `post` for things like passwords.
- `<input>` is a one-line field. Its `type` decides the behaviour: `text`, `email`, `password` (hides the characters), `number`, `date` and more. It is a void element.
- `name` is the label of the value when the form is sent. An input without a `name` is not sent at all.
- `<button type="submit">` sends the form.

## Labels

Every field needs a `<label>`. Its `for` attribute must equal the input's `id`. Clicking the label then focuses the field, and screen readers announce the label when the field is reached. A placeholder is not a replacement for a label.
