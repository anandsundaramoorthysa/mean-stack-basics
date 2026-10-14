import { Course, Lesson } from './types';

export interface Memento {
  get<T>(key: string, defaultValue: T): T;
  update(key: string, value: unknown): Thenable<void>;
}

export interface LessonProgress {
  quiz: Record<number, boolean>;
  exercisePassed: boolean;
  attempts: number;
  failedRuns: number;
  hintLevel: number;
  forced: boolean;
  updated: string;
}

export interface ProgressData {
  v: 1;
  lessons: Record<string, LessonProgress>;
}

export const PROGRESS_KEY = 'meanStackBasics.progress.v1';
const QUIZ_PASS_RATIO = 0.8;

export function emptyLesson(): LessonProgress {
  return { quiz: {}, exercisePassed: false, attempts: 0, failedRuns: 0, hintLevel: 0, forced: false, updated: '' };
}

export function quizScore(lesson: Lesson, p: LessonProgress): number {
  if (!lesson.quiz.length) return 1;
  const correct = lesson.quiz.filter((_, i) => p.quiz[i]).length;
  return correct / lesson.quiz.length;
}

export function isDone(lesson: Lesson, p: LessonProgress | undefined): boolean {
  if (!p) return false;
  if (p.forced) return true;
  const exerciseOk = !lesson.exercise || p.exercisePassed;
  return exerciseOk && quizScore(lesson, p) >= QUIZ_PASS_RATIO;
}

export class ProgressStore {
  private data: ProgressData;

  constructor(private readonly memento: Memento, private readonly now: () => Date = () => new Date()) {
    const raw = memento.get<ProgressData | undefined>(PROGRESS_KEY, undefined);
    this.data = raw && raw.v === 1 && raw.lessons ? raw : { v: 1, lessons: {} };
  }

  get(id: string): LessonProgress {
    return this.data.lessons[id] ?? emptyLesson();
  }

  update(id: string, patch: (p: LessonProgress) => void): Thenable<void> {
    const current = { ...emptyLesson(), ...this.data.lessons[id], quiz: { ...(this.data.lessons[id]?.quiz ?? {}) } };
    patch(current);
    current.updated = this.now().toISOString();
    this.data.lessons[id] = current;
    return this.save();
  }

  done(lesson: Lesson): boolean {
    return isDone(lesson, this.data.lessons[lesson.id]);
  }

  reset(id?: string): Thenable<void> {
    if (id) delete this.data.lessons[id];
    else this.data = { v: 1, lessons: {} };
    return this.save();
  }

  private save(): Thenable<void> {
    return this.memento.update(PROGRESS_KEY, this.data);
  }

  trackSummary(course: Course, trackId: string): { done: number; total: number } {
    const lessons = course.lessons.filter((l) => l.track === trackId);
    return { done: lessons.filter((l) => this.done(l)).length, total: lessons.length };
  }

  overall(course: Course): { done: number; total: number } {
    return { done: course.lessons.filter((l) => this.done(l)).length, total: course.lessons.length };
  }

  nextLesson(course: Course, afterId?: string): Lesson | undefined {
    const start = afterId ? course.lessons.findIndex((l) => l.id === afterId) + 1 : 0;
    const ordered = [...course.lessons.slice(start), ...course.lessons.slice(0, start)];
    return ordered.find((l) => !this.done(l));
  }
}
