import React, { useContext, useState, useRef } from "react";
import CreateTasks from "../CreateTasks";
import AddTaskModal from "../AddTaskModal";
import Overlay from "../Overlay";
import { useTaskListContext, useAppContext } from "../../context";
import { Container } from "./style";

export default function CreateTasksContainer() {
  const [modalVisible, setModalVisible] = useState("none");
  const tasksList = useTaskListContext();
  const user = useAppContext();
  const handler = () =>
    setModalVisible(modalVisible === "none" ? "block" : "none");
  let newTask = {
    title: "",
    description: "",
    endDate: "",
    favorite: false,
    isDone: false,
    position: tasksList.list.length,
    parentId: null,
    tags: null,
    userId: null,
  };
  const addHandler = async () => {
    if (newTask.title === "") return;
    //POST to send the Task the BE
    setModalVisible(modalVisible === "none" ? "block" : "none");
    if (user.currentUser != null) {
      await fetch("http://localhost:8086/todo/tasks/create-task", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      })
        .then((r) => r.json())
        .then((r) => {
          if (compareObjs(r, newTask)) {
            newTask = r;
            //Add task locally
            tasksList.setTaskList([...tasksList.list, newTask]);
          }
        })
        .catch(() => console.error("Error task not created"));
    } else {
      //Guest Mode
      tasksList.setTaskList([...tasksList.list, newTask]);
    }
  };

  return (
    <Container>
      <CreateTasks
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        openHandler={handler}
      />
      <AddTaskModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        closeHandler={handler}
        newTask={newTask}
        addHandler={addHandler}
      />
      <Overlay
        handler={handler}
        display={modalVisible === "none" ? false : true}
      />
    </Container>
  );
}

function compareObjs(obj1, obj2) {
  if (
    obj1.title === obj2.title &&
    obj1.date === obj2.date &&
    obj1.description === obj2.description &&
    obj1.position === obj2.position &&
    obj1.isDone === obj2.isDone &&
    obj1.isFavorite === obj2.isFavorite &&
    obj1.ParentId === obj2.ParentId
  )
    return true;
}
