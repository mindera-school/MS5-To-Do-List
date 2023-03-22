import React, { useState } from "react";
import TaskTagsList from "../TaskTagsList";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiMoveVertical } from "react-icons/bi";
import { MdOpenInFull } from "react-icons/md";

import {
  StyledTaskPreview,
  VerticalLine,
  NameAndDone,
  ExtendDiv,
  DateContainer,
  TaskMover,
  TaskDetailsBtn,
  StyledFavHeart
} from "./styled-components";

//TaskPreview template that will be generated for each task through the TaskList component
export default function TaskPreview({
  title,
  dueDate,
  tagsListUrl,
  isDone,
  isFavorite,
}) {

  const [isThisFav, setIsThisFav] = useState(isFavorite);
  const [isThisDone, setIsThisDone] = useState(isDone);

  return (
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
          <BiMoveVertical size="25px" color="white"/>
        </button>
      </TaskMover>
      <VerticalLine></VerticalLine>
      <TaskDetailsBtn>
        <MdOpenInFull size="20px" color="black" />
      </TaskDetailsBtn>
    </StyledTaskPreview>
  );
}
