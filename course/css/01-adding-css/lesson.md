HTML says what is on the page. **CSS** (Cascading Style Sheets) says how it looks: colours, sizes, spacing and layout. There are three places to put CSS.

## 1. Inline style

An attribute on one element. Good for a quick test, but it only styles that one tag.

```html
<h1 style="color: red;">Welcome</h1>
```

## 2. A style element

Rules inside `<style>` in the `<head>` apply to the whole page. This is what you will use in this course.

```html
<style>
  p {
    color: blue;
    font-size: 18px;
  }
</style>
```

## 3. A linked file

Real websites keep CSS in its own file, such as `style.css`, and load it with `<link rel="stylesheet" href="style.css">`. One file can style many pages. You cannot link files in these exercises, but the rules inside are written exactly the same way.

## Anatomy of a rule

```css
selector {
  property: value;
}
```

- The **selector** picks the elements (`p` means every paragraph).
- Each **declaration** is a property, a colon, a value and a semicolon.
- A **property** is something you can change, such as `color`. The **value** is the setting you choose.

Forgetting a semicolon or a brace is the most common beginner mistake. If nothing changes, check those first.
