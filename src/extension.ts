import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import { chat, listModels, AiError } from './ai/client';
import { certificateHtml, progressReport } from './certificate';
import { loadCourse } from './course';
import { AI_KEY_SECRET, LessonPanel, PanelDeps, SolutionProvider } from './lessonPanel';
import { PROGRESS_KEY, ProgressStore } from './progress';
import { readSettings } from './settings';
import { CourseTree, Node } from './tree';
import { Course } from './types';

const LAST_KEY = 'meanStackBasics.lastLesson';

export interface ExtensionApi {
  course: Course;
  store: ProgressStore;
  lastOutcome: () => unknown;
}

export function activate(context: vscode.ExtensionContext): ExtensionApi | undefined {
  let course: Course;
  try {
    course = loadCourse(path.join(context.extensionPath, 'course'));
  } catch (e) {
    void vscode.window.showErrorMessage(`MEAN Stack Basics could not load the course: ${(e as Error).message}`);
    return undefined;
  }
  const store = new ProgressStore(context.globalState);
  context.globalState.setKeysForSync([PROGRESS_KEY]);

  const tree = new CourseTree(course, store);
  const view = vscode.window.createTreeView('meanStackBasics.course', { treeDataProvider: tree, showCollapseAll: true });
  const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 50);
  status.command = 'meanStackBasics.continue';
  const updateStatus = (): void => {
    const o = store.overall(course);
    status.text = `$(mortar-board) ${o.done}/${o.total}`;
    status.tooltip = 'MEAN Stack Basics: continue learning';
    status.show();
  };
  updateStatus();

  const deps: PanelDeps = {
    context,
    course,
    store,
    onProgress: () => {
      tree.refresh();
      updateStatus();
    },
  };

  const open = (id: string): void => {
    LessonPanel.show(deps, id);
    void context.globalState.update(LAST_KEY, id);
    const lesson = course.byId.get(id);
    if (lesson) void Promise.resolve(view.reveal({ kind: 'lesson', lesson }, { select: true, focus: false, expand: true })).then(undefined, () => undefined);
  };

  const reg = (id: string, fn: (...args: any[]) => unknown): void => {
    context.subscriptions.push(vscode.commands.registerCommand(id, fn));
  };

  context.subscriptions.push(
    view,
    status,
    vscode.workspace.registerTextDocumentContentProvider(LessonPanel.schemeName(), new SolutionProvider(course)),
    vscode.window.registerWebviewPanelSerializer('meanStackBasics.lesson', {
      async deserializeWebviewPanel(panel: vscode.WebviewPanel, state: { id?: string } | undefined) {
        LessonPanel.revive(panel, deps, state?.id);
      },
    }),
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('meanStackBasics')) LessonPanel.refresh();
    }),
  );

  reg('meanStackBasics.openCourse', () => vscode.commands.executeCommand('meanStackBasics.course.focus'));

  reg('meanStackBasics.openLesson', (id: string) => open(id));

  reg('meanStackBasics.continue', () => {
    const next = store.nextLesson(course, context.globalState.get<string>(LAST_KEY));
    if (next) return open(next.id);
    void vscode.window.showInformationMessage('You have completed every lesson. Well done.', 'Export Certificate').then((c) => {
      if (c) void vscode.commands.executeCommand('meanStackBasics.certificate');
    });
  });

  reg('meanStackBasics.find', async () => {
    const pick = await vscode.window.showQuickPick(
      course.lessons.map((l) => ({
        label: `${store.done(l) ? '$(pass-filled)' : '$(circle-large-outline)'} ${l.title}`,
        description: `${course.tracks.find((t) => t.id === l.track)?.title ?? l.track} ${l.folder.slice(0, 2)}`,
        detail: l.summary,
        id: l.id,
      })),
      { placeHolder: 'Search lessons by topic, for example flexbox or promises', matchOnDescription: true, matchOnDetail: true },
    );
    if (pick) open(pick.id);
  });

  reg('meanStackBasics.check', async () => {
    if (!(await LessonPanel.checkCurrent())) void vscode.window.showInformationMessage('Open a lesson first, then check your code.');
  });

  reg('meanStackBasics.openExercise', async () => {
    if (!(await LessonPanel.openCurrentExercise())) void vscode.window.showInformationMessage('Open a lesson first.');
  });

  reg('meanStackBasics.resetLesson', async (arg: Node | string | undefined) => {
    const id = typeof arg === 'string' ? arg : arg?.kind === 'lesson' ? arg.lesson.id : undefined;
    if (!id) return;
    const choice = await vscode.window.showWarningMessage('Reset your progress for this lesson? Your exercise file is not deleted.', { modal: true }, 'Reset');
    if (choice !== 'Reset') return;
    await store.reset(id);
    deps.onProgress(id, false);
    LessonPanel.refresh();
  });

  reg('meanStackBasics.resetProgress', async () => {
    const choice = await vscode.window.showWarningMessage('Reset ALL progress? Your exercise files are not deleted.', { modal: true }, 'Reset All');
    if (choice !== 'Reset All') return;
    await store.reset();
    deps.onProgress('', false);
    LessonPanel.refresh();
  });

  reg('meanStackBasics.certificate', async (arg?: Node | string) => {
    let trackId = typeof arg === 'string' ? arg : arg?.kind === 'track' ? arg.track.id : undefined;
    if (!trackId) {
      const finished = course.tracks.filter((t) => {
        const s = store.trackSummary(course, t.id);
        return s.total > 0 && s.done === s.total;
      });
      if (!finished.length) return void vscode.window.showInformationMessage('Finish every lesson in a track to unlock its certificate.');
      const pick = await vscode.window.showQuickPick(finished.map((t) => ({ label: t.title, id: t.id })), { placeHolder: 'Which track?' });
      trackId = pick?.id;
    }
    const track = course.tracks.find((t) => t.id === trackId);
    if (!track) return;
    const sum = store.trackSummary(course, track.id);
    if (!sum.total || sum.done < sum.total) return void vscode.window.showInformationMessage('Finish every lesson in this track to unlock its certificate.');
    const name = await vscode.window.showInputBox({ prompt: 'Name to print on the certificate', ignoreFocusOut: true });
    if (!name?.trim()) return;
    const target = await vscode.window.showSaveDialog({ defaultUri: vscode.Uri.file(path.join(os.homedir(), `${track.id}-certificate.html`)), filters: { HTML: ['html'] } });
    if (!target) return;
    fs.writeFileSync(target.fsPath, certificateHtml(name.trim(), track, sum.total, new Date()), 'utf8');
    const choice = await vscode.window.showInformationMessage('Certificate saved. Open it in your browser to print or save as PDF.', 'Open');
    if (choice) void vscode.env.openExternal(target);
  });

  reg('meanStackBasics.report', async () => {
    const name = await vscode.window.showInputBox({ prompt: 'Learner name for the report (optional)', ignoreFocusOut: true });
    if (name === undefined) return;
    const target = await vscode.window.showSaveDialog({ defaultUri: vscode.Uri.file(path.join(os.homedir(), 'mean-stack-basics-progress.md')), filters: { Markdown: ['md'] } });
    if (!target) return;
    fs.writeFileSync(target.fsPath, progressReport(course, store, name.trim(), new Date()), 'utf8');
    void vscode.window.showTextDocument(target);
  });

  reg('meanStackBasics.ai.setKey', async () => {
    const key = await vscode.window.showInputBox({
      title: 'AI API key',
      prompt: 'Paste the key for your AI service. It is stored in VS Code secret storage on this computer only. Leave empty for a local server that needs no key.',
      password: true,
      ignoreFocusOut: true,
    });
    if (key === undefined) return;
    if (!key.trim()) await context.secrets.delete(AI_KEY_SECRET);
    else await context.secrets.store(AI_KEY_SECRET, key.trim());
    void vscode.window.showInformationMessage(key.trim() ? 'AI key saved.' : 'No key stored.');
  });

  reg('meanStackBasics.ai.clearKey', async () => {
    await context.secrets.delete(AI_KEY_SECRET);
    void vscode.window.showInformationMessage('AI key removed.');
  });

  reg('meanStackBasics.ai.test', async () => {
    const s = readSettings();
    try {
      const key = await context.secrets.get(AI_KEY_SECRET);
      const models = await listModels(s.ai, key);
      const model = s.ai.model.trim();
      if (model && models.length && !models.includes(model)) {
        void vscode.window.showWarningMessage(`Connected, but the model "${model}" was not in the list of ${models.length} models. Check meanStackBasics.ai.model.`);
        return;
      }
      if (model) await chat({ ...s.ai, maxTokens: 20 }, key, 'Reply with one word.', 'Say ok.');
      void vscode.window.showInformationMessage(`AI connection works${models.length ? ` (${models.length} models available)` : ''}.`);
    } catch (e) {
      void vscode.window.showErrorMessage(e instanceof AiError ? e.message : 'The AI connection test failed.');
    }
  });

  return { course, store, lastOutcome: () => LessonPanel.lastOutcome() };
}

export function deactivate(): void {}
