Some attributes work on **every** element. They are called global attributes, and they are how you point at an element later from CSS, JavaScript or a link.

## class and id

- `class` names a group. Many elements can share a class, and one element can have several, separated by spaces: `class="card featured"`.
- `id` names **one** element. It must be unique on the page. Links such as `#top` and JavaScript use it to find that one element.

## data-* attributes

You can store your own small pieces of information on an element with any name that starts with `data-`, such as `data-price`. Write the name in lowercase, with at least one character after the dash:

```html
<div class="card" data-price="499" data-product-id="p12">Notebook</div>
```

They are invisible to visitors but available to CSS and JavaScript.

## lang

Put `lang="en"` on the `<html>` element so browsers, translators and screen readers know the language of the page.

## div and span

Both are generic containers with no meaning of their own.

- `<div>` is a **block** container. It starts on a new line. Use it to group larger parts.
- `<span>` is **inline**. It sits inside a line of text, so you can mark a few words.

```html
<p>Today is <span class="highlight">Friday</span>.</p>
```

Reach for a semantic element first and use `div` and `span` only when nothing else fits.
