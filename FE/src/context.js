import { createContext, useCallback, useContext, useState } from "react";
import { accountMenuMap } from "./configs/accountMenu.jsx";

export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const mockUser = {
  userId: 1,
  profileImage: null,
  firstName: "Adan",
  lastName: "Oliveira",
  username: "gorillaz",
  email: "adank69@gmail.com",
  tasksPreviewsURL: "https://todo/tasks/user/1",
};

export const useCreateAppContext = () => {
  const [appState, setAppState] = useState({
    menuType: "login",
    currentUser: null,
  });

  const setMenuType = useCallback((type) => {
    setAppState((oldState) => ({
      ...oldState,
      menuType: type,
    }));
  }, []);

  const setCurrentUser = useCallback((user) => {
    setAppState((oldState) => ({
      ...oldState,
      currentUser: user,
      menuType: user ? accountMenuMap.logged.key : accountMenuMap.login.key,
    }));
  }, []);

  return {
    ...appState,
    setMenuType,
    setCurrentUser,
  };
};

//context for the users list of tasks
export const TaskListContext = createContext({});

export const useTaskListContext = () => useContext(TaskListContext);

export const useCreateTaskListContext = () => {
  const [taskListState, setTaskListState] = useState({
    list: [],
    displayedList: [],
  });

  const setTaskList = useCallback((newList) => {
    setTaskListState((oldState) => ({
      ...oldState,
      list: newList,
    }));
  });

  const deleteTaskFromContext = useCallback((taskId) => {
    const updatedList = taskListState.list.filter(e => e.taskId !== taskId);
    setTaskListState((oldState) => ({
      ...oldState,
      list: updatedList,
    }));
  });

  const setDisplayedTaskList = useCallback((newDisplayedList) => {
    setTaskListState((oldState) => ({
      ...oldState,
      displayedList: newDisplayedList,
    }));
  });

  const updateTask = useCallback((id, updatedTask) => {
    const newList = taskListState.list.map(e => {
      console.log(id, e.taskId);
      if (e.taskId === id) {
        return {
          ...e,
          ...updatedTask
        };
      }
      return e;
    });

    setTaskListState((oldState) => ({
      ...oldState,
      list: newList
    }));
  });

  const setTaskDoneState = useCallback((id, state) => {
    const newList = taskListState.list.map(e => {
      if (e.taskId === id) {
        return {
          ...e,
          isDone: state
        };
      }
      return e;
    });

    setTaskListState((oldState) => ({
      ...oldState,
      list: newList
    }));
  });

  return {
    ...taskListState,
    setTaskList,
    deleteTaskFromContext,
    setDisplayedTaskList,
    setTaskDoneState,
    updateTask
  };
};
