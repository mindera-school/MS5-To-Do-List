import React from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { useAppContext } from "../../../context";
import { CreateTasksButton } from "./style";

export default function CreateTasks({ openHandler }) {
  const theme = useAppContext().themeMode;
  return (
    <CreateTasksButton theme={theme} onClick={openHandler}>
      Add Task
      <MdOutlineAddBox />
    </CreateTasksButton>
  );
}
