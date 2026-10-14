# Security policy

## Supported versions

Only the latest release on the Visual Studio Marketplace receives security fixes.

## Reporting a vulnerability

Please do **not** open a public issue for a security problem. Use GitHub's private reporting instead:
[Report a vulnerability](https://github.com/anandsundaramoorthysa/mean-stack-basics/security/advisories/new),
or email [sanand03072005@gmail.com](mailto:sanand03072005@gmail.com?subject=MEAN%20Stack%20Basics%20security).

Include what you found, how to reproduce it, and which version you tested. You can expect a first reply within a few days.

## What this extension does with your code and data

- **Checks run locally.** Exercise files are checked on your computer. For JavaScript, Node.js, Express and MongoDB exercises the extension starts a separate Node.js process with a time limit and a minimal environment. Your code is not uploaded anywhere.
- **Your code runs with your permissions.** Exercise code is ordinary JavaScript and can do what any program you run can do. Only write and run your own code in exercises, and be careful when pasting code from unknown sources.
- **No telemetry.** The extension collects no usage data.
- **Optional AI helper.** It is off by default. When you turn it on, the extension sends your exercise code, the failing check messages and the lesson summary to the AI service you configure, after you give consent for that host. Emails, API keys, connection strings, long tokens and your home folder path are removed first. The API key is kept in VS Code secret storage and is only sent over HTTPS, or to a local server.
- **The lesson page** runs with a strict content security policy. Learner HTML is shown in a sandboxed frame with scripts disabled.

See [PRIVACY.md](PRIVACY.md) for the full data description.
