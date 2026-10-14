Two small pieces of syntax make modern JavaScript shorter: **destructuring** takes values out of arrays and objects, and **spread** (`...`) copies them into a new one.

## Array destructuring

Values are assigned by position:

```js
const marks = [72, 85, 64];
const [first, second] = marks;
console.log(first, second); // 72 85
```

A neat use is swapping two variables or returning two values from a function.

## Object destructuring

Values are assigned by key name:

```js
const student = { name: 'Asha', marks: 88, city: 'Chennai' };
const { name, marks } = student;
console.log(name, marks); // Asha 88
```

You can also do it right in the parameter list, which Angular and Express code uses all the time:

```js
const describe = ({ name, marks }) => `${name}: ${marks}`;
console.log(describe(student)); // Asha: 88
```

Rename with a colon (`const { name: studentName } = student`) or give a default (`const { city = 'Unknown' } = student`). A default is used only when the value is missing or `undefined`, not for `null`.

## Spread

Three dots spread the items of an array or the fields of an object into a new one:

```js
const a = [1, 2];
const b = [3, 4];
console.log([...a, ...b]);  // [1, 2, 3, 4]

const base = { name: 'Asha', marks: 50 };
const updated = { ...base, marks: 90 };
console.log(updated); // { name: 'Asha', marks: 90 }
console.log(base);    // { name: 'Asha', marks: 50 }
```

A later property replaces an earlier one with the same key. Because spread builds a **new** array or object, the original stays unchanged. That is the standard way to "update" data without editing it, and many front-end tools, including Angular signals, are designed around it.

Spread makes a **shallow** copy: nested objects inside are still shared with the original.
