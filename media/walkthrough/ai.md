# Optional: AI hints

AI help is **off by default** and the course works fully without it.

If you want it, you bring your own AI service. Any service with an OpenAI-compatible chat API works, including a free local one such as Ollama.

1. Turn on `meanStackBasics.ai.enabled`.
2. Set `meanStackBasics.ai.baseUrl` and `meanStackBasics.ai.model`.
3. Run **ms: AI: Set API Key** if your service needs a key. It is stored in VS Code secret storage.
4. After a failed check, press **Stuck? Ask the AI helper**.

The first time, you are shown exactly what will be sent and asked to allow it. Emails, keys and file paths are removed first. The AI gives hints only, can be wrong, and never decides whether your code passes.
