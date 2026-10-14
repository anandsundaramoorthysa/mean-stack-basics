A **selector** tells the browser which elements a rule applies to. Choosing the right selector is half of CSS.

## Type selector

Use the tag name. It matches every element of that type.

```css
p { color: green; }
```

## Class selector

Add `class="note"` to any elements, then select them with a dot. Many elements can share a class, and one element can have several classes (`class="note big"`).

```css
.note { color: orange; }
```

## Id selector

An `id` names one unique element. Select it with a hash.

```css
#warning { color: red; }
```

Use ids sparingly. Classes are easier to reuse.

## Grouping

Separate selectors with commas to share declarations.

```css
h1, h2, h3 {
  color: navy;
}
```

## Which should you use?

Start with classes for most styling. Use type selectors for broad defaults like `body` or `p`. Keep ids for things that really are unique, such as one page banner.

Notice that the dot and the hash are part of the selector but not part of the name in the HTML: `class="note"` becomes `.note`.
