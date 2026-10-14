import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { solutionPath, starterPath } from './course';
import { Lesson } from './types';

export function courseFolder(configured: string, home: string = os.homedir()): string {
  return configured.trim() ? configured.trim() : path.join(home, 'MEAN Stack Basics');
}

export function exerciseDir(root: string, lesson: Lesson): string {
  return path.join(root, lesson.track, lesson.folder);
}

export function exercisePath(root: string, lesson: Lesson): string | undefined {
  return lesson.exercise ? path.join(exerciseDir(root, lesson), lesson.exercise.file) : undefined;
}

export function ensureExercise(root: string, lesson: Lesson): { file: string; created: boolean } | undefined {
  const file = exercisePath(root, lesson);
  const starter = starterPath(lesson);
  if (!file || !starter) return undefined;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file)) return { file, created: false };
  fs.copyFileSync(starter, file);
  return { file, created: true };
}

export function resetExercise(root: string, lesson: Lesson): string | undefined {
  const file = exercisePath(root, lesson);
  const starter = starterPath(lesson);
  if (!file || !starter) return undefined;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.copyFileSync(starter, file);
  return file;
}

export function readSolution(lesson: Lesson): string | undefined {
  const file = solutionPath(lesson);
  return file && fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : undefined;
}
