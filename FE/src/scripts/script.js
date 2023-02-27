const main = document.querySelector("main");
const subBtn = document.getElementById("addTaskBtn");
const deleteAll = document.getElementById("deleteBtn");
const seeMoreBtn = document.getElementById("seeMoreBtn");
const seeMoreDiv = document.getElementById("seeMoreDiv");
const taskNameInput = document.getElementById("input");
const dateInput = document.getElementById("date");
const tagInput = document.getElementById("tag");
const descriptionInput = document.getElementById("description");
const addFirstBtn = document.getElementById("addFirst");
const addRandomBtn = document.getElementById("addRandomPos");
const removeFirstBtn = document.getElementById("removeFirst");
const removeLastBtn = document.getElementById("removeLast");
const removeRandomBtn = document.getElementById("removeRandom");
const removeDupBtn = document.getElementById("removeDuplicates");
const removeOddBtn = document.getElementById("removeOdd");
const randomizeBtn = document.getElementById("randomize");
const alphaBtnOrderBtn = document.getElementById("alphabetically");
const alphaRvrsOrderBtn = document.getElementById("alphabeticallyRvrs");
let stateList = document.getElementById("list");
let storageList = JSON.parse(localStorage.getItem("list"));

window.addEventListener("load", () => {
  for (let i = 0; i < storageList.length; i++) {
    createOnPg(
      storageList[i].taskName,
      storageList[i].date,
      storageList[i].tag
    );
  }
});

if (storageList?.length === 0 || !storageList) {
  storageList = [];
}

function updatePage() {
  stateList.innerHTML = null;
  for (let i = 0; i < storageList.length; i++) {
    createOnPg(
      storageList[i].taskName,
      storageList[i].date,
      storageList[i].tag
    );
  }
  refreshLocalStorage(storageList);
}

taskNameInput.addEventListener("focus", () => {
  dateInput.setAttribute("class", "date-appear");
  setTimeout(() => {
    tagInput.setAttribute("class", "tag-appear");
  }, 100);
  setTimeout(() => {
    descriptionInput.setAttribute("class", "description-appear");
  }, 300);
});

removeOddBtn.addEventListener("click", () => {
  for (let i = 0; i < storageList.length; i++) {
    if (i % 2 === 0) {
      storageList.splice(i, 1);
    }
  }
  updatePage();
});

removeDupBtn.addEventListener("click", () => {
  const tempSet = new Set();
  const tempArray = [];
  for (let i = 0; i < storageList.length; i++) {
    if (!tempSet.has(storageList[i].taskName)) {
      tempArray.push(storageList[i]);
    }
    tempSet.add(storageList[i].taskName);
  }
  storageList = tempArray;
  updatePage();
});

removeRandomBtn.addEventListener("click", () => {
  const random = Math.round(Math.random() * storageList.length - 1);
  storageList.splice(random, 1);
  updatePage();
});

removeLastBtn.addEventListener("click", () => {
  storageList.pop();
  updatePage();
});

removeFirstBtn.addEventListener("click", () => {
  storageList.shift();
  updatePage();
});

addRandomBtn.addEventListener("click", () => {
  const randomNum = Math.round(Math.random() * storageList.length - 1);
  const newItem = {
    taskName: taskNameInput.value,
    date: dateInput.value,
    tag: tagInput.value,
  };
  storageList.splice(randomNum, 0, newItem);
  updatePage();
});

addFirstBtn.addEventListener("click", () => {
  const newItem = {
    taskName: taskNameInput.value,
    date: dateInput.value,
    tag: tagInput.value,
  };
  storageList.unshift(newItem);
  updatePage();
});

randomizeBtn.addEventListener("click", () => {
  storageList.sort(() => Math.random() - 0.5);
  updatePage();
});

alphaBtnOrderBtn.addEventListener("click", () => {
  listToDo.sort((a, b) => (a.taskName > b.taskName ? 1 : -1));
  updatePage();
});

alphaRvrsOrderBtn.addEventListener("click", () => {
  listToDo.sort((a, b) => (a.taskName < b.taskName ? 1 : -1));
  updatePage();
});

function refreshLocalStorage(updatedList) {
  localStorage.setItem("list", JSON.stringify(updatedList));
}

subBtn.addEventListener("click", () => {
  if (!taskNameInput.value) {
    window.alert("You're adding an empty task!");
    return;
  }
  addItem(taskNameInput.value, dateInput.value, tagInput.value);
  taskNameInput.value = null;
  dateInput.value = null;
  tagInput.value = null;
  dateInput.setAttribute("id", "date-disappear");
  dateInput.disabled = true;
  setTimeout(() => {
    tagInput.setAttribute("id", "tag-disappear");
    tagInput.disabled = true;
  }, 150);
  setTimeout(() => {
    tagInput.setAttribute("id", "tag");
    dateInput.setAttribute("id", "date");
  }, 500);
  updatePage();
});

// deleteAll.addEventListener("click", (e) => {
//   stateList.setAttribute("id", "list-disappear");
//   setTimeout(() => {
//     e.preventDefault();
//     storageList = [];
//     refreshLocalStorage(storageList);
//     stateList.remove();
//     const newList = document.createElement("ul");
//     newList.setAttribute("id", "list");
//     main.appendChild(newList);
//   }, 300);
// });
let draggingTask;

stateList.addEventListener("dragstart", (event) => {
  draggingTask = event.target;
  event.dataTransfer.setData("text/plain", null);
});

stateList.addEventListener("dragleave", (event) => {
  const dropTarget = getDropTarget(event.target, event.clientY);
  if (dropTarget) {
    dropTarget.classList.remove("drag-over");
  }
});

stateList.addEventListener("dragover", (event) => {
  event.preventDefault();
  const dropTarget = getDropTarget(event.target, event.clientY);
  if (dropTarget) {
    dropTarget.classList.add("drag-over");
  }
});

stateList.addEventListener("drop", (event) => {
  event.preventDefault();
  const dropTarget = getDropTarget(event.target, event.clientY);
  if (dropTarget) {
    const draggingIndex = Array.from(stateList.children).indexOf(draggingTask);
    const dropIndex = Array.from(stateList.children).indexOf(dropTarget);
    let tempTask = storageList[draggingIndex];
    if (draggingIndex < dropIndex) {
      stateList.insertBefore(draggingTask, dropTarget.nextSibling);
    } else {
      stateList.insertBefore(draggingTask, dropTarget);
    }
    storageList.splice(draggingIndex, 1);
    storageList.splice(dropIndex, 0, tempTask);
    localStorage.setItem("list", JSON.stringify(storageList));
  }
  draggingTask.classList.remove("dragging");
  document.querySelectorAll(".drag-over").forEach((dropTarget) => {
    dropTarget.classList.remove("drag-over");
  });
});

function getDropTarget(target, y) {
  for (const task of Array.from(stateList.children)) {
    if (task === draggingTask) continue;
    const taskRect = task.getBoundingClientRect();
    const offset = y - taskRect.top - taskRect.height / 2;
    if (offset > 0 && offset < taskRect.height) {
      return task;
    }
  }
  return null;
}

function createOnPg(task, date, tag, index) {
  const item = document.createElement("li");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const markDoneBtn = document.createElement("button");
  item.innerHTML = "Task name: " + task + " | Date: " + date + " | ";
  editBtn.addEventListener("click", (e) => {
    rewriterCall(e, index);
  });
  const iconEdit = document.createElement("img");
  const iconDelete = document.createElement("img");
  const iconMarkDone = document.createElement("img");
  const spanForTag = document.createElement("span");
  spanForTag.innerHTML = "#" + tag;
  iconEdit.src = "./icons/edit.svg";
  iconDelete.src = "./icons/trash.svg";
  iconMarkDone.src = "./icons/check.svg";
  item.setAttribute("draggable", "true");
  editBtn.appendChild(iconEdit);
  deleteBtn.appendChild(iconDelete);
  markDoneBtn.appendChild(iconMarkDone);
  stateList.appendChild(item);
  item.appendChild(spanForTag);
  item.appendChild(editBtn);
  item.appendChild(deleteBtn);
  item.appendChild(markDoneBtn);
  markDoneBtn.addEventListener("click", () => {
    item.style.textDecoration === "line-through"
      ? (item.style.textDecoration = "none")
      : (item.style.textDecoration = "line-through");
  });
  deleteBtn.addEventListener("click", () => {
    item.setAttribute("class", "disappearLi");
    setTimeout(() => {
      const parent = deleteBtn.parentNode;
      parent.remove();
      storageList.splice(index, 1);
      refreshLocalStorage(storageList);
    }, 400);
  });
  item.setAttribute("class", "appearLi");
}

function addItem(taskName, date, tag, description) {
  const newItem = { taskName, date, tag, description };
  const index = storageList.push(newItem) - 1;
  createOnPg(taskName, date, tag, index);
  refreshLocalStorage(storageList);
}

function rewriterCall(e, index) {
  const changesForm = document.getElementsByClassName("editForm")[0];
  changesForm.setAttribute("class", "editForm-active");

  const formTitle = document.createElement("h3");
  const tempForm = document.createElement("form");
  const tempTaskIn = document.createElement("input");
  const tempDateIn = document.createElement("input");
  const tempTagIn = document.createElement("input");
  const savebtn = document.createElement("button");

  formTitle.innerHTML = "Edit Task";
  savebtn.innerHTML = "Save Changes";

  tempTaskIn.placeholder = "Taskname";
  tempDateIn.placeholder = "Date";
  tempTagIn.placeholder = "Tag";

  tempForm.appendChild(formTitle);
  tempForm.appendChild(tempTaskIn);
  tempForm.appendChild(tempDateIn);
  tempForm.appendChild(tempTagIn);
  tempForm.appendChild(savebtn);
  changesForm.appendChild(tempForm);

  savebtn.addEventListener("click", (e) => {
    tempForm.remove();
    e.preventDefault();
    const updatedItem = {
      taskName: tempTaskIn.value,
      date: tempDateIn.value,
      tag: tempTagIn.value,
    };
    storageList.splice(index, 1, updatedItem);
    changesForm.setAttribute("class", "editForm");
    updatePage();
  });
}
