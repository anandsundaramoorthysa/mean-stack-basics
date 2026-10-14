# Changelog

## 1.0.0

An interactive course for learning web development inside VS Code, from HTML to a small MEAN project.

### Course
- **140 lessons in nine tracks:** HTML (15), CSS (18), JavaScript (30), Node.js (14), Express (14), MongoDB (16), Angular (20), AngularJS legacy (6) and a Capstone MEAN project (7).
- Every lesson has a short explanation, three to five quiz questions and, in 137 lessons, a coding exercise with three levels of hints.
- Question types: multiple choice, fill in the blank, predict the output, put lines in order, and find the bug. Wrong answers explain why.
- Every lesson links to the matching official documentation (MDN, Node.js, Express, MongoDB, Angular, TypeScript, AngularJS).
- Targets Node.js 24 LTS, Express 5, MongoDB 8 and later, and current Angular (standalone components, signals, built-in control flow).

### Checking your code
- **HTML and CSS** are drawn in a sandboxed preview and checked for elements, text, attributes and computed styles.
- **JavaScript, Node.js and Express** run on the Node.js that ships with VS Code in a separate process with a time limit. Tests can call your functions, read what you print, drive a DOM, run your script with input, and start your Express app on a free port.
- **MongoDB** queries run on a built-in practice database with a MongoDB-compatible query engine, including aggregation, `$lookup` and updates.
- **Angular and AngularJS** exercises are checked with patterns and never need a build.
- Friendly, specific failure messages. Syntax errors, infinite loops and `process.exit` are caught and explained.
- Every starter file is proven to fail and every reference solution is proven to pass by `npm run validate`, which also checks every documentation link.

### Learning experience
- Course map in the Activity Bar with progress per track, status bar progress, and `Continue Learning`.
- Lesson page with live preview for HTML and CSS, three-step hints, and a reference-solution comparison that unlocks after three failed checks or all three hints.
- Quick search for lessons with `Ctrl+Alt+M`. Every command starts with `ms:` in the Command Palette.
- Progress is saved and can sync across machines with Settings Sync. Export a printable certificate for a finished track and a Markdown progress report.
- A short getting-started walkthrough.
- Accessible by design: keyboard-operable questions, labelled controls, results announced to screen readers, themed with VS Code colours.

### Optional AI helper (off by default)
- A "Stuck?" button gives a hint for a failing check. Bring your own service: any OpenAI-compatible chat API, including free local servers such as Ollama or LM Studio.
- Hints only. Code blocks are removed from replies, and the AI never decides whether you pass.
- Consent is requested per host. Emails, keys, connection strings and home paths are removed before anything is sent. Keys are kept in VS Code secret storage and sent only over HTTPS or to a local server. A daily request limit applies.

### Project
- No telemetry. Documentation: README, CONTRIBUTING, SECURITY, PRIVACY, Code of Conduct and a lesson authoring guide.
- Unit tests, a real-browser test of the lesson page, and an end-to-end test that runs inside VS Code.
