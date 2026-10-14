Computers store everything as **bytes**: numbers from 0 to 255. Text, images and network messages are all bytes underneath. Node.js gives you two tools to handle them: **Buffer** and **streams**.

## Buffer

A `Buffer` is a block of raw bytes.

```js
const buf = Buffer.from('Hi');
console.log(buf);          // <Buffer 48 69>
console.log(buf.length);   // 2
console.log(buf.toString()); // 'Hi'
```

Characters and bytes are not the same. In UTF-8 an English letter takes one byte, but `é` takes two and most emoji take four:

```js
'héllo'.length;             // 5 characters
Buffer.byteLength('héllo'); // 6 bytes
```

That is why `fs.readFile` without `'utf8'` gives you a `Buffer`: Node does not know yet how to turn the bytes into text.

## Streams

Reading a huge file with `readFile` puts all of it in memory at once. A **stream** instead delivers data in small pieces called **chunks**. A **readable** stream produces chunks, and a **writable** stream accepts them. Files, network requests, `process.stdin` and `process.stdout` are all streams.

The easiest way to consume a readable stream is a `for await` loop:

```js
const fs = require('node:fs');

async function size(file) {
  let bytes = 0;
  for await (const chunk of fs.createReadStream(file)) {
    bytes += chunk.length;
  }
  return bytes;
}
```

You can connect a readable stream to a writable one with `pipe`. This copies a file without ever holding it all in memory:

```js
fs.createReadStream('big.txt').pipe(fs.createWriteStream('copy.txt'));
```

`pipe` does not close the destination stream if the source fails. For real programs use `pipeline` from `node:stream/promises`, which reports errors and cleans up. `pipe` is fine for learning the idea.

## Lines are not chunks

Chunk boundaries have nothing to do with line boundaries. A chunk may end in the middle of a word, so `'ab\ncd'` followed by `'e\nfg'` really contains the lines `ab`, `cde` and `fg`. When you process lines, join the pieces (or keep the unfinished last line for the next chunk) before splitting.

Node also has a `readline` module that does this line handling for you when you read large files.

In the exercise you count lines in a stream, taking care of chunks that cut a line in two.
