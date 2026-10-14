const form = document.querySelector('#signup');
const emailBox = document.querySelector('#email');
const ageBox = document.querySelector('#age');
const message = document.querySelector('#message');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailBox.value.trim();
  const age = Number(ageBox.value);
  if (!email.includes('@')) {
    message.textContent = 'Please enter a valid email.';
  } else if (age < 18) {
    message.textContent = 'You must be 18 or older.';
  } else {
    message.textContent = 'Welcome, ' + email + '!';
  }
});
