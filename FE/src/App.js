import React, { useEffect } from "react";
import CreateTasksContainer from "./components/AddTasks/CreateTasksContainer";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import LeftMenu from "./components/LeftMenu";
import {
  AppContext,
  TaskListContext,
  useCreateAppContext,
  useCreateTaskListContext,
} from "./context";
import taskFetcher from "./fetchers/fetchTasks";
import { GlobalStyle, Main, CentralDiv, LateralDiv } from "./GlobalStyles";

export default function App() {
  const tasksListContext = useCreateTaskListContext();
  const appContext = useCreateAppContext();
  const currentUser = appContext.currentUser;

  //The rest of the structure is built down from here fully autonomously to fetch the tasks
  useEffect(() => {
    if (currentUser === null) {
      tasksListContext.setTaskList(JSON.parse(localStorage.getItem("taskList")));
      console.log(tasksListContext.list);
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
    if (currentUser === null) {
      localStorage.setItem("taskList", JSON.stringify(tasksListContext.list));
    }
  }, [tasksListContext.list]);
  return (
    <>
      <AppContext.Provider value={appContext}>
        <TaskListContext.Provider value={tasksListContext}>
          <GlobalStyle />
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
