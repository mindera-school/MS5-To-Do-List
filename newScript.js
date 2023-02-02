const form = document.getElementById("form");
const subBtn = document.getElementById("subButton");
const deleteAll = document.getElementById("deleteBtn");
const seeMoreBtn = document.getElementById("seeMoreBtn");
const seeMoreDiv = document.getElementById("seeMoreDiv");
const input = document.getElementById("input");
const dateInput = document.getElementById("date");
const tagInput = document.getElementById("tag");
const addFirstBtn = document.getElementById("addFirst");
const addRandom = document.getElementById("addRandomPos");
const removeFirst = document.getElementById("removeFirst");
const removeLast = document.getElementById("removeLast");
const removeRandom = document.getElementById("removeRandom");
const removeDup = document.getElementById("removeDuplicates");
const removeOdd = document.getElementById("removeOdd");
const randomize = document.getElementById("randomize");
const alphaBtn = document.getElementById("alphabetically");
const alphaRvrsBtn = document.getElementById("alphabeticallyRvrs");



let list = document.getElementById("list");
const main = document.getElementById("main");
let listToDo = JSON.parse(localStorage.getItem("list"));



if (listToDo?.length === 0 || !listToDo) {
  listToDo = [];
}

function updatePage(){
  list.innerHTML= null;
  for (let i = 0; i < listToDo.length; i++) {
    createOnPg(listToDo[i].taskName,listToDo[i].date, listToDo[i].tag);
  }
  refreshLocalStorage(listToDo);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

input.addEventListener("focus", () => {
  dateInput.setAttribute("id", "date-appear");
  setTimeout(()=>{tagInput.setAttribute("id", "tag-appear")},300);
});

removeOdd.addEventListener("click",()=>{
  for (let i = 0; i < listToDo.length; i++) {
    if(i%2 ===0){
      listToDo.splice(i,1);
    }
  }
  updatePage();
})

removeDup.addEventListener("click",()=>{
  const tempSet = new Set();
  const tempArray = [];
  for (let i = 0; i < listToDo.length; i++) {
    if(!tempSet.has(listToDo[i].taskName)){
      tempArray.push(listToDo[i]);
    }
    tempSet.add(listToDo[i].taskName);
  }
  listToDo = tempArray;
  updatePage();
});

removeRandom.addEventListener("click",()=>{
  const random = Math.round(Math.random()* listToDo.length-1);
  listToDo.splice(random,1);
  updatePage();
});

removeLast.addEventListener("click",()=>{
  listToDo.pop();
  updatePage();
});

removeFirst.addEventListener("click",()=>{
  listToDo.splice(0,1);
  updatePage();
});

addRandom.addEventListener("click",()=>{
  const randomNum = Math.round(Math.random() * listToDo.length -1);
  const newItem ={
    taskName: input.value,
    date: dateInput.value,
    tag: tagInput.value
  }
  listToDo.splice(randomNum,0,newItem);
  updatePage();
});

addFirstBtn.addEventListener("click",()=>{
  const newItem ={
    taskName: input.value,
    date: dateInput.value,
    tag: tagInput.value
  }
  listToDo.unshift(newItem);
  updatePage();
});

randomize.addEventListener("click", ()=> {
  listToDo.sort(() => Math.random() - 0.5);
  updatePage();
});

alphaBtn.addEventListener("click", ()=>{
  listToDo.sort((a, b) => {
    const taskA = a.taskName.toUpperCase();
    const taskB = b.taskName.toUpperCase(); 
    if (taskA > taskB) {
      return 1;
    }
    if (taskA < taskB) {
      return -1;
    }
    return 0;
  });
  updatePage();
});

alphaRvrsBtn.addEventListener("click", ()=>{
  listToDo.sort((a, b) => {
    const taskA = a.taskName.toUpperCase();
    const taskB = b.taskName.toUpperCase(); 
    if (taskA > taskB) {
      return -1;
    }
    if (taskA < taskB) {
      return 1;
    }
    return 0;
  });
  
  updatePage();
});

window.addEventListener("load", () => {
  for (let i = 0; i < listToDo.length; i++) {
    createOnPg(listToDo[i].taskName,listToDo[i].date, listToDo[i].tag);
  }
});

function refreshLocalStorage(updatedList){
  localStorage.setItem("list", JSON.stringify(updatedList));
};

seeMoreBtn.addEventListener("click", (e) => {
  e.preventDefault();
 if(dateInput.getAttribute("id") === "date-appear"){
  dateInput.setAttribute("id","date-disappear");
  setTimeout(()=>{tagInput.setAttribute("id","tag-disappear")},100);
  setTimeout(()=>{
    tagInput.setAttribute("id","tag");
    dateInput.setAttribute("id","date");
  },400);
 }

  if (seeMoreDiv.style.display === "block") {
    seeMoreDiv.style.display = "none"
  } else {
    seeMoreDiv.style.display = "block"
  }
});

subBtn.addEventListener("click", () => {
  if (!input.value) {
    window.alert("You're adding an empty task!");
    return
  }
  addItem(input.value,dateInput.value,tagInput.value);
  input.value = null;
  dateInput.value = null;
  tagInput.value = null;
  dateInput.setAttribute("id","date-disappear");
  setTimeout(()=>{tagInput.setAttribute("id","tag-disappear")},150)
  setTimeout(() => {
    tagInput.setAttribute("id","tag");
    dateInput.setAttribute("id","date");
  },500);
  
});

deleteAll.addEventListener("click", (e) => {
  list.setAttribute("id","list-disappear");
  setTimeout(()=>{
    e.preventDefault();
    listToDo = [];
    refreshLocalStorage(listToDo);
    list.remove();
    const newList = document.createElement("ul");
    newList.setAttribute("id", "list");
    main.appendChild(newList);
  },300);
});

function createOnPg(task,date,tag, index) {
  const item = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const markDoneBtn = document.createElement("button");
  item.innerHTML = "Task name: "+task+" | Date: "+date+" | #"+tag;
  item.addEventListener("click", (e) => reWriteLi(e, index));
  const iconDelete = document.createElement("img");
  const iconMarkDone = document.createElement("img");
  iconDelete.src = "./icons/trash.svg";
  iconMarkDone.src = "./icons/check.svg";
  deleteBtn.appendChild(iconDelete);
  markDoneBtn.appendChild(iconMarkDone);
  list.appendChild(item);
  item.appendChild(deleteBtn);
  item.appendChild(markDoneBtn);
  markDoneBtn.addEventListener("click", ()=>{
    if(item.style.textDecoration==="line-through"){
      item.style.textDecoration = "none";
    }else{
      item.style.textDecoration = "line-through";
    }
  });
  deleteBtn.addEventListener("click", () => {
    item.setAttribute("class","disappearLi");
    setTimeout(()=>{
      const parent = deleteBtn.parentNode;
      parent.remove();
      listToDo.splice(index, 1);
      refreshLocalStorage(listToDo);
    },400)
  });
  item.setAttribute("class","appearLi");
};

function addItem(value,date,tag) {
  const newItem ={
    taskName: value,
    date: date,
    tag: tag
};
  const index = listToDo.push(newItem) - 1;
  createOnPg(value,date,tag, index);
  refreshLocalStorage(listToDo);
};

function reWriteLi(e, index) {
  const thisLi = e.target;
  const tempForm = document.createElement("form");
  const tempTaskIn = document.createElement("input");
  const tempDateIn = document.createElement("input");
  const tempTagIn = document.createElement("input");
  const savebtn = document.createElement("button");
  savebtn.innerHTML = "Save Changes";

  tempTaskIn.placeholder = "Taskname";
  tempDateIn.placeholder = "Date";
  tempTagIn.placeholder = "Tag"

  tempForm.appendChild(tempTaskIn);
  tempForm.appendChild(tempDateIn);
  tempForm.appendChild(tempTagIn);
  tempForm.appendChild(savebtn);
  thisLi.appendChild(tempForm);
  savebtn.addEventListener("click",(e)=>{
    tempForm.remove();
    e.preventDefault();
    const updatedItem ={
      taskName: tempTaskIn.value,
      date: tempDateIn.value,
      tag: tempTagIn.value
    }
    listToDo.splice(index,1,updatedItem);
    updatePage();
  })
};


function compareTaskName(x,y){
    const taskX = x.taskName.toUpperCase();
    const taskY = y.taskName.toUpperCase();
    if (taskX > taskY) {
      return 1;
    }
    if (taskX < taskY) {
      return -1;
    }
    return 0;
};

function compareTaskNameRvrs(x,y){
  const taskX = x.taskName.toUpperCase();
  const taskY = y.taskName.toUpperCase();
  if (taskX > taskY) {
    return -1;
  }
  if (taskX < taskY) {
    return 1;
  }
  return 0;
};

  

