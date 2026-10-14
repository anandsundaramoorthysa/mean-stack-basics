Most of a web page is text, and HTML lets you say what each piece of text **means**: a heading, a paragraph, something important.

## Headings and paragraphs

`<h1>` to `<h6>` are headings. `h1` is the most important and `h6` the least. Think of a book: one title (`h1`), chapters (`h2`), sections inside chapters (`h3`). Do not skip levels just to get smaller text, because screen readers use the levels to build an outline of the page.

A paragraph is `<p>`. Extra spaces and blank lines in your file are collapsed into a single space, so use a new `<p>` for each paragraph.

## Emphasis

- `<strong>` marks text that is **important**. Browsers show it bold.
- `<em>` marks text that is **stressed**, the way your voice stresses a word. Browsers show it italic.

```html
<p>Submit the form <strong>before Friday</strong>. It is <em>really</em> short.</p>
```

## Breaks and dividers

`<br>` forces a line break inside a paragraph, for example in an address. `<hr>` draws a horizontal line between topics. Both are **void elements**: they have no content, so they have no closing tag.

```html
<p>12 College Road<br>Chennai</p>
<hr>
```
