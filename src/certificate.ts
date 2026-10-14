import { Course, Track } from './types';
import { ProgressStore, quizScore } from './progress';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function certificateHtml(name: string, track: Track, lessonCount: number, date: Date): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Certificate of completion - ${esc(track.title)}</title>
<style>
  body { margin: 0; background: #f3f1ea; font-family: Georgia, 'Times New Roman', serif; color: #1c2b36; }
  main { box-sizing: border-box; max-width: 860px; margin: 32px auto; padding: 56px 64px; background: #ffffff; border: 10px double #14324d; text-align: center; }
  h1 { font-size: 40px; margin: 0 0 8px; letter-spacing: 1px; color: #14324d; }
  .kicker { text-transform: uppercase; letter-spacing: 3px; font-size: 14px; color: #52646f; margin-bottom: 32px; }
  .name { font-size: 36px; margin: 24px 0; border-bottom: 1px solid #14324d; display: inline-block; padding: 0 24px 8px; }
  p { font-size: 18px; line-height: 1.6; margin: 12px 0; }
  .track { font-size: 28px; font-weight: bold; color: #14324d; margin: 20px 0; }
  .meta { margin-top: 40px; font-size: 15px; color: #52646f; }
  .note { margin-top: 28px; font-size: 13px; color: #6b7a84; font-style: italic; }
  @media print { body { background: #ffffff; } main { margin: 0 auto; } }
</style>
</head>
<body>
<main>
  <div class="kicker">MEAN Stack Basics</div>
  <h1>Certificate of Completion</h1>
  <p>This certifies that</p>
  <div class="name">${esc(name)}</div>
  <p>has completed all ${lessonCount} lessons, quizzes and coding exercises of the track</p>
  <div class="track">${esc(track.title)}</div>
  <div class="meta">Completed on ${esc(formatDate(date))}</div>
  <div class="note">Issued by the MEAN Stack Basics extension from progress recorded on this computer. It is a personal record of practice and not an accredited qualification.</div>
</main>
</body>
</html>
`;
}

export function progressReport(course: Course, store: ProgressStore, name: string, date: Date): string {
  const overall = store.overall(course);
  const lines: string[] = [
    '# MEAN Stack Basics: progress report',
    '',
    `Learner: ${name || 'Not given'}`,
    `Date: ${formatDate(date)}`,
    `Lessons completed: ${overall.done} of ${overall.total}`,
    '',
  ];
  for (const track of course.tracks) {
    const lessons = course.lessons.filter((l) => l.track === track.id);
    if (!lessons.length) continue;
    const sum = store.trackSummary(course, track.id);
    lines.push(`## ${track.title} (${sum.done}/${sum.total})`, '', '| Lesson | Status | Quiz | Checks run | Hints used |', '|---|---|---|---|---|');
    for (const l of lessons) {
      const p = store.get(l.id);
      const status = store.done(l) ? 'Done' : p.attempts || Object.keys(p.quiz).length ? 'In progress' : 'Not started';
      const quiz = l.quiz.length ? `${Math.round(quizScore(l, p) * 100)}%` : '-';
      lines.push(`| ${l.title.replace(/\|/g, '/')} | ${status} | ${quiz} | ${l.exercise ? p.attempts : '-'} | ${l.exercise ? p.hintLevel : '-'} |`);
    }
    lines.push('');
  }
  return lines.join('\n');
}
