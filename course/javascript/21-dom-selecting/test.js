const PAGE = `<h1 id="title">Marks</h1>
<ul>
  <li class="mark">70</li>
  <li class="mark">90</li>
  <li class="mark">75</li>
</ul>
<p id="total"></p>`;

check('The heading #title says Student Marks', () => {
  const { document } = dom(PAGE);
  eq(document.querySelector('#title').textContent.trim(), 'Student Marks', 'Set the textContent of #title.');
});
check('#total shows the sum of all marks', () => {
  const { document } = dom(PAGE);
  eq(document.querySelector('#total').textContent.trim(), 'Total: 235', 'Add the numbers (not join the strings) and write "Total: " followed by the sum.');
});
check('The total follows the page, not fixed numbers', () => {
  const { document } = dom(PAGE.replace('<li class="mark">75</li>', '<li class="mark">10</li><li class="mark">5</li>'));
  eq(document.querySelector('#total').textContent.trim(), 'Total: 175', 'Loop over every .mark item instead of typing the numbers.');
});
check('The code uses querySelector or querySelectorAll', () => {
  ok(/querySelector(All)?\s*\(/.test(source), 'Select elements with document.querySelector or document.querySelectorAll.');
});
