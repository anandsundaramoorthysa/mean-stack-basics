A **variable** is a named box that holds a value. Instead of repeating `70` everywhere, you store it once and use the name.

## let and const

```js
const college = 'Anna University'; // cannot be reassigned
let marks = 70;                    // can be reassigned

marks = marks + 10;
console.log(college, marks);       // Anna University 80
```

- `const` means the name always points to the same value. Trying `college = 'X'` causes a `TypeError`.
- `let` means you may give the name a new value later.
- Start with `const`. Switch to `let` only when you really need to change the value.

You will also see the old keyword `var` in older code. Avoid it in new code (lesson 14 explains why).

## Reading an assignment

The `=` sign is **assignment**, not "equals" as in maths. JavaScript calculates the right side first, then stores the result in the name on the left. That is why `marks = marks + 10` makes sense.

## Naming rules

- Use letters, digits, `_` and `$`. A name cannot start with a digit and cannot contain spaces or hyphens.
- Names are case-sensitive: `Marks` and `marks` are different variables.
- Use **camelCase**: first word lower case, later words start with a capital, such as `studentName`.
- Choose names that say what the value means. `total` is better than `x`.

## Exporting

Later exercises put code in a file and share it with `module.exports = { ... }`. The lesson checker reads your file through those exports.
