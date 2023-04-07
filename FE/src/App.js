import React, { useEffect } from "react";
import CreateTasksContainer from "./components/AddTasks/CreateTasksContainer";
import Header from "./components/Header";
import LeftMenu from "./components/LeftMenu";
import TaskList from "./components/TaskList";
import {
  AppContext,
  TaskListContext, useAppContext, useCreateAppContext,
  useCreateTaskListContext
} from "./context";
import taskFetcher from "./fetchers/fetchTasks";
import { CentralDiv, GlobalStyle, LateralDiv, Main } from "./GlobalStyles";

export default function App() {
  const tasksListContext = useCreateTaskListContext();
  const appContext = useCreateAppContext();
  const currentUser = appContext.currentUser;
  const currentContext = useAppContext();

  //The rest of the structure is built down from here fully autonomously to fetch the tasks
  useEffect(() => {
    if (currentUser === null) {
      tasksListContext.setTaskList([]);
      return;
    }
    taskFetcher(currentUser.userId).then((res) =>
      tasksListContext.setTaskList(res)
    );
    //maybe we should add the tasks to the displayed tasklist. Then the backend would be called to confirm and fill the original task list with the new task
  }, [currentUser]);

  useEffect(() => {
    const organizedList = [...tasksListContext.list].sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) {
        return -1;
      }
      if (!a.isFavorite && b.isFavorite) {
        return 1;
      }
      return 0;
    });
    tasksListContext.setDisplayedTaskList(organizedList);
  }, [tasksListContext.list]);
  return (
    <>
      <AppContext.Provider value={appContext}>
        <TaskListContext.Provider value={tasksListContext}>
          <GlobalStyle theme={appContext.themeMode} />
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
