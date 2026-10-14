Some results are not ready straight away: data from a server, a file being read, a timer finishing. A **promise** is an object that stands for a result that will arrive later.

## The three states

- **pending**: still waiting.
- **fulfilled**: finished, and it has a value.
- **rejected**: failed, and it has an error.

Once a promise leaves pending it never changes again.

## Creating a promise

```js
function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('done'), ms);
  });
}
```

The function you give to `new Promise` receives two helpers. Call `resolve(value)` for success or `reject(error)` for failure. Do one of them, once.

## Using a promise with then and catch

```js
wait(500)
  .then((result) => {
    console.log(result);   // done
    return 'next step';
  })
  .then((text) => console.log(text))  // next step
  .catch((error) => console.log('Failed: ' + error.message));
```

- `.then(fn)` runs `fn` with the value when the promise is fulfilled. What `fn` returns becomes the value of the **next** promise in the chain.
- `.catch(fn)` runs when the promise, or any earlier step, rejects.
- If `.catch` returns a normal value, the chain recovers and becomes fulfilled again.

## Shortcuts

```js
Promise.resolve(7);                        // already fulfilled
Promise.reject(new Error('no'));           // already rejected
Promise.all([wait(100), wait(200)]);       // waits for all, gives an array
```

## Things to remember

- Always return the promise from a function, so the caller can attach `then`.
- Reject with an `Error` object, not a bare string.
- `then` callbacks run later, never immediately, even for an already fulfilled promise.

The next lesson shows `async` and `await`, a cleaner way to write the same chains.
