**CSS Grid** lays items out in rows **and** columns at the same time. Use it for page sections, galleries and dashboards.

## Turn it on

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

- `display: grid` on the container makes its direct children grid items.
- `grid-template-columns` lists the width of each column, one value per column.
- `gap` puts space between rows and columns (`row-gap` and `column-gap` set them separately).

Rows are created automatically as more items arrive. With three columns and seven items you get three rows.

## The fr unit

`fr` means a **fraction** of the free space.

```css
grid-template-columns: 1fr 2fr;       /* second column is twice as wide */
grid-template-columns: 200px 1fr;     /* fixed sidebar, flexible main area */
grid-template-columns: repeat(3, 1fr); /* three equal columns */
```

You can mix units. Fixed tracks take their space first, then `fr` tracks share what is left.

## Flexbox or grid?

- One row or column of items, content decides size: flexbox.
- A table-like arrangement, or you want columns to line up across rows: grid.

They work together: a page can be a grid, and a toolbar inside it can be flexbox.
