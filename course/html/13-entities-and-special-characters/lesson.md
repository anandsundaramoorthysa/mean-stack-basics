Some characters have a special meaning to HTML. The less-than sign `<` starts a tag and the ampersand `&` starts a character reference. If you type them directly in text, the browser may treat them as code, and part of your text will vanish.

To show them as plain text, use a **character reference** (also called an entity). It starts with `&` and ends with `;`.

| You want | Write | Name |
|---|---|---|
| `<` | `&lt;` | less than |
| `>` | `&gt;` | greater than |
| `&` | `&amp;` | ampersand |
| `"` | `&quot;` | quotation mark |
| copyright sign | `&copy;` | copyright |

```html
<p>Write <code>&lt;h1&gt;</code> to start a heading.</p>
<p>Tom &amp; Jerry</p>
<footer>&copy; 2026 My College</footer>
```

## Why bother?

1. **Showing code**: to teach HTML on a page you must show `<h1>` as text instead of making a heading.
2. **Safety**: if a website prints text typed by a user, turning `<` into `&lt;` stops that user from slipping in their own tags.
3. **Characters not on your keyboard**: `&euro;`, `&copy;` and `&nbsp;` (a space that never wraps or collapses).

You can also write a character by its number, such as `&#169;` for the copyright sign. Plain UTF-8 text is fine too, as long as the file declares it with `<meta charset="utf-8">`.
