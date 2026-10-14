**Flexbox** is a layout tool for arranging items along one line, either a row or a column. It replaces many old tricks with a few properties.

## Turn it on

Give the **container** (the parent) `display: flex`. Its direct children become **flex items**.

```html
<div class="row">
  <div class="item">One</div>
  <div class="item">Two</div>
  <div class="item">Three</div>
</div>
```

```css
.row {
  display: flex;
}
```

The three items now sit side by side instead of stacking.

## Direction

`flex-direction` chooses the **main axis**, the line along which items are placed.

```css
.col {
  display: flex;
  flex-direction: column;   /* top to bottom */
}
```

The default is `row` (left to right). The other axis is called the **cross axis**.

## Sharing space

Items are only as wide as their content by default. Use `flex` on the items to let them grow:

```css
.row .item {
  flex: 1;
}
```

`flex: 1` tells every item to take an equal share of the free space. Give one item `flex: 2` and it gets double the share.

## Remember

- Flex properties split into two groups: some go on the container (`display`, `flex-direction`), others on the items (`flex`).
- Only direct children become flex items. Grandchildren are not affected.
- Flexbox lays out in one dimension. For rows and columns together, use grid (a later lesson).
