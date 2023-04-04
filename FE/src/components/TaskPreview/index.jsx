import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Draggable from "react-draggable";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdOpenInFull } from "react-icons/md";
import { SlClose } from "react-icons/sl";
import { AppContext, TaskListContext } from "../../context.js";
import TaskDetailsModal from "../TaskDetailsModal";
import TaskTagsList from "../TaskTagsList";
import {
  DateContainer,
  DeleteBtn,
  DraggerContainer,
  EdgeButtonsContainer,
  ExtendDiv,
  NameAndDone,
  StyledFavHeart,
  StyledTaskPreview,
  TaskDetailsBtn,
  VerticalLine,
} from "./styled-components";

const deleteTask = (id, e, deleteTaskContext, currentUser) => {
  e.stopPropagation();
  if (currentUser !== null) {
    try {
      fetch(`http://localhost:8086/todo/tasks/delete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      }).then((r) => {
        r.ok ? deleteTaskContext(id) : console.log("Couldn't connect!");
      });
    } catch (exception) {
      console.error("Unable to delete");
    }
  } else {
    deleteTaskContext(id);
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
  fullTaskURL,
  dragger,
}) {
  const [isThisFav, setIsThisFav] = useState(isFavorite);
  const [isDetailVis, setIsDetailVis] = useState(false);
  const [task, setTask] = useState({});
  const deleteTaskFromContext =
    useContext(TaskListContext).deleteTaskFromContext;
  const currentUser = useContext(AppContext).currentUser;
  const setIsDone = useContext(TaskListContext).setTaskDoneState;
  const isDragging = useRef(null);
  const [borderColor, setBorderColor] = useState("none");
  const [padding, setPadding] = useState(false);

  useEffect(() => {
    setPadding("3px 15px");
  }, []);

  useEffect(() => {
    if (!isDetailVis) {
      setTask({});
      return;
    }
    fetch(fullTaskURL)
      .then((r) => r.json())
      .then((r) => setTask(r));
  }, [isDetailVis, fullTaskURL]);

  useEffect(() => {}, []);
  const handleStop = useCallback(
    (event, info) => {
      event.preventDefault();
      if (isDragging) {
        isDragging.current = false;
        return;
      }
      isDragging.current = false;
      if (info.x >= 450) {
        setIsDone(id, isDone ? false : true);
        checkColor();
      }
      if (info.x <= -450) {
        deleteTask(id, event, deleteTaskFromContext, currentUser);
      }
    },
    [currentUser, deleteTaskFromContext, id, setIsDone]
  );

  useEffect(() => {
    if (!isDone) {
      const taskDate = new Date(dueDate);
      const endDate = new Date();
      const warningDate = new Date(endDate.getTime() + 48 * 60 * 60 * 1000);
      if (warningDate >= taskDate) {
        if(borderColor === "none"){
          setBorderColor("3px solid red");
          setPadding("0 12px");
        }
      } else if (borderColor === "3px solid green") {
        setBorderColor("3px solid red");
        setPadding("0 12px");
        return;
      } 
    }
  }, [isDone]);

  const checkColor = () => {
    if (borderColor === "none") {
      setBorderColor("3px solid green");
      setPadding("0 12px");
    } else if (borderColor === "3px solid red") {
      setPadding("0 12px");
      setBorderColor("3px solid green");
    } else {
      setBorderColor("none");
      setPadding("3px 15px");
    }
  };

  const handleStart = useCallback((event, info) => {
    if (
      event.target.toString() === "[object SVGPathElement]" ||
      event.target.toString() === "[object SVGSVGElement]"
    ) {
      isDragging.current = true;
      return;
    }
  }, []);

  const handleDrag = useCallback(() => {
    isDragging.current = true;
  }, []);

  return (
    <>
      <Draggable
        axis={isDragging.current ? "none" : "x"}
        handle=".handle"
        scale={1}
        position={{ x: 0, y: 0 }}
        onStart={handleStart}
        onStop={handleStop}
        onDrag={handleDrag}
      >
        <div className="handle">
          <StyledTaskPreview border={borderColor} padding={padding}>
            <StyledFavHeart
              isFilled={isThisFav}
              onClick={() => setIsThisFav(isThisFav ? false : true)}
            ></StyledFavHeart>
            <div>
              <NameAndDone>
                <input
                  checked={isDone}
                  onChange={() => {
                    setIsDone(id, isDone ? false : true);
                    checkColor();
                  }}
                  type="checkbox"
                />
                <h3>{title}</h3>
              </NameAndDone>
              <TaskTagsList listUrl={tagsListUrl}></TaskTagsList>
            </div>
            <ExtendDiv></ExtendDiv>
            <DateContainer>
              <AiOutlineCalendar size={20} color="white" />
              <h4>{dueDate}</h4>
            </DateContainer>
            <DraggerContainer isDragDisabled={true}>{dragger}</DraggerContainer>
            <VerticalLine></VerticalLine>
            <EdgeButtonsContainer>
              <DeleteBtn
                onClick={(e) => {
                  deleteTask(id, e, deleteTaskFromContext, currentUser);
                }}
              >
                <SlClose size={20} />
              </DeleteBtn>
              <TaskDetailsBtn onClick={() => setIsDetailVis(true)}>
                <MdOpenInFull size={20} color="black" />
              </TaskDetailsBtn>
            </EdgeButtonsContainer>
          </StyledTaskPreview>
        </div>
      </Draggable>
      <TaskDetailsModal
        task={task}
        display={isDetailVis}
        setDisplay={setIsDetailVis}
      ></TaskDetailsModal>
    </>
  );
}
