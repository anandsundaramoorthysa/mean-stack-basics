const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function until(fn, label, ms = 30000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (await fn()) return;
    await sleep(200);
  }
  throw new Error('Timed out waiting for: ' + label);
}

exports.run = async function run() {
  const ext = vscode.extensions.getExtension('AnandSundaramoorthySa.mean-stack-basics');
  assert.ok(ext, 'extension is installed in the test host');
  const api = await ext.activate();
  assert.ok(api && api.course.lessons.length > 0, 'course loaded');
  const { course, store } = api;
  const courseDir = process.env.MSB_E2E_COURSE;

  const all = await vscode.commands.getCommands(true);
  for (const id of ['openCourse', 'continue', 'find', 'openLesson', 'check', 'openExercise', 'resetLesson', 'resetProgress', 'certificate', 'report', 'ai.setKey', 'ai.clearKey', 'ai.test']) {
    assert.ok(all.includes('meanStackBasics.' + id), 'command registered: ' + id);
  }
  assert.strictEqual(vscode.workspace.getConfiguration('meanStackBasics').get('ai.enabled'), false, 'AI is off by default');

  const solved = [];
  const kinds = new Map();
  for (const l of course.lessons) if (l.exercise && !kinds.has(l.exercise.kind)) kinds.set(l.exercise.kind, l);

  for (const [kind, lesson] of kinds) {
    await vscode.commands.executeCommand('meanStackBasics.openLesson', lesson.id);
    await sleep(1500);
    const tab = vscode.window.tabGroups.all.flatMap((g) => g.tabs).find((t) => t.label === lesson.title);
    assert.ok(tab, `lesson page is open (${lesson.id})`);
    if (process.env.MSB_E2E_PAUSE) await sleep(Number(process.env.MSB_E2E_PAUSE));

    const dump = (label) => console.log(label, JSON.stringify(vscode.window.tabGroups.all.map((g) => ({ col: g.viewColumn, active: g.isActive, tabs: g.tabs.map((t) => t.label + (t.isActive ? '*' : '')) }))));
    dump('after openLesson:');
    await vscode.commands.executeCommand('meanStackBasics.openExercise');
    dump('after openExercise:');
    const file =path.join(courseDir, lesson.track, lesson.folder, lesson.exercise.file);
    await until(() => fs.existsSync(file), 'exercise file for ' + lesson.id);
    if (process.env.MSB_E2E_PAUSE2) await sleep(Number(process.env.MSB_E2E_PAUSE2));
    const starter = fs.readFileSync(file, 'utf8');

    await vscode.commands.executeCommand('meanStackBasics.check');
    await until(() => store.get(lesson.id).attempts >= 1, 'first check for ' + lesson.id);
    assert.strictEqual(store.get(lesson.id).exercisePassed, false, `${kind}: the starter must not pass`);

    const ext2 = path.extname(lesson.exercise.file);
    const solution = fs.readFileSync(path.join(lesson.dir, 'solution' + ext2), 'utf8');
    fs.writeFileSync(file, solution);
    if (!process.env.MSB_READY_FILE) {
      const doc = await vscode.workspace.openTextDocument(file);
      await vscode.window.showTextDocument(doc);
    }
    await vscode.commands.executeCommand('meanStackBasics.check');
    await until(() => store.get(lesson.id).attempts >= 2, `${kind}: second check ran for ${lesson.id}`, 40000);
    if (!store.get(lesson.id).exercisePassed) throw new Error(`${kind}: solution did not pass: ` + JSON.stringify(api.lastOutcome()));
    solved.push(`${kind}:${lesson.id}`);
    assert.notStrictEqual(starter, solution);
    if (process.env.MSB_READY_FILE) {
      // Screenshot mode: tidy the window, tell the screenshot script it can capture, and stop after the first lesson.
      await vscode.commands.executeCommand('workbench.action.closeAuxiliaryBar');
      await vscode.commands.executeCommand('notifications.clearAll');
      await sleep(1500);
      fs.writeFileSync(process.env.MSB_READY_FILE, '1');
      await sleep(15000);
      return;
    }
  }

  console.log('E2E passed for kinds: ' + solved.join(', '));
};
