check('parseOrNull parses valid JSON', () => {
  eq(learner().parseOrNull('{"name":"Asha","marks":[70,90]}'), { name: 'Asha', marks: [70, 90] });
});
check('parseOrNull returns null for invalid JSON', () => {
  const { parseOrNull } = learner();
  eq(parseOrNull('{ name: Asha }'), null, 'Invalid text should give null, not an error.');
  eq(parseOrNull(''), null);
});
check('parseOrNull can return a valid but falsy value', () => {
  eq(learner().parseOrNull('0'), 0, 'The text "0" is valid JSON, so the result is the number 0, not null.');
});
check('toPrettyJson indents with 2 spaces', () => {
  eq(learner().toPrettyJson({ a: 1, b: [2] }), '{\n  "a": 1,\n  "b": [\n    2\n  ]\n}');
});
check('copy returns an equal but separate object', () => {
  const original = { name: 'Ravi', marks: [1, 2] };
  const dup = learner().copy(original);
  eq(dup, original, 'The copy should hold the same data.');
  ok(dup !== original && dup.marks !== original.marks, 'The copy and its inner array must be new objects.');
  dup.marks.push(3);
  eq(original.marks, [1, 2], 'Changing the copy must not change the original.');
});
