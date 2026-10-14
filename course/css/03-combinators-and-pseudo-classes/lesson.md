Sometimes a class on every element is too much work. **Combinators** let you select by relationship, and **pseudo-classes** let you select by position or state.

## Combinators

```css
nav a { color: darkgreen; }      /* descendant: any a inside nav */
ul > li { font-weight: bold; }   /* child: li directly inside ul */
```

- A **space** means descendant: the element can be nested at any depth.
- `>` means direct child only. Use it when a list contains another list and you want to style just the outer one.

## Pseudo-classes

A pseudo-class starts with a colon and describes a condition of an element.

```css
li:first-child { color: crimson; }
li:nth-child(2) { color: blue; }
li:nth-child(even) { background-color: lightyellow; }
a:hover { color: red; }
```

- `:first-child` matches an element that is the first child of its parent.
- `:nth-child(n)` counts children from 1. Use a number, `odd`, `even` or a formula like `3n`.
- `:hover` applies while the mouse is over the element. It is a state, so you cannot see it in a static check, but you will use it all the time for links and buttons.

## Combining them

You can chain: `ul.menu > li:first-child` means the first li that is a direct child of `ul.menu`. Read selectors from right to left to understand them: "a first-child li, directly inside a ul with class menu".
