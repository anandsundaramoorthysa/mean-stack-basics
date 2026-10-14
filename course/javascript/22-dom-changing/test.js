const PAGE = '<h1>Class list</h1><ul id="list"></ul>';

check('#list gets one li per name', () => {
  const { document } = dom(PAGE);
  eq([...document.querySelectorAll('#list li')].length, 3, 'Create an li for each of the 3 names and append it to #list.');
});
check('Each li shows its name as text', () => {
  const { document } = dom(PAGE);
  eq([...document.querySelectorAll('#list li')].map((li) => li.textContent), ['Asha', 'Ravi', 'Meena'], 'Set item.textContent to the name.');
});
check('Every li has the class student', () => {
  const { document } = dom(PAGE);
  const items = [...document.querySelectorAll('#list li')];
  ok(items.length > 0 && items.every((li) => li.classList.contains('student')), 'Call item.classList.add("student") on each li.');
});
check('Every li has a data-name attribute equal to its name', () => {
  const { document } = dom(PAGE);
  const items = [...document.querySelectorAll('#list li')];
  ok(items.length > 0 && items.every((li) => li.getAttribute('data-name') === li.textContent), 'Use item.setAttribute("data-name", name).');
});
check('Only the first li has the class first', () => {
  const { document } = dom(PAGE);
  const items = [...document.querySelectorAll('#list li')];
  eq(items.map((li) => li.classList.contains('first')), [true, false, false], 'Add "first" to the first item only.');
});
check('The code builds elements with createElement', () => {
  ok(/createElement\s*\(/.test(source), 'Create the items with document.createElement("li").');
});
