check('isPhone accepts exactly 10 digits', () => {
  eq(learner().isPhone('9876543210'), true);
});
check('isPhone rejects wrong lengths and letters', () => {
  const { isPhone } = learner();
  eq(isPhone('987654321'), false, '9 digits is too short.');
  eq(isPhone('98765432100'), false, '11 digits is too long. Anchor the pattern with ^ and $.');
  eq(isPhone('98765abcde'), false);
  eq(isPhone('9876 543210'), false);
});
check('findNumbers returns numbers, not strings', () => {
  eq(learner().findNumbers('a1b22c333'), [1, 22, 333], 'Use match(/\\d+/g) and then map(Number).');
});
check('findNumbers returns [] when there are no numbers', () => {
  eq(learner().findNumbers('no digits here'), [], 'match returns null when nothing is found: use ?? [].');
});
check('isCollegeEmail accepts valid addresses', () => {
  const { isCollegeEmail } = learner();
  eq(isCollegeEmail('asha@college.edu'), true);
  eq(isCollegeEmail('ravi.kumar_2@college.edu'), true);
});
check('isCollegeEmail rejects other addresses', () => {
  const { isCollegeEmail } = learner();
  eq(isCollegeEmail('asha@gmail.com'), false);
  eq(isCollegeEmail('@college.edu'), false, 'The name part needs at least one character.');
  eq(isCollegeEmail('asha@college.edu.fake'), false, 'The text must end with @college.edu.');
  eq(isCollegeEmail('asha@collegeXedu'), false, 'The dot before edu must be a real dot: escape it as \\.');
});
check('cleanSpaces collapses runs of whitespace and trims', () => {
  eq(learner().cleanSpaces('  hello   big \t world \n'), 'hello big world');
});
check('The code uses regular expressions', () => {
  learner();
  ok(/\/[^/\n]+\/[gimsu]*\s*[.,;)]|RegExp\s*\(/.test(source), 'Write patterns between slashes, for example /\\d+/g.');
});
