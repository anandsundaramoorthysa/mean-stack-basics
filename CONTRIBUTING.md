# Contributing to MEAN Stack Basics

Thanks for taking the time to contribute. The most valuable contributions are **corrections to lessons** (a wrong
fact, a confusing explanation, a check that rejects a correct answer) and **new lessons**. Code changes are welcome too.

These are guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Working on Lessons](#working-on-lessons)
- [Coding Guidelines](#coding-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)
- [Questions?](#questions)

---

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior
to [sanand03072005@gmail.com](mailto:sanand03072005@gmail.com).

---

## Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** 9+
- **Visual Studio Code** 1.85+
- **Google Chrome, Microsoft Edge or Chromium** is not required to use the extension, but `npm run validate` needs a Chromium to check HTML and CSS lessons. Run `npx playwright-core install chromium`, or set `CHROME_PATH` to a browser executable.

### One-Time Setup

```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/mean-stack-basics.git
cd mean-stack-basics
npm install
npm run compile
```

---

## Development Setup

| Command | Description |
|---|---|
| `npm run compile` | One-shot TypeScript compilation |
| `npm run watch` | Recompile on every save |
| `npm test` | Run the unit tests (Vitest) |
| `npm run validate` | Check every lesson: starters fail, solutions pass |
| `npm run validate -- --track css` | Check one track |
| `npm run validate:links` | Also check that every documentation link loads |
| `node test/e2e/runTest.js` | End-to-end test inside a real VS Code window (set `VSCODE_EXE` to use your installed VS Code) |
| `npx vsce package` | Build the `.vsix` |

### Running the Extension

```bash
code .
# Press F5. A new window opens with the extension loaded.
# Click the MEAN Stack Basics icon in the Activity Bar.
```

Use `Ctrl+R` in the Extension Development Host to reload after recompiling.

### Debugging the Lesson Page

The lesson page is a VS Code webview. To debug it, open a lesson, then run **Developer: Open Webview Developer Tools**
from the Command Palette. Console errors appear there.

---

## Project Structure

```
mean-stack-basics/
├── .github/               # CI, release workflow, issue and PR templates
├── course/                # All lessons (content, not code)
│   ├── tracks.json        # Ordered tracks
│   └── <track>/<NN>-<slug>/
│       ├── lesson.json    # Title, quiz, exercise settings, docs links
│       ├── lesson.md      # The explanation
│       ├── starter.*      # What the learner starts with
│       ├── solution.*     # Reference solution
│       └── test.js        # Tests for JavaScript-style exercises
├── docs/AUTHORING.md      # How to write a lesson
├── media/                 # Icon, lesson page script and styles, walkthrough pages
├── src/
│   ├── extension.ts       # Activation and commands
│   ├── course.ts          # Loads and validates lessons
│   ├── lessonPanel.ts     # The lesson webview and its messages
│   ├── tree.ts            # Course map in the sidebar
│   ├── progress.ts        # Progress rules and storage
│   ├── exercises.ts       # Exercise files on disk
│   ├── checker.ts         # Picks the right checker for an exercise
│   ├── check/             # js.ts (child process), text.ts (patterns)
│   ├── harness/           # runner.ts (runs inside the child process), mongo.ts (practice database)
│   ├── ai/                # Optional AI helper: client, prompt, redaction, usage limit
│   ├── render.ts          # Markdown rendering and quiz data for the page
│   ├── certificate.ts     # Certificate and progress report
│   └── tools/validate.ts  # `npm run validate`
├── test/                  # Vitest unit tests and the VS Code end-to-end test
└── package.json
```

### How a check runs

```
Check my code
   │
   ├─ html  ──▶ lesson page draws the file in a sandboxed frame ──▶ media/dom-checks.js rules
   ├─ text  ──▶ regular expressions on the file                    (src/check/text.ts)
   └─ js    ──▶ child process runs out/harness/runner.js ──▶ course/<lesson>/test.js
                  (globals: check, eq, learner, request, dom, mongo ...)
```

---

## Working on Lessons

Read [docs/AUTHORING.md](docs/AUTHORING.md) first. In short:

1. Create `course/<track>/<NN>-<slug>/` with `lesson.json`, `lesson.md`, a starter, a solution and (for JavaScript-style exercises) `test.js`.
2. Write the explanation yourself. **Never copy text from the official documentation**; link to it instead.
3. Check facts against the official documentation. Prefer current versions: Node.js 24 LTS, Express 5, MongoDB 8+, current Angular.
4. Run `npm run validate -- --track <track> --links`. It must report no problems.
5. Try a few alternative correct solutions and a few wrong ones. A good check accepts every valid answer and rejects wrong ones.

Lesson fixes should explain in the pull request what was wrong and link the official page that proves it.

---

## Coding Guidelines

### TypeScript

- **Strict mode** is on. Avoid `any` unless absolutely necessary.
- Prefer `const`; use `interface` for object shapes and `type` for unions.
- Keep modules small and testable. Code that does not need the `vscode` module goes in files that do not import it, so Vitest can test it.

### Naming

| Category | Convention | Example |
|---|---|---|
| Files | `camelCase.ts` | `lessonPanel.ts` |
| Classes | `PascalCase` | `LessonPanel` |
| Functions | `camelCase` | `runJsChecks()` |
| Constants | `UPPER_SNAKE_CASE` | `AI_KEY_SECRET` |
| Lesson folders | `NN-kebab-case` | `07-loops` |

### No Emoji in Code or UI

Do not use emoji in source code, UI text or lesson content.

### Style

- 2 spaces, single quotes, semicolons, trailing commas in multi-line literals
- Comments explain *why*, not *what*

---

## Testing

- Unit tests live in `test/` and run with `npm test`.
- Lessons are tested by `npm run validate`.
- Changes to the lesson page or to `src/lessonPanel.ts` should also pass `node test/e2e/runTest.js`.

Write tests for behaviour, including failure cases. For security-sensitive code (redaction, the AI client, markdown rendering) include negative tests.

---

## Pull Request Process

1. **Discuss first** for anything non-trivial: open an [issue](https://github.com/anandsundaramoorthysa/mean-stack-basics/issues).
2. Fork the repo and branch from `main`.
3. Make focused changes and add tests.
4. Run `npm run compile`, `npm test` and `npm run validate`.
5. Commit with [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`, and `content:` for lesson changes.
6. Open a pull request and fill in the template.

### PR Checklist

- [ ] The change is focused on one concern
- [ ] `npm run compile`, `npm test` and `npm run validate` pass
- [ ] Lesson facts were checked against the official documentation
- [ ] Documentation and CHANGELOG are updated where needed

---

## Release Process

Maintained by project maintainers:

1. Update `CHANGELOG.md` and the version in `package.json`.
2. Run `npm run compile`, `npm test`, `npm run validate:links` and the end-to-end test.
3. Tag the release (`git tag v1.2.3 && git push --tags`). The release workflow builds the `.vsix` and creates a GitHub release.
4. Publish to the Marketplace with `npx vsce publish` (or let the workflow do it when the `VSCE_PAT` secret is set).

---

## Questions?

- **Open an issue**: [github.com/anandsundaramoorthysa/mean-stack-basics/issues](https://github.com/anandsundaramoorthysa/mean-stack-basics/issues)
- **Email**: [sanand03072005@gmail.com](mailto:sanand03072005@gmail.com?subject=About%20MEAN%20Stack%20Basics)

---

<p align="center">
  <a href="README.md">README</a> ·
  <a href="CODE_OF_CONDUCT.md">Code of Conduct</a> ·
  <a href="docs/AUTHORING.md">Authoring guide</a>
</p>
