import React, { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BiMove } from "react-icons/bi";
import { useTaskListContext } from "../../context";
import TaskPreview from "../TaskPreview";

//Injects every object task preview coming from the user state list of tasks into a Task Preview component
export default function TaskList() {
  const taskList = useTaskListContext().list;
  const updateTaskList = useTaskListContext().setTaskList;

  function createPatchDTO(updatedList) {
    return updatedList.map(e => {
      return {
        taskId: e.taskId,
        position: e.position,
        ParentId: e.parentId
      };
    });
  }

  useEffect(() => {
    const sendData = setTimeout(() => {
      const data = createPatchDTO(taskList);
      fetch("http://localhost:8086/todo/tasks/v1/change-position", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: data
      });
    }, 3000);

    return () => clearTimeout(sendData);
  }, [taskList]);

  function handleOnDragEnd(result) {
    if (result.destination === "") {
      return;
    }
    const tempTasks = Array.from(taskList);
    const [reorderedTask] = tempTasks.splice(result.source.index, 1);
    tempTasks.splice(result.destination.index, 0, reorderedTask);
    const updatedPositionTasks = tempTasks.map((e, i) => { return { ...e, position: i }; });
    updateTaskList(updatedPositionTasks);
  }

  let allTasksComps = useTaskListContext().displayedList?.map((e, index) => {
    return (
      <Draggable key={e.taskId} draggableId={e.taskId.toString()} index={index}>
        {(providedDraggable) =>
          <div {...providedDraggable.draggableProps}
            ref={providedDraggable.innerRef}
          >
            <TaskPreview
              id={e.taskId}
              title={e.title}
              isDone={e.isDone}
              dueDate={e.date}
              isFavorite={e.isFavorite}
              position={e.position}
              tagsListUrl={e.tagsURL}
              fullTaskURL={e.fullTaskURL}
              dragger={<div
                {...providedDraggable.dragHandleProps}>
                <BiMove size={25} />
              </div>}
            >
            </TaskPreview>
          </div>
        }
      </Draggable>
    );
  });
  return <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId="taskList">
      {(providedDroppable) => <div className="tasksList" {...providedDroppable.droppableProps} ref={providedDroppable.innerRef}>
        {allTasksComps}
        {providedDroppable.placeholder}
      </div>
      }
    </Droppable>
  </DragDropContext>;

}
