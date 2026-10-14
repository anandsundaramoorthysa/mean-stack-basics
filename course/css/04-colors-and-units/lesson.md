CSS values are the settings you give to properties. Two kinds you use constantly are **colours** and **lengths**.

## Writing a colour

All of these can describe the same red:

```css
color: red;                  /* a named colour */
color: #ff0000;              /* hex: red, green, blue as two digits each */
color: rgb(255, 0, 0);       /* the same, in decimal 0 to 255 */
color: hsl(0, 100%, 50%);    /* hue (0-360), saturation, lightness */
```

Names are easy but limited. Hex is what design tools usually give you. `hsl()` is friendly when you want a lighter or darker version: change only the last number.

## Units for sizes

| Unit | Meaning |
|---|---|
| `px` | A CSS pixel, a fixed size. Predictable, but it does not follow the user's text-size setting. |
| `em` | A multiple of the current element's font size, or of its parent's when used for `font-size`. |
| `rem` | A multiple of the root `html` font size, 16px unless changed. |
| `%` | A share of something else, such as the parent's width. |

```css
.parent { font-size: 20px; }
.child  { font-size: 2em; }   /* 40px */
h2      { font-size: 1.5rem; } /* 24px */
```

## Which to pick?

Use `rem` for font sizes and spacing so the page respects a user's browser text setting. Use `%` for widths that should stretch. Use `px` for small details such as border thickness.

When the browser reports a colour back (for example in developer tools or in these checks), it normally shows ordinary colours as `rgb()`, so the checks accept any notation for the same colour.
