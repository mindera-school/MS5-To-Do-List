import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { AppContext, useCreateAppContext, useCreateTaskListContext } from "./context";
import taskFetcher from "./fetchers/fetchTasks";

export default function App() {
  const [tasksList, setTasksList] = useState([]);
  const [displayedTaskList, setDisplayedTaskList] = useState([]);
  const appContext = useCreateAppContext();
  const taskTest = useCreateTaskListContext();

  //Fills the tasks state list. In the future the fetch url will be coming from the user object.
  //The rest of the structure is built down from here fully autonomously to fetch the tasks
  useEffect(() => {
    taskFetcher(1).then((res) => setTasksList(res));
  }, []);

  useEffect(() => {
    setDisplayedTaskList(tasksList);
  }, [tasksList]);

  console.log(taskTest);

  return (
    <>
      <AppContext.Provider value={appContext}>
        <GlobalStyle />
        <Header
          displayedTaskList={displayedTaskList}
          setDisplayedTaskList={setDisplayedTaskList}
          tasksList={tasksList}
        />
        <Main>
          <TaskList tasksList={displayedTaskList} />
        </Main>
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
  justify-content: center;
  width: 100%;
  overflow: auto;
  flex: 1;
`;
