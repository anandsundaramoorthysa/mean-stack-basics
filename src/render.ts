import MarkdownIt from 'markdown-it';
import { Lesson, Question } from './types';

const md = new MarkdownIt({ html: false, linkify: false, typographer: false, breaks: false });

const defaultLink = md.renderer.rules.link_open ?? ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet('href') ?? '';
  if (!/^https:\/\//i.test(href)) {
    tokens[idx].attrSet('href', '#');
    tokens[idx].attrSet('aria-disabled', 'true');
  } else {
    tokens[idx].attrSet('data-external', '1');
  }
  return defaultLink(tokens, idx, options, env, self);
};

export function renderBlock(markdown: string): string {
  return md.render(markdown);
}

export function renderInline(markdown: string): string {
  return md.renderInline(markdown);
}

export interface QuestionView {
  type: Question['type'];
  qHtml: string;
  explainHtml: string;
  options?: string[];
  optionsHtml?: string[];
  multi?: boolean;
  answer?: number[];
  template?: string;
  blanks?: string[][];
  code?: string;
  language?: string;
  accept?: string[];
  expected?: string;
  lines?: string[];
  order?: number[];
  answerLines?: number[];
}

function shuffledOrder(n: number, seed: string): number[] {
  const idx = Array.from({ length: n }, (_, i) => i);
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const rand = (): number => {
    h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  if (idx.every((v, i) => v === i) && n > 1) [idx[0], idx[1]] = [idx[1], idx[0]];
  return idx;
}

export function questionView(q: Question, seed: string): QuestionView {
  const base = { type: q.type, qHtml: renderInline(q.q), explainHtml: renderInline(q.explain) };
  switch (q.type) {
    case 'mcq': {
      const answer = Array.isArray(q.answer) ? q.answer : [q.answer];
      return { ...base, options: q.options, optionsHtml: q.options.map(renderInline), multi: answer.length > 1, answer };
    }
    case 'fill':
      return { ...base, template: q.template, blanks: q.blanks };
    case 'predict':
      return { ...base, code: q.code, language: q.language, expected: q.answer, accept: q.accept ?? [] };
    case 'order':
      return { ...base, lines: q.lines, order: shuffledOrder(q.lines.length, seed) };
    case 'bug':
      return { ...base, code: q.code, language: q.language, answerLines: q.answerLines };
  }
}

export function lessonBodyHtml(lesson: Lesson): string {
  return renderBlock(lesson.markdown);
}
