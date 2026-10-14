HTML can play sound and video without any plug-in. You use `<audio>` and `<video>`.

```html
<video controls width="480" poster="images/intro.jpg">
  <source src="media/intro.mp4" type="video/mp4">
  <source src="media/intro.webm" type="video/webm">
  Your browser does not support video.
</video>
```

## Attributes

- `controls` shows play, pause and volume buttons. Without it the visitor has no way to start the media, so add it unless you have a good reason.
- `width` and `height` set the size of a video.
- `poster` is an image shown before the video plays.
- `autoplay` and `loop` exist too, but autoplaying sound annoys people and browsers usually block it.

## source and fallback

Different browsers support different file formats. List several `<source>` elements, each with a `src` and a `type` (the MIME type, such as `video/mp4` or `audio/mpeg`). The browser takes the first one it can play.

Text placed inside the element, after the sources, is **fallback content**. Only a browser that does not support the `audio` or `video` element shows it, and modern browsers all support them, so treat it as a safety net. It is a good place for a link to download the file.

## Accessibility

Provide a transcript for audio and captions for video, using a `<track>` element, so people who cannot hear the content can still use it.
