export interface DocLink {
  title: string;
  url: string;
}

export interface Track {
  id: string;
  title: string;
  summary: string;
  docsHome: DocLink;
  legacy?: boolean;
}

export interface McqQuestion {
  type: 'mcq';
  q: string;
  options: string[];
  answer: number | number[];
  explain: string;
}

export interface FillQuestion {
  type: 'fill';
  q: string;
  template: string;
  blanks: string[][];
  explain: string;
}

export interface PredictQuestion {
  type: 'predict';
  q: string;
  code: string;
  language?: string;
  answer: string;
  accept?: string[];
  explain: string;
}

export interface OrderQuestion {
  type: 'order';
  q: string;
  lines: string[];
  explain: string;
}

export interface BugQuestion {
  type: 'bug';
  q: string;
  code: string;
  language?: string;
  answerLines: number[];
  explain: string;
}

export type Question = McqQuestion | FillQuestion | PredictQuestion | OrderQuestion | BugQuestion;

export interface DomCheck {
  name: string;
  hint?: string;
  selector?: string;
  count?: number | { min?: number; max?: number };
  scope?: 'first' | 'all' | 'any';
  text?: { equals?: string; includes?: string; regex?: string; flags?: string };
  attr?: { name: string; equals?: string; includes?: string; regex?: string; flags?: string; present?: boolean };
  style?: { prop: string; equals?: string; oneOf?: string[]; regex?: string; min?: number; max?: number };
  source?: { includes?: string; notIncludes?: string; regex?: string; flags?: string };
}

export interface TextCheck {
  name: string;
  hint?: string;
  regex: string;
  flags?: string;
  not?: boolean;
  collapseWhitespace?: boolean;
}

export interface Exercise {
  kind: 'html' | 'js' | 'text';
  file: string;
  task: string;
  hints: string[];
  checks?: DomCheck[] | TextCheck[];
  fixtures?: Record<string, string>;
  timeoutMs?: number;
}

export interface LessonMeta {
  title: string;
  minutes: number;
  summary: string;
  docs: DocLink[];
  quiz: Question[];
  exercise?: Exercise;
}

export interface Lesson extends LessonMeta {
  id: string;
  track: string;
  folder: string;
  dir: string;
  markdown: string;
}

export interface Course {
  root: string;
  tracks: Track[];
  lessons: Lesson[];
  byId: Map<string, Lesson>;
}

export interface CheckResult {
  name: string;
  ok: boolean;
  message?: string;
}

export interface CheckOutcome {
  passed: boolean;
  results: CheckResult[];
  printed?: string[];
  fatal?: string;
}
