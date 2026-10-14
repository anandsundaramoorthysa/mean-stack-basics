People open your page on phones, tablets and wide monitors. **Responsive design** means one page that adapts to all of them.

## Step 1: the viewport meta tag

Put this in the `<head>` of every page:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Without it, phones assume a wide virtual screen and shrink your page until it is unreadable.

## Step 2: flexible layouts

Use percentages, `max-width`, flexbox and grid instead of fixed pixel widths. Layouts that bend by themselves need fewer rules.

## Step 3: media queries

A **media query** applies rules only when a condition is true, such as the window width.

```css
.layout {
  display: flex;
  flex-direction: column;       /* small screens: stacked */
}
@media (min-width: 600px) {
  .layout {
    flex-direction: row;        /* 600px and wider: side by side */
  }
}
@media (max-width: 500px) {
  .sidebar { display: none; }   /* 500px and narrower */
}
```

- `min-width: 600px` means 600px or wider.
- `max-width: 500px` means 500px or narrower.
- Rules inside a media query follow the normal cascade, so put them after the base rules they override.

## Mobile first

Write the simple, small-screen styles first, then add `min-width` queries that enlarge the layout. You pick breakpoints where your content starts to look awkward, not by device names.

Note: the exercise frame is 800px wide, so only the `min-width: 600px` rule is active there. The check on the `max-width` rule reads your source code instead.
