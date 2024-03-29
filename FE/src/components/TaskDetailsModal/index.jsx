import React, { useEffect, useState } from "react";
import { BiEdit, BiSave } from "react-icons/bi";
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io";
import { useAppContext, useTaskListContext } from "../../context.js";
import TagsContainer from "../TagsList/index.jsx";
import AddCommentForm from "./AddCommentForm";
import CommentBox from "./CommentBox";
import {
  BoxHeader,
  CustomLabel,
  CustomLine,
  DateInput,
  DescriptionContainer,
  HorizontalLine,
  InnerBox,
  InnerHeader,
  InnerTitle,
  OptionTitles,
  OuterBox,
  SaveBtn,
  SubtaskFormBox,
  SubtaskInput,
  TaskDescInput,
  TaskInfo,
  Wrapper
} from "./styles";

export default function TaskDetailsModal({
  task,
  tags,
  setTask,
  display,
  setDisplay,
  isEditing,
  setIsEditing,
}) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [taskComments, setTaskComments] = useState([]);
  const currentUser = useAppContext().currentUser;
  const updateTask = useTaskListContext().updateTask;
  const addChildren = useTaskListContext().addChildrenToTask;
  const [isCreateSubOpen, setIsCreateSubOpen] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [subtaskDate, setSubtaskDate] = useState("");
  const theme = useAppContext().themeMode;
  const tasksListContext = useTaskListContext();
  const [tagsList, setTagsList] = useState(tags);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [date, setDate] = useState(
    task.date === null ? null : task.date?.replaceAll("/", "-")
  );
  const [description, setDescription] = useState(task.description);

  function manageClose() {
    setIsOverlayVisible(isOverlayVisible ? false : true);
    setIsEditing(false);
    setDisplay(false);
  }

  function saveSubtask() {
    if (subtaskTitle === "") {
      return;
    }

    const data = {
      title: subtaskTitle,
      description: "",
      date: subtaskDate === "" ? null : subtaskDate.replaceAll("-", "/"),
      userId: currentUser === null ? null : currentUser.userId,
      parentId: task.taskId,
      //dps colocar aqui a posição no array de subtasks
      position: 0,
    };

    if (currentUser === null) {
      addChildren(task.taskId, {
        ...data,
        taskId: Date.now().toString(36),
      });
      return;
    }

    fetch("http://localhost:8086/todo/tasks/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((r) => r.json())
      .then((r) => {
        addChildren(task.taskId, {
          ...data,
          taskId: r.id,
          fullTaskURL: r.fullTaskURL,
        });
        if (r === undefined) {
          console.log("Couldn't add subtask");
        }
      })
      .catch(console.log("Couldn't connect"));
  }

  useEffect(() => {
    setTagsList(tags);
  }, [tags]);

  useEffect(() => {
    setEditMode(isEditing ? true : false);
  }, [isEditing]);

  const updateTaskComments = (newComment) => {
    const newElement = { description: newComment };
    setTaskComments([...taskComments, newElement]);
  };

  useEffect(() => {
    setTitle(task.title);
    setDate(task.date === null ? null : task.date?.replaceAll("/", "-"));
    setDescription(task.description);
    if (display === true && task.commentsURL !== undefined) {
      fetch(task.commentsURL)
        .then((r) => r.json())
        .then((r) => setTaskComments(r));
    }
  }, [task.commentsURL, display, task]);

  const createDataObj = () => {
    return {
      title: title,
      description: description,
      isDone: task.isDone,
      date: task.date === null ? null : task.date.replaceAll("-", "/"),
      isFavorite: task.isFavorite,
      disabled: false,
    };
  };

  const saveEdition = (data) => {
    fetch(`http://localhost:8086/todo/tasks/v1/${task.taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    }).then(() => {
      setTask({ ...task, tags: tagsList });
      sendTags(tagsList, setTagsList, task);
      tagsList.forEach((tag) => (tag.tagId = tags[tag.tagId]));
      tasksListContext.setTaskList(
        updateTaskList(tasksListContext.list, {
          ...tasksListContext.getGuestTaskbyId(task.taskId),
          tags: tagsList,
        })
      );
    });
  };

  return (
    <>
      <Wrapper onClick={manageClose} display={display}>
        <OuterBox theme={theme} onClick={(e) => e.stopPropagation()}>
          <BoxHeader theme={theme}>
            <button onClick={manageClose}>
              <IoMdClose size={25} />
            </button>
            <button
              onClick={() => {
                if (isEditing) {
                  const updatedTask = createDataObj();
                  const id = task.taskId;
                  task.date = date;
                  if (currentUser !== null) {
                    saveEdition(updatedTask);
                  }
                  tasksListContext.setTaskList(
                    updateTaskList(tasksListContext.list, {
                      ...tasksListContext.getGuestTaskbyId(task.taskId),
                      tags: tagsList,
                    })
                  );
                }
                setIsEditing(isEditing ? false : true);
              }}
            >
              {isEditing ? <BiSave size={25} /> : <BiEdit size={25}></BiEdit>}
            </button>
          </BoxHeader>
          <InnerBox theme={theme}>
            <InnerHeader theme={theme}>
              <InnerTitle
                theme={theme}
                maxLength={12}
                readOnly={isEditing ? false : true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></InnerTitle>
              <OptionTitles theme={theme}>
                <span>Add Sub Task</span>
                <button>
                  <IoIosAddCircleOutline
                    color="white"
                    size={20}
                    onClick={() =>
                      setIsCreateSubOpen(isCreateSubOpen ? false : true)
                    }
                  />
                </button>
              </OptionTitles>
              <SubtaskFormBox theme={theme} opened={isCreateSubOpen}>
                <CustomLabel theme={theme}>
                  <span>Title of Subtask</span>
                  <SubtaskInput
                    maxLength={12}
                    value={subtaskTitle}
                    onChange={(e) => setSubtaskTitle(e.target.value)}
                  ></SubtaskInput>
                </CustomLabel>
                <CustomLabel theme={theme}>
                  <span>Due Date</span>
                  <input
                    type={"date"}
                    value={subtaskDate}
                    onChange={(e) => setSubtaskDate(e.target.value)}
                  ></input>
                </CustomLabel>
                <SaveBtn
                  theme={theme}
                  onClick={() => {
                    setIsCreateSubOpen(false);
                    saveSubtask();
                  }}
                >
                  <BiSave size={25} color={"white"} />
                </SaveBtn>
              </SubtaskFormBox>
            </InnerHeader>
            <TaskInfo theme={theme}>
              <CustomLine theme={theme}>
                <span>Sub Tasks:</span>
                <span>0</span>
              </CustomLine>
              <CustomLine theme={theme}>
                <span>Status:</span>
                <span>{task.isDone ? "Completed" : "Still to do"}</span>
              </CustomLine>
              <CustomLine theme={theme}>
                <span>End Date:</span>
                <DateInput theme={theme} readOnly={isEditing ? false : true}>
                  <input
                    type="date"
                    readOnly={isEditing ? false : true}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  ></input>
                </DateInput>
              </CustomLine>
              <CustomLine theme={theme}>
                <span>Tags:</span>
                <TagsContainer
                  tagsList={tagsList}
                  setTagsList={setTagsList}
                  editMode={editMode}
                  taskId={task.taskId}
                  display={editMode}
                  onDetail={true}
                />
              </CustomLine>
            </TaskInfo>
            <HorizontalLine />
            <DescriptionContainer theme={theme}>
              <h2>Description</h2>
              <TaskDescInput
                theme={theme}
                readOnly={isEditing ? false : true}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></TaskDescInput>
            </DescriptionContainer>
            <HorizontalLine />
            <CommentBox theme={theme} comments={taskComments}></CommentBox>
          </InnerBox>
          <AddCommentForm
            theme={theme}
            taskId={task.taskId}
            updateComments={updateTaskComments}
          ></AddCommentForm>
        </OuterBox>
      </Wrapper>
    </>
  );
}

function sendTags(tags, setTagsList, task) {
  fetch(`http://localhost:8086/todo/tags/v1/${task.taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tags),
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  setTagsList(tags);
}

function updateTaskList(taskList, task) {
  const newList = [...taskList];
  newList[task.position] = task;
  return newList;
}
