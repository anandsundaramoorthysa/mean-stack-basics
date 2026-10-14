By default grid items fill cells one after another. You can also decide which cells an item covers.

## Spanning

An item can cover more than one track.

```css
.feature {
  grid-column: span 2;   /* two columns wide */
}
```

`grid-row: span 2` does the same vertically. You can also give exact lines, such as `grid-column: 1 / 3`, which runs from line 1 to line 3. Lines are the numbered edges between tracks, starting at 1.

## Named areas

For whole-page layouts, draw the layout in CSS. Each quoted string is one row, each word is one cell.

```css
.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
}
.page header { grid-area: header; }
.sidebar     { grid-area: sidebar; }
.main        { grid-area: main; }
```

- Repeating a name makes that area cover several cells (the header spans both columns).
- The names are chosen by you. They must match between `grid-template-areas` and `grid-area`.
- Every row needs the same number of cells, and an area must form a rectangle.
- Use a dot `.` for an empty cell.

## Why this is nice

The order in the HTML does not have to match the layout, and changing the layout later means editing one place. Keep the HTML in a sensible reading order anyway, because keyboard and screen-reader users follow the HTML order, not the visual order. In the responsive lesson you will redraw the areas for small screens.
