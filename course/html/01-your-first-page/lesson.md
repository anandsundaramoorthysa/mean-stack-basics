A web page is a text file. The browser reads it, finds the **elements** inside, and draws them on screen. Every page starts from the same skeleton, so learn it once and you can reuse it forever.

## The skeleton

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
```

- `<!DOCTYPE html>` tells the browser to use modern HTML. It must be the first line.
- `<html>` wraps everything on the page.
- `<head>` holds information **about** the page, such as its `<title>`. Nothing in the head is drawn in the page itself.
- `<body>` holds everything you can **see**.

## Elements have two tags

Most elements have an opening tag, some content, and a closing tag with a slash: `<p>text</p>`. Headings run from `<h1>` (the main heading) down to `<h6>`. A page normally has one `<h1>`.

## Save and check

Edit the file, save it, and press **Check My Code**. The lesson page shows a live preview of your page each time you check.
