import React, {useState} from "react";
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
      <StyledFavHeart isFilled={isThisFav} onClick={()=> setIsThisFav(isThisFav?false:true)}></StyledFavHeart>
      <div>
        <NameAndDone>
          <input checked={isThisDone} onChange={()=> setIsThisDone(isThisDone?false:true)} type="checkbox" />
          <h3>{title}</h3>
        </NameAndDone>
        <TaskTagsList listUrl={tagsListUrl}></TaskTagsList>
      </div>
      <ExtendDiv></ExtendDiv>
      <DateContainer>
        <img src={AiOutlineCalendar} alt="Calendar Icon" />
        <h4>{dueDate}</h4>
      </DateContainer>
      <TaskMover>
        <button>
          <img src={BiMoveVertical} alt="Move task icon" />
        </button>
      </TaskMover>
      <VerticalLine></VerticalLine>
      <TaskDetailsBtn>
        <img src={MdOpenInFull} alt="Expand button" />
      </TaskDetailsBtn>
    </StyledTaskPreview>
  );
}
