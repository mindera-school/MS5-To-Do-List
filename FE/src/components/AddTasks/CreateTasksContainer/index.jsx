import React, { useEffect, useReducer, useState } from "react";
import { useAppContext, useTaskListContext } from "../../../context";
import Overlay from "../../Overlay";
import AddTaskModal from "../AddTaskModal";
import CreateTasks from "../CreateTasks";
import { Container } from "./style";

export default function CreateTasksContainer() {
  const [modalVisible, setModalVisible] = useState("none");
  const tasksList = useTaskListContext();
  const [tagsList, setTagsList] = useState([]);
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
    taskId: null,
    tags: tagsList,
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
          taskId: Date.now().toString(36),
          tags: tagsList,
          isDone: false,
          isFavorite: false,
        };
      case "last":
        return {
          ...state,
          position: tasksList.length,
          date: value.date === "" ? null : value.date,
          title: value.title,
          description: value.description,
          userId: user.currentUser === null ? null : user.currentUser?.userId,
          taskId: Date.now().toString(36),
          tags: tagsList,
          isDone: false,
          isFavorite: false,
        };
      case "random":
        return {
          ...state,
          position: Math.floor(Math.random() * tasksList.list.length),
          date: value.date === "" ? null : value.date,
          title: value.title,
          description: value.description,
          userId: user.currentUser === null ? null : user.currentUser?.userId,
          taskId: Date.now().toString(36),
          tags: tagsList,
          isDone: false,
          isFavorite: false,
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
          taskId: Date.now().toString(36),
          tags: tagsList,
          isDone: false,
          isFavorite: false,
        };
    }
  };

  const [newTaskState, dispatch] = useReducer(reducer, newTask);

  const addHandler = async () => {
    if (newTaskState.title === "") return;

    // setTagsList(
    //   tagsList.map((tag) => {
    //     if (tag.input) {
    //       console.log(tag.input);
    //       return tag;
    //     }
    //   })
    // );

    console.log(tagsList);
    //POST to send the Task the BE
    setModalVisible(modalVisible === "none" ? "block" : "none");
    if (user.currentUser != null) {
      const data = {
        position: newTaskState.position,
        date: newTaskState.date?.replaceAll("-", "/"),
        title: newTaskState.title,
        description: newTaskState.description,
        userId: newTaskState.userId,
        tags: tagsList,
        isDone: false,
        isFavorite: false,
      };

      await fetch("http://localhost:8086/todo/tasks/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
        referrerPolicy: "no-referrer",
      })
        .then((r) => r.json())
        .then((r) => {
          if (compareObjs(newTaskState, r)) {
            newTaskState.tags.forEach(
              (tag) => (tag.tagId = newTaskState.tags[tag.tagId])
            );
            sendTags(newTaskState.tags, r.taskId, setTagsList);
            //Add task locally
            tasksList.setTaskList(updateTaskList(tasksList.list, r));
            //Reset state
            setTagsList([]);
          }
        })
        .catch(() => console.error("Error task not created"));
    } else {
      //Guest Mode
      newTaskState.tags.forEach((tag) => (tag.taskId = newTaskState.taskId));
      tasksList.setTaskList(updateTaskList(tasksList.list, newTaskState));
      setTagsList([]);
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
        tagsList={tagsList}
        setTagsList={setTagsList}
      />
      <Overlay
        handler={handler}
        display={modalVisible === "none" ? false : true}
      />
    </Container>
  );
}

function compareObjs(obj1, obj2) {
  return (
    obj1.title === obj2.title &&
    obj2.date === obj1.date &&
    obj1.position === obj2.position &&
    obj1.ParentId === obj2.ParentId
  );
}

function updateTaskList(taskList, task) {
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

function sendTags(tags, taskId, setTagsList) {
  tags.forEach((tag) => (tag.taskId = taskId));
  fetch("http://localhost:8086/todo/tags/v1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(tags),
  });
  setTagsList(tags);
}
