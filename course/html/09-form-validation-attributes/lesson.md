Browsers can check what the visitor typed **before** the form is sent, using only HTML attributes. This is called **client-side validation**. If a field is invalid, the browser stops the submit and shows a message.

## Common attributes

- `required`: the field may not be empty. It needs no value: `<input required>`.
- `minlength` and `maxlength`: the least and most characters in a text field.
- `min` and `max`: the smallest and largest value for `type="number"` or dates.
- `pattern`: a **regular expression** the whole value must match. It works on text-like inputs (`text`, `tel`, `email`, `url`, `password`, `search`), not on `number`. `[0-9]{4}` means exactly four digits.
- `placeholder`: faint hint text shown while the field is empty. It is a hint, not a replacement for a label, and it disappears as soon as the user types.

```html
<input type="number" name="age" min="18" max="60" required>
<input type="text" name="pin" pattern="[0-9]{4}" title="Four digits" required>
```

The `title` attribute can describe the expected format, and some browsers add it to the error message. Do not rely on it alone: tell the visitor the format in visible text near the field.

## An important warning

Client-side validation is for convenience. Anyone can bypass it, so a real server must always check the data again. You will do that later in the Express track.
