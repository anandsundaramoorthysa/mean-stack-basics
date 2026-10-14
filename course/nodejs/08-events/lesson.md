A lot of Node.js code is organised around **events**: something happens, and the parts of the program that care are told. A button click in the browser is an event. In Node a server receives a request, a stream finishes, a timer fires. The tool behind many of these is the **EventEmitter** class.

```js
const EventEmitter = require('node:events');
const bell = new EventEmitter();
```

## The three methods you need

**on** registers a **listener**, a function that runs each time the event is announced:

```js
bell.on('ring', (who) => {
  console.log('Someone rang: ' + who);
});
```

**emit** announces the event. Anything after the name is passed to the listeners:

```js
bell.emit('ring', 'Asha');
// Someone rang: Asha
```

**once** works like `on`, but the listener runs only the first time and is then removed:

```js
bell.once('open', () => console.log('Opening for the first time'));
```

## Things to notice

- The event name is just a string you invent. Pick clear names such as `'order'` or `'done'`.
- Listeners run **synchronously**, in the order they were added, at the moment you call `emit`.
- Register listeners **before** you emit. An event that already happened is not replayed.
- One event can have many listeners, and `emitter.listenerCount('ring')` tells you how many.
- The special event name `'error'` is treated specially: if it is emitted and nobody listens, Node throws the error and may crash the program.

## Why bother?

Events let the code that announces something stay separate from the code that reacts. The emitter does not need to know who is listening. Many Node objects, including servers, streams and `process`, are event emitters, so what you learn here applies in the next lessons.

You can also build your own class with `class Shop extends EventEmitter { ... }` and give it its own methods and events.
