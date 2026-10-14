Programs need to send data to each other: from a server to a browser, or from your code to a file. They do it as plain text. **JSON** (JavaScript Object Notation) is the most common text format for that, and every web API you use later speaks it.

## What JSON looks like

```json
{ "name": "Asha", "marks": [70, 90], "passed": true }
```

It looks like a JavaScript object, but the rules are stricter:

- Keys must be in **double quotes**.
- Strings use double quotes only.
- No trailing commas, no comments, no functions.
- Values can be strings, numbers, true, false, null, arrays or objects.

## Object to text, and back

```js
const student = { name: 'Asha', marks: [70, 90] };

const text = JSON.stringify(student);
// '{"name":"Asha","marks":[70,90]}'  (a string)

const again = JSON.parse(text);
console.log(again.marks[0]); // 70
```

- **JSON.stringify(value)** converts a value into JSON text. Add `null, 2` as extra arguments for readable, indented output.
- **JSON.parse(text)** converts JSON text into a real value.

## Invalid text throws

`JSON.parse('not json')` throws an error. When the text comes from outside your program, catch it:

```js
try {
  const data = JSON.parse(input);
} catch (error) {
  console.log('Bad JSON');
}
```

## Good to know

- Inside objects, `stringify` skips functions and `undefined` values (in arrays they become `null`), and dates become text. `NaN` and `Infinity` become `null`.
- Stringify then parse makes a quick deep copy of plain data, but it loses functions, turns dates into text, empties `Map` and `Set`, and throws on circular references. The built-in `structuredClone(value)` is the modern alternative for copying.
