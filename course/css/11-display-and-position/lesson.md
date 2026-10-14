Before layout tools like flexbox, you need two basics: how elements sit in the page flow (`display`) and how to move one out of it (`position`).

## display

Every element has a default `display` value.

| Value | Behaviour |
|---|---|
| `block` | Starts a new line, fills the width. `div`, `p`, `h1`. Width, height, margin all work. |
| `inline` | Flows inside a line of text. `span`, `a`. Width and height are ignored. |
| `inline-block` | Flows in a line, but behaves like a box inside. Width and height work. |
| `none` | Removed from the page completely. |

```css
.menu-link { display: block; }
.badge { display: inline-block; width: 100px; }
.hidden-note { display: none; }
```

## position

By default `position` is `static`: the element sits in normal flow, and `top` and `left` do nothing.

- `relative`: stays in place, and also becomes the reference point for children.
- `absolute`: leaves the flow and is placed with `top`, `right`, `bottom`, `left`, measured from its nearest **positioned** ancestor.

```css
.panel  { position: relative; }
.corner {
  position: absolute;
  top: 0;
  right: 0;
}
```

The pair is the classic way to put a badge or close button in a corner of a card.

## Warning

Absolutely positioned elements do not take up space, so neighbours move as if they were gone. Use positioning for small details, and flexbox or grid (next lessons) for page layout.
