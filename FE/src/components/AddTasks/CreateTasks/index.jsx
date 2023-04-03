import React from "react";
import { CreateTasksButton } from "./style";
import { MdOutlineAddBox } from "react-icons/md";

export default function CreateTasks({ openHandler }) {
  return (
    <CreateTasksButton onClick={openHandler}>
      Add Task
      <MdOutlineAddBox color="black" />
    </CreateTasksButton>
  );
}
