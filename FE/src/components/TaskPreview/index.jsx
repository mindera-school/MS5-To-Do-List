import React, { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiMoveVertical } from "react-icons/bi";
import { MdOpenInFull } from "react-icons/md";
import TaskDetailsModal from "../TaskDetailsModal";
import TaskTagsList from "../TaskTagsList";

import {
  DateContainer, ExtendDiv, NameAndDone, StyledFavHeart, StyledTaskPreview, TaskDetailsBtn, TaskMover, VerticalLine
} from "./styled-components";

//TaskPreview template that will be generated for each task through the TaskList component
export default function TaskPreview({
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
        <AiOutlineCalendar size="20px" color="white" />
        <h4>{dueDate}</h4>
      </DateContainer>
      <TaskMover>
        <button>
          <BiMoveVertical size="25px" color="white" />
        </button>
      </TaskMover>
      <VerticalLine></VerticalLine>
      <TaskDetailsBtn onClick={() => setIsDetailVis(true)}>
        <MdOpenInFull size="20px" color="black" />
      </TaskDetailsBtn>
    </StyledTaskPreview>
    <TaskDetailsModal task={task} display={isDetailVis} setDisplay={setIsDetailVis}></TaskDetailsModal>
  </>;
}
