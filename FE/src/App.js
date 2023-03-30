import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
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

export default function App() {
  const tasksListContext = useCreateTaskListContext();
  const [displayedTaskList, setDisplayedTaskList] = useState([]);
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
    setDisplayedTaskList(tasksListContext.list);
  }, [tasksListContext.list]);

  return (
    <>
      <AppContext.Provider value={appContext}>
        <TaskListContext.Provider value={tasksListContext}>
          <GlobalStyle />
          <Header
            setDisplayedTaskList={setDisplayedTaskList}
            tasksList={tasksListContext}
          />
          <Main>
            <CreateTasksContainer />
            <TaskList tasksList={displayedTaskList} />
          </Main>
        </TaskListContext.Provider>
      </AppContext.Provider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`

  body {
    background-color: #13293D;
    margin: 0;
    overflow: hidden;
  }

  #root { 
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: auto;
  flex: 1;
`;
