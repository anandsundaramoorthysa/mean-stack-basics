When data is an object, you want TypeScript to know which properties it has. An **interface** describes that **shape**.

## Writing an interface

```ts
interface Student {
  id: number;
  name: string;
  email?: string;
}
```

- Each line is a property name and its type.
- `email?: string` is **optional**. A student object may leave it out.

Now you can use `Student` as a type:

```ts
const topper: Student = { id: 1, name: 'Asha' };
```

If you forget `name`, or spell it `nmae`, the editor shows an error.

## Union types

A **union** lists the allowed values with `|`:

```ts
type Grade = 'A' | 'B' | 'C';
```

A `Grade` can only be one of those three texts. `type` gives a new name to any type.

## Using the shape in a function

```ts
function describe(s: Student): string {
  return `${s.id}: ${s.name}`;
}
```

The backticks make a **template string**; `${...}` inserts a value into it.

## Why this matters

In Angular you will describe the data your components and services pass around (students, products, API replies) with interfaces.
