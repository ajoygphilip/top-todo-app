let addButton=document.getElementById("add-button");
let popup= document.getElementById("create-form");
let cancelButton= document.getElementById("cancel-button");

function togglePopup(){
    popup.classList.toggle("hide");
}
addButton.addEventListener("click",togglePopup)

cancelButton.addEventListener("click",togglePopup)