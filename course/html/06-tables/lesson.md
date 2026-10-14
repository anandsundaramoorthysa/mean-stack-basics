Use a table for data that really has rows and columns, such as marks or timetables. Do not use tables to arrange the look of a page.

## The pieces

- `<table>` wraps everything.
- `<tr>` is one **table row**.
- `<th>` is a **header cell** (bold and centred by default). `<td>` is an ordinary **data cell**.
- `<caption>` is the title of the table. It must be the first child.
- `<thead>` groups the header rows and `<tbody>` groups the data rows.

```html
<table>
  <caption>Marks</caption>
  <thead>
    <tr><th scope="col">Name</th><th scope="col">Score</th></tr>
  </thead>
  <tbody>
    <tr><td>Asha</td><td>88</td></tr>
    <tr><td>Ravi</td><td>92</td></tr>
  </tbody>
</table>
```

## Why scope?

`scope="col"` tells assistive technology that a header cell describes the whole column below it. Use `scope="row"` for a header at the start of a row.

## Keep it rectangular

Every row should have the same number of cells. If one row has too few, the table looks broken. You can make a cell span more with `colspan` or `rowspan`, but start without them.
