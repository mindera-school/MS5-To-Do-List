console.clear();
const add = document.getElementById("add");
const input = document.getElementById("value");
const remove = document.getElementById("delete");
const localRead = JSON.parse(localStorage.getItem("list"));
const father = document.getElementById("tasks");
const description = document.getElementById("description");
const date = document.getElementById("date");
const addFirst = document.getElementById("addFirst");
const addRandom = document.getElementById("addRandom");
const plus = document.getElementById("plus");
const box = document.getElementById("box");
const sortDate = document.getElementById("sortDate");
const sortAlphabetically = document.getElementById("sortAlphabetically");
let list = document.getElementById("list");
let counter = 0;
let ul;
let storage = [];
let id;

document.getElementById("menu").addEventListener("submit", (e) => {
  e.preventDefault();
});

if (localRead) {
  storage = localRead;
  for (let i = 0; i < storage.length; i++) {
    const li = document.createElement("li");
    li.setAttribute("id", storage[i].id);
    const div = document.createElement("div");
    const dateDiv = document.createElement("div");
    dateDiv.setAttribute("class", "date");
    dateDiv.innerHTML = storage[i].date;
    div.innerHTML = storage[i].description;
    li.innerHTML = storage[i].input;
    li.appendChild(div);
    li.appendChild(dateDiv);
    list.appendChild(li);
    addButtons(li);
  }
}

plus.addEventListener("mouseover", () => {
  if (box.style.display == "flex") {
    box.style.display = "none";
  } else {
    box.style.display = "flex";
  }
});

add.addEventListener("click", () => {
  console.log(date.value);
  const li = document.createElement("li");
  baseAddItems(li);
  storage.push({
    input: input.value,
    id: counter,
    description: description.value,
    date: date.value,
  });
  localStorage.setItem("list", JSON.stringify(storage));
  list.appendChild(li);
  addButtons(li);
  input.value = "";
  description.value = "";
});

remove.addEventListener("click", () => {
  list.remove();
  ul = document.createElement("ul");
  ul.setAttribute("id", "list");
  father.appendChild(ul);
  storage = [];
  list = ul;
  localStorage.clear();
  box.style.display = "none";
});

addFirst.addEventListener("click", () => {
  counter++;
  const li = document.createElement("li");
  baseAddItems(li);
  storage.unshift({
    input: input.value,
    id: counter,
    description: description.value,
    date: date.value,
  });
  localStorage.setItem("list", JSON.stringify(storage));
  list.insertBefore(li, list.firstChild);
  addButtons(li);
  input.value = "";
  description.value = "";
  box.style.display = "none";
});

addRandom.addEventListener("click", () => {
  counter++;
  let random = Math.floor(Math.random() * (storage.length - 0 + 1) + 0);
  const li = document.createElement("li");
  baseAddItems(li);
  storage.splice(random, 0, {
    input: input.value,
    id: counter,
    description: description.value,
    date: date.value,
  });
  localStorage.setItem("list", JSON.stringify(storage));
  list.insertBefore(li, list.children[random]);
  addButtons(li);
  input.value = "";
  description.value = "";
  box.style.display = "none";
});

sortDate.addEventListener("click", () => {
  storage.slice().sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  localStorage.setItem("list", JSON.stringify(storage));
  location.reload();
});

sortAlphabetically.addEventListener("click", () => {
  storage.slice().sort((a, b) => a.input.localeCompare(b.input));
  localStorage.setItem("list", JSON.stringify(storage));
  location.reload();
});

//needs work, fix later
function edit(buttonEdit, li) {
  const editInput = document.createElement("input");
  const editDescription = document.createElement("input");
  editDescription.setAttribute("type", "textarea");
  const confirm = document.createElement("button");
  confirm.innerHTML = "ok";
  confirm.setAttribute("type", "submit");
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].id == buttonEdit.parentElement.id) {
      confirm.setAttribute("id", storage[i].id);
    }
  }
  buttonEdit.addEventListener("click", () => {
    li.innerHTML = "";
    li.appendChild(editInput);
    li.appendChild(editInput);
    li.appendChild(editDescription);
    li.appendChild(confirm);
    confirm.addEventListener("click", () => {
      for (let i = 0; i < storage.length; i++) {
        if (storage[i].id == confirm.id) {
          storage.splice(i, 1, {
            input: editInput.value,
            id: counter,
            description: editDescription.value,
            date: date.value,
          });
          counter++;
        }
      }
      console.log(storage);
      const inputValue = editInput.value;
      const inputDescription = editDescription.value;
      const div = document.createElement("div");
      li.innerHTML = "";
      li.innerHTML = inputValue;
      div.innerHTML = inputDescription;
      if (editInput.value === "") {
        li.innerHTML = "Untitled";
      } else {
        li.innerHTML = editInput.value;
      }
      li.appendChild(div);
      addButtons(li);
      input.value = "";
      localStorage.setItem("list", JSON.stringify(storage));
    });
  });
}

function removeItems(button) {
  button.addEventListener("click", () => {
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].id == button.parentElement.id) {
        storage.splice(i, 1);
      }
    }
    localStorage.setItem("list", JSON.stringify(storage));
    button.parentElement.remove();
    if (storage.length == 0) {
      localStorage.clear();
    }
  });
}

function addButtons(li) {
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "Edit";
  buttonEdit.setAttribute("class", "position");
  li.appendChild(buttonEdit);
  edit(buttonEdit, li);

  const button = document.createElement("button");
  button.innerHTML = "X";
  button.setAttribute("class", "position");
  li.appendChild(button);
  counter++;
  removeItems(button);
}

function baseAddItems(li) {
  if (input.value === "") {
    li.innerHTML = "Untitled";
  } else {
    li.innerHTML = input.value;
  }
  const div = document.createElement("div");
  div.innerHTML = description.value;
  div.setAttribute("class", "description");
  li.appendChild(div);
  const dateDiv = document.createElement("div");
  dateDiv.innerHTML = date.value;
  dateDiv.setAttribute("class", "date");
  li.appendChild(dateDiv);
  li.setAttribute("id", counter);
}
