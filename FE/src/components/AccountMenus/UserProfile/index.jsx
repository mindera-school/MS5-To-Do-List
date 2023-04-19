import Switch from "@mui/material/Switch";
import React, { useEffect, useState } from "react";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAppContext, useTaskListContext } from "../../../context.js";
import { ThemeSwitchHolder, UserImg } from "../LoginMenu/styled-components";
import Popconfirm from "../../Popconfirm/index.jsx";
import { StatsHolder, UserProfileContainer, VerticalLine } from "./styles.js";

function getUserImage(image) {
  return image === null ? (
    <FaRegUser size="80px" />
  ) : (
    <img src={image} alt="User chosen profile" />
  );
}

const getCurrentMode = (theme) => {
  if (theme === undefined) {
    return false;
  }
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
  const [sureToLogOutDisplay, setSureToLogOutDisplay] = useState("none");
  const [logOutVerification, setLogOutVerification] = useState();

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

  useEffect(() => {
    if (logOutVerification === true) {
      setUser(null);
      setLogOutVerification(null);
    } else if (logOutVerification === false) {
      setSureToLogOutDisplay("none");
      setLogOutVerification(null);
    }
  }, [logOutVerification]);

  return (
    <>
      <UserProfileContainer>
        <button
          onClick={() => {
            setSureToLogOutDisplay("flex");
          }}
        >
          <FiLogOut size={30} />
        </button>
        <Popconfirm
          message="Log out?"
          display={sureToLogOutDisplay}
          right="18px"
          top="52px"
          setVerification={setLogOutVerification}
        ></Popconfirm>
        <UserImg theme={theme}>
          {getUserImage(currentUser.profileImage)}
        </UserImg>
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
          {darkMode ? (
            <label>
              Dark Mode
              <BsFillMoonFill />
            </label>
          ) : (
            <label>
              <BsSunFill />
              Light Mode
            </label>
          )}
          <Switch
            value={darkMode}
            onChange={() => setDarkMode(darkMode ? false : true)}
          ></Switch>
        </ThemeSwitchHolder>
      </UserProfileContainer>
    </>
  );
};
