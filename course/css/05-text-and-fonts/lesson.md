Most web pages are mostly text, so a few text properties go a long way.

```css
p {
  font-family: Arial, sans-serif;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
}
a {
  text-decoration: none;
}
```

## What each property does

- `font-family` is a priority list. The browser uses the first installed font. Finish with a **generic family** (`serif`, `sans-serif`, `monospace`) so there is always a sensible fallback. Quote font names that contain spaces, digits or punctuation: `"Times New Roman"`. Do not quote the generic families.
- `font-size` sets the size of the letters.
- `font-weight` sets thickness. Use `normal` (400) or `bold` (700), or a number (100, 200 ... 900 are the common steps; any value from 1 to 1000 is allowed). A number only shows a visible difference if the font has that weight.
- `line-height` sets the space between lines. A number with no unit, like `1.5`, means 1.5 times the font size. Around 1.4 to 1.6 is comfortable to read.
- `text-align` aligns text inside its box: `left`, `center`, `right` or `justify`.
- `text-decoration` adds or removes underlines. Links are underlined by default, and `none` removes it.

## Tips

Do not worry about exact fonts looking different on another computer. That is why the fallback list exists. Focus on size, spacing and contrast, because those decide whether text is readable.
