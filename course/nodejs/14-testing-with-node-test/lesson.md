A **test** is a small program that calls your code and checks the result. Instead of running your program and looking at the output yourself, you let the computer do it, as often as you like. This course uses tests behind every exercise, and Node.js has a test runner built in, so you need no extra package.

## Your first test

Suppose `math.js` exports an `add` function. Create `math.test.js` next to it:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { add } = require('./math');

test('add adds two numbers', () => {
  assert.equal(add(2, 3), 5);
});

test('add works with negative numbers', () => {
  assert.equal(add(-2, 1), -1);
});
```

- `test(name, fn)` describes one behaviour. The name should read like a sentence.
- The **assert** module compares values. If a comparison is wrong it throws, and the test fails.

## Running the tests

In a terminal, inside the project folder:

```
node --test
```

Node looks for files such as `*.test.js`, `*-test.js`, `*_test.js`, `test-*.js` and `test.js`, plus any file inside a folder named `test`. It runs each one and prints which tests passed or failed, with the expected and actual values for a failure. Put `"test": "node --test"` in the `scripts` of `package.json` and `npm test` does the same thing.

## Useful assertions

| Call | Passes when |
|---|---|
| `assert.equal(a, b)` | `a` and `b` are equal (strict, when you load `node:assert/strict`) |
| `assert.deepEqual(a, b)` | two objects or arrays have the same contents |
| `assert.ok(value)` | the value is truthy |
| `assert.throws(() => f(), RangeError)` | calling `f` throws a `RangeError` |

For code that returns a promise, make the test function `async` and `await` the call.

## What to test

Test the normal case, the **edge cases** and the invalid input. For a grading function the most revealing marks are those on the boundaries, such as 74 and 75. A common bug is writing `>` where you meant `>=`, and only a boundary value exposes it.

## The exercise

You get a function with bugs, and hidden tests like the ones above. Read the rules in the task, find which cases the function gets wrong and fix them. This is how real programmers work: the failing test shows the problem, and you change the code until it goes green.
