Not every answer needs code. A home page, a stylesheet or a logo is just a file. A **static file** is one the server sends exactly as stored. Express serves whole folders of them with one built-in middleware, `express.static`.

## Serving a folder

Suppose your project looks like this:

```
my-site/
  app.js
  public/
    index.html
    css/site.css
    logo.png
```

In `app.js`:

```js
const express = require('express');
const app = express();

app.use(express.static('public'));
```

Now the folder contents are available straight from the root:

| URL | File sent |
|---|---|
| `/` | `public/index.html` |
| `/css/site.css` | `public/css/site.css` |
| `/logo.png` | `public/logo.png` |

The folder name `public` is not part of the URL. `index.html` is sent for the folder request `/` automatically.

## Adding a prefix

Give `app.use` a path first and the files appear under that prefix:

```js
app.use('/assets', express.static('public'));
// /assets/logo.png  ->  public/logo.png
```

Files and folders whose names start with a dot, such as `.env`, are not served by default in Express 5 (the `dotfiles` option is `"ignore"`).

## Order and unknown files

`express.static` calls `next()` when it cannot find a file, so later routes still run. If nothing answers, the result is a 404. Put it above routes that might clash with a file name.

## A note about folder paths

A relative name like `'public'` is looked up from the folder where you started Node, which may not be the folder holding `app.js`. In a real project, make it exact with the Node.js `path` module:

```js
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
```

In this lesson's exercise the checker supplies the folders next to the program, so the plain names `'public'` and `'docs'` are what you need.
