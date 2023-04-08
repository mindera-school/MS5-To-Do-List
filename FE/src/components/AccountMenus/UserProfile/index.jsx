import Switch from "@mui/material/Switch";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAppContext, useTaskListContext } from "../../../context.js";
import { ThemeSwitchHolder, UserImg } from "../LoginMenu/styled-components";
import { StatsHolder, UserProfileContainer, VerticalLine } from "./styles.js";


function getUserImage(image) {
  return image === null ? (
    <FaRegUser size="80px" />
  ) : (
    <img src={image} alt="User chosen profile" />
  );
}

const getCurrentMode = (theme) => {
  return theme.primaryColor === "white" ? false : true;
};

export const UserProfile = () => {
  const taskList = useTaskListContext().list;
  const currentUser = useAppContext().currentUser;
  const setUser = useAppContext().setCurrentUser;
  const setMenuType = useAppContext().setMenuType;
  const theme = useAppContext().themeMode;
  const setTheme = useAppContext().setTheme;
  const [darkMode, setDarkMode] = useState(getCurrentMode(theme));


  useEffect(() => {
    darkMode ? setTheme("darkMode") : setTheme("lightMode");
  }, [darkMode]);
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
        <UserImg theme={theme}>{getUserImage(currentUser.profileImage)}</UserImg>
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
        <ThemeSwitchHolder theme={theme}>
          <label>Dark Mode</label>
          <Switch value={darkMode} onChange={() => setDarkMode(darkMode ? false : true)}></Switch>
        </ThemeSwitchHolder>
      </UserProfileContainer>
    </>
  );
};
