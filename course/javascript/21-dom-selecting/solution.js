document.querySelector('#title').textContent = 'Student Marks';

let sum = 0;
for (const item of document.querySelectorAll('.mark')) {
  sum = sum + Number(item.textContent);
}
document.querySelector('#total').textContent = 'Total: ' + sum;
