import { Todo } from "./todo.js";

let addButton=document.getElementById("add-button");
let popup= document.getElementById("create-form");
let cancelButton= document.getElementById("cancel-button");
const todos=[];
let itemsElm=document.querySelector(".items")

function togglePopup(){
    popup.classList.toggle("hide");
}
addButton.addEventListener("click",togglePopup);

cancelButton.addEventListener("click",togglePopup);

todos.push(new Todo(Date.now(),"First item","",""));

function renderTodo(items){
    items.forEach(item => {
        let row= document.createElement("div");
        row.classList.add("row");

        let label=document.createElement("label");
        label.classList.add("checkbox");
        let input=document.createElement("input");
        input.type="checkbox";
        let span =document.createElement("span");
        label.appendChild(input);
        label.appendChild(span);

        let div= document.createElement("div");
        div.classList.add("max");
        let h6 = document.createElement("h6");
        h6.innerText=item.title;
        div.appendChild(h6);

        row.appendChild(label);
        row.appendChild(div);
        itemsElm.append(row);
        
    });
};

renderTodo(todos);
