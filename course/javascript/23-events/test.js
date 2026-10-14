const PAGE = `<button id="add">Add</button> <span id="count">0</span>
<input id="name"> <p id="preview"></p>`;

check('Nothing changes before any click', () => {
  const { document } = dom(PAGE);
  eq(document.querySelector('#count').textContent.trim(), '0', 'The counter should still show 0 until the button is clicked.');
});
check('One click makes #count show 1', () => {
  const { document, click } = dom(PAGE);
  click(document.querySelector('#add'));
  eq(document.querySelector('#count').textContent.trim(), '1', 'Add a click listener on #add that updates #count.');
});
check('Three clicks make #count show 3', () => {
  const { document, click } = dom(PAGE);
  const button = document.querySelector('#add');
  click(button);
  click(button);
  click(button);
  eq(document.querySelector('#count').textContent.trim(), '3', 'Keep the counter outside the handler so it grows with every click.');
});
check('Typing in #name updates #preview', () => {
  const { document, type } = dom(PAGE);
  type(document.querySelector('#name'), 'Asha');
  eq(document.querySelector('#preview').textContent.trim(), 'Hello, Asha', 'Listen for the input event and use the input value.');
});
check('The preview follows later typing', () => {
  const { document, type } = dom(PAGE);
  const box = document.querySelector('#name');
  type(box, 'As');
  type(box, 'Ravi');
  eq(document.querySelector('#preview').textContent.trim(), 'Hello, Ravi');
});
check('The code uses addEventListener', () => {
  ok(/addEventListener\s*\(/.test(source), 'Attach the handlers with addEventListener.');
});
