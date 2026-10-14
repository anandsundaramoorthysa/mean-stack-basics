import * as fs from 'fs';
import { testPath } from './course';
import { runJsChecks } from './check/js';
import { runTextChecks } from './check/text';
import { CheckOutcome, CheckResult, DomCheck, Lesson, TextCheck } from './types';

export type HtmlRunner = (html: string, checks: DomCheck[]) => Promise<CheckResult[]>;

export async function checkExercise(lesson: Lesson, file: string, runHtml: HtmlRunner): Promise<CheckOutcome> {
  const ex = lesson.exercise;
  if (!ex) return { passed: false, results: [], fatal: 'This lesson has no exercise.' };
  if (!fs.existsSync(file)) return { passed: false, results: [], fatal: 'The exercise file does not exist yet. Open it first.' };
  const source = fs.readFileSync(file, 'utf8');
  if (!source.trim()) return { passed: false, results: [], fatal: 'The exercise file is empty.' };
  if (ex.kind === 'text') return runTextChecks(source, ex.checks as TextCheck[]);
  if (ex.kind === 'html') {
    const results = await runHtml(source, ex.checks as DomCheck[]);
    return { passed: results.length > 0 && results.every((r) => r.ok), results };
  }
  return runJsChecks({ learnerFile: file, testFile: testPath(lesson), fixtures: ex.fixtures, timeoutMs: ex.timeoutMs });
}
