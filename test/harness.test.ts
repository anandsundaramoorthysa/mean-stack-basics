import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { runJsChecks } from '../src/check/js';

let dir: string;

beforeAll(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'msb-test-'));
});
afterAll(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

async function run(learner: string, test: string, fixtures?: Record<string, string>, timeoutMs = 15000) {
  const lf = path.join(dir, 'learner.js');
  const tf = path.join(dir, 'test.js');
  fs.writeFileSync(lf, learner);
  fs.writeFileSync(tf, test);
  return runJsChecks({ learnerFile: lf, testFile: tf, fixtures, timeoutMs });
}

describe('js harness', () => {
  it('passes and fails individual checks with friendly messages', async () => {
    const out = await run('module.exports = { add: (a, b) => a - b };', `
      check('adds', () => eq(learner().add(2, 3), 5, 'add(2, 3)'));
      check('exports add', () => ok(typeof learner().add === 'function', 'missing add'));
    `);
    expect(out.passed).toBe(false);
    expect(out.results[0]).toMatchObject({ ok: false });
    expect(out.results[0].message).toContain('Expected 5 but got -1');
    expect(out.results[1].ok).toBe(true);
  });

  it('captures printed output', async () => {
    const out = await run("console.log('hi'); console.log(1, 2);", `check('prints', () => { learner(); eq(printed(), ['hi', '1 2']); });`);
    expect(out.passed).toBe(true);
  });

  it('reports a syntax error with a readable message instead of crashing', async () => {
    const out = await run('const x = ;', `check('loads', () => { learner(); });`);
    expect(out.passed).toBe(false);
    expect(out.results[0].message).toMatch(/Your file has an error/);
  });

  it('stops an infinite loop', async () => {
    const out = await run('while (true) {}', `check('loads', () => { learner(); });`, undefined, 1500);
    expect(out.passed).toBe(false);
    expect(out.fatal).toMatch(/ran longer than/);
  });

  it('blocks process.exit in learner code', async () => {
    const out = await run('process.exit(1);', `check('loads', () => { learner(); });`);
    expect(out.results[0].message).toMatch(/process\.exit/);
  });

  it('runs the learner file as a separate script with stdin', async () => {
    const out = await run(`process.stdin.on('data', d => console.log('got ' + d.toString().trim()));`, `
      check('echo', async () => { const r = await runScript({ stdin: 'abc\\n' }); eq(r.stdout, 'got abc\\n'); });
    `);
    expect(out.passed).toBe(true);
  });

  it('exposes fixtures in the working directory', async () => {
    const out = await run(`module.exports = require('fs').readFileSync('data.txt', 'utf8').trim();`, `
      check('reads fixture', () => eq(learner(), 'hello'));
    `, { 'data.txt': 'hello\n' });
    expect(out.passed).toBe(true);
  });

  it('tests an Express app over HTTP, including JSON bodies', async () => {
    const out = await run(`
      const express = require('express');
      const app = express();
      app.use(express.json());
      app.post('/echo', (req, res) => res.status(201).json({ got: req.body.name }));
      app.get('/boom', async () => { throw new Error('nope'); });
      module.exports = app;
    `, `
      check('post json', async () => {
        const r = await request(learner()).post('/echo', { name: 'Asha' });
        eq(r.status, 201); eq(r.json, { got: 'Asha' });
      });
      check('async errors become 500', async () => { eq((await request(learner()).get('/boom')).status, 500); });
    `);
    expect(out.results.map((r) => r.message ?? 'ok')).toEqual(['ok', 'ok']);
  });

  it('accepts a plain http.Server', async () => {
    const out = await run(`module.exports = require('http').createServer((req, res) => res.end('plain'));`, `
      check('plain server', async () => eq((await request(learner()).get('/')).text, 'plain'));
    `);
    expect(out.passed).toBe(true);
  });

  it('drives a DOM with events', async () => {
    const out = await run(`
      const button = document.querySelector('#b');
      const out = document.querySelector('#out');
      let n = 0;
      button.addEventListener('click', () => { n += 1; out.textContent = String(n); });
    `, `
      check('click updates the text', () => {
        const d = dom('<button id="b">go</button><p id="out">0</p>');
        d.click(d.document.querySelector('#b'));
        d.click(d.document.querySelector('#b'));
        eq(d.document.querySelector('#out').textContent, '2');
      });
    `);
    expect(out.results[0].message ?? 'ok').toBe('ok');
  });

  it('runs MongoDB queries, aggregation, joins and updates against seed data', async () => {
    const seed = `{
      students: [{ name: 'A', marks: 90, dept: 1 }, { name: 'B', marks: 70, dept: 2 }, { name: 'C', marks: 85, dept: 1 }],
      depts: [{ _id: 1, title: 'IT' }, { _id: 2, title: 'AI' }]
    }`;
    const find = await run(`db.students.find({ marks: { $gte: 85 } }).sort({ marks: -1 }).limit(5)`, `
      check('find', () => eq(mongo(${seed}).result.map((d) => d.name), ['A', 'C']));
    `);
    expect(find.results[0].message ?? 'ok').toBe('ok');
    const agg = await run(`db.students.aggregate([{ $group: { _id: '$dept', avg: { $avg: '$marks' } } }, { $sort: { _id: 1 } }])`, `
      check('group', () => eq(mongo(${seed}).result, [{ _id: 1, avg: 87.5 }, { _id: 2, avg: 70 }]));
    `);
    expect(agg.results[0].message ?? 'ok').toBe('ok');
    const lookup = await run(`db.students.aggregate([{ $lookup: { from: 'depts', localField: 'dept', foreignField: '_id', as: 'd' } }, { $unwind: '$d' }, { $project: { _id: 0, name: 1, title: '$d.title' } }])`, `
      check('lookup', () => eq(mongo(${seed}).result[1], { name: 'B', title: 'AI' }));
    `);
    expect(lookup.results[0].message ?? 'ok').toBe('ok');
    const shapes = await run(`[db.students.distinct('dept'), db.students.insertMany([{ name: 'X' }, { name: 'Y' }]).insertedIds['1'] !== undefined, db.students.updateOne({ name: 'A' }, { $set: { marks: 1 } })]`, `
      check('matches the real server shapes', () => {
        const [distinct, hasIds, update] = mongo(${seed}).result;
        eq(distinct, [1, 2], 'distinct returns sorted values');
        eq(hasIds, true, 'insertedIds is keyed by position');
        eq(update, { acknowledged: true, insertedId: null, matchedCount: 1, modifiedCount: 1, upsertedCount: 0 });
      });
    `);
    expect(shapes.results[0].message ?? 'ok').toBe('ok');
    const upd = await run(`db.students.updateOne({ name: 'B' }, { $inc: { marks: 5 } })
db.students.deleteMany({ marks: { $lt: 86 } })
db.students.insertOne({ name: 'D', marks: 99, dept: 2 })`, `
      check('state', () => eq(mongo(${seed}).collection('students').map((d) => d.name), ['A', 'D']));
    `);
    expect(upd.results[0].message ?? 'ok').toBe('ok');
  });
});
