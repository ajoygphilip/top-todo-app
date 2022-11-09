import Todo from './todo.js';

const addButton = document.getElementById('add-button');
const createPopup = document.getElementById('create-form');

const cancelCreateButton = document.getElementById('cancel-create-button');

const createButton = document.getElementById('create-button');
const incompleteItemsElm = document.querySelector('.incomplete-items');
const completedItemsElm = document.querySelector('.completed-items');
const selectedDateSort='today';

function toggleCreatePopup() {
  createPopup.classList.toggle('hide');
}


const editPopup = document.getElementById('edit-form');
const cancelEditButton = document.getElementById('cancel-edit-button');
const editSaveButton=document.getElementById('edit-save-button');
const editDatePicker=document.getElementById('edit-date');
const editTitleElem=document.getElementById('edit-title');


function toggleEditPopup(params) {
  editPopup.classList.toggle('hide');
}


if (!localStorage.getItem('todoItems')) {
  localStorage.setItem('todoItems', JSON.stringify([]));
}

const todoItems = JSON.parse(localStorage.getItem('todoItems'));

addButton.addEventListener('click', toggleCreatePopup);

cancelCreateButton.addEventListener('click', toggleCreatePopup);
cancelEditButton.addEventListener('click', toggleEditPopup);

document.getElementById('datepicker').valueAsDate = new Date();

function saveToLocalStorage(){
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function renderTodo(items) {
    incompleteItemsElm.innerHTML = '';
    completedItemsElm.innerHTML = '';
  if (items.length === 0) {
    const h3 = document.createElement('h5');
    h3.innerText = 'You are all caught up!';
    incompleteItemsElm.appendChild(h3);
  } else {
    
    items.forEach((item, index) => {
      const row = document.createElement('div');
      row.classList.add('row');
      row.setAttribute('data-index', index);

      const label = document.createElement('label');
      label.classList.add('checkbox');
      const input = document.createElement('input');
      input.type = 'checkbox';
      function markCompleted(e){
        const i = todoItems[parseInt(e.target.parentElement.parentElement.dataset.index)];
        i.isCompleted=!i.isCompleted;
        saveToLocalStorage();
        e.target.parentElement.parentElement.classList.toggle('completed-row')
        renderTodo(todoItems);
      }

      input.addEventListener("input",markCompleted);
      input.checked=item.isCompleted;
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
        saveToLocalStorage();
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
      function editItem(e){
        toggleEditPopup()
        const i = todoItems[parseInt(e.target.parentElement.dataset.index)];
        editSaveButton.setAttribute('data-target-index', index);
        editDatePicker.valueAsDate= new Date(i.dueDate);
        editTitleElem.value=i.title;

      }
      editButton.addEventListener("click",editItem);
      editButton.appendChild(editIcon);

      row.appendChild(label);
      row.appendChild(div);
      row.appendChild(editButton);
      row.appendChild(delButton);

      if(item.isCompleted){
        completedItemsElm.append(row)
      }
      else{
        incompleteItemsElm.append(row);
      }
      if (!completedItemsElm.innerHTML){
        document.querySelector('.completed-container').style.display='none';
      }else{
        document.querySelector('.completed-container').style.display='block';
      }
      
    });
  }
}



function createItem() {
  // const category = document.querySelector("#categorypicker").value;
  const date = document.querySelector('#datepicker').value;
  const title = document.querySelector('#itemtitle').value;
  todoItems.push(new Todo(date, title));
  saveToLocalStorage();
  document.querySelector('#itemtitle').value = '';

  toggleCreatePopup();
  renderTodo(todoItems);
}
createButton.addEventListener('click', createItem);


function saveEdit(){
  const index=editSaveButton.getAttribute('data-target-index');
  const date = editDatePicker.value;
  const title = editTitleElem.value;
  todoItems[index].dueDate=date;
  todoItems[index].title=title;
  saveToLocalStorage();
  editDatePicker.value = '';
  editTitleElem.value = '';
  
  toggleEditPopup();
  renderTodo(todoItems);
}
editSaveButton.addEventListener('click', saveEdit);

renderTodo(todoItems);


document.querySelector('.today').addEventListener("click",()=>{
  const today=new Date();
  const todayItems=todoItems.filter(item=>new Date(item.dueDate).getDate()===today.getDate() );
  renderTodo(todayItems);
  
})

document.querySelector('.overdue').addEventListener("click",()=>{
  const today=new Date()
  const overdueItems=todoItems.filter(item=>today.getDate()>new Date(item.dueDate).getDate());
  renderTodo(overdueItems);
  
})

document.querySelector(".all").addEventListener('click',()=>{
  renderTodo(todoItems);
})