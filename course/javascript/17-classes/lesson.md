So far you made objects one at a time with `{ ... }`. When you need many similar objects, such as a hundred students, a **class** lets you describe the shape once and stamp out copies.

## Defining and using a class

```js
class Student {
  constructor(name) {
    this.name = name;
    this.marks = [];
  }

  addMark(mark) {
    this.marks.push(mark);
  }
}

const asha = new Student('Asha');
asha.addMark(90);
console.log(asha.marks); // [ 90 ]
```

- The **constructor** runs once when you write `new Student(...)`. Use it to set up the object's data.
- **this** means "the object being worked on right now". `this.name = name` stores the argument on the new object.
- **Methods** are functions inside the class. You write them without the word `function`, and every object made from the class can call them.

## Inheritance

A class can build on another with `extends`. The child gets every method of the parent and may replace or add some.

```js
class Topper extends Student {
  describe() {
    return 'Topper ' + this.name;
  }
}
```

If the child has its own constructor, call `super(...)` first. It runs the parent constructor. Inside a method, `super.methodName()` calls the parent's version.

## Remember

- Class names start with a capital letter by habit.
- No commas between methods.
- Forgetting `new` is an error: the constructor must be called with it.

Angular components, which you meet later, are classes, so this lesson is worth knowing well.
