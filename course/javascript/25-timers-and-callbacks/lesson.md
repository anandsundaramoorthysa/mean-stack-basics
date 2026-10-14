Sometimes you want code to run **later**: show a message after three seconds, update a clock every second. JavaScript gives you timers for this, and they rely on **callbacks**.

## Callbacks

A **callback** is a function you pass to another function so that it can be called later. You already used one with `addEventListener`.

```js
function runTwice(action) {
  action();
  action();
}

runTwice(() => console.log('Hi')); // prints Hi two times
```

## setTimeout: once, later

```js
setTimeout(() => {
  console.log('Time is up');
}, 2000);
```

The first argument is the callback and the second is the delay in **milliseconds** (1000 is one second). The program does not wait. It carries on and comes back when the time has passed.

```js
console.log('A');
setTimeout(() => console.log('B'), 1000);
console.log('C');
// A, C, then B
```

## setInterval: again and again

```js
let seconds = 0;
const id = setInterval(() => {
  seconds = seconds + 1;
  console.log(seconds);
}, 1000);
```

It repeats forever until you cancel it. Both timer functions return an **id**, which you give to `clearInterval(id)` or `clearTimeout(id)`.

```js
if (seconds === 5) {
  clearInterval(id);
}
```

## Common mistake

Passing `greet()` instead of `greet` runs the function straight away. Pass the function itself, or wrap the call in an arrow function: `() => greet('Asha')`.

Timers are your first taste of **asynchronous** code, where results arrive later. Promises, in the next lessons, handle this more neatly.
