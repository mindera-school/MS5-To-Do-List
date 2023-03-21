import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import taskFetcher from "./fetchers/fetchTasks";

function App() {
  const [tasksList, setTasksList] = useState([]);
  const [displayedTaskList, setDisplayedTaskList] = useState([]);

  //Fills the tasks state list. In the future the fetch url will be coming from the user object.
  //The rest of the structure is built down from here fully autonomously to fetch the tasks
  useEffect(() => {
    taskFetcher(1).then((res) => setTasksList(res));
  }, []);

  useEffect(() => {
    setDisplayedTaskList(tasksList);
  },[tasksList]);
  return (
    <>
      <Header
        displayedTaskList={displayedTaskList}
        setDisplayedTaskList={setDisplayedTaskList}
        tasksList={tasksList}
      />
      <TaskList tasksList={displayedTaskList} />
    </>
  );
}
export default App;
