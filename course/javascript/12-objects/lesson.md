An **object** stores related values under names. Where an array is a numbered list, an object is a set of labelled fields. Much of the data you meet in web development, such as JSON from a server, is made of objects (and arrays).

## Creating and reading

```js
const student = {
  name: 'Asha',
  marks: 88,
  passed: true
};

console.log(student.name);     // dot notation
console.log(student['marks']); // bracket notation
```

Each entry is a **property**: a **key** (name) and a **value**, written `key: value` and separated by commas.

## Dot or brackets?

- Use the dot when you know the key while writing the code: `student.name`.
- Use brackets when the key is stored in a variable or is not a valid name:

```js
const field = 'marks';
console.log(student[field]); // 88
console.log(student.field);   // undefined, looks for a key called "field"
```

## Changing and adding

```js
student.marks = 90;        // change
student.city = 'Chennai';  // add a new property
delete student.passed;     // remove
```

As with arrays, `const` stops you from replacing the object, not from editing it.

## Nested objects

A value can itself be an object or an array:

```js
const person = {
  name: 'Ravi',
  address: { city: 'Pune', pin: '411001' },
  skills: ['HTML', 'CSS']
};

console.log(person.address.city); // Pune
console.log(person.skills[0]);    // HTML
```

## Listing keys

```js
console.log(Object.keys(student)); // ['name', 'marks', 'city']
console.log(Object.values(student));
```

`Object.keys` gives an array of the object's own property names, so you can loop over it or take its `length`.
