import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { spawn } from 'child_process';
import { CheckOutcome, CheckResult } from '../types';

export interface JsRunOptions {
  learnerFile: string;
  testFile: string;
  fixtures?: Record<string, string>;
  timeoutMs?: number;
}

const MARKER = '@@MSB@@';
const DEFAULT_TIMEOUT_MS = 8000;
const ENV_KEYS = ['PATH', 'SystemRoot', 'windir', 'TEMP', 'TMP', 'TMPDIR', 'HOME', 'USERPROFILE'];

export function harnessPath(): string {
  const beside = path.join(__dirname, '..', 'harness', 'runner.js');
  if (fs.existsSync(beside)) return beside;
  return path.join(__dirname, '..', '..', 'out', 'harness', 'runner.js');
}

function nodeModulesPath(): string {
  return path.join(path.dirname(path.dirname(harnessPath())), '..', 'node_modules');
}

export function runJsChecks(opts: JsRunOptions): Promise<CheckOutcome> {
  const work = fs.mkdtempSync(path.join(os.tmpdir(), 'msb-'));
  for (const [name, content] of Object.entries(opts.fixtures ?? {})) {
    const target = path.join(work, name);
    if (path.relative(work, target).startsWith('..')) continue;
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  }
  const env: NodeJS.ProcessEnv = { ELECTRON_RUN_AS_NODE: '1', NODE_PATH: nodeModulesPath() };
  for (const k of ENV_KEYS) if (process.env[k] !== undefined) env[k] = process.env[k];
  env.MSB_JOB = JSON.stringify({ learnerFile: path.resolve(opts.learnerFile), testFile: path.resolve(opts.testFile) });
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  return new Promise((resolve) => {
    const child = spawn(process.execPath, [harnessPath()], { cwd: work, env, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, timeoutMs);
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    const finish = (outcome: CheckOutcome): void => {
      clearTimeout(timer);
      fs.rm(work, { recursive: true, force: true }, () => resolve(outcome));
    };
    child.on('error', (e) => finish({ passed: false, results: [], fatal: `Could not start the checker: ${e.message}` }));
    child.on('close', () => {
      const at = stdout.lastIndexOf(MARKER);
      if (at < 0) {
        const reason = timedOut
          ? `Your code ran longer than ${Math.round(timeoutMs / 1000)} seconds and was stopped. Look for an infinite loop.`
          : `The checker stopped unexpectedly. ${stderr.trim().split('\n').slice(-3).join(' ')}`.trim();
        finish({ passed: false, results: [], fatal: reason });
        return;
      }
      try {
        const payload = JSON.parse(stdout.slice(at + MARKER.length).trim());
        if (payload.fatal) {
          finish({ passed: false, results: [], fatal: payload.fatal });
          return;
        }
        const results = payload.results as CheckResult[];
        const extra: string[] = payload.asyncErrors ?? [];
        if (extra.length && results.every((r) => r.ok)) {
          results.push({ name: 'No uncaught errors', ok: false, message: extra[0] });
        }
        finish({ passed: results.length > 0 && results.every((r) => r.ok), results, printed: payload.printed });
      } catch {
        finish({ passed: false, results: [], fatal: 'The checker returned an unreadable result.' });
      }
    });
  });
}
