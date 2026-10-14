Plain boxes are easy to place but dull. Three properties turn them into cards, buttons and avatars.

## Background colour

```css
.card { background-color: whitesmoke; }
```

The background fills the content and the padding, and by default it also extends underneath the border. Margin is never coloured.

## Rounded corners

```css
.card   { border-radius: 12px; }
.avatar { border-radius: 50%; }
```

`border-radius` takes a length or a percentage. On a square box, `50%` makes a circle. You can give one value for all corners, or up to four, in the same clockwise order as `margin`.

## Shadows

```css
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
```

Read the values in order:

1. horizontal offset (0 means no sideways shift),
2. vertical offset (positive moves the shadow down),
3. blur radius (bigger means softer),
4. colour, usually semi-transparent black so it looks natural.

A fourth length, the spread, is optional and goes before the colour. `rgba(0, 0, 0, 0.3)` is black at 30 percent opacity. Subtle shadows look more professional than dark ones.

## Putting it together

A card is usually a mix of padding, a light background, a thin border, a small radius and a soft shadow. You will build one in the final lesson.
