const path = require('node:path');

check('reportPath("Asha") builds reports/Asha.txt', () => {
  eq(learner().reportPath('Asha'), path.join('reports', 'Asha.txt'), 'Use path.join so the separator fits the operating system.');
});
check('reportPath works for another student', () => {
  eq(learner().reportPath('Ravi'), path.join('reports', 'Ravi.txt'));
});
check('fileInfo gives the file name', () => {
  eq(learner().fileInfo('notes/week1/summary.md').name, 'summary.md', 'name should be path.basename(file).');
});
check('fileInfo gives the extension with its dot', () => {
  eq(learner().fileInfo('notes/week1/summary.md').ext, '.md', 'ext should be path.extname(file).');
});
check('fileInfo gives the folder name', () => {
  eq(learner().fileInfo('notes/week1/summary.md').folder, 'week1', 'folder is the basename of the dirname of the path.');
  eq(learner().fileInfo('a/b/photo.png').folder, 'b');
});
check('absolute returns a full path', () => {
  const r = learner().absolute('data.txt');
  ok(path.isAbsolute(r), 'The result should be an absolute path. Use path.resolve.');
  eq(r, path.resolve('data.txt'));
});
