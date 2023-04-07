import { createContext, useCallback, useContext, useState } from "react";
import { accountMenuMap } from "./configs/accountMenu.jsx";
import { themesMap } from "./configs/themes";

export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export const useCreateAppContext = () => {
  const [appState, setAppState] = useState({
    menuType: "login",
    currentUser: null,
    themeMode: themesMap["lightMode"]
  });

  const setTheme = useCallback((theme) => {
    setAppState((oldState) => ({
      ...oldState,
      menuType: themesMap[theme],
    }));
  }, []);

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
    setTheme
  };
};

//context for the users list of tasks
export const TaskListContext = createContext({});

export const useTaskListContext = () => useContext(TaskListContext);

export const useCreateTaskListContext = () => {
  const [taskListState, setTaskListState] = useState({
    list: [],
    displayedList: [],
    subtasksList: []
  });

  const getGuestTaskbyId = useCallback((givenId) => {
    return taskListState.list.find(e => e.taskId === givenId);
  });

  const getChildrenById = useCallback((parentId) => {
    return taskListState.subtasksList.find(e => e.id === parentId);
  });

  const addChildrenToTask = useCallback((parentId, children) => {
    const updatedList = taskListState.subtasksList.map(e => {
      if (e.id === parentId) {
        return {
          id: e.id,
          subtasks: [
            ...e.subtasks,
            {
              ...children,
              isFavorite: false,
              isDone: false,
              tags: [],
              expired: false,
            }
          ]
        };
      }
      return e;
    });

    setTaskListState((oldState) => ({
      ...oldState,
      subtasksList: updatedList
    }));
  });

  const addSubtasksList = useCallback((newList) => {
    const tempArray = [...taskListState.subtasksList, newList];
    setTaskListState((oldState) => ({
      ...oldState,
      subtasksList: tempArray
    }));
  });

  const deleteSubtask = useCallback((subtaskId) => {
    const updatedList = taskListState.subtasksList.filter(e => e.taskId !== subtaskId);
    setTaskListState((oldState) => ({
      ...oldState,
      subtasksList: updatedList,
    }));
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
    addSubtasksList,
    deleteTaskFromContext,
    deleteSubtask,
    setDisplayedTaskList,
    getGuestTaskbyId,
    setTaskDoneState,
    updateTask,
    getChildrenById,
    addChildrenToTask,

  };
};
