Every element on a page is a rectangular box. The **box model** describes its four layers, from the inside out.

1. **Content**: the text or image itself.
2. **Padding**: space between the content and the border, inside the box.
3. **Border**: a line around the padding.
4. **Margin**: empty space outside the border that pushes other boxes away.

```css
.card {
  padding: 20px;
  border: 2px solid #333;
  margin-bottom: 30px;
}
```

## Shorthand values

`padding` and `margin` accept one to four values:

```css
padding: 20px;              /* all four sides */
padding: 10px 30px;         /* top and bottom, then left and right */
padding: 5px 10px 15px 20px; /* top, right, bottom, left (clockwise) */
```

You can also set one side: `margin-top`, `padding-left` and so on.

## Border

The `border` shorthand has a width, a style and a colour: `border: 2px solid #333;`. If you forget the style, nothing is drawn.

## Padding or margin?

Ask: should the background colour reach this space? If yes, use padding. If the space should be empty and separate this box from its neighbours, use margin.

Browsers add default margins to `body`, headings and paragraphs. That is why a page with no CSS still has some space around it. Setting `margin-top: 0` on a heading is a common fix when it sits at the top of a box.
