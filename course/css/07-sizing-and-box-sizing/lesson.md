You can control the size of a box with `width`, `height`, and limits such as `max-width`.

```css
.panel {
  width: 300px;
  height: 120px;
  max-width: 100%;
}
```

- `width` and `height` set the target size. Block elements are as wide as their container by default, and as tall as their content.
- `max-width` and `min-width` set limits. `max-width: 100%` means "never wider than my container", which is the key to flexible layouts and images.
- A percentage `width` is relative to the width of the containing block, normally the parent. A `width: 50%` box is half as wide as its container.

## box-sizing

By default, `width` is the width of the **content** only. Add padding and border and the box becomes wider than you asked for. That surprises almost everybody.

```css
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;  /* 250px total on screen */
}
```

Change the rule with `box-sizing: border-box`. Now `width` includes padding and border, and the content shrinks to fit, so the box stays 200px wide.

Many developers start every stylesheet with:

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

## Be careful with fixed heights

A fixed `height` can cut off text if the content is longer than you planned. Prefer letting height follow the content, and use `min-height` when you need a minimum.
