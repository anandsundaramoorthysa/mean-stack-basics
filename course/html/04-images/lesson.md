Pictures are added with `<img>`. It is a void element, so there is no closing tag, and everything it needs is in attributes.

```html
<img src="images/campus.jpg" alt="Students walking past the library" width="400" height="300">
```

- `src` is the path to the image file, written like a relative link.
- `alt` is **alternative text**. It is read aloud by screen readers, shown when the image fails to load, and used by search engines. Describe what the picture shows in a short phrase. Do not start with "image of".
- `width` and `height` give the size in pixels. The browser then reserves the space before the image arrives, so the page does not jump around while loading.

## Decorative images

If a picture adds nothing (a thin decoration), use an empty `alt=""`. The attribute must still be present, otherwise a screen reader may read out the file name.

## Captions

Wrap an image and its caption in `<figure>` and put the caption in `<figcaption>`:

```html
<figure>
  <img src="images/lab.jpg" alt="A row of computers in a lab" width="400" height="300">
  <figcaption>The computer lab, Block B.</figcaption>
</figure>
```

Make sure the file exists and the path is spelled exactly, including capital letters and the folder name.
