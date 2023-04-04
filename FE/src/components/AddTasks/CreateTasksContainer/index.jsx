import React, { useEffect, useReducer, useState } from "react";
import { useAppContext, useTaskListContext } from "../../../context";
import Overlay from "../../Overlay";
import AddTaskModal from "../AddTaskModal";
import CreateTasks from "../CreateTasks";
import { Container } from "./style";

export default function CreateTasksContainer() {
  const [modalVisible, setModalVisible] = useState("none");
  const tasksList = useTaskListContext();
  const user = useAppContext();
  const handler = () =>
    setModalVisible(modalVisible === "none" ? "block" : "none");
  const newTask = {
    title: "",
    description: "",
    date: null,
    userId: user.currentUser === null ? null : user.currentUser?.userId,
    parentId: null,
    position: 0,
    taskId: null
  };

  const reducer = (state, { type, value }) => {
    switch (type) {
      case "first":
        return {
          ...state,
          position: 0,
          date: value.date === "" ? null : value.date,
          title: value.title,
          description: value.description,
          userId: user.currentUser === null ? null : user.currentUser?.userId,
          taskId: Date.now().toString(36)
        };
      case "last":
        return {
          ...state,
          position: tasksList.length,
          date: value.date === "" ? null : value.date,
          title: value.title,
          description: value.description,
          userId: user.currentUser === null ? null : user.currentUser?.userId,
          taskId: Date.now().toString(36)
        };
      case "random":
        return {
          ...state,
          position: Math.floor(Math.random() * tasksList.list.length),
          date: value.date === "" ? null : value.date,
          title: value.title,
          description: value.description,
          userId: user.currentUser === null ? null : user.currentUser?.userId,
          taskId: Date.now().toString(36)
        };
      case "set":
        return {
          value,
          userId: user.currentUser === null ? null : user.currentUser?.userId,
        };
      default:
        return {
          ...state,
          position: tasksList.list.length,
          date: value.date === "" ? null : value.date,
          title: value.title,
          description: value.description,
          userId: user.currentUser === null ? null : user.currentUser?.userId,
          taskId: Date.now().toString(36)
        };
    }
  };

  const [newTaskState, dispatch] = useReducer(reducer, newTask);

  const addHandler = async () => {
    if (newTaskState.title === "") return;
    //POST to send the Task the BE
    setModalVisible(modalVisible === "none" ? "block" : "none");
    if (user.currentUser != null) {
      await fetch("http://localhost:8086/todo/tasks/new-task", {
        method: "POST",
        body: JSON.stringify(newTaskState),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      })
        .then((r) => r.json())
        .then((r) => {
          if (compareObjs(newTaskState, r)) {
            dispatch({ type: "set", value: r });

            //Add task locally
            tasksList.setTaskList(updateTaskList(tasksList.list, r));
          }
        })
        .catch(() => console.error("Error task not created"));
    } else {
      //Guest Mode
      tasksList.setTaskList(updateTaskList(tasksList.list, newTaskState));
    }
  };

  useEffect(() => {
    async function add() {
      return await addHandler();
    }
    add();
  }, [newTaskState]);

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
        dispatch={dispatch}
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
    obj2.date.includes(obj1.date) &&
    obj1.position === obj2.position &&
    obj1.ParentId === obj2.ParentId
  ) {
    return true;
  }
  return false;
}

function updateTaskList(taskList, task) {
  console.log(taskList);
  if (task.position === 0) {
    return [task, ...taskList];
  }
  if (task.position === taskList.length) {
    return [...taskList, task];
  }
  const temp = taskList;
  temp.splice(task.position, 0, task);
  return [...temp];
}
