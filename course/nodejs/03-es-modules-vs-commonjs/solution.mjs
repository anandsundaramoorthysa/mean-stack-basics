import path from 'node:path';
import { average } from './grades.js';

export function report(file, marks) {
  return path.basename(file) + ': ' + average(marks);
}
