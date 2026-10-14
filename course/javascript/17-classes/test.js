check('new Student stores the name and starts with no marks', () => {
  const s = new (learner().Student)('Asha');
  eq(s.name, 'Asha', 'The constructor should store the name in this.name.');
  eq(s.marks, [], 'marks should start as an empty array.');
});
check('addMark adds marks to the student', () => {
  const s = new (learner().Student)('Ravi');
  s.addMark(70);
  s.addMark(90);
  eq(s.marks, [70, 90]);
});
check('average() is the mean of the marks', () => {
  const s = new (learner().Student)('Ravi');
  s.addMark(70);
  s.addMark(90);
  eq(s.average(), 80);
});
check('average() is 0 when there are no marks', () => {
  eq(new (learner().Student)('Meena').average(), 0, 'Avoid dividing by zero: return 0 first.');
});
check('Two students do not share their marks', () => {
  const { Student } = learner();
  const a = new Student('A');
  const b = new Student('B');
  a.addMark(50);
  eq(b.marks, [], 'Create the marks array inside the constructor with this.marks = [].');
});
check('describe() returns "Asha: 80"', () => {
  const s = new (learner().Student)('Asha');
  s.addMark(80);
  eq(s.describe(), 'Asha: 80');
});
check('Topper is a Student and describe() adds (topper)', () => {
  const { Student, Topper } = learner();
  const t = new Topper('Asha');
  t.addMark(80);
  ok(t instanceof Student, 'Topper should extend Student.');
  eq(t.describe(), 'Asha: 80 (topper)');
});
check('Topper uses super.describe()', () => {
  learner();
  ok(/super\s*\.\s*describe\s*\(/.test(source), 'Reuse the parent text by calling super.describe() inside Topper.');
});
