import React, { useEffect } from "react";
import CreateTasksContainer from "./components/AddTasks/CreateTasksContainer";
import Header from "./components/Header";
import LeftMenu from "./components/LeftMenu";
import TaskList from "./components/TaskList";
import {
  AppContext,
  TaskListContext,
  useCreateAppContext,
  useCreateTaskListContext,
} from "./context";
import taskFetcher from "./fetchers/fetchTasks";
import { CentralDiv, GlobalStyle, LateralDiv, Main } from "./GlobalStyles";

export default function App() {
  const tasksListContext = useCreateTaskListContext();
  const appContext = useCreateAppContext();
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
          <Header tasksList={tasksListContext} />
          <Main>
            <LateralDiv>
              <LeftMenu />
            </LateralDiv>
            <CentralDiv>
              <CreateTasksContainer />
              <TaskList />
            </CentralDiv>
            <LateralDiv />
          </Main>
        </TaskListContext.Provider>
      </AppContext.Provider>
    </>
  );
}
