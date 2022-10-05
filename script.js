import { Todo } from "./todo.js";

let addButton=document.getElementById("add-button");
let popup= document.getElementById("create-form");
let cancelButton= document.getElementById("cancel-button");
let createButton= document.getElementById("create-button");



const todos=[];
const itemsElm=document.querySelector(".items")

function togglePopup(){
    popup.classList.toggle("hide");
}

addButton.addEventListener("click",togglePopup);

cancelButton.addEventListener("click",togglePopup);

document.getElementById('datepicker').valueAsDate = new Date();

function renderTodo(items){
    if(items.length==0){
        let h3=document.createElement("h5");
        h3.innerText="You are all caught up!"
        document.querySelector(".items").appendChild(h3)
    }

    itemsElm.innerHTML="";
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

createButton.addEventListener("click",createItem)

function createItem(e){
    // const category = document.querySelector("#categorypicker").value;
    const date = document.querySelector("#datepicker").value;
    const title = document.querySelector("#itemtitle").value;
    todos.push(new Todo(date,title));
    document.querySelector("#itemtitle").value="";
    togglePopup();
    renderTodo(todos);
     
}
