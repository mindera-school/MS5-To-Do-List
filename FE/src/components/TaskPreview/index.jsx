import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import Draggable from "react-draggable";
import { AiOutlineCalendar } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
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
  StyledTaskPreview, SubtasksBtns, TaskDetailsBtn,
  VerticalLine
} from "./styled-components";
import SubtaskList from "./SubtaskList";

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
  parentId,
  isParent
}) {
  const [isThisFav, setIsThisFav] = useState(isFavorite);
  const [isDetailVis, setIsDetailVis] = useState(false);
  const [task, setTask] = useState({});
  const deleteTaskFromContext = useContext(TaskListContext).deleteTaskFromContext;
  const currentUser = useContext(AppContext).currentUser;
  const setIsDone = useContext(TaskListContext).setTaskDoneState;
  const deleteSubtask = useContext(TaskListContext).deleteSubtask;
  const addSubstaskList = useContext(TaskListContext).addSubtasksList;
  const isDragging = useRef(null);
  const [borderColor, setBorderColor] = useState("none");
  const [padding, setPadding] = useState(false);
  const taskList = useContext(TaskListContext).list;
  const taskChildren = useContext(TaskListContext).getChildrenById(id) || [];
  const [showChildren, setShowChildren] = useState(false);

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

  useEffect(() => {
    if (!isDone) {
      if (dueDate === null) {
        return;
      }
      const taskDate = new Date(dueDate);
      const currentDate = new Date();
      const warningDate = new Date(currentDate.getTime() + 48 * 60 * 60 * 1000);
      if (taskDate <= warningDate) {
        if (borderColor === "none") {
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
    if (event.target.toString() === "[object HTMLDivElement]") {
      isDragging.current = false;
    }
    if (event.target.toString() === "[object SVGPathElement]" || event.target.toString() === "[object SVGSVGElement]") {
      isDragging.current = true;
      return;
    }
  }, []);

  const handleStop = useCallback((event, info) => {
    const swipeLength = window.innerWidth * 0.35;
    event.preventDefault();
    if (isDragging === true) {
      isDragging.current = false;
      return;
    }
    if (info.x >= swipeLength) {
      setIsDone(id, isDone ? false : true);
      checkColor();
    }
    if (info.x <= -swipeLength) {
      deleteTask(id, event, deleteTaskFromContext, currentUser);
    }
    isDragging.current = false;
  }, [currentUser, deleteTaskFromContext, id, setIsDone]);

  const handleDrag = useCallback(() => {
    isDragging.current = true;
  }, []);

  useEffect(() => {
    if (isParent === false) {
      return;
    }
    fetch(`http://localhost:8086/todo/tasks/v1/${id}`)
      .then(r => r.json())
      .then(r => addSubstaskList({
        id,
        substasks: r
      }));
  }, [taskList, id, isParent]);

  const getChevron = () => {
    if (isParent && taskChildren?.length >= 1) {
      return <SubtasksBtns show={showChildren} onClick={() => setShowChildren(showChildren ? false : true)}>
        <FiChevronDown size={25} />
      </SubtasksBtns>;
    }
  };

  useEffect(() => {
    if (isDragging === true) {
      setShowChildren(false);
    }
  }, [isDragging]);

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
          <StyledTaskPreview isParent={isParent} border={borderColor} padding={padding}>
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
            {getChevron()}
            <DraggerContainer isDragDisabled={true}>{dragger}</DraggerContainer>
            <VerticalLine></VerticalLine>
            <EdgeButtonsContainer>
              <DeleteBtn
                onClick={(e) => {
                  const deleteMethod = parentId === null ? deleteTaskFromContext : deleteSubtask;
                  deleteTask(id, e, deleteMethod, currentUser);
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
      {
        taskChildren?.length !== 0 ? <SubtaskList list={taskChildren} show={showChildren} /> : null
      }
      <TaskDetailsModal
        task={task}
        display={isDetailVis}
        setDisplay={setIsDetailVis}
      ></TaskDetailsModal>
    </>
  );
}
