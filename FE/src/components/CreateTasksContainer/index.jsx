import React, { useContext } from "react";
import { useState } from "react";
import CreateTasks from "../CreateTasks";
import AddTaskModal from "../AddTaskModal";
import Overlay from "../Overlay";
import TaskPreview from "../TaskPreview";
import { Container } from "./style";

export default function CreateTasksContainer() {
  const [newTask, setNewTask] = useState({});
  const [modalVisible, setModalVisible] = useState("none");
  const handler = () =>
    setModalVisible(modalVisible === "none" ? "block" : "none");

  /*title,
  dueDate,
  tagsListUrl,
  isDone,
  isFavorite

  const addHandler = () => {};
  setTaskList((current) => {
    ...current,
    <TaskPreview title={}/>
  } )*/
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
      />
      <Overlay
        handler={handler}
        display={modalVisible === "none" ? false : true}
      />
    </Container>
  );
}
