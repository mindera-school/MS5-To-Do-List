import React from "react";
import TaskPreview from "../TaskPreview";

export default function TaskList({ tasksList }) {
  let allTasksComps = tasksList?.map((e, i) => {
    return (
      <TaskPreview
        key={i}
        title={e.title}
        isDone={e.isDone}
        dueDate={e.date}
        isFavorite={e.isFavorite}
        tagsListUrl={e.tagsURL}></TaskPreview>
    );
  });
  return <div className="tasksList">{allTasksComps}</div>;
}
