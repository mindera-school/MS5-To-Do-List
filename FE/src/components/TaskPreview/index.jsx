import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiMoveVertical } from "react-icons/bi";
import { MdOpenInFull } from "react-icons/md";
import { SlClose } from "react-icons/sl";
import { AppContext, TaskListContext } from "../../context.js";
import TaskDetailsModal from "../TaskDetailsModal";
import TaskTagsList from "../TaskTagsList";
import {
  DateContainer, DeleteBtn, EdgeButtonsContainer, ExtendDiv, NameAndDone, StyledFavHeart, StyledTaskPreview, TaskDetailsBtn, TaskMover, VerticalLine
} from "./styled-components";

const deleteTask = (id, e, deleteTaskContext, currentUser) => {
  e.stopPropagation();
  if (currentUser !== null) {
    try {
      fetch(`http://localhost:8086/todo/tasks/delete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
        .then(r => {
          r.ok ? deleteTaskContext(id) : console.log("Couldn't connect!");
        });
    } catch (exception) {
      console.error("Unable to delete");
    }
  }
};


//TaskPreview template that will be generated for each task through the TaskList component
export default function TaskPreview({
  id,
  title,
  dueDate,
  tagsListUrl,
  isDone,
  isFavorite,
  fullTaskURL
}) {

  const [isThisFav, setIsThisFav] = useState(isFavorite);
  const [isThisDone, setIsThisDone] = useState(isDone);
  const [isDetailVis, setIsDetailVis] = useState(false);
  const [task, setTask] = useState({});
  const deleteTaskFromContext = useContext(TaskListContext).deleteTaskFromContext;
  const currentUser = useContext(AppContext).currentUser;

  useEffect(() => {
    if (!isDetailVis) {
      setTask({});
      return;
    }
    fetch(fullTaskURL)
      .then(r => r.json())
      .then(r => setTask(r));
  }, [isDetailVis, fullTaskURL]);

  return <>
    <StyledTaskPreview>
      <StyledFavHeart isFilled={isThisFav} onClick={() => setIsThisFav(isThisFav ? false : true)}></StyledFavHeart>
      <div>
        <NameAndDone>
          <input checked={isThisDone} onChange={() => setIsThisDone(isThisDone ? false : true)} type="checkbox" />
          <h3>{title}</h3>
        </NameAndDone>
        <TaskTagsList listUrl={tagsListUrl}></TaskTagsList>
      </div>
      <ExtendDiv></ExtendDiv>
      <DateContainer>
        <AiOutlineCalendar size={20} color="white" />
        <h4>{dueDate}</h4>
      </DateContainer>
      <TaskMover>
        <button>
          <BiMoveVertical size={20} color="white" />
        </button>
      </TaskMover>
      <VerticalLine></VerticalLine>
      <EdgeButtonsContainer>
        <DeleteBtn onClick={(e) => {
          deleteTask(id, e, deleteTaskFromContext, currentUser);
        }}>
          <SlClose size={20} />
        </DeleteBtn>
        <TaskDetailsBtn>
          <MdOpenInFull size={20} color="black" />
        </TaskDetailsBtn>
      </EdgeButtonsContainer>
    </StyledTaskPreview>
    <TaskDetailsModal task={task} display={isDetailVis} setDisplay={setIsDetailVis}></TaskDetailsModal>
  </>;
}
