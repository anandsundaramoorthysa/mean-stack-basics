You could build a whole page from `<div>` elements, but then nothing says what each part is. **Semantic** elements have names that describe their job. Search engines and screen readers use them to understand and navigate the page.

| Element | Use it for |
|---|---|
| `header` | Introductory area: logo, title, sometimes the menu |
| `nav` | A group of main navigation links |
| `main` | The unique content of this page. A page may have only **one visible** `main` |
| `section` | A themed group of content, normally with a heading |
| `article` | A self-contained item that would make sense alone, such as a blog post |
| `aside` | Related extras, like a sidebar |
| `footer` | Closing area: copyright, contacts |

```html
<body>
  <header>
    <h1>Campus News</h1>
    <nav><a href="#top">Home</a> <a href="#about">About</a></nav>
  </header>
  <main>
    <article><h2>Sports day</h2><p>...</p></article>
    <aside><p>Related links</p></aside>
  </main>
  <footer><p>Campus News</p></footer>
</body>
```

These elements do not change how the page looks by default. Their value is meaning. Use `div` only when no semantic element fits, for example when you need a box for styling.
