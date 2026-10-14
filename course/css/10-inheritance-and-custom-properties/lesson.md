Two ideas save you from repeating yourself: inheritance and CSS variables.

## Inheritance

Some properties are passed down from a parent to its children. If you set `color` on `body`, every paragraph, list and link inside uses it unless it has its own value.

```css
body {
  color: darkslategray;
  font-family: Arial, sans-serif;
}
```

Text properties (`color`, `font-family`, `font-size`, `line-height`, `text-align`) are inherited. Box properties (`margin`, `padding`, `border`, `background`) are not, which is what you would want: a child should not get a copy of its parent's border.

So set text styles once, high in the page, and override only where needed.

## Custom properties (variables)

A **custom property** is a value you name yourself. Its name begins with two dashes. Define it once, and read it with `var()`.

```css
:root {
  --brand: #0057b8;
  --space: 16px;
}
h1   { color: var(--brand); }
.btn { background-color: var(--brand); padding: var(--space); }
```

- `:root` is the top element of the page, so variables defined there work everywhere.
- Change `--brand` in one place and the whole site updates.
- Variables can also be redefined inside one element to change them just for that part of the page.

Custom properties are real inherited properties, which is why the `:root` trick works. Use them for colours, spacing and anything you repeat.
