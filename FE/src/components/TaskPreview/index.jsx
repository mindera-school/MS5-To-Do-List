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
import {
  AppContext,
  TaskListContext,
  useAppContext,
  useTaskListContext
} from "../../context.js";
import Popconfirm from "../Popconfirm/index.jsx";
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
  SubtasksBtns,
  TaskDetailsBtn,
  VerticalLine
} from "./styled-components";
import SubtaskList from "./SubtaskList";

const deleteTask = (id, deleteTaskContext, currentUser, parentId) => {
  if (currentUser !== null) {
    try {
      fetch(`http://localhost:8086/todo/tasks/v1/delete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      }).then((r) => {
        if (r.ok) {
          if (parentId !== null) {
            deleteTaskContext(parentId, id);
          }
          deleteTaskContext(id);
        } else {
          console.log("Couldn't connect!");
        }
      });
    } catch (exception) {
      console.error("Unable to delete");
    }
  } else {
    if (parentId !== null) {
      deleteTaskContext(parentId, id);
    }
    deleteTaskContext(id);
  }
};

//TaskPreview template that will be generated for each task through the TaskList component
export default function TaskPreview({
  id,
  tags,
  title,
  dueDate,
  isDone,
  isFavorite,
  fullTaskURL,
  dragger,
  parentId,
  isParent,
}) {
  const [isThisFav, setIsThisFav] = useState(isFavorite);
  const [isDetailVis, setIsDetailVis] = useState(false);
  const [task, setTask] = useState({});
  const deleteTaskFromContext =
    useContext(TaskListContext).deleteTaskFromContext;
  const currentUser = useContext(AppContext).currentUser;
  const setIsDone = useContext(TaskListContext).setTaskDoneState;
  const deleteSubtask = useContext(TaskListContext).deleteSubtask;
  const addSubstaskList = useContext(TaskListContext).addSubtasksList;
  const isDragging = useRef(null);
  const [borderColor, setBorderColor] = useState("none");
  const [padding, setPadding] = useState(false);
  const localChildren = useContext(TaskListContext).getChildrenById(id);
  const [taskChildren, setTaskChildren] = useState();
  const [showChildren, setShowChildren] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [sureToDeleteDisplay, setSureToDeleteDisplay] = useState("none");
  const [deleteVerification, setDeleteVerification] = useState(null);
  const returnTaskById = useContext(TaskListContext).getGuestTaskbyId;
  const returnSubtaskById = useContext(TaskListContext).getGuestSubtaskbyId;
  const tasksList = useTaskListContext();
  const theme = useAppContext().themeMode;

  useEffect(() => {
    if (currentUser === null) {
      setTaskChildren(localChildren);
    } else {
      fetch(`http://localhost:8086/todo/tasks/v1/${id}`)
        .then((r) => r.json())
        .then((r) =>
          setTaskChildren({
            id,
            subtasks: r,
          })
        );
    }
    if (taskChildren === undefined) {
      return;
    }
  }, [currentUser, localChildren]);

  useEffect(() => {
    if (!isDetailVis) {
      setTask({});
      return;
    }

    if (currentUser !== null) {
      fetch(fullTaskURL)
        .then((r) => r.json())
        .then((r) => setTask(r));
    } else {
      parentId === null
        ? setTask(returnTaskById(id))
        : setTask(returnSubtaskById(id));
    }
  }, [isDetailVis, fullTaskURL, id]);

  useEffect(() => {
    tasksList.setTaskList(
      tasksList.list.map((task) => {
        if (task.taskId === id) {
          task.isFavorite = isThisFav;
        }
        return task;
      })
    );
  }, [isThisFav]);

  useEffect(() => {
    setPadding("3px 15px");
  }, []);

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
  }, [dueDate, isDone]);

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

  const handleStart = useCallback((event) => {
    if (event?.srcElement?.toString() === "[object HTMLButtonElement]" || event?.srcElement?.toString() === "[object HTMLInputElement]") {
      return;
    }

    if (event.target.toString() === "[object HTMLDivElement]") {
      isDragging.current = false;
    }

    if (
      event.target.toString() === "[object SVGPathElement]" ||
      event.target.toString() === "[object SVGSVGElement]"
    ) {
      isDragging.current = true;
      return;
    }
  }, []);

  const handleStop = useCallback(
    (event, info) => {
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
    },
    [currentUser, deleteTaskFromContext, id, setIsDone]
  );

  const handleDrag = useCallback(() => {
    isDragging.current = true;
  }, []);

  useEffect(() => {
    if (isParent === false) {
      return;
    }
    if (currentUser !== null) {
      fetch(`http://localhost:8086/todo/tasks/v1/${id}`)
        .then((r) => r.json())
        .then((r) =>
          addSubstaskList({
            id,
            subtasks: r,
          })
        );
    } else {
      addSubstaskList({
        id,
        subtasks: [],
      });
    }
  }, [id, isParent]);

  const getChevron = () => {
    if (isParent && taskChildren?.subtasks?.length >= 1) {
      return (
        <SubtasksBtns
          show={showChildren}
          onTouchStart={() => setShowChildren(showChildren ? false : true)}
          onClick={() => setShowChildren(showChildren ? false : true)}
        >
          <FiChevronDown size={25} />
        </SubtasksBtns>
      );
    }
  };

  useEffect(() => {
    if (deleteVerification === true) {
      const deleteMethod =
        parentId === null ? deleteTaskFromContext : deleteSubtask;
      deleteTask(id, deleteMethod, currentUser, parentId);
      setDeleteVerification(null);
    } else if (deleteVerification === false) {
      setSureToDeleteDisplay("none");
      setDeleteVerification(null);
    }
  }, [deleteVerification]); const timedDetailOpen = (e, enough) => {
    if (window.innerWidth > 1080 || enough === false) {
      return;
    }
    setIsDetailVis(true);
  };

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
        <div
          className="handle"
          onDoubleClick={() => {
            setIsDetailVis(true);
            setIsEditing(true);
          }}
        >
          <StyledTaskPreview
            theme={theme}
            isParent={isParent}
            border={borderColor}
            padding={padding}
          >
            <StyledFavHeart
              theme={theme}
              isFilled={isThisFav}
              onClick={() => setIsThisFav(isThisFav ? false : true)}
            ></StyledFavHeart>
            <div>
              <NameAndDone theme={theme}>
                <input
                  maxLength={12}
                  onChange={() => {
                    setIsDone(id, isDone ? false : true);
                    checkColor();
                  }}
                  type="checkbox"
                  checked={isDone}
                />
                <h3>{title}</h3>
              </NameAndDone>
              <TaskTagsList theme={theme} id={id}></TaskTagsList>
            </div>
            <ExtendDiv></ExtendDiv>
            <DateContainer theme={theme}>
              <AiOutlineCalendar size={20} />
              <h4>{dueDate}</h4>
            </DateContainer>
            {getChevron()}
            <DraggerContainer theme={theme} isDragDisabled={true}>
              {dragger}
            </DraggerContainer>
            <VerticalLine theme={theme}></VerticalLine>
            <EdgeButtonsContainer>
              <DeleteBtn
                theme={theme}
                onClick={(e) => {
                  setSureToDeleteDisplay("block");
                }}
              >
                <SlClose size={20} />
              </DeleteBtn>
              <Popconfirm
                message="Delete task?"
                display={sureToDeleteDisplay}
                right="50px"
                top="65%"
                setVerification={setDeleteVerification}
              ></Popconfirm>
              <TaskDetailsBtn
                theme={theme}
                onClick={() => setIsDetailVis(true)}
              >
                <MdOpenInFull size={20} color="black" />
              </TaskDetailsBtn>
            </EdgeButtonsContainer>
          </StyledTaskPreview>
        </div>
      </Draggable>
      <SubtaskList list={taskChildren?.subtasks} show={showChildren} />
      <TaskDetailsModal
        id={id}
        task={task}
        tags={tags}
        c={setTask}
        display={isDetailVis}
        setDisplay={setIsDetailVis}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      ></TaskDetailsModal>
    </>
  );
}
