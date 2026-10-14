**Accessibility** means making sure everyone can use your page, including people who are blind, have low vision, cannot use a mouse, or use a screen reader. The good news is that correct HTML already does most of the work.

## Five habits

1. **Set the language**: `<html lang="en">`. A screen reader uses it to pick the right pronunciation.
2. **Write alt text**: every meaningful image needs an `alt` that says what it shows. Use `alt=""` only for purely decorative images.
3. **Label every form field**: `<label for="email">` matched to `<input id="email">`.
4. **Keep headings in order**: `h1`, then `h2`, then `h3`, without skipping a level. People who use a screen reader often jump from heading to heading to scan a page.
5. **Use landmarks**: `header`, `nav`, `main` and `footer` let users jump straight to the part they need. Link text should make sense alone, so avoid "click here".

```html
<a href="results.html">Read the exam results</a>
```

## Use the real element

A `<button>` works with the keyboard and announces itself as a button. A `<div>` that you style to look like a button does neither. Choosing the right element is the easiest accessibility win.

## Test it yourself

Try pressing the Tab key through your page. If you cannot reach or use something without a mouse, someone else cannot either.
