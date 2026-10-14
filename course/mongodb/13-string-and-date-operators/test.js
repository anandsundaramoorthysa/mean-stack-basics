const seed = {
  users: [
    { first: 'Asha', last: 'Kumar', email: 'asha@college.edu', joined: '2024-03-15T10:30:00.000Z' },
    { first: 'Bala', last: 'Raj', email: 'bala.raj@mail.com', joined: '2023-11-02T08:00:00.000Z' },
    { first: 'Chitra', last: 'Devi', email: 'chitra@college.edu', joined: '2025-01-20T14:45:00.000Z' },
  ],
};
const rows = () => mongo(seed).result || [];
check('fullName joins first and last name with a space', () => {
  eq(rows().map((r) => r.fullName), ['Asha Kumar', 'Bala Raj', 'Chitra Devi'], 'Use $concat: ["$first", " ", "$last"].');
});
check('lastNameUpper is the last name in capitals', () => {
  eq(rows().map((r) => r.lastNameUpper), ['KUMAR', 'RAJ', 'DEVI'], 'Use $toUpper on "$last".');
});
check('initial is the first letter of the first name', () => {
  eq(rows().map((r) => r.initial), ['A', 'B', 'C'], 'Use $substrCP: ["$first", 0, 1].');
});
check('domain is the text after the @ sign', () => {
  eq(rows().map((r) => r.domain), ['college.edu', 'mail.com', 'college.edu'], 'Use $arrayElemAt with $split on "@" and position 1.');
});
check('joinedOn is formatted as YYYY-MM-DD', () => {
  eq(rows().map((r) => r.joinedOn), ['2024-03-15', '2023-11-02', '2025-01-20'], 'Use $dateToString with format "%Y-%m-%d".');
});
check('Only the five new fields are returned', () => {
  for (const r of rows()) {
    eq(Object.keys(r).sort(), ['domain', 'fullName', 'initial', 'joinedOn', 'lastNameUpper'], 'Output exactly these five fields and hide _id.');
  }
});
check('Still correct on different data (no hard-coded values)', () => {
  const other = { users: [{ first: 'Zoe', last: 'Lee', email: 'z@x.org', joined: '2020-12-31T23:00:00.000Z' }] };
  eq(mongo(other).result, [{ fullName: 'Zoe Lee', lastNameUpper: 'LEE', initial: 'Z', domain: 'x.org', joinedOn: '2020-12-31' }], 'Compute every field from the document instead of typing values.');
});
