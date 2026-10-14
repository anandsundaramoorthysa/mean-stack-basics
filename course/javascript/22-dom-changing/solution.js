const names = ['Asha', 'Ravi', 'Meena'];

const list = document.querySelector('#list');
for (const name of names) {
  const item = document.createElement('li');
  item.textContent = name;
  item.classList.add('student');
  item.setAttribute('data-name', name);
  list.append(item);
}

document.querySelector('.student').classList.add('first');
