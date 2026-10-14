/* Runs inside a child process. Loads a lesson's test.js, which registers checks through the globals set up below. */
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as util from 'util';
import { spawn } from 'child_process';
import type { AddressInfo } from 'net';
import { plain, readCollection, runLearnerQuery } from './mongo';

interface Job {
  learnerFile: string;
  testFile: string;
}

class CheckError extends Error {}

const job: Job = JSON.parse(process.env.MSB_JOB as string);
const source = fs.readFileSync(job.learnerFile, 'utf8');
const registered: { name: string; fn: () => unknown }[] = [];
const printed: string[] = [];
const asyncErrors: string[] = [];
const SAFE_ENV_KEYS = ['PATH', 'SystemRoot', 'windir', 'TEMP', 'TMP', 'TMPDIR', 'HOME', 'USERPROFILE', 'NODE_PATH'];

function pick(keys: string[]): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const k of keys) if (process.env[k] !== undefined) env[k] = process.env[k];
  return env;
}

function fmt(v: unknown): string {
  const s = util.inspect(v, { depth: 4, breakLength: 100, maxStringLength: 120, maxArrayLength: 12 });
  return s.length > 300 ? s.slice(0, 297) + '...' : s;
}

function describeError(e: unknown): string {
  if (e instanceof CheckError) return e.message;
  const err = e as Error;
  return `${err?.name ?? 'Error'}: ${err?.message ?? String(e)}`;
}

console.log = console.info = console.warn = console.error = console.debug = (...args: unknown[]): void => {
  printed.push(util.format(...args));
};

const realExit = process.exit.bind(process);
(process as any).exit = (): never => {
  throw new CheckError('Your code called process.exit(). Remove it so the checks can finish.');
};
process.on('uncaughtException', (e) => asyncErrors.push(describeError(e)));
process.on('unhandledRejection', (e) => asyncErrors.push(describeError(e)));

let cached: unknown;
let loadError: Error | undefined;
let loaded = false;

function friendlyLoadError(e: unknown): Error {
  const err = e as Error;
  const stack = String(err?.stack ?? '');
  const base = path.basename(job.learnerFile).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const line = stack.match(new RegExp(base + ':(\\d+)'))?.[1];
  const where = line ? ` (around line ${line})` : '';
  return new CheckError(`Your file has an error${where}: ${err?.name ?? 'Error'}: ${err?.message ?? String(e)}`);
}

function learner(): any {
  if (loadError) throw loadError;
  if (!loaded) {
    loaded = true;
    try {
      cached = require(job.learnerFile);
    } catch (e) {
      loadError = friendlyLoadError(e);
      throw loadError;
    }
  }
  return cached;
}

function check(name: string, fn: () => unknown): void {
  registered.push({ name, fn });
}

function eq(actual: unknown, expected: unknown, message?: string): void {
  if (!util.isDeepStrictEqual(actual, expected)) {
    throw new CheckError(`${message ? message + ' ' : ''}Expected ${fmt(expected)} but got ${fmt(actual)}.`);
  }
}

function ok(condition: unknown, message: string): void {
  if (!condition) throw new CheckError(message);
}

function near(actual: number, expected: number, message?: string, tolerance = 1e-6): void {
  if (typeof actual !== 'number' || Math.abs(actual - expected) > tolerance) {
    throw new CheckError(`${message ? message + ' ' : ''}Expected about ${expected} but got ${fmt(actual)}.`);
  }
}

function runScript(opts: { stdin?: string; args?: string[]; timeoutMs?: number } = {}): Promise<{ stdout: string; stderr: string; code: number | null; timedOut: boolean }> {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [job.learnerFile, ...(opts.args ?? [])], {
      cwd: process.cwd(),
      env: { ...pick(SAFE_ENV_KEYS), ELECTRON_RUN_AS_NODE: '1' },
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true,
    });
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, opts.timeoutMs ?? 4000);
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ stdout: stdout.replace(/\r\n/g, '\n'), stderr: stderr.replace(/\r\n/g, '\n'), code, timedOut });
    });
    child.stdin.on('error', () => undefined);
    child.stdin.end(opts.stdin ?? '');
  });
}

function request(appOrServer: any) {
  const app: http.RequestListener = typeof appOrServer === 'function' ? appOrServer : (req, res) => appOrServer.emit('request', req, res);
  async function call(method: string, urlPath: string, body?: unknown, headers: Record<string, string> = {}) {
    const server = http.createServer(app);
    await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
    const { port } = server.address() as AddressInfo;
    try {
      const init: RequestInit & { headers: Record<string, string> } = { method, headers: { connection: 'close', ...headers }, redirect: 'manual' };
      if (body !== undefined) {
        if (typeof body === 'string') {
          init.body = body;
        } else {
          init.body = JSON.stringify(body);
          init.headers['content-type'] = 'application/json';
        }
      }
      const res = await fetch(`http://127.0.0.1:${port}${urlPath}`, init);
      const text = await res.text();
      let json: unknown;
      try {
        json = JSON.parse(text);
      } catch {
        json = undefined;
      }
      return { status: res.status, headers: Object.fromEntries(res.headers.entries()), text, json };
    } finally {
      server.closeAllConnections?.();
      server.close();
    }
  }
  return {
    get: (p: string, h?: Record<string, string>) => call('GET', p, undefined, h),
    post: (p: string, b?: unknown, h?: Record<string, string>) => call('POST', p, b, h),
    put: (p: string, b?: unknown, h?: Record<string, string>) => call('PUT', p, b, h),
    patch: (p: string, b?: unknown, h?: Record<string, string>) => call('PATCH', p, b, h),
    delete: (p: string, h?: Record<string, string>) => call('DELETE', p, undefined, h),
  };
}

function dom(html: string, opts: { runLearner?: boolean } = {}) {
  const { parseHTML } = require('linkedom');
  const { window, document } = parseHTML(html);
  const alerts: string[] = [];
  const store = new Map<string, string>();
  const g = globalThis as any;
  g.window = window;
  g.document = document;
  g.Event = window.Event;
  g.CustomEvent = window.CustomEvent;
  g.MouseEvent = window.MouseEvent ?? window.Event;
  g.alert = (m: unknown) => alerts.push(String(m));
  g.localStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k) : null),
    setItem: (k: string, v: unknown) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
  };
  window.alert = g.alert;
  window.localStorage = g.localStorage;
  if (opts.runLearner !== false) {
    delete require.cache[require.resolve(job.learnerFile)];
    loaded = false;
    loadError = undefined;
    learner();
  }
  const click = (el: any) => el.dispatchEvent(new g.MouseEvent('click', { bubbles: true, cancelable: true }));
  const type = (el: any, value: string) => {
    el.value = value;
    el.dispatchEvent(new g.Event('input', { bubbles: true }));
    el.dispatchEvent(new g.Event('change', { bubbles: true }));
  };
  return { window, document, alerts, click, type };
}

function mongo(seed: Record<string, any[]>) {
  const run = runLearnerQuery(source, seed);
  return { result: run.result, collection: (name: string) => readCollection(run.db, name) };
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new CheckError('This check took too long. Look for an infinite loop or a promise that never finishes.')), ms);
    p.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
  });
}

Object.assign(globalThis, { check, learner, source, eq, ok, near, runScript, request, dom, mongo, plain, printed: () => printed.slice() });

function emit(payload: unknown): Promise<void> {
  return new Promise((resolve) => process.stdout.write('\n@@MSB@@' + JSON.stringify(payload) + '\n', () => resolve()));
}

async function main(): Promise<void> {
  try {
    require(job.testFile);
  } catch (e) {
    await emit({ fatal: 'This lesson test could not be loaded: ' + describeError(e) });
    return;
  }
  const results: { name: string; ok: boolean; message?: string }[] = [];
  for (const c of registered) {
    try {
      await withTimeout(Promise.resolve(c.fn()), 4000);
      results.push({ name: c.name, ok: true });
    } catch (e) {
      results.push({ name: c.name, ok: false, message: describeError(e) });
    }
  }
  await emit({ results, printed, asyncErrors });
}

main().finally(() => realExit(0));
