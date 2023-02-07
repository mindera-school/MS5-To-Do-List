console.clear();

// Buttons
const addFirst = document.getElementById("addFirst");
const addRandom = document.getElementById("addRandom");
const remFirst = document.getElementById("remFirst");
const remLast = document.getElementById("remLast");
const remRandom = document.getElementById("remRandom");
const remDupl = document.getElementById("remDupl");
const remOdd = document.getElementById("remOdd");
const orgRandom = document.getElementById("orgRandom");
const orgSortAZ = document.getElementById("orgSortAZ");
const orgSortZA = document.getElementById("orgSortZA");
const orgReverse= document.getElementById("orgReverse");
//

const textBox = document.getElementById("input");
const moreOptionsBut = document.getElementById("moreOptions");
const options = document.getElementById("options");
liElements = Array.from(list.children);

storage = JSON.parse(localStorage.getItem("toDoList")) || [];

let isOpen = false;

options.style.display = "none";
options.style.height = "200px";
options.style.backgroundColor = "red";

/*
 * More Menu
 */
moreOptionsBut.addEventListener("click", () => {
  if (!isOpen) {
    open();
    return;
  }
  close();
});

function open() {
  options.style.display = "flex";
  isOpen = true;
}

function close() {
  options.style.display = "none";
  isOpen = false;
}

/*
 * Button add First
 */
addFirst.addEventListener("click", () => {
  const text = textBox.value;
  textBox.value = "";
  let index =
    storage.length === 0 ? 0 : Math.max(...storage.map((item) => +item.id)) + 1;

  const objFirst = {
    id: "" + index,
    text: text,
  };

  let li = document.createElement("li");
  const delButton = document.createElement("button");
  delButton.innerHTML = "x";
  delButton.setAttribute("class", "buttonStyle");
  li.setAttribute("id", "" + index);
  li.innerHTML = text;
  list.insertBefore(li, liElements[0]);
  allLi = document.getElementsByTagName("li");
  li.appendChild(delButton);

  removeElement(delButton, index);

  li.addEventListener("dblclick", () => {
    edit(li);
  });

  storage.unshift(objFirst);
  localStorage.setItem("toDoList", JSON.stringify(storage));
});

/*
 * Button Add Random
 */
addRandom.addEventListener("click", () => {
  const text = textBox.value;
  textBox.value = "";
  let index =
    storage.length === 0 ? 0 : Math.max(...storage.map((item) => +item.id)) + 1;

  const objRandom = {
    id: "" + index,
    text: text,
  };

  let li = document.createElement("li");
  const delButton = document.createElement("button");
  delButton.innerHTML = "x";
  delButton.setAttribute("class", "buttonStyle");
  li.setAttribute("id", "" + index);
  li.innerHTML = text;
  console.log(Math.round(Math.random()), liElements.length);
  const i = Math.round(Math.random() * liElements.length);
  console.log(i, liElements[i]);
  list.insertBefore(li, liElements[i]);
  allLi = document.getElementsByTagName("li");
  li.appendChild(delButton);

  removeElement(delButton, index);

  li.addEventListener("dblclick", () => {
    edit(li);
  });

  storage.splice(i, 0, objRandom);
  localStorage.setItem("toDoList", JSON.stringify(storage));

  liElements = Array.from(list.children);
});

/*
 * Button Remove First
 */
remFirst.addEventListener("click", () => {
  storage = JSON.parse(localStorage.getItem("toDoList")) || [];
  liElements = Array.from(list.children);
  const idOfLiElement = storage[0].id;

  storage.splice(0, 1);

  localStorage.setItem("toDoList", JSON.stringify(storage));

  for (let i = 0; i < liElements.length; i++) {
    if (liElements[i].id === idOfLiElement) {
      liElements[i].remove();
      break;
    }
  }
});

/*
 * Button Remove Last
 */
remLast.addEventListener("click", () => {
  storage = JSON.parse(localStorage.getItem("toDoList")) || [];
  liElements = Array.from(list.children);
  const idOfLiElement = storage[storage.length - 1].id;

  storage.splice(storage.length - 1, 1);

  localStorage.setItem("toDoList", JSON.stringify(storage));

  for (let i = 0; i < liElements.length; i++) {
    if (liElements[i].id === idOfLiElement) {
      liElements[i].remove();
      break;
    }
  }
});

/*
 * Button Remove Random
 */
remRandom.addEventListener("click", () => {
  storage = JSON.parse(localStorage.getItem("toDoList")) || [];
  liElements = Array.from(list.children);

  const index = Math.round(Math.random() * (storage.length - 1));

  storage.splice(index, 1);

  localStorage.setItem("toDoList", JSON.stringify(storage));

  liElements[index].remove();
});

/*
 * Buttom Remove Duplicates
 */
remDupl.addEventListener("click", () => {
  const map = new Set();
  let id = [];

  storage.forEach((element) => {
    if(!map.has(element.text)){
      id.push(element.id);
      map.add(element.text);
    }
  });

  textsOfLabel = [...map];

  storage = [];

  for(let i = 0; i < id.length; i++){
    storage.push({
      id: id[i],
      text: textsOfLabel[i]
    })
  }

  localStorage.setItem("toDoList", JSON.stringify(storage));

  list.innerHTML = "";

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

    li.addEventListener("dblclick", () => {
      edit(li);
    });
  }
});

/*
 * Button Remove Odd
 */
remOdd.addEventListener("click", () => {
  let evenArray = [];
  for(let i = 0; i < storage.length; i++){
    console.log("oi")
    if(i % 2 == 0){
      evenArray.push(storage[i]);
    }
  }

  storage = evenArray;

  localStorage.setItem("toDoList", JSON.stringify(storage));

  list.innerHTML = "";

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

    li.addEventListener("dblclick", () => {
      edit(li);
    });
   }
})

/*
 * Button Organize Random
 */
orgRandom.addEventListener("click", () => {
  storage.sort(() => Math.random() - 0.5);

  localStorage.setItem("toDoList", JSON.stringify(storage));

  list.innerHTML = "";

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

    li.addEventListener("dblclick", () => {
      edit(li);
    });
  }
})