import * as fs from 'fs';
import * as path from 'path';
import { Course, Lesson, LessonMeta, Track } from './types';

const QUESTION_TYPES = ['mcq', 'fill', 'predict', 'order', 'bug'];
const EXERCISE_KINDS = ['html', 'js', 'text'];
const LESSON_FOLDER = /^\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function isString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function checkUrl(url: unknown, where: string, errors: string[]): void {
  if (typeof url !== 'string' || !/^https:\/\/[^\s]+$/.test(url)) {
    errors.push(`${where}: url must be an https URL`);
  }
}

function checkQuestion(q: unknown, where: string, errors: string[]): void {
  if (!isObject(q) || typeof q.type !== 'string' || !QUESTION_TYPES.includes(q.type)) {
    errors.push(`${where}: type must be one of ${QUESTION_TYPES.join(', ')}`);
    return;
  }
  if (!isString(q.q)) errors.push(`${where}: missing q`);
  if (!isString(q.explain)) errors.push(`${where}: missing explain`);
  switch (q.type) {
    case 'mcq': {
      const opts = q.options;
      if (!Array.isArray(opts) || opts.length < 2 || opts.length > 6 || !opts.every(isString)) {
        errors.push(`${where}: options must be 2-6 non-empty strings`);
        break;
      }
      const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
      if (!answers.length || !answers.every((a) => Number.isInteger(a) && (a as number) >= 0 && (a as number) < opts.length)) {
        errors.push(`${where}: answer must be a valid option index or array of indexes`);
      }
      if (new Set(opts).size !== opts.length) errors.push(`${where}: options must be unique`);
      break;
    }
    case 'fill': {
      if (!isString(q.template)) errors.push(`${where}: missing template`);
      const blanks = q.blanks;
      const count = typeof q.template === 'string' ? q.template.split('___').length - 1 : 0;
      if (!Array.isArray(blanks) || !blanks.length || !blanks.every((b) => Array.isArray(b) && b.length && b.every(isString))) {
        errors.push(`${where}: blanks must be an array of non-empty answer lists`);
      } else if (blanks.length !== count) {
        errors.push(`${where}: template has ${count} blank(s) (___) but blanks has ${blanks.length}`);
      }
      break;
    }
    case 'predict':
      if (!isString(q.code)) errors.push(`${where}: missing code`);
      if (typeof q.answer !== 'string') errors.push(`${where}: missing answer`);
      break;
    case 'order':
      if (!Array.isArray(q.lines) || q.lines.length < 3 || q.lines.length > 8 || !q.lines.every(isString)) {
        errors.push(`${where}: lines must be 3-8 non-empty strings in the correct order`);
      }
      break;
    case 'bug': {
      if (!isString(q.code)) {
        errors.push(`${where}: missing code`);
        break;
      }
      const total = q.code.split('\n').length;
      const lines = q.answerLines;
      if (!Array.isArray(lines) || !lines.length || !lines.every((n) => Number.isInteger(n) && (n as number) >= 1 && (n as number) <= total)) {
        errors.push(`${where}: answerLines must be 1-based line numbers inside the code`);
      }
      break;
    }
  }
}

export function validateLessonShape(raw: unknown, where: string): string[] {
  const errors: string[] = [];
  if (!isObject(raw)) return [`${where}: lesson.json must be an object`];
  if (!isString(raw.title)) errors.push(`${where}: missing title`);
  if (!Number.isInteger(raw.minutes) || (raw.minutes as number) < 3 || (raw.minutes as number) > 45) {
    errors.push(`${where}: minutes must be an integer from 3 to 45`);
  }
  if (!isString(raw.summary)) errors.push(`${where}: missing summary`);
  if (!Array.isArray(raw.docs) || !raw.docs.length) {
    errors.push(`${where}: docs needs at least one official documentation link`);
  } else {
    raw.docs.forEach((d, i) => {
      if (!isObject(d) || !isString(d.title)) errors.push(`${where}: docs[${i}] needs a title`);
      else checkUrl(d.url, `${where}: docs[${i}]`, errors);
    });
  }
  if (!Array.isArray(raw.quiz)) errors.push(`${where}: quiz must be an array`);
  else raw.quiz.forEach((q, i) => checkQuestion(q, `${where}: quiz[${i}]`, errors));
  const ex = raw.exercise;
  if (ex !== undefined) {
    if (!isObject(ex)) {
      errors.push(`${where}: exercise must be an object`);
    } else {
      if (typeof ex.kind !== 'string' || !EXERCISE_KINDS.includes(ex.kind)) {
        errors.push(`${where}: exercise.kind must be one of ${EXERCISE_KINDS.join(', ')}`);
      }
      if (!isString(ex.file) || /[\\/]/.test(ex.file as string)) errors.push(`${where}: exercise.file must be a plain file name`);
      if (!isString(ex.task)) errors.push(`${where}: exercise.task is required`);
      if (!Array.isArray(ex.hints) || ex.hints.length !== 3 || !ex.hints.every(isString)) {
        errors.push(`${where}: exercise.hints must be exactly 3 strings (nudge, pointer, partial answer)`);
      }
      if (ex.kind === 'html' || ex.kind === 'text') {
        if (!Array.isArray(ex.checks) || !ex.checks.length) errors.push(`${where}: exercise.checks is required for ${ex.kind}`);
        else if (!ex.checks.every((c) => isObject(c) && isString(c.name))) errors.push(`${where}: every check needs a name`);
        else if (ex.kind === 'text' && !ex.checks.every((c) => isObject(c) && isString(c.regex))) {
          errors.push(`${where}: every text check needs a regex`);
        }
      }
    }
  }
  return errors;
}

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
}

export function exerciseExt(file: string): string {
  return path.extname(file);
}

export function starterPath(lesson: Lesson): string | undefined {
  return lesson.exercise ? path.join(lesson.dir, 'starter' + exerciseExt(lesson.exercise.file)) : undefined;
}

export function solutionPath(lesson: Lesson): string | undefined {
  return lesson.exercise ? path.join(lesson.dir, 'solution' + exerciseExt(lesson.exercise.file)) : undefined;
}

export function testPath(lesson: Lesson): string {
  return path.join(lesson.dir, 'test.js');
}

export function loadCourse(root: string): Course {
  const tracks = readJson<{ tracks: Track[] }>(path.join(root, 'tracks.json')).tracks;
  const lessons: Lesson[] = [];
  for (const track of tracks) {
    const trackDir = path.join(root, track.id);
    if (!fs.existsSync(trackDir)) continue;
    const folders = fs.readdirSync(trackDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort();
    for (const folder of folders) {
      const dir = path.join(trackDir, folder);
      const where = `${track.id}/${folder}`;
      if (!LESSON_FOLDER.test(folder)) throw new Error(`${where}: folder name must look like 01-some-slug`);
      const meta = readJson<LessonMeta>(path.join(dir, 'lesson.json'));
      const errors = validateLessonShape(meta, where);
      if (errors.length) throw new Error(errors.join('\n'));
      const markdown = fs.readFileSync(path.join(dir, 'lesson.md'), 'utf8');
      lessons.push({ ...meta, id: where, track: track.id, folder, dir, markdown });
    }
  }
  const byId = new Map(lessons.map((l) => [l.id, l]));
  return { root, tracks, lessons, byId };
}

export function lessonsOf(course: Course, trackId: string): Lesson[] {
  return course.lessons.filter((l) => l.track === trackId);
}
