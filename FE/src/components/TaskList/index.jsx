import React from "react";
import { useTaskListContext } from "../../context";
import TaskPreview from "../TaskPreview";

//Injects every object task preview coming from the user state list of tasks into a Task Preview component
export default function TaskList() {
  let allTasksComps = useTaskListContext().displayedList?.map((e, i) => {
    return (
      <TaskPreview
        key={e.taskId}
        id={e.taskId}
        title={e.title}
        isDone={e.isDone}
        dueDate={e.date}
        isFavorite={e.isFavorite}
        tagsListUrl={e.tagsURL}
        fullTaskURL={e.fullTaskURL}>
      </TaskPreview>
    );
  });
  return <div>{allTasksComps}</div>;
}
