import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import taskFetcher from "./fetchers/fetchTasks";

function App() {
  const [tasksList, setTasksList] = useState([]);

  //Fills the tasks state list. In the future the fetch url will be coming from the user object.
  //The rest of the structure is built down from here fully autonomasly to fetch the tasks
  useEffect(() => {
   setTasksList(taskFetcher());
  },[]);

  return <>
    <TaskList tasksList={tasksList}></TaskList>
  </>;
}

export default App;
