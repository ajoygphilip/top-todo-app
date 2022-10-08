import Todo from './todo';

const addButton = document.getElementById('add-button');
const popup = document.getElementById('create-form');
const cancelButton = document.getElementById('cancel-button');
const createButton = document.getElementById('create-button');
const itemsElm = document.querySelector('.items');

function togglePopup() {
  popup.classList.toggle('hide');
}

if (!localStorage.getItem('todoItems')) {
  localStorage.setItem('todoItems', JSON.stringify([]));
}

const todoItems = JSON.parse(localStorage.getItem('todoItems'));

addButton.addEventListener('click', togglePopup);

cancelButton.addEventListener('click', togglePopup);

document.getElementById('datepicker').valueAsDate = new Date();

function renderTodo(items) {
  if (items.length === 0) {
    const h3 = document.createElement('h5');
    h3.innerText = 'You are all caught up!';
    itemsElm.appendChild(h3);
  } else {
    itemsElm.innerHTML = '';
    items.forEach((item, index) => {
      const row = document.createElement('div');
      row.classList.add('row');
      row.setAttribute('data-index', index);

      const label = document.createElement('label');
      label.classList.add('checkbox');
      const input = document.createElement('input');
      input.type = 'checkbox';
      const span = document.createElement('span');
      label.appendChild(input);
      label.appendChild(span);

      const div = document.createElement('div');
      div.classList.add('max');
      const h6 = document.createElement('h6');
      h6.innerText = item.title;
      div.appendChild(h6);

      const delButton = document.createElement('button');
      const delIcon = document.createElement('i');
      delButton.classList.add('transparent');
      delButton.classList.add('circle');
      delButton.classList.add('delete-button');

      function deleteItem(e) {
        const i = parseInt(e.target.parentElement.dataset.index);
        todoItems.splice(i, 1);
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
        renderTodo(todoItems);
      }
      delButton.addEventListener('click', deleteItem);
      delIcon.innerText = 'delete';
      delButton.appendChild(delIcon);

      const editButton = document.createElement('button');
      const editIcon = document.createElement('i');
      editButton.classList.add('transparent');
      editButton.classList.add('circle');
      editIcon.innerText = 'edit';
      editButton.classList.add('edit-button');

      editButton.appendChild(editIcon);

      row.appendChild(label);
      row.appendChild(div);
      row.appendChild(editButton);
      row.appendChild(delButton);
      itemsElm.append(row);
    });
  }
}

renderTodo(todoItems);

function createItem() {
  // const category = document.querySelector("#categorypicker").value;
  const date = document.querySelector('#datepicker').value;
  const title = document.querySelector('#itemtitle').value;
  todoItems.push(new Todo(date, title));
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
  document.querySelector('#itemtitle').value = '';

  togglePopup();
  renderTodo(todoItems);
}

createButton.addEventListener('click', createItem);
