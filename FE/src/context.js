import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { accountMenuMap } from "./configs/accountMenu.jsx";
import { themesMap } from "./configs/themes";

export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export const useCreateAppContext = () => {
  const [appState, setAppState] = useState({
    menuType: "login",
    currentUser: null,
    themeMode: themesMap["lightMode"],
  });

  const setTheme = useCallback((theme) => {
    setAppState((oldState) => ({
      ...oldState,
      themeMode: themesMap[theme],
    }));
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user === null) return;

    if (user.expireTime < Date.now()) {
      localStorage.setItem("user", null);
      return;
    }

    setAppState({ menuType: "logged", currentUser: user });
  }, []);

  const setMenuType = useCallback((type) => {
    setAppState((oldState) => ({
      ...oldState,
      menuType: type,
    }));
  }, []);

  const setCurrentUser = useCallback((user) => {
    localStorage.setItem(
      "user",
      user === null
        ? null
        : JSON.stringify({ ...user, expireTime: Date.now() + 172800000 })
    );
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
    setTheme,
  };
};

//context for the users list of tasks
export const TaskListContext = createContext({});

export const useTaskListContext = () => useContext(TaskListContext);

export const useCreateTaskListContext = (appContext) => {
  const { currentUser } = appContext;

  const [taskListState, setTaskListState] = useState({
    list: [],
    displayedList: [],
    subtasksList: [],
  });

  const getTagsbyId = useCallback((givenId) => {
    const task = taskListState.list.find((e) => e.taskId === givenId);
    return task.tags;
  });

  const getGuestTaskbyId = useCallback((givenId) => {
    return taskListState.list.find((e) => {
      return e.taskId === givenId;
    });
  });

  const getGuestSubtaskbyId = useCallback((givenId) => {
    for (let i = 0; i < taskListState.subtasksList.length; i++) {
      for (let j = 0; j < taskListState.subtasksList[i].subtasks.length; j++) {
        if (taskListState.subtasksList[i].subtasks[j].taskId === givenId) {
          return taskListState.subtasksList[i].subtasks[j];
        }
      }
    }
  });

  const getChildrenById = useCallback((parentId) => {
    return taskListState.subtasksList.find((e) => e.id === parentId);
  });

  const addChildrenToTask = useCallback((parentId, children) => {
    const updatedList = taskListState.subtasksList.map((e) => {
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
            },
          ],
        };
      }
      return e;
    });

    setTaskListState((oldState) => ({
      ...oldState,
      subtasksList: updatedList,
    }));
  });

  const addSubtasksList = useCallback((newList) => {
    const tempArray = [...taskListState.subtasksList, newList];
    setTaskListState((oldState) => ({
      ...oldState,
      subtasksList: tempArray,
    }));
  });

  const deleteSubtask = useCallback((parentId, givenId) => {
    let parentTask = taskListState.subtasksList.find((e) => e.id === parentId);

    if (parentTask === undefined) {
      return;
    }

    parentTask = {
      id: parentId,
      subtasks: parentTask.subtasks.filter((e) => e.taskId !== givenId),
    };

    const updatedList = taskListState.subtasksList.map((e) => {
      if (e.id === parentId) {
        return parentTask;
      }
      return e;
    });

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
    const updatedList = taskListState.list.filter((e) => e.taskId !== taskId);
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

  const setSubTaskList = useCallback((newSubTaskList) => {
    setTaskListState((oldState) => ({
      ...oldState,
      subtasksList: newSubTaskList,
    }));
  });

  const updateTask = useCallback((id, updatedTask) => {
    const newList = taskListState.list.map((e) => {
      if (e.taskId === id) {
        return {
          ...e,
          ...updatedTask,
        };
      }
      return e;
    });

    setTaskListState((oldState) => ({
      ...oldState,
      list: newList,
    }));
  });

  const setTaskDoneState = useCallback((id, state) => {
    const newList = taskListState.list.map((e) => {
      if (e.taskId === id) {
        return {
          ...e,
          isDone: state,
        };
      }
      return e;
    });

    setTaskListState((oldState) => ({
      ...oldState,
      list: newList,
    }));
  });

  useEffect(() => {
    if (currentUser === null) {
      localStorage.setItem("subTasks", JSON.stringify(taskListState.subtasksList));
    }
  }, [taskListState.subtasksList, currentUser]);

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
    setSubTaskList,
    getGuestSubtaskbyId,
    getTagsbyId,
  };
};
