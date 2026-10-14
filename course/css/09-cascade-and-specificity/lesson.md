What happens when two rules style the same element differently? CSS has a clear way to choose, called the **cascade**. Roughly, for normal rules, the browser asks three questions in order.

## 1. Importance

A declaration marked `!important` beats a normal one. Avoid it: it makes later changes harder.

## 2. Specificity

A more specific selector wins, whatever its position. Think of it as points:

| Selector kind | Strength |
|---|---|
| Inline `style` attribute | highest |
| id (`#special`) | strong |
| class, attribute, pseudo-class (`.note`, `:hover`) | medium |
| type (`p`, `h1`) | weak |

```css
p      { color: blue; }    /* weak */
.note  { color: green; }   /* wins over p */
#special { color: red; }   /* wins over .note */
```

The counts are compared column by column (ids first, then classes, then types), so ten classes still do not beat one id.

## 3. Order

If importance and specificity tie, the rule written **later** wins.

```css
.late { background-color: yellow; }
.late { background-color: pink; }   /* pink wins */
```

## Practical advice

- Keep selectors short and mostly classes. Then order decides, and that is easy to see.
- When a style "does not work", some other rule is probably winning. Look for a more specific selector.
- Browser developer tools show crossed-out declarations that lost. Learn to use them early.
