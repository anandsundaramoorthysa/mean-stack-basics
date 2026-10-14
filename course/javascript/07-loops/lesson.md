A **loop** repeats a block of code. Instead of writing `console.log` fifty times, you write it once and let the loop run it.

## The for loop

```js
for (let i = 1; i <= 3; i++) {
  console.log('Round', i);
}
```

The brackets hold three parts separated by semicolons:

1. **Start**: `let i = 1` runs once at the beginning.
2. **Condition**: `i <= 3` is checked before every round. When it is false the loop ends.
3. **Step**: `i++` runs after every round. It means "add 1 to i".

## Running totals

Loops often build up a result:

```js
let total = 0;
for (let i = 1; i <= 5; i++) {
  total += i; // same as total = total + i
}
console.log(total); // 15
```

## The while loop

Use `while` when you do not know in advance how many rounds are needed.

```js
let n = 3;
while (n > 0) {
  console.log(n);
  n--; // without this line the loop never ends
}
```

An **infinite loop** happens when the condition never becomes false. If your program freezes, check that something inside the loop changes the condition.

## break and continue

```js
for (let i = 1; i <= 10; i++) {
  if (i === 3) continue; // skip 3
  if (i === 6) break;    // stop completely
  console.log(i);        // prints 1 2 4 5
}
```

- `continue` skips the rest of the current round.
- `break` leaves the loop immediately.
