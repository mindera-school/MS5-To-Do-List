import React from "react";
import TaskTagsList from "../TaskTagsList";
import CalendarIcon from "../../assets/icons/calendar-darkmode.svg";
import MoveIcon from "../../assets/icons/move-darkmode.svg";
import ExpandIcon from "../../assets/icons/maximize-darkmode.svg";

//TaskPreview template that will be generated for each task through the TaskList component
export default function TaskPreview({ title , dueDate , tagsListUrl }) {
  return (
    <div className="taskpreview">
      <div className="heart"></div>
      <div>
        <div className="task-titleholder">
          <input type="checkbox" />
          <h3>{title}</h3>
        </div>
        <TaskTagsList listUrl={tagsListUrl}></TaskTagsList>
      </div>
      <div className="expandBtn"></div>
      <div className="date-container">
        <img src={CalendarIcon} alt="Calendar Icon" />
        <h4>{dueDate}</h4>
      </div>
      <div className="task-mover">
        <button><img src={MoveIcon} alt="Move task icon" /></button>
      </div>
      <rect className="vertical-line" ></rect>
      <button className="detailsBtn"> <img src={ExpandIcon} alt="Expand button" /></button>
    </div>
  );
}
