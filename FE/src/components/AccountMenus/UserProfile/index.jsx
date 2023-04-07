import React, { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAppContext, useTaskListContext } from "../../../context.js";
import { UserImg } from "../LoginMenu/styled-components";
import { StatsHolder, UserProfileContainer, VerticalLine } from "./styles.js";

function getUserImage(image) {
  return image === null ? (
    <FaRegUser size="80px" />
  ) : (
    <img src={image} alt="User chosen profile" />
  );
}

export const UserProfile = () => {
  const taskList = useTaskListContext().list;
  const currentUser = useAppContext().currentUser;
  const setUser = useAppContext().setCurrentUser;
  const setMenuType = useAppContext().setMenuType;
  const [tasksDone, setTasksDone] = useState(0);
  const [tasksIsNotDone, setTasksIsNotDone] = useState(0);

  useEffect(() => {
    if (taskList.length !== 0) {
      setTasksDone(taskList.filter((task) => task.isDone).length);
      setTasksIsNotDone(taskList.length);
      return;
    }
    setTasksDone(0);
    setTasksIsNotDone(0);
  }, [taskList]);

  return (
    <>
      <UserProfileContainer>
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          <FiLogOut size={30} />
        </button>
        <UserImg>{getUserImage(currentUser.profileImage)}</UserImg>
        <h3>{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
        <StatsHolder>
          <div>
            <h3>Tasks:</h3>
            <h4>{tasksIsNotDone}</h4>
          </div>
          <VerticalLine />
          <div>
            <h3>Completed:</h3>
            <h4>{tasksDone}</h4>
          </div>
        </StatsHolder>
      </UserProfileContainer>
    </>
  );
};
