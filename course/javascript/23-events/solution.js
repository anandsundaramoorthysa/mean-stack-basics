const add = document.querySelector('#add');
const count = document.querySelector('#count');
const nameBox = document.querySelector('#name');
const preview = document.querySelector('#preview');

let clicks = 0;
add.addEventListener('click', () => {
  clicks = clicks + 1;
  count.textContent = clicks;
});

nameBox.addEventListener('input', () => {
  preview.textContent = 'Hello, ' + nameBox.value;
});
