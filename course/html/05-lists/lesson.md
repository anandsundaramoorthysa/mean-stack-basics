HTML has three kinds of list.

## Unordered list: `ul`

Items in no particular order, shown with bullets. Every item is an `<li>` (list item).

```html
<ul>
  <li>Notebook</li>
  <li>Pen</li>
</ul>
```

## Ordered list: `ol`

Use it when the order matters, such as steps. The browser numbers the items for you.

```html
<ol>
  <li>Open the editor</li>
  <li>Write the code</li>
</ol>
```

Only `<li>` elements (apart from `<script>` and `<template>`, which you will rarely need) may sit directly inside `ul` or `ol`.

## Nested lists

Put a new list **inside** an `<li>`, before its closing tag, to make sub-items:

```html
<ul>
  <li>Fruit
    <ul><li>Mango</li></ul>
  </li>
</ul>
```

## Description list: `dl`

A list of terms and their meanings. `<dt>` is the term and `<dd>` is its description.

```html
<dl>
  <dt>HTML</dt>
  <dd>The language that structures a page.</dd>
</dl>
```
