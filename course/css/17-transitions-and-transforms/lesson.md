Two features add polish: **transforms** change how an element is drawn, and **transitions** make changes happen smoothly instead of instantly.

## transform

```css
.tilt   { transform: rotate(-5deg); }
.grow   { transform: scale(1.1); }
.shift  { transform: translateX(20px); }
```

- `rotate(angle)` turns the element, in degrees (`deg`).
- `scale(n)` makes it `n` times its size. `1` is normal.
- `translateX(length)` and `translateY(length)` move it without affecting the layout.
- Combine several in one value: `transform: translateY(-2px) scale(1.05);`.

A transform changes the drawing, not the space the element takes up. Other elements do not move out of the way. Transforms do not apply to plain inline elements such as a `span` or `a`, so give those `display: inline-block` (or `block`) first.

## transition

Normally a change, such as a hover colour, is instant. A transition spreads it over time.

```css
.btn {
  background-color: royalblue;
  display: inline-block;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.btn:hover {
  background-color: darkblue;
  transform: scale(1.1);
}
```

The shorthand is `property duration timing-function`. Put it on the **normal** rule so it also runs when the mouse leaves. To animate several properties, separate them with commas: `transition: background-color 0.3s, transform 0.2s;`.

## Use motion gently

Short durations (0.15 to 0.4 seconds) feel responsive. Avoid motion that is large or constant, because some people find it uncomfortable. Browsers expose a "reduce motion" setting you can respect with `@media (prefers-reduced-motion: reduce)`.
