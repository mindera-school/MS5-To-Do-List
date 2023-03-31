import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskDetailsModal from "./components/TaskDetailsModal";
import TaskList from "./components/TaskList";
import {
  AppContext,
  TaskListContext,
  useCreateAppContext,
  useCreateTaskListContext,
} from "./context";
import taskFetcher from "./fetchers/fetchTasks";
import CreateTasksContainer from "./components/CreateTasksContainer";
import { GlobalStyle, Main } from "./GlobalStyles";

export default function App() {
  const tasksListContext = useCreateTaskListContext();
  const appContext = useCreateAppContext();
  const currentUser = appContext.currentUser;


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
    tasksListContext.setDisplayedTaskList(tasksListContext.list);
  }, [tasksListContext.list]);

  return (
    <>
      <AppContext.Provider value={appContext}>
        <TaskListContext.Provider value={tasksListContext}>
          <GlobalStyle />
          <Header
            tasksList={tasksListContext}
          />
          <Main>
            <CreateTasksContainer />
            <TaskList />
          </Main>
        </TaskListContext.Provider>
      </AppContext.Provider>
    </>
  );
}
