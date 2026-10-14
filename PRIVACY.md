# Privacy

MEAN Stack Basics collects no personal data and has no telemetry or analytics.

## Stored on your computer

| What | Where | Why |
|---|---|---|
| Your progress (which questions you answered, which exercises passed, number of checks and hints used) | VS Code global state. It can sync through VS Code Settings Sync if you have that turned on | Show your progress and unlock the certificate |
| Your exercise files | The folder set in `meanStackBasics.courseFolder`, default `MEAN Stack Basics` in your home folder | Your own code |
| Your AI API key, only if you set one | VS Code secret storage | Used for the optional AI helper |
| The hosts you allowed for the AI helper and a daily request counter | VS Code global state | Consent and rate limiting |

Use **ms: Reset All Progress** to clear progress, and **ms: AI: Clear API Key** to remove the key.

## The optional AI helper

Off by default. When you enable it and press **Stuck? Ask the AI helper**, one request goes to the service at `meanStackBasics.ai.baseUrl`. It contains:

- the lesson title, summary and task text
- the names and messages of the failing checks
- the contents of your exercise file (first 6000 characters)

Before sending, the extension removes email addresses, API keys and tokens, database connection strings and your home folder path. This reduces the risk but cannot catch everything, so do not put personal information in exercise files.

What the AI service does with the request is governed by that service's own terms and privacy policy. Using a local server such as Ollama keeps everything on your machine. Some online services restrict use by people under 18, so check the terms of the service you choose.

## Documentation links

Links to official documentation open in your browser only when you click them.

## Contact

Questions: [sanand03072005@gmail.com](mailto:sanand03072005@gmail.com).
