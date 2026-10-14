A one-line input is not always the right tool. HTML has controls for choices and long text.

## Drop-down list

`<select>` holds several `<option>` elements. The `value` of the chosen option is what gets sent.

```html
<label for="course">Course</label>
<select id="course" name="course">
  <option value="cs">Computer Science</option>
  <option value="ee">Electrical</option>
</select>
```

## Long text

`<textarea>` is a multi-line box. `rows` sets the visible height. Unlike `input` it has a closing tag, and any text between the tags is the starting content.

## Radio buttons and checkboxes

- **Radio buttons** let the visitor pick **one** option. Give every radio in a group the **same** `name`, and a different `value`.
- **Checkboxes** are on or off. Each one is independent.

```html
<input type="radio" id="beginner" name="level" value="beginner">
<label for="beginner">Beginner</label>
```

## Grouping

Wrap related controls in `<fieldset>` and name the group with `<legend>`. Screen readers usually announce the legend when you enter the group, which helps with radio buttons, where the question matters as much as the answer.
