Angular is written in **TypeScript**, which is JavaScript with **types**. A type says what kind of value a variable may hold. The editor then warns you about mistakes while you type, long before a user sees them.

## Basic types

You add a type after the name with a colon:

```ts
let studentName: string = 'Asha';
let marks: number = 82;
let passed: boolean = true;
```

Use lowercase `string`, `number` and `boolean`. If you assign a value at once, TypeScript can often **infer** the type, so `let marks = 82;` is also a number. Annotations matter most on function parameters and return values.

## Arrays

```ts
const subjects: string[] = ['Maths', 'Physics'];
```

`string[]` is an array whose items are all strings.

## Functions

```ts
function average(a: number, b: number): number {
  return (a + b) / 2;
}
```

Each parameter has a type. The type after `)` is the **return type**. Calling `average('x', 2)` is now an error.

## Why this matters

Angular code is full of classes and data. Types turn typos and wrong values into red underlines instead of broken pages.
