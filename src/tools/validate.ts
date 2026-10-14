/* Course validator. Run with: npm run validate [-- --track <id>] [-- --links]
   For every lesson: schema is valid, starter fails at least one check, solution passes every check. */
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as vm from 'vm';
import { loadCourse, solutionPath, starterPath, testPath } from '../course';
import { runJsChecks } from '../check/js';
import { runTextChecks } from '../check/text';
import { CheckResult, DomCheck, Lesson, TextCheck } from '../types';

const ROOT = path.join(__dirname, '..', '..');
const COURSE_DIR = path.join(ROOT, 'course');

interface Args {
  track?: string;
  links: boolean;
}

function parseArgs(argv: string[]): Args {
  const args: Args = { links: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--track') args.track = argv[++i];
    if (argv[i] === '--links') args.links = true;
  }
  return args;
}

function findChromium(): string | undefined {
  const base = process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'ms-playwright') : path.join(process.env.HOME ?? '', '.cache', 'ms-playwright');
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  if (!fs.existsSync(base)) return undefined;
  const dirs = fs.readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse();
  for (const d of dirs) {
    for (const rel of ['chrome-win64/chrome.exe', 'chrome-win/chrome.exe', 'chrome-linux64/chrome', 'chrome-linux/chrome', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium']) {
      const p = path.join(base, d, rel);
      if (fs.existsSync(p)) return p;
    }
  }
  return undefined;
}

let browserPromise: Promise<any> | undefined;
async function getBrowser(): Promise<any> {
  if (!browserPromise) {
    const exe = findChromium();
    if (!exe) throw new Error('No Chromium found. Set CHROME_PATH to a Chrome/Chromium executable to validate HTML lessons.');
    const { chromium } = require('playwright-core');
    browserPromise = chromium.launch({ executablePath: exe, headless: true });
  }
  return browserPromise;
}

async function runHtml(source: string, checks: DomCheck[]): Promise<CheckResult[]> {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    await page.setContent(source, { waitUntil: 'load' });
    await page.addScriptTag({ path: path.join(ROOT, 'media', 'dom-checks.js') });
    return await page.evaluate(([c, s]: [DomCheck[], string]) => (window as any).MsbDomChecks.runChecks(document, c, s), [checks, source]);
  } finally {
    await page.close();
  }
}

async function runLesson(lesson: Lesson, file: string): Promise<CheckResult[] | string> {
  const ex = lesson.exercise!;
  const source = fs.readFileSync(file, 'utf8');
  if (ex.kind === 'text') return runTextChecks(source, ex.checks as TextCheck[]).results;
  if (ex.kind === 'html') return runHtml(source, ex.checks as DomCheck[]);
  const out = await runJsChecks({ learnerFile: file, testFile: testPath(lesson), fixtures: ex.fixtures, timeoutMs: ex.timeoutMs ?? 20000 });
  return out.fatal ?? out.results;
}

const JS_LANGS = new Set(['js', 'javascript', 'node', 'nodejs']);

function norm(s: string): string {
  return s.replace(/\s+/g, ' ').trim();
}

/** Names that only exist inside an Express app, a browser page or the MongoDB shell. Snippets that need them cannot run on their own. */
const CONTEXT_GLOBALS = new Set(['document', 'window', 'db', 'app', 'req', 'res', 'router', 'express', 'localStorage', 'alert', 'fs', 'http', 'os', 'blocked_module']);
/** Pure modules that are safe to run from quiz snippets. Anything touching files, the network or the machine is skipped. */
const SAFE_MODULES = new Set(['path', 'node:path', 'events', 'node:events', 'url', 'node:url', 'querystring', 'node:querystring', 'util', 'node:util', 'assert', 'node:assert', 'buffer', 'node:buffer']);

function safeRequire(name: string): unknown {
  if (SAFE_MODULES.has(name)) return require(name);
  const e = new ReferenceError('blocked_module is needed for this snippet');
  throw e;
}

async function runSnippet(code: string): Promise<{ output: string; threw?: string; skipped?: boolean }> {
  // The command line arguments are given in the question text, so the snippet cannot be run on its own.
  if (/process\.argv|process\.stdin/.test(code)) return { output: '', skipped: true };
  const lines: string[] = [];
  const fmt = (...a: unknown[]): string => util.format(...a);
  const log = (...a: unknown[]): number => lines.push(fmt(...a));
  const sandbox: Record<string, unknown> = {
    console: { log, info: log, warn: log, error: log },
    setTimeout, clearTimeout, setInterval, clearInterval, setImmediate, queueMicrotask, Promise,
    require: safeRequire, Buffer, URL, URLSearchParams, TextEncoder, TextDecoder, structuredClone,
    module: { exports: {} }, exports: {},
    process: { argv: ['node', 'script.js'], env: {}, platform: process.platform, version: process.version, versions: process.versions, cwd: () => '/work', exit: () => undefined, stdout: { write: (s: string) => lines.push(String(s).replace(/\n$/, '')) } },
  };
  let threw: string | undefined;
  try {
    vm.runInNewContext(code, sandbox, { timeout: 1000 });
    await new Promise((r) => setTimeout(r, 250));
  } catch (e) {
    const err = e as Error;
    const missing = err.name === 'ReferenceError' ? err.message.split(' ')[0] : '';
    // Fragments such as a MongoDB pipeline stage are not runnable JavaScript, so they cannot be judged here.
    if (CONTEXT_GLOBALS.has(missing) || err.name === 'SyntaxError') return { output: '', skipped: true };
    threw = `${err.name}: ${err.message}`;
  }
  if (!threw && !lines.length && !/console\.|process\.stdout/.test(code)) return { output: '', skipped: true };
  return { output: lines.join('\n'), threw };
}

/** Style rules from docs/AUTHORING.md that can be checked mechanically. */
function lintLesson(l: Lesson): string[] {
  const problems: string[] = [];
  const text = [l.markdown, l.title, l.summary, JSON.stringify(l.quiz), JSON.stringify(l.exercise ?? {})].join('\n');
  if (/\p{Extended_Pictographic}/u.test(text.replace(/[✓✔✗✘]/g, ''))) problems.push(`${l.id}: contains an emoji`);
  if (/\b(FIXME|lorem ipsum)\b/i.test(l.markdown + JSON.stringify(l.quiz))) problems.push(`${l.id}: contains placeholder text`);
  const types = new Set(l.quiz.map((q) => q.type));
  if (l.quiz.length >= 3 && types.size < 2) problems.push(`${l.id}: quiz should mix at least two question types`);
  if (l.quiz.length > 6) problems.push(`${l.id}: more than 6 quiz questions`);
  const urls = l.docs.map((d) => d.url);
  if (new Set(urls).size !== urls.length) problems.push(`${l.id}: duplicate documentation link`);
  const ex = l.exercise;
  if (ex) {
    if (new Set(ex.hints.map((h) => h.trim())).size !== ex.hints.length) problems.push(`${l.id}: hints must be different from each other`);
  }
  const words = l.markdown.trim().split(/\s+/).length;
  if (words > 700) problems.push(`${l.id}: lesson.md is ${words} words; split it or trim it`);
  return problems;
}

/** Runs the JavaScript of every "predict" question and compares the real output with the stored answer. */
async function verifyPredictions(lessons: Lesson[]): Promise<string[]> {
  const problems: string[] = [];
  for (const l of lessons) {
    for (let i = 0; i < l.quiz.length; i++) {
      const q = l.quiz[i];
      if (q.type !== 'predict' || !JS_LANGS.has((q.language ?? '').toLowerCase())) continue;
      const run = await runSnippet(q.code);
      if (run.skipped) continue;
      const accepted = [q.answer, ...(q.accept ?? [])].map(norm);
      if (run.threw) {
        if (!accepted.some((a) => a.includes(run.threw!.split(':')[0]))) {
          problems.push(`${l.id}: quiz[${i}] predict code throws ${run.threw}; the stored answer does not mention that error`);
        }
        continue;
      }
      if (!accepted.includes(norm(run.output))) {
        problems.push(`${l.id}: quiz[${i}] predict answer "${q.answer}" but the code prints "${norm(run.output)}"`);
      }
    }
  }
  return problems;
}

async function checkLinks(urls: string[]): Promise<string[]> {
  const bad: string[] = [];
  const queue = [...urls];
  async function worker(): Promise<void> {
    for (let url = queue.pop(); url; url = queue.pop()) {
      try {
        const res = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'user-agent': 'mean-stack-basics-validator' } });
        if (!res.ok) bad.push(`${res.status} ${url}`);
        await res.arrayBuffer().catch(() => undefined);
      } catch (e) {
        bad.push(`ERR ${url} (${(e as Error).message})`);
      }
    }
  }
  await Promise.all(Array.from({ length: 6 }, worker));
  return bad;
}

async function main(): Promise<void> {
  // Quiz snippets can reject asynchronously after they are judged; that must never crash the validator.
  process.on('unhandledRejection', () => undefined);
  process.on('uncaughtException', () => undefined);
  const args = parseArgs(process.argv.slice(2));
  const course = loadCourse(COURSE_DIR);
  const lessons = course.lessons.filter((l) => !args.track || l.track === args.track);
  const problems: string[] = [];
  let withExercise = 0;
  for (const lesson of lessons) {
    const ex = lesson.exercise;
    lintLesson(lesson).forEach((p) => problems.push(p));
    if (!lesson.quiz.length && !ex) problems.push(`${lesson.id}: needs a quiz or an exercise`);
    if (lesson.markdown.trim().split(/\s+/).length < 40) problems.push(`${lesson.id}: lesson.md is too short`);
    if (!ex) continue;
    withExercise += 1;
    const starter = starterPath(lesson)!;
    const solution = solutionPath(lesson)!;
    if (!fs.existsSync(starter) || !fs.existsSync(solution)) {
      problems.push(`${lesson.id}: missing ${path.basename(starter)} or ${path.basename(solution)}`);
      continue;
    }
    if (ex.kind === 'js' && !fs.existsSync(testPath(lesson))) {
      problems.push(`${lesson.id}: missing test.js`);
      continue;
    }
    const good = await runLesson(lesson, solution);
    if (typeof good === 'string') problems.push(`${lesson.id}: solution could not run - ${good}`);
    else {
      const failed = good.filter((r) => !r.ok);
      if (!good.length) problems.push(`${lesson.id}: solution produced no check results`);
      for (const f of failed) problems.push(`${lesson.id}: solution fails "${f.name}" - ${f.message}`);
    }
    const bad = await runLesson(lesson, starter);
    if (typeof bad !== 'string' && bad.length && bad.every((r) => r.ok)) problems.push(`${lesson.id}: starter already passes every check`);
  }
  if (browserPromise) await (await browserPromise).close();
  (await verifyPredictions(lessons)).forEach((p) => problems.push(p));
  if (args.links) {
    const urls = new Set<string>();
    for (const t of course.tracks) urls.add(t.docsHome.url);
    for (const l of lessons) l.docs.forEach((d) => urls.add(d.url));
    const bad = await checkLinks([...urls]);
    bad.forEach((b) => problems.push(`link: ${b}`));
  }
  const scope = args.track ? `track ${args.track}` : 'all tracks';
  console.log(`Checked ${lessons.length} lessons (${withExercise} with exercises) in ${scope}.`);
  if (problems.length) {
    console.error(`\n${problems.length} problem(s):\n` + problems.map((p) => ' - ' + p).join('\n'));
    process.exit(1);
  }
  console.log('All lessons valid.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
