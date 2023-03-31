import React from "react";
import TaskPreview from "../TaskPreview";
import { useTaskListContext } from "../../context";

//Injects every object task preview coming from the user state list of tasks into a Task Preview component
export default function TaskList() {
  let allTasksComps = useTaskListContext().displayedList?.map((e, i) => {
    return (
      <TaskPreview
        key={i}
        title={e.title}
        isDone={e.isDone}
        dueDate={e.date}
        isFavorite={e.isFavorite}
        tagsListUrl={e.tagsURL}
        fullTaskURL={e.fullTaskURL}>
      </TaskPreview>
    );
  });
  return <div className="tasksList">{allTasksComps}</div>;
}
