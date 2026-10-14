Links are what make the web a web. A link is an **anchor** element, `<a>`, with an `href` attribute that holds the destination.

```html
<a href="https://developer.mozilla.org">MDN</a>
```

An **attribute** gives extra information to an element. It sits inside the opening tag as `name="value"`. The text between the tags is what the visitor clicks.

## Absolute and relative addresses

- An **absolute** URL is the full address, including `https://`. Use it to reach another website.
- A **relative** URL is a path from the current file, such as `about.html` or `pages/contact.html`. Use it for pages of your own site, because it keeps working if you move the whole site.

## Jumping inside a page

Give an element an `id` and link to it with `#` plus that id:

```html
<a href="#contact">Go to contact</a>
...
<h2 id="contact">Contact</h2>
```

## Opening a new tab

`target="_blank"` opens the link in a new tab. Add `rel="noopener"` as well. Modern browsers already do this safely, but writing it is common practice and protects older ones. Do not open new tabs for every link, because it surprises visitors.

Write link text that makes sense alone. "Read the course outline" is better than "click here".
