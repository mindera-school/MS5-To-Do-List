console.clear();

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
});

const text = document.getElementById("input");
const add = document.getElementById("add");
const remAll = document.getElementById("remAll");
let list = document.getElementById("list");

let liElements = Array.from(list.children);
let isEditing = false;

let storage = JSON.parse(localStorage.getItem("toDoList")) || [];

for (let i = 0; i < storage.length; i++) {
  let li = document.createElement("li");
  li.innerHTML = storage[i].text;
  const delButton = document.createElement("button");
  delButton.innerHTML = "x";
  delButton.setAttribute("class", "buttonStyle");
  li.setAttribute("id", storage[i].id);
  list.appendChild(li);
  li.appendChild(delButton);

  removeElement(delButton, storage[i].id);
}

function removeElement(button, id) {
  button.addEventListener("click", () => {
    
    for(let i = 0; i < storage.length; i++){
      if(storage[i].id == id){
        storage.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("toDoList", JSON.stringify(storage));
    button.parentElement.remove();
  });
}

add.addEventListener("click", () => {
  list = document.getElementById("list");

  let index = storage.length === 0 ? 0 : Math.max(...storage.map((item) => +item.id)) + 1;

  storage.push({
    id: "" + index,
    text: text.value,
  });

  localStorage.setItem("toDoList", JSON.stringify(storage));

  let li = document.createElement("li");
  const delButton = document.createElement("button");
  delButton.innerHTML = "x";
  delButton.setAttribute("class", "buttonStyle");
  li.setAttribute("id", "" + index);
  li.innerHTML = text.value;
  text.value = "";
  list.appendChild(li);
  li.appendChild(delButton);

  removeElement(delButton, index);

  li.addEventListener("dblclick", () => {
    edit(li);
  })
});

remAll.addEventListener("click", () => {
  list = document.getElementById("list");
  list.innerHTML = "";
  localStorage.clear();
  storage = [];
});

/*
 * Edit Scripting
 */

liElements = Array.from(list.children);

for (let li of liElements) {
  li.addEventListener("dblclick", () => {
    edit(li);
  });
}

function edit(li){
  if (!isEditing) {
    isEditing = true;
    const textSafe = li.innerHTML;
    li.innerHTML = "";

    const textBox = document.createElement("input");

    const confirmButton = document.createElement("button");
    configConfirmButton(confirmButton, li, textBox);

    const cancelButton = document.createElement("button");
    configCancelButton(cancelButton, li, textSafe);

    appendChildsToLi(li, textBox, confirmButton, cancelButton);
  }
}

function configConfirmButton(button, li, textBox) {
  button.innerHTML = "Confirm";
  button.addEventListener("click", () => {
    li.innerHTML = textBox.value;
    const delButton = document.createElement("button");
    delButton.innerHTML = "x";
    delButton.setAttribute("class", "buttonStyle");
    li.appendChild(delButton);
    storage = JSON.parse(localStorage.getItem("toDoList"));
    for(let i = 0; i < storage.length; i++){
      if(li.id == storage[i].id){
        storage[i].text = textBox.value;
        break;
      }
    }
    localStorage.setItem("toDoList", JSON.stringify(storage));
    removeElement(delButton, li.id);
    isEditing = false;
  });
}

function configCancelButton(button, li, textSafe) {
  button.innerHTML = "Cancel";
  button.addEventListener("click", () => {
    const editedText = textSafe.split("<button ");
    li.innerHTML = editedText[0];
    const delButton = document.createElement("button");
    delButton.innerHTML = "x";
    delButton.setAttribute("class", "buttonStyle");
    li.appendChild(delButton);
    removeElement(delButton, li.id);
    isEditing = false;
  });
}

function appendChildsToLi(li, textBox, confirmButton, cancelButton) {
  li.appendChild(textBox);
  li.appendChild(confirmButton);
  li.appendChild(cancelButton);
}