When a browser loads an HTML page, it builds a tree of objects in memory called the **DOM** (Document Object Model). Every tag becomes an object you can read and change from JavaScript. The global `document` is the starting point.

Given this HTML:

```html
<h1 id="title">Marks</h1>
<ul>
  <li class="mark">70</li>
  <li class="mark">90</li>
</ul>
```

## Finding elements

`querySelector` takes a **CSS selector**, the same kind you wrote in CSS lessons.

```js
const title = document.querySelector('#title');   // by id
const first = document.querySelector('.mark');    // first with this class
const heading = document.querySelector('h1');     // by tag name
```

It returns the **first** match, or `null` when nothing matches. To get every match, use `querySelectorAll`, which returns a list you can loop over:

```js
const marks = document.querySelectorAll('.mark');
for (const item of marks) {
  console.log(item.textContent);
}
```

## Reading and changing text

`textContent` is the text inside an element.

```js
console.log(title.textContent); // Marks
title.textContent = 'Results';  // the page now shows Results
```

Two details:

- It is a property, so you write no brackets after it.
- The text always arrives as a **string**. `'70' + '90'` is `'7090'`, so convert first with `Number(...)` when you want arithmetic.

## Careful with null

If your selector is misspelled, `querySelector` returns `null`, and `null.textContent` throws an error. When something does not work, print the element with `console.log` first to check you found it.
