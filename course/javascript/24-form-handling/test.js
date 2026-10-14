const PAGE = `<form id="signup">
  <input id="email"> <input id="age">
  <button>Join</button>
</form>
<p id="message"></p>`;

function submit(email, age) {
  const page = dom(PAGE);
  const { document, type, window } = page;
  type(document.querySelector('#email'), email);
  type(document.querySelector('#age'), age);
  const event = new window.Event('submit', { bubbles: true, cancelable: true });
  document.querySelector('#signup').dispatchEvent(event);
  return { event, text: document.querySelector('#message').textContent.trim() };
}

check('Submitting does not use the default behaviour', () => {
  const { event } = submit('asha@example.com', '20');
  ok(event.defaultPrevented, 'Call event.preventDefault() inside the submit handler.');
});
check('An email without @ is rejected', () => {
  eq(submit('asha.example.com', '20').text, 'Please enter a valid email.');
});
check('An empty email is rejected', () => {
  eq(submit('   ', '20').text, 'Please enter a valid email.', 'Trim the value and check for "@".');
});
check('Under 18 is rejected', () => {
  eq(submit('asha@example.com', '17').text, 'You must be 18 or older.', 'Convert the age with Number() and compare with 18.');
});
check('Exactly 18 is accepted', () => {
  eq(submit('asha@example.com', '18').text, 'Welcome, asha@example.com!', '18 is allowed. Use age < 18 for the error.');
});
check('The welcome message uses the trimmed email', () => {
  eq(submit('  ravi@example.com ', '30').text, 'Welcome, ravi@example.com!');
});
check('The email problem is reported before the age problem', () => {
  eq(submit('nope', '10').text, 'Please enter a valid email.');
});
