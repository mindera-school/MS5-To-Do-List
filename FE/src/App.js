import React, { useEffect } from "react";
import {
  AppContext,
  TaskListContext,
  useCreateAppContext,
  useCreateTaskListContext
} from "./context";
import taskFetcher from "./fetchers/fetchTasks";
import { GlobalStyle } from "./GlobalStyles";
import Home from "./pages/Home.jsx";

export default function App() {
  const appContext = useCreateAppContext();
  const tasksListContext = useCreateTaskListContext(appContext);
  const currentUser = appContext.currentUser;
  const theme = appContext.themeMode || { primaryColor: "white" };

  //The rest of the structure is built down from here fully autonomously to fetch the tasks
  useEffect(() => {
    if (currentUser === null) {
      if (JSON.parse(localStorage.getItem("taskList")) === null) {
        localStorage.setItem("taskList", JSON.stringify([]));
      }
      if (JSON.parse(localStorage.getItem("subTasks")) === null) {
        localStorage.setItem("subTasks", JSON.stringify([]));
      }
      tasksListContext.setTaskList(
        JSON.parse(localStorage.getItem("taskList"))
      );
      tasksListContext.setSubTaskList(
        JSON.parse(localStorage.getItem("subTasks"))
      );
      return;
    }

    taskFetcher(currentUser.userId).then((res) =>
      tasksListContext.setTaskList(res)
    );
    //maybe we should add the tasks to the displayed tasklist. Then the backend would be called to confirm and fill the original task list with the new task
  }, [currentUser]);

  useEffect(() => {
    const organizedList = [...tasksListContext.list]?.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) {
        return -1;
      }
      if (!a.isFavorite && b.isFavorite) {
        return 1;
      }
      return 0;
    });
    tasksListContext?.setDisplayedTaskList(organizedList);
    if (currentUser === null) {
      localStorage.setItem("taskList", JSON.stringify(tasksListContext.list));
      localStorage.setItem(
        "subTasks",
        JSON.stringify(tasksListContext.subtasksList)
      );
    }
  }, [tasksListContext.list]);

  return (
    <>
      <AppContext.Provider value={appContext}>
        <TaskListContext.Provider value={tasksListContext}>
          <GlobalStyle theme={theme} />
          <Home taskListContext={tasksListContext} theme={theme}></Home>
        </TaskListContext.Provider>
      </AppContext.Provider>
    </>
  );
}
