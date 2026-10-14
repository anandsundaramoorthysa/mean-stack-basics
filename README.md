<p align="center">
  <img src="https://raw.githubusercontent.com/anandsundaramoorthysa/mean-stack-basics/main/media/icon.png" alt="MEAN Stack Basics" width="128">
</p>

<h1 align="center">MEAN Stack Basics</h1>

<p align="center">
  <em>Learn web development from zero, inside VS Code. <strong>140 short lessons, quizzes and coding exercises that check your code as you type.</strong></em>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=AnandSundaramoorthySa.mean-stack-basics">
    <img src="https://img.shields.io/visual-studio-marketplace/v/AnandSundaramoorthySa.mean-stack-basics?style=flat-square&logo=visualstudiocode&label=Marketplace&color=007ACC" alt="Marketplace">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=AnandSundaramoorthySa.mean-stack-basics">
    <img src="https://img.shields.io/visual-studio-marketplace/i/AnandSundaramoorthySa.mean-stack-basics?style=flat-square&label=Installs&color=4c1" alt="Installs">
  </a>
  <a href="https://github.com/anandsundaramoorthysa/mean-stack-basics/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/anandsundaramoorthysa/mean-stack-basics/ci.yml?style=flat-square&label=CI&color=007ACC" alt="CI">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License">
  </a>
  <a href="CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome">
  </a>
</p>

---

A Visual Studio Code extension that teaches the **MEAN stack and the web basics under it** to complete beginners:
HTML, CSS, JavaScript, Node.js, Express, MongoDB and Angular. Every lesson is short, ends with questions and a
hands-on exercise, and links to the **official documentation** so you learn to read the real thing.
**Nothing to install, no account, works offline.** AI help is optional and off by default.

![The course map, a lesson and an exercise side by side in VS Code](https://raw.githubusercontent.com/anandsundaramoorthysa/mean-stack-basics/main/media/screenshots/overview.png)

---

## Table of Contents

- [About](#about)
- [What You Will Learn](#what-you-will-learn)
- [How a Lesson Works](#how-a-lesson-works)
- [How Your Code Is Checked](#how-your-code-is-checked)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Commands](#commands)
- [Settings](#settings)
- [Optional AI Helper](#optional-ai-helper)
- [Privacy and Security](#privacy-and-security)
- [Build From Source](#build-from-source)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [Contact](#contact)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## About

Most tutorials ask you to read, then copy. This course asks you to **predict, answer and write**. Each lesson
explains one idea in plain English, asks a few questions where a wrong answer explains why, and gives you a small
coding task. Press one button and your code is checked right away, with a clear reason for anything that is wrong.

It is built for first-year students and self-learners, and it works for lab courses that follow the MEAN stack.
The explanations are written for this course. The extension never copies documentation text; every lesson links to
the matching official page ([MDN](https://developer.mozilla.org/), [Node.js](https://nodejs.org/),
[Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/docs/), [Angular](https://angular.dev/)) so you can read further.

---

## What You Will Learn

| Track | Lessons | You will be able to |
|---|---:|---|
| HTML | 15 | Build structured, accessible pages with text, links, images, lists, tables and forms |
| CSS | 18 | Style pages with selectors, the box model, flexbox, grid and responsive layouts |
| JavaScript | 30 | Write functions, work with arrays and objects, use the DOM and events, handle async code |
| Node.js | 14 | Run JavaScript outside the browser: modules, files, events, HTTP, npm and tests |
| Express | 14 | Build web servers and REST APIs with routing, middleware and error handling |
| MongoDB | 16 | Query and update documents, use aggregation, and model data |
| Angular | 20 | Build front ends with TypeScript, components, signals, services, routing, forms and HTTP |
| AngularJS (legacy) | 6 | Read and maintain older AngularJS 1.x code, and see how it maps to modern Angular |
| Capstone | 7 | Plan and assemble one small MEAN app: an API, a database model and an Angular front end |

The recommended order is the order in the table. You can open any lesson at any time; nothing is locked.

The course targets current versions: Node.js 24 LTS, Express 5, MongoDB 8 and later, and current Angular with
standalone components, signals and the built-in control flow. AngularJS reached end of life in January 2022, so it
has its own short, clearly marked track.

---

## How a Lesson Works

1. **Read** a short explanation with a small example (10 to 20 minutes per lesson).
2. **Answer** three to five questions: multiple choice, fill in the blank, predict the output, put lines in order, or find the bug.
3. **Write code** in an exercise file that the extension creates for you.
4. **Check my code** and read a plain-English result for every requirement.
5. **Hints** are available in three steps (a nudge, a pointer, and a near-complete answer). After three failed checks, or all three hints, you can compare your file with the reference solution.
6. **Read more** in the official documentation linked at the bottom of the lesson.

Finish a lesson by passing the exercise and answering about 80 percent of the questions correctly. When you finish a whole track you can export a printable certificate, and at any time you can export a progress report.

---

## How Your Code Is Checked

Checks run **on your computer** and are deterministic: the same code always gets the same result. No AI decides whether you pass.

| Track | How it is checked |
|---|---|
| HTML, CSS | Your page is drawn in a sandboxed preview inside VS Code (scripts off). Rules then check the elements, text, attributes and computed styles |
| JavaScript, Node.js, Express | Your file runs on the Node.js built into VS Code, in a separate process with a time limit. Tests call your functions, start your Express app on a free port, and read what you print |
| MongoDB | Your query runs on a small practice database using a MongoDB-compatible query engine. Indexes, text search and geospatial queries cannot be run there, so those lessons use questions and pattern checks |
| Angular, AngularJS | Your code is checked with patterns. No Angular project is built, and each lesson points to angular.dev for the full toolchain |

Because of that last point, treat passing a check as "this matches what the lesson asks", and use the official
documentation and a real project to go further.

---

## Installation

### From the VS Code Marketplace (recommended)

1. Open **Visual Studio Code** 1.85 or later
2. Open the **Extensions** view (`Ctrl+Shift+X`)
3. Search for **MEAN Stack Basics**
4. Click **Install**

Or from the command line:

```bash
code --install-extension AnandSundaramoorthySa.mean-stack-basics
```

### From a `.vsix` file

Download the `.vsix` from the [Releases](https://github.com/anandsundaramoorthysa/mean-stack-basics/releases) page, then:

```bash
code --install-extension mean-stack-basics-1.0.0.vsix
```

You do not need to install Node.js, a browser or a database to do the lessons.

---

## Getting Started

1. Click the **MEAN Stack Basics** icon in the Activity Bar, or press `Ctrl+Alt+M` (`Cmd+Alt+M` on Mac) to search lessons.
2. Press **Continue Learning**, or open any lesson in the course map.
3. Read, answer the questions, then press **Open exercise file**. Exercise files are created in a folder called `MEAN Stack Basics` in your home folder (change it in [settings](#settings)).
4. Edit the file, save it, and press **Check my code**.

A short walkthrough is available too: run **Welcome: Open Walkthrough...** from the Command Palette and choose *Get started with MEAN Stack Basics*.

---

## Commands

Type `ms` in the Command Palette (`Ctrl+Shift+P`) to see every command.

| Command | Description |
|---|---|
| `ms: Open Course` | Show the course map in the sidebar |
| `ms: Continue Learning` | Open the next lesson you have not finished |
| `ms: Find a Lesson` | Search lessons by topic (`Ctrl+Alt+M`) |
| `ms: Check My Code` | Check the exercise of the open lesson |
| `ms: Open Exercise File` | Create or open the exercise file of the open lesson |
| `ms: Reset Lesson Progress` | Clear progress for one lesson (right-click it in the course map) |
| `ms: Reset All Progress` | Clear all progress |
| `ms: Export Certificate` | Save a printable certificate for a finished track |
| `ms: Export Progress Report` | Save a Markdown report of your progress |
| `ms: AI: Set API Key` | Store the key for the optional AI helper |
| `ms: AI: Clear API Key` | Remove the stored key |
| `ms: AI: Test Connection` | Check the AI settings |

---

## Settings

| Setting | Default | Description |
|---|---|---|
| `meanStackBasics.courseFolder` | `""` | Folder for exercise files. Empty means `MEAN Stack Basics` in your home folder |
| `meanStackBasics.ai.enabled` | `false` | Turn on the optional "Stuck?" helper |
| `meanStackBasics.ai.baseUrl` | `http://localhost:11434/v1` | Base URL of any OpenAI-compatible chat API |
| `meanStackBasics.ai.model` | `""` | Model name to request |
| `meanStackBasics.ai.maxTokens` | `400` | Maximum length of each AI reply |
| `meanStackBasics.ai.maxTokensParam` | `max_tokens` | Request field that limits reply length (`max_completion_tokens` for some newer hosted models) |
| `meanStackBasics.ai.dailyLimit` | `50` | Maximum AI requests per day, counted on your machine |

---

## Optional AI Helper

> **Off by default. Bring your own service. The course works fully without it.**

If you get stuck, an AI model can give a **hint** about a failing check. It never writes the solution and never
decides whether you pass; the automatic checks do that.

1. Turn on `meanStackBasics.ai.enabled`.
2. Set `meanStackBasics.ai.baseUrl` and `meanStackBasics.ai.model` for any service that offers an OpenAI-compatible chat API. A local server such as Ollama or LM Studio costs nothing and keeps everything on your machine.
3. If the service needs a key, run `ms: AI: Set API Key`. It is stored in VS Code secret storage.
4. Run **Check my code**. When a check fails, press **Stuck? Ask the AI helper**.

What happens:

- The first time, you see which host will receive your data and must allow it.
- The request contains the lesson summary and task, the failing checks and your exercise file. Emails, keys, connection strings and your home folder path are removed first.
- The reply is plain text with any code blocks removed, and is marked as possibly wrong.
- Your key is only sent over HTTPS (or to a local server), and a daily request limit applies.

AI hints can be wrong, so check them against the official documentation linked in each lesson.

---

## Privacy and Security

- **No telemetry.** The extension collects no usage data.
- **Your code stays on your machine** unless you turn on the AI helper and allow a host.
- **Progress** is stored in VS Code and can sync through Settings Sync.

Read [PRIVACY.md](PRIVACY.md) and [SECURITY.md](SECURITY.md) for details, including how exercise code is run and how to report a problem.

---

## Build From Source

```bash
# 1. Clone
git clone https://github.com/anandsundaramoorthysa/mean-stack-basics.git
cd mean-stack-basics

# 2. Install dependencies
npm install

# 3. Compile
npm run compile

# 4. Run the unit tests
npm test

# 5. Check every lesson (starters must fail, solutions must pass)
npm run validate

# 6. Launch the Extension Development Host
#    Press F5 in VS Code
```

Package a `.vsix` with `npx vsce package`. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow and
[docs/AUTHORING.md](docs/AUTHORING.md) for how to write lessons.

---

## Contributing

Contributions are welcome: corrections, clearer explanations, better checks, new lessons and code fixes.

- **Found a mistake in a lesson?** Open a [lesson issue](https://github.com/anandsundaramoorthysa/mean-stack-basics/issues/new?template=lesson_issue.md) and link the official documentation that supports the fix.
- **Writing lessons?** Follow [docs/AUTHORING.md](docs/AUTHORING.md). `npm run validate` proves your starter fails and your solution passes.
- **Changing code?** See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Roadmap

- [ ] More practice projects between tracks
- [ ] TypeScript exercises that run for real
- [ ] Optional real-MongoDB mode for indexes, text search and geospatial queries
- [ ] Translations of the lessons
- [ ] Open VSX publication

---

## Contact

Questions, ideas or a lesson that needs fixing? Reach out any of these ways:

- **Open an issue**: [github.com/anandsundaramoorthysa/mean-stack-basics/issues](https://github.com/anandsundaramoorthysa/mean-stack-basics/issues)
- **Start a discussion**: [github.com/anandsundaramoorthysa/mean-stack-basics/discussions](https://github.com/anandsundaramoorthysa/mean-stack-basics/discussions)
- **Email**: [sanand03072005@gmail.com](mailto:sanand03072005@gmail.com?subject=About%20MEAN%20Stack%20Basics)

Please report security problems privately, as described in [SECURITY.md](SECURITY.md).

---

## License

Released under the **MIT License**. See [LICENSE](LICENSE). The lesson text and exercises are original to this
project. Official documentation is linked, never copied.

---

## Acknowledgments

Built with these open-source projects:

- [markdown-it](https://github.com/markdown-it/markdown-it): renders lesson text
- [mingo](https://github.com/kofrasa/mingo): the MongoDB-compatible practice query engine
- [Express](https://github.com/expressjs/express): runs Express exercises
- [linkedom](https://github.com/WebReflection/linkedom): the lightweight DOM used for DOM exercises

This project is independent and is not affiliated with, endorsed by or sponsored by Mozilla, the OpenJS
Foundation, the Node.js project, MongoDB, Inc. or Google (Angular). All product names belong to their owners and
are used only to describe what the lessons teach.

---

<p align="center">
  <a href="https://github.com/anandsundaramoorthysa/mean-stack-basics">GitHub</a> ·
  <a href="https://marketplace.visualstudio.com/items?itemName=AnandSundaramoorthySa.mean-stack-basics">Marketplace</a> ·
  <a href="https://github.com/anandsundaramoorthysa/mean-stack-basics/issues">Issues</a> ·
  <a href="https://github.com/anandsundaramoorthysa/mean-stack-basics/discussions">Discussions</a>
</p>
