An **API** (application programming interface) on the web is a server address that returns data instead of a page. Your JavaScript asks, the server answers, usually in JSON. The built-in `fetch` function does the asking.

## A basic request

```js
async function loadStudents() {
  const response = await fetch('/api/students');
  const students = await response.json();
  return students;
}
```

Two steps, two awaits:

1. `fetch(url)` returns a promise of a **Response**. It resolves as soon as the server starts answering.
2. `response.json()` reads the body and parses the JSON. It is also a promise.

## Checking for failure

A request can fail in two different ways.

- **Network failure** (offline, wrong server, or a cancelled request): `fetch` rejects. Use `try...catch`.
- **HTTP error** (404, 500): `fetch` still resolves! Look at `response.ok` (true for status 200 to 299) or `response.status`.

```js
async function getStudent(id) {
  const response = await fetch('/api/students/' + id);
  if (!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }
  return await response.json();
}
```

## Sending data

To send JSON you give `fetch` a second argument:

```js
await fetch('/api/students', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Asha' })
});
```

## Passing fetch in

In this course's exercises there is no internet. So your function takes the fetch function as a parameter (`fetchFn`) and the checker hands it a fake that returns prepared data. In a real app you would call `getStudent(fetch, 3)` with the real one. This habit of passing in what a function depends on also makes your code easier to test.
