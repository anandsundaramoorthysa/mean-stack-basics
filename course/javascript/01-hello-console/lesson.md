JavaScript is a programming language. A program is a list of instructions the computer follows from top to bottom. The simplest instruction is to **print a message**.

## console.log

`console.log()` prints whatever you put inside the brackets. Text must be wrapped in quotes so JavaScript knows it is text and not a name.

```js
console.log('Hello, world!');
console.log(2 + 3);
```

This prints two lines:

```
Hello, world!
5
```

## Things to notice

- Text in quotes is called a **string**. You can use single quotes `'...'` or double quotes `"..."`.
- Numbers need no quotes, and JavaScript can do the arithmetic for you.
- Each instruction ends with a semicolon `;`. It is optional in many places but a good habit.
- Instructions run **in order**, so the first `console.log` prints first.

## Where this runs

The lesson checker runs your file with **Node.js**, a program that runs JavaScript outside the browser. You will use it later for servers too. You do not need to install anything to do the exercises.
