import * as crypto from 'crypto';
import * as os from 'os';
import * as vscode from 'vscode';
import { AiError, chat } from './ai/client';
import { buildUserPrompt, SYSTEM_PROMPT } from './ai/prompt';
import { stripCode } from './ai/redact';
import { consumeAiRequest } from './ai/usage';
import { checkExercise } from './checker';
import { courseFolder, ensureExercise, exercisePath, readSolution, resetExercise } from './exercises';
import { ProgressStore } from './progress';
import { lessonBodyHtml, questionView, renderBlock, renderInline } from './render';
import { readSettings } from './settings';
import { CheckOutcome, CheckResult, Course, DomCheck, Lesson } from './types';

export const AI_KEY_SECRET = 'meanStackBasics.ai.key';
const CONSENT_KEY = 'meanStackBasics.ai.consent';
const SOLUTION_SCHEME = 'msb-solution';

export interface PanelDeps {
  context: vscode.ExtensionContext;
  course: Course;
  store: ProgressStore;
  onProgress: (lessonId: string, justCompleted: boolean) => void;
}

interface WebMessage {
  type: string;
  [k: string]: any;
}

export class SolutionProvider implements vscode.TextDocumentContentProvider {
  constructor(private course: Course) {}
  provideTextDocumentContent(uri: vscode.Uri): string {
    const id = decodeURIComponent(uri.path.replace(/^\//, '').replace(/\/[^/]*$/, ''));
    const lesson = this.course.byId.get(id);
    return (lesson && readSolution(lesson)) ?? '';
  }
}

export class LessonPanel {
  private static instance: LessonPanel | undefined;
  private ready = false;
  private lesson!: Lesson;
  private lastOutcome: CheckOutcome | undefined;
  private pendingHtml = new Map<string, (r: CheckResult[]) => void>();
  private disposables: vscode.Disposable[] = [];

  private constructor(private panel: vscode.WebviewPanel, private deps: PanelDeps) {
    panel.webview.html = this.buildHtml();
    panel.onDidDispose(() => this.dispose(), null, this.disposables);
    panel.webview.onDidReceiveMessage((m: WebMessage) => void this.onMessage(m), null, this.disposables);
  }

  static schemeName(): string {
    return SOLUTION_SCHEME;
  }

  static show(deps: PanelDeps, lessonId: string): void {
    const lesson = deps.course.byId.get(lessonId);
    if (!lesson) {
      void vscode.window.showWarningMessage(`Lesson not found: ${lessonId}`);
      return;
    }
    if (LessonPanel.instance) {
      LessonPanel.instance.panel.reveal(undefined, true);
      LessonPanel.instance.load(lesson);
      return;
    }
    const hasEditors = vscode.window.tabGroups.all.some((g) => g.tabs.length > 0);
    const column = hasEditors ? vscode.ViewColumn.Beside : vscode.ViewColumn.Active;
    const panel = vscode.window.createWebviewPanel('meanStackBasics.lesson', lesson.title, { viewColumn: column, preserveFocus: true }, LessonPanel.options(deps));
    LessonPanel.instance = new LessonPanel(panel, deps);
    LessonPanel.instance.load(lesson);
  }

  static revive(panel: vscode.WebviewPanel, deps: PanelDeps, lessonId: string | undefined): void {
    panel.webview.options = LessonPanel.options(deps);
    LessonPanel.instance = new LessonPanel(panel, deps);
    const lesson = (lessonId && deps.course.byId.get(lessonId)) || deps.course.lessons[0];
    if (lesson) LessonPanel.instance.load(lesson);
  }

  static refresh(): void {
    LessonPanel.instance?.sendProgress();
  }

  static currentLessonId(): string | undefined {
    return LessonPanel.instance?.lesson?.id;
  }

  static lastOutcome(): CheckOutcome | undefined {
    return LessonPanel.instance?.lastOutcome;
  }

  static async checkCurrent(): Promise<boolean> {
    if (!LessonPanel.instance) return false;
    await LessonPanel.instance.runCheck();
    return true;
  }

  static async openCurrentExercise(): Promise<boolean> {
    if (!LessonPanel.instance) return false;
    await LessonPanel.instance.openExercise();
    return true;
  }

  private static options(deps: PanelDeps): vscode.WebviewPanelOptions & vscode.WebviewOptions {
    // retainContextWhenHidden keeps quiz answers and results when the learner switches tabs, and lets checks run while the page is behind the code editor.
    return { enableScripts: true, retainContextWhenHidden: true, localResourceRoots: [vscode.Uri.joinPath(deps.context.extensionUri, 'media')] };
  }

  private dispose(): void {
    LessonPanel.instance = undefined;
    this.disposables.forEach((d) => d.dispose());
    this.pendingHtml.forEach((resolve) => resolve([]));
    this.pendingHtml.clear();
  }

  private buildHtml(): string {
    const w = this.panel.webview;
    const media = (f: string): vscode.Uri => w.asWebviewUri(vscode.Uri.joinPath(this.deps.context.extensionUri, 'media', f));
    const nonce = crypto.randomBytes(16).toString('base64');
    const csp = [
      "default-src 'none'",
      `style-src ${w.cspSource} 'unsafe-inline'`,
      `script-src 'nonce-${nonce}'`,
      `img-src ${w.cspSource} https: data:`,
      `font-src ${w.cspSource}`,
      `media-src https:`,
      `frame-src about:`,
    ].join('; ');
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="${media('lesson.css')}">
<title>Lesson</title>
</head>
<body>
<div id="app"></div>
<script nonce="${nonce}" src="${media('dom-checks.js')}"></script>
<script nonce="${nonce}" src="${media('lesson.js')}"></script>
</body>
</html>`;
  }

  private post(message: unknown): void {
    if (this.ready) void this.panel.webview.postMessage(message);
  }

  private load(lesson: Lesson): void {
    this.lesson = lesson;
    this.lastOutcome = undefined;
    this.panel.title = lesson.title;
    this.post({ type: 'lesson', data: this.lessonView() });
  }

  private displayPath(file: string | undefined): string {
    return file ? file.replace(os.homedir(), '~') : '';
  }

  private root(): string {
    return courseFolder(readSettings().courseFolder);
  }

  private lessonView(): unknown {
    const lesson = this.lesson;
    const course = this.deps.course;
    const idx = course.lessons.findIndex((l) => l.id === lesson.id);
    const prev = course.lessons[idx - 1];
    const next = course.lessons[idx + 1];
    const track = course.tracks.find((t) => t.id === lesson.track);
    const ex = lesson.exercise;
    const settings = readSettings();
    return {
      id: lesson.id,
      title: lesson.title,
      trackTitle: track?.title ?? lesson.track,
      legacy: !!track?.legacy,
      minutes: lesson.minutes,
      summary: lesson.summary,
      bodyHtml: lessonBodyHtml(lesson),
      docs: lesson.docs,
      quiz: lesson.quiz.map((q, i) => questionView(q, `${lesson.id}:${i}`)),
      exercise: ex && {
        kind: ex.kind,
        file: ex.file,
        path: this.displayPath(exercisePath(this.root(), lesson)),
        taskHtml: renderBlock(ex.task),
        checkNames: ex.kind === 'js' ? [] : (ex.checks as { name: string }[]).map((c) => c.name),
      },
      nav: {
        prev: prev && { id: prev.id, title: prev.title },
        next: next && { id: next.id, title: next.title },
        position: `${idx + 1} of ${course.lessons.length}`,
      },
      progress: this.progressView(),
      ai: { enabled: settings.aiEnabled },
    };
  }

  private progressView(): unknown {
    const p = this.deps.store.get(this.lesson.id);
    return {
      quiz: p.quiz,
      exercisePassed: p.exercisePassed,
      attempts: p.attempts,
      failedRuns: p.failedRuns,
      hintLevel: p.hintLevel,
      done: this.deps.store.done(this.lesson),
      solutionAllowed: p.failedRuns >= 3 || p.hintLevel >= 3,
    };
  }

  private sendProgress(): void {
    if (this.lesson) this.post({ type: 'progress', progress: this.progressView() });
  }

  private async commit(patch: (p: ReturnType<ProgressStore['get']>) => void): Promise<void> {
    const before = this.deps.store.done(this.lesson);
    await this.deps.store.update(this.lesson.id, patch);
    const after = this.deps.store.done(this.lesson);
    this.sendProgress();
    this.deps.onProgress(this.lesson.id, !before && after);
    if (!before && after) {
      this.post({ type: 'complete' });
      this.offerCertificate();
    }
  }

  private offerCertificate(): void {
    const { course, store } = this.deps;
    const sum = store.trackSummary(course, this.lesson.track);
    if (sum.total > 0 && sum.done === sum.total) {
      const title = course.tracks.find((t) => t.id === this.lesson.track)?.title ?? this.lesson.track;
      void vscode.window.showInformationMessage(`You finished the ${title} track.`, 'Export Certificate').then((choice) => {
        if (choice) void vscode.commands.executeCommand('meanStackBasics.certificate', this.lesson.track);
      });
    }
  }

  private async onMessage(m: WebMessage): Promise<void> {
    switch (m.type) {
      case 'ready':
        // The page asks for its lesson whenever it (re)loads, including after a restart or after VS Code discards a hidden page.
        this.ready = true;
        if (this.lesson) void this.panel.webview.postMessage({ type: 'lesson', data: this.lessonView() });
        return;
      case 'quiz':
        if (Number.isInteger(m.index) && m.correct === true) await this.commit((p) => void (p.quiz[m.index] = true));
        return;
      case 'openExercise':
        await this.openExercise();
        return;
      case 'check':
        await this.runCheck();
        return;
      case 'htmlResults': {
        const resolve = this.pendingHtml.get(m.id);
        this.pendingHtml.delete(m.id);
        resolve?.(Array.isArray(m.results) ? m.results : []);
        return;
      }
      case 'hint':
        await this.showHint(Number(m.level));
        return;
      case 'reset':
        await this.resetFile();
        return;
      case 'solution':
        await this.showSolution();
        return;
      case 'markDone':
        await this.commit((p) => void (p.forced = true));
        return;
      case 'goto':
        if (typeof m.id === 'string' && this.deps.course.byId.has(m.id)) this.load(this.deps.course.byId.get(m.id)!);
        return;
      case 'openDoc':
        if (typeof m.url === 'string' && /^https:\/\//i.test(m.url)) void vscode.env.openExternal(vscode.Uri.parse(m.url));
        return;
      case 'ai':
        await this.askAi();
        return;
    }
  }

  private async openExercise(): Promise<string | undefined> {
    const made = ensureExercise(this.root(), this.lesson);
    if (!made) return undefined;
    const doc = await vscode.workspace.openTextDocument(made.file);
    await vscode.window.showTextDocument(doc, { viewColumn: this.codeColumn(), preserveFocus: false });
    this.post({ type: 'exercise-opened', path: this.displayPath(made.file), created: made.created });
    return made.file;
  }

  /** Picks an editor group for the learner's code that is different from the lesson page, so both stay visible side by side. */
  private codeColumn(): vscode.ViewColumn {
    const lessonColumn = this.panel.viewColumn ?? vscode.ViewColumn.One;
    const other = vscode.window.tabGroups.all.find((g) => g.viewColumn !== lessonColumn);
    if (other) return other.viewColumn;
    this.panel.reveal(lessonColumn, false);
    return vscode.ViewColumn.Beside;
  }

  private runHtml = (html: string, checks: DomCheck[]): Promise<CheckResult[]> =>
    new Promise((resolve) => {
      const id = crypto.randomBytes(6).toString('hex');
      const timer = setTimeout(() => {
        this.pendingHtml.delete(id);
        resolve([{ name: 'Page check', ok: false, message: 'The preview did not respond. Close and reopen the lesson, then try again.' }]);
      }, 10000);
      this.pendingHtml.set(id, (r) => {
        clearTimeout(timer);
        resolve(r);
      });
      this.post({ type: 'runHtml', id, html, checks });
    });

  private async runCheck(): Promise<void> {
    if (!this.lesson.exercise) return;
    const file = exercisePath(this.root(), this.lesson)!;
    const open = vscode.workspace.textDocuments.find((d) => d.uri.fsPath === file);
    if (open?.isDirty) await open.save();
    if (ensureExercise(this.root(), this.lesson)?.created) await this.openExercise();
    this.post({ type: 'checking' });
    const outcome = await checkExercise(this.lesson, file, this.runHtml);
    this.lastOutcome = outcome;
    await this.commit((p) => {
      p.attempts += 1;
      if (outcome.passed) p.exercisePassed = true;
      else p.failedRuns += 1;
    });
    this.post({ type: 'results', outcome, progress: this.progressView() });
  }

  private async showHint(level: number): Promise<void> {
    const ex = this.lesson.exercise;
    if (!ex || !Number.isInteger(level) || level < 1 || level > 3) return;
    await this.commit((p) => void (p.hintLevel = Math.max(p.hintLevel, level)));
    const text = ex.hints[level - 1];
    this.post({ type: 'hint', level, html: level === 3 ? '' : renderInline(text), code: level === 3 ? text : undefined });
  }

  private async resetFile(): Promise<void> {
    if (!this.lesson.exercise) return;
    const choice = await vscode.window.showWarningMessage('Replace your exercise file with the starter code? Your changes will be lost.', { modal: true }, 'Reset File');
    if (choice !== 'Reset File') return;
    const file = resetExercise(this.root(), this.lesson);
    if (file) {
      const doc = await vscode.workspace.openTextDocument(file);
      await vscode.window.showTextDocument(doc, { viewColumn: this.codeColumn() });
    }
    this.lastOutcome = undefined;
    this.post({ type: 'reset-done' });
  }

  private async showSolution(): Promise<void> {
    const p = this.deps.store.get(this.lesson.id);
    if (!this.lesson.exercise || !(p.failedRuns >= 3 || p.hintLevel >= 3)) return;
    const file = exercisePath(this.root(), this.lesson);
    if (!file) return;
    const left = vscode.Uri.file(file);
    const right = vscode.Uri.from({ scheme: SOLUTION_SCHEME, path: `/${encodeURIComponent(this.lesson.id)}/${this.lesson.exercise.file}` });
    await vscode.commands.executeCommand('vscode.diff', left, right, `Your code vs reference solution: ${this.lesson.title}`, { viewColumn: this.codeColumn() });
  }

  private async hasConsent(host: string): Promise<boolean> {
    const given = this.deps.context.globalState.get<string[]>(CONSENT_KEY, []);
    if (given.includes(host)) return true;
    const choice = await vscode.window.showInformationMessage(
      `The "Stuck?" helper will send your exercise code, the failing check messages and the lesson summary to ${host}. Emails, keys and file paths are removed first. Continue?`,
      { modal: true },
      'Allow',
    );
    if (choice !== 'Allow') return false;
    await this.deps.context.globalState.update(CONSENT_KEY, [...given, host]);
    return true;
  }

  private async askAi(): Promise<void> {
    const settings = readSettings();
    const fail = (text: string): void => this.post({ type: 'ai', state: 'error', text });
    if (!settings.aiEnabled) return fail('AI help is off. Turn it on in the setting meanStackBasics.ai.enabled.');
    const outcome = this.lastOutcome;
    const ex = this.lesson.exercise;
    if (!ex || !outcome || outcome.passed) return fail('Run Check My Code first. The helper explains a failing check.');
    let host: string;
    try {
      host = new URL(settings.ai.baseUrl).host;
    } catch {
      return fail('The AI base URL is not valid. Fix meanStackBasics.ai.baseUrl in settings.');
    }
    if (!(await this.hasConsent(host))) return fail('AI help was not allowed.');
    const usage = await consumeAiRequest(this.deps.context.globalState, settings.aiDailyLimit);
    if (!usage.allowed) return fail(`You reached today's limit of ${settings.aiDailyLimit} AI requests. Raise it in settings or try again tomorrow.`);
    const file = exercisePath(this.root(), this.lesson)!;
    const code = (await vscode.workspace.fs.readFile(vscode.Uri.file(file)).then((b) => Buffer.from(b).toString('utf8'), () => ''));
    const track = this.deps.course.tracks.find((t) => t.id === this.lesson.track);
    this.post({ type: 'ai', state: 'thinking' });
    try {
      const key = await this.deps.context.secrets.get(AI_KEY_SECRET);
      const reply = await chat(settings.ai, key, SYSTEM_PROMPT, buildUserPrompt({ lesson: this.lesson, trackTitle: track?.title ?? this.lesson.track, code, results: outcome.results, fatal: outcome.fatal }));
      this.post({ type: 'ai', state: 'reply', text: stripCode(reply) });
    } catch (e) {
      fail(e instanceof AiError ? e.message : 'The AI helper failed unexpectedly.');
    }
  }
}
