# Authoring lessons

This guide is for anyone writing or reviewing lessons in `course/`. Every lesson is checked by `npm run validate`, which proves that the starter file fails and the reference solution passes.

## Layout

```
course/
  tracks.json                    ordered list of tracks
  <track>/<NN>-<slug>/           one folder per lesson, NN = 01, 02, ...
    lesson.json                  metadata, quiz, exercise settings
    lesson.md                    the explanation (Markdown)
    starter.<ext>                what the learner starts with
    solution.<ext>               the reference solution (never shown by default)
    test.js                      only for exercises of kind "js"
```

The learner edits a copy of the starter named `exercise.file` (for example `index.html`). `<ext>` must match the extension of `exercise.file`.

## lesson.json

```json
{
  "title": "Short title",
  "minutes": 12,
  "summary": "One sentence that says what the learner will be able to do.",
  "docs": [{ "title": "MDN: The title element", "url": "https://developer.mozilla.org/..." }],
  "quiz": [ ],
  "exercise": { }
}
```

Rules enforced by the validator:

- `minutes` is an integer from 3 to 45. Aim for 10 to 20.
- `docs` has at least one official documentation link with an `https` URL. Run `node out/tools/validate.js --links` to confirm every URL loads.
- `lesson.md` is at least 40 words. Aim for 150 to 300 words plus code.
- A lesson needs a quiz, an exercise, or both. Most lessons should have both.

### Quiz questions

Use 3 to 5 questions per lesson and mix the types. Every question needs `explain`, shown after the learner answers. Write `explain` so a wrong answer teaches something.

| type | fields | notes |
|---|---|---|
| `mcq` | `q`, `options` (2-6), `answer` (index, or array of indexes), `explain` | Options must be unique. Vary the position of the right answer. |
| `fill` | `q`, `template`, `blanks`, `explain` | Each `___` in `template` is one blank. `blanks` is a list with one array of accepted answers per blank. Matching ignores surrounding spaces and is case-sensitive, so list every accepted spelling. |
| `predict` | `q`, `code`, `language`, `answer`, optional `accept`, `explain` | The learner types the output. Whitespace is collapsed, so line breaks match single spaces. Put alternative accepted strings in `accept`. |
| `order` | `q`, `lines` (3-8, in the correct order), `explain` | The page shuffles the lines. |
| `bug` | `q`, `code`, `answerLines` (1-based), `explain` | The learner clicks the faulty line. |

`q` and `explain` accept inline Markdown such as `code` and **bold**.

### Exercise

```json
"exercise": {
  "kind": "html | js | text",
  "file": "index.html",
  "task": "Markdown instructions. Say exactly what to build.",
  "hints": ["nudge", "pointer to the concept or line", "near-complete answer"],
  "checks": [ ],
  "fixtures": { "data.txt": "file content placed in the working directory" },
  "timeoutMs": 8000
}
```

- `hints` must have exactly three entries. Hint 1 nudges, hint 2 points at the concept or the line, hint 3 shows the near-complete answer.
- `task` should be short and list the requirements as bullets that match the check names.
- `fixtures` and `timeoutMs` are only used by kind `js`.

## Exercise kinds

### kind: "html" (HTML and CSS)

The learner's single file is rendered in a sandboxed frame that is 800 pixels wide with scripts disabled. Each check in `checks` is a rule run against the rendered page. Use `<style>` inside the file for CSS lessons.

```json
{ "name": "Shown to the learner as a checklist item", "hint": "Shown when the check fails", "selector": "h1" }
```

Fields (combine freely, all optional except `name`, and one of `selector` or `source`):

- `selector`: any CSS selector. By default at least one element must match.
- `count`: a number for an exact count, or `{ "min": 1, "max": 3 }`.
- `scope`: `first` (default), `all` or `any`. Which matched elements the rules below apply to.
- `text`: `{ "equals" | "includes" | "regex" }` against the element text. `equals` ignores extra whitespace, `includes` ignores case.
- `attr`: `{ "name": "href", "equals" | "includes" | "regex" | "present": true/false }`.
- `style`: computed style: `{ "prop": "color", "equals": "red" }`, `"oneOf": ["red", "#f00"]`, `"regex"`, `"min"` or `"max"` (numeric). Values are normalised by the browser, so `red`, `#f00` and `rgb(255, 0, 0)` all match each other. Use kebab-case or camelCase property names.
- `source`: checks the raw file instead of the page: `{ "includes" | "notIncludes" | "regex", "flags" }`.

Tips:

- Browsers repair missing `<head>` and `<body>`, so use `source` to require tags that must be written.
- Prefer checking behaviour over exact wording, but check text when the lesson is about that exact text.
- Do not depend on fonts, pixel positions or viewport units. Check `display`, `flex-direction`, `padding-top`, `color`, `font-weight` and similar properties.

### kind: "text" (Angular, TypeScript, AngularJS, config files)

The file is checked with regular expressions. Whitespace is collapsed to single spaces before matching unless `collapseWhitespace` is `false`.

```json
{ "name": "The selector is app-greeting", "hint": "Add selector: 'app-greeting'.", "regex": "selector\\s*:\\s*['\"]app-greeting['\"]", "flags": "i", "not": false }
```

Write patterns that accept every valid way of writing the answer (single or double quotes, optional type annotations, optional semicolons). Use `"not": true` to require that something is absent. Remember to double the backslashes in JSON.

### kind: "js" (JavaScript, Node.js, Express, MongoDB)

Add a `test.js` next to the lesson. It runs in a separate Node.js process with a time limit. The harness provides these globals, so do not `require` them:

| Global | What it does |
|---|---|
| `check(name, fn)` | Registers one check. `fn` may be async. Throwing fails the check, and the thrown message is shown to the learner. |
| `learner()` | Loads the learner's file with `require` and returns its `module.exports`. Syntax errors and runtime errors become friendly failure messages. |
| `source` | The learner's file as a string, for `ok(/for\s*\(/.test(source), '...')` style checks. |
| `printed()` | Array of lines the learner's code passed to `console.log` while loading. Call `learner()` first. |
| `eq(actual, expected, message?)` | Deep strict equality. The failure message reads `message Expected X but got Y.` |
| `near(actual, expected, message?, tolerance?)` | Number comparison. |
| `ok(condition, message)` | Fails with `message` when the condition is false. |
| `runScript({ stdin, args })` | Runs the learner's file as its own process and resolves to `{ stdout, stderr, code, timedOut }`. Use for programs that read input or print results. |
| `request(appOrServer)` | For Express apps and `http.Server` objects. Returns `get(path)`, `post(path, body)`, `put`, `patch`, `delete`. Each resolves to `{ status, headers, text, json }`. Objects are sent as JSON. |
| `dom(html, { runLearner })` | Builds a DOM from `html`, sets globals `document`, `window`, `alert`, `localStorage`, then loads the learner's file so its top-level code runs against that DOM. Returns `{ document, window, alerts, click(el), type(el, value) }`. |
| `mongo(seed)` | Runs the learner's file as MongoDB shell code against `seed` (an object of collection name to array of documents). Returns `{ result, collection(name) }`. `result` is the value of the last statement as plain JSON, and `collection(name)` returns the documents after any writes. |

Rules for `test.js`:

- Write at least two checks, each with a readable name that reads like a requirement ("The first line is Hello, MEAN!").
- Test behaviour, not the exact source, unless the lesson is about that syntax.
- Give failure messages that help: say what was expected and hint at the cause.
- Express exercises must end with `module.exports = app;`. Express 5 is installed. The learner never calls `app.listen` in exercises.
- Node.js exercises that read files get them through `fixtures`. The working directory contains the fixtures.
- MongoDB exercises are written as shell syntax, for example `db.students.find({ marks: { $gt: 80 } })`. Supported: `find`, `findOne`, `countDocuments`, `distinct`, `aggregate`, `insertOne`, `insertMany`, `updateOne`, `updateMany`, `deleteOne`, `deleteMany`, `createIndex` (no-op), cursor `sort`, `skip`, `limit`, `toArray`. Not supported: geospatial queries, `$text` search, real indexes. For those topics use quiz questions and `text` exercises that check the source with regular expressions.
- Network access is not available. Anything that calls a real web API must take the fetch function as a parameter so the test can pass a fake.
- MongoDB documents get a string `_id`. Compare names and values, or use `$project: { _id: 0 }`.

Example `test.js`:

```js
check('add returns the sum', () => eq(learner().add(2, 3), 5, 'add(2, 3) should be 5.'));
check('add works with negatives', () => eq(learner().add(-2, 1), -1));
```

## Writing style

- Write for a first-year college student who has never programmed. Use plain English, short sentences, and second person ("you").
- Introduce one idea per lesson. Define a term the first time it appears, in bold.
- Do not use emoji. Do not use jokes that need cultural context.
- Examples should be small and realistic: students, marks, products, cities. Avoid names that could offend.
- Explain in your own words. Do not copy text from MDN, the Node.js, Express, Angular or MongoDB documentation. Link to the official page instead and let the learner read it there.
- Target current versions: Node.js 24 LTS, Express 5, MongoDB 8 and later, current Angular with standalone components, signals and the built-in control flow (`@if`, `@for`). AngularJS 1.x is end-of-life and is taught only in the legacy track.
- Technical facts must be correct. Check anything you are not sure about against the official documentation before writing it.

## Checklist before you finish a lesson

1. The quiz mixes at least two question types and every `explain` teaches.
2. The starter fails at least one check and the solution passes all of them.
3. Check names read as requirements, and failure hints say what to fix.
4. Each hint is more helpful than the one before, and hint 3 is nearly the answer.
5. `node out/tools/validate.js --track <id> --links` reports no problems.
