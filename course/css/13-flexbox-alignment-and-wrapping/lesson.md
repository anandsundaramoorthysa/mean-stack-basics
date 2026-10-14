Once a container is `display: flex`, a few more properties control where the items sit.

## Two axes

- **Main axis**: the direction items are placed (horizontal in a row).
- **Cross axis**: perpendicular to it (vertical in a row).

## justify-content: the main axis

```css
.toolbar {
  display: flex;
  justify-content: space-between;
}
```

Useful values: `flex-start` (default), `center`, `flex-end`, `space-between` (first and last items touch the edges), `space-around` and `space-evenly`.

## align-items: the cross axis

```css
.toolbar {
  align-items: center;   /* vertically centred in a row */
}
```

Other values: `stretch` (default, items become as tall as the container), `flex-start`, `flex-end`.

## gap

`gap` adds space **between** items without touching the outer edges. It replaces most margin tricks.

```css
.toolbar { gap: 16px; }
```

## flex-wrap

Items stay on one line by default and shrink to fit. With wrapping, the extra items move onto a new line.

```css
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
```

## Remember the swap

If you set `flex-direction: column`, the axes swap: `justify-content` now works vertically, and `align-items` horizontally. When alignment seems "backwards", check the direction.
