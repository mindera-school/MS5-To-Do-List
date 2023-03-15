import React, {useState} from "react";
import TaskTagsList from "../TaskTagsList";
import CalendarIcon from "../../assets/icons/calendar-darkmode.svg";
import MoveIcon from "../../assets/icons/move-darkmode.svg";
import ExpandIcon from "../../assets/icons/maximize-darkmode.svg";
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
        <img src={CalendarIcon} alt="Calendar Icon" />
        <h4>{dueDate}</h4>
      </DateContainer>
      <TaskMover>
        <button>
          <img src={MoveIcon} alt="Move task icon" />
        </button>
      </TaskMover>
      <VerticalLine></VerticalLine>
      <TaskDetailsBtn>
        <img src={ExpandIcon} alt="Expand button" />
      </TaskDetailsBtn>
    </StyledTaskPreview>
  );
}
