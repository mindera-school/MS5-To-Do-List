let myTasks = [];
let completedTaks = [];
const taskInput = document.getElementById("task")
const add = document.getElementById("add");
const form = document.getElementById("form");
const removeAll = document.getElementById("removeAll");
const removeCompleted = document.getElementById("removeCompleted");
const removeFirst = document.getElementById("removeFirst");
const removeLast = document.getElementById("removeLast");
const removeRepeated = document.getElementById("removeRepeated");
let taskResult = document.getElementById("taskResult");
let taskList = document.getElementById("taskList");
let aZ = document.getElementById("aZ");
let count=0;

const task = {
  taskName: "",
  taskTag: "",
  taskCompleted: false,
  taskDate:""
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

window.addEventListener("load", () => {

})

window.addEventListener("click",() => {
  var color = [, "#3C9EE7", "#E7993C", 
  "#E73C99", "#3CE746", "#E7993C"];
  document.querySelector("h1").style.background = color[Math.floor(Math.random() * color.length)];
  })

function addTask(task1) {
let createdTask = Object.create(task);
createdTask.taskName = task1.value
  myTasks.push(createdTask);
  taskResult.innerHTML = "Task has been added";
  cleanMessage();
  localStorage.setItem("Tasks:", JSON.stringify(myTasks));
}

function cleanMessage(){
  setTimeout(()=>{taskResult.innerHTML=""}, 3500 );
}


add.addEventListener("click", () => {
  if (taskInput.value != "") {
    addTask(taskInput);
    const liNode = document.createElement("li");
    const spanNode = document.createElement("span");
    const bNode = document.createElement("b");
    spanNode.innerHTML = taskInput.value;
    taskList.appendChild(liNode);
    liNode.appendChild(spanNode);
    liNode.appendChild(bNode);
    

    const buttonRemove = document.createElement("button");
    buttonRemove.setAttribute("class", "buttonRemove");
    buttonRemove.innerText = "Delete";
    liNode.appendChild(buttonRemove);

    buttonRemove.addEventListener("click", (e) => {

      myTasks.forEach(el => {

        if (el.taskName == buttonRemove.parentNode.firstElementChild.innerHTML) {
        
          myTasks.splice(myTasks.indexOf(el),1);
          localStorage.clear();
          localStorage.setItem("Tasks:", JSON.stringify(myTasks));
        }

      });
      liNode.remove();
      taskResult.innerHTML = "Task removed";
      const parent = e.target.parentNode;
      parent.remove();
    });
    
    const buttonComplete = document.createElement("button");
    buttonComplete.setAttribute("class", "buttonComplete");
    buttonComplete.innerText = "Completed";
    liNode.appendChild(buttonComplete);

    buttonComplete.addEventListener("click", (e) => {
      if(liNode.style.color != "green"){
      liNode.style.color = "green";
      buttonComplete.style.backgroundColor = "greenyellow"
      taskResult.innerHTML = "Marked as completed";
      }else{
        liNode.style.color = "black";
        buttonComplete.style.backgroundColor = "#f0f0f0"
        taskResult.value = "Unmarked as completed";
      }
      let obj = myTasks.find(o => o.taskName === buttonComplete.parentNode.firstElementChild.innerHTML);
      obj.taskCompleted=!obj.taskCompleted;
      localStorage.clear;
      localStorage.setItem("Tasks:", JSON.stringify(myTasks));
      cleanMessage();
    });

    const buttonTag = document.createElement("button");
    buttonTag.setAttribute("class", "buttonTag");
    buttonTag.innerText = "Tag";
    liNode.appendChild(buttonTag);

    buttonTag.addEventListener("click", (e) => {
      bNode.innerHTML = prompt("Insert Tag");
      taskResult.innerHTML = "Tag added";
      let obj = myTasks.find(o => o.taskName === buttonTag.parentNode.firstElementChild.innerHTML);
      obj.taskTag = bNode.innerHTML;

      localStorage.clear;
      localStorage.setItem("Tasks:", JSON.stringify(myTasks));
      cleanMessage();
    })



    spanNode.addEventListener("click", () => {
      let oldTaskName = spanNode.innerHTML;
      spanNode.innerHTML = prompt("Edit task");
      taskResult.innerHTML = "Task Edited";
console.log(spanNode.innerHTML);
      let obj = myTasks.find(o => o.taskName === oldTaskName);
      obj.taskName = spanNode.innerHTML;
      localStorage.clear;
      localStorage.setItem("Tasks:", JSON.stringify(myTasks));
      cleanMessage();
console.log(obj);
    });
   
taskInput.value = '';

  }else{
    taskResult.innerHTML = "Planning nothing isn't a task right? "}
    cleanMessage();
});

aZ.addEventListener("click",(ul) => {
  var ul = document.getElementById("taskList");
  if(count%2==0){
if(myTasks.length != 0){
  Array.from(ul.getElementsByTagName("li"))
    .sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach(li => ul.appendChild(li));
    taskResult.innerHTML = "Tasks organized alphabetically";
    aZ.textContent = "Order Z-A";
    myTasks.sort((a,b) => a.taskName.localeCompare(b.taskName))
}  else{
    taskResult.innerHTML = "You should have tasks to order first!";
  }

}else {
  if(myTasks.length != 0){
    Array.from(ul.getElementsByTagName("li"))
      .sort((b, a) => a.textContent.localeCompare(b.textContent))
      .forEach(li => ul.appendChild(li));
      taskResult.innerHTML = "Tasks organized alphabetically";
      aZ.textContent = "Order A-Z";
      myTasks.sort((b,a) => a.taskName.localeCompare(b.taskName))
  }  else{
      taskResult.innerHTML = "You should have tasks to order first!";
    }
   
}
localStorage.clear;
localStorage.setItem("Tasks:", JSON.stringify(myTasks));     
count++;
cleanMessage();
});

removeAll.addEventListener("click",() =>{
  if(myTasks.length != 0){
  myTasks = [];
  taskList.remove();
  const ulNode = document.createElement("ul");
  ulNode.setAttribute("class","taskList");
  taskList = ulNode;
  form.appendChild(ulNode);
  taskResult.innerHTML = "Tasks removed";
  localStorage.clear();
  cleanMessage();
  }else{
    taskResult.innerHTML = "You should have tasks to remove first!";
    cleanMessage();
  }
})

removeCompleted.addEventListener("click",()=>{
myTasks.forEach(el => {

  if(el.taskCompleted){

    myTasks.splice(myTasks.indexOf(el),1);
    localStorage.clear;
    localStorage.setItem("Tasks:", JSON.stringify(myTasks));   
  }
});
taskResult.innerHTML = "Completed tasks removed in local Storage 👀";
cleanMessage();
})

removeRepeated.addEventListener("click", ()=>{
  let newMyTasks = [];
//   myTasks.forEach(el => {
//     if(el.taskName != newMyTasks.taskName){
// newMyTasks.push(el);
//     }});

//  myTasks.map(x => !newMyTasks.taskName.includes(x.taskName) ? newMyTasks.push(x) : "");

  myTasks = newMyTasks;
  localStorage.clear;
  localStorage.setItem("Tasks:", JSON.stringify(myTasks));  
  taskResult.innerHTML = "Repeated tasks (not) removed.";
  cleanMessage();
} )

removeFirst.addEventListener("click", () =>{
myTasks.shift();
localStorage.clear;
localStorage.setItem("Tasks:", JSON.stringify(myTasks));  
taskResult.innerHTML = "First task removed.";
cleanMessage();
})

removeLast.addEventListener("click", () => {
myTasks.pop();
localStorage.clear;
localStorage.setItem("Tasks:", JSON.stringify(myTasks));  
taskResult.innerHTML = "Last task removed.";
cleanMessage();
})


