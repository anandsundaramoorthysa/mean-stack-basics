A **class** is a blueprint for objects. Angular components, services and many other parts are classes, so you need to read them comfortably.

## A first class

```ts
class Student {
  constructor(public name: string, private marks: number) {}

  isPassed(): boolean {
    return this.marks >= 40;
  }
}

const asha = new Student('Asha', 72);
console.log(asha.name);       // Asha
console.log(asha.isPassed()); // true
```

- The **constructor** runs when you write `new Student(...)`.
- Putting `public` or `private` before a constructor parameter is a shortcut: it creates a property with that name and stores the value in it.
- `public` means code anywhere can read it. `private` means only code inside the class can. `asha.marks` is an error outside the class.
- A function inside a class is a **method**. Inside it, `this` means the object itself.

## Classes and interfaces

```ts
interface Person {
  name: string;
}

class Student implements Person { /* ... */ }
```

`implements Person` makes TypeScript check that `Student` has everything `Person` asks for.

## Why this matters

A component is `export class SomethingComponent { ... }` with a decorator on top. The properties and methods you write here are what the template can use.
