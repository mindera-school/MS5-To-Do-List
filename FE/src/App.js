import React, { useEffect, useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import taskFetcher from "./fetchers/fetchTasks";

function App() {
  const [tasksList, setTasksList] = useState([]);

  //Fills the tasks state list. In the future the fetch url will be coming from the user object.
  //The rest of the structure is built down from here fully autonomously to fetch the tasks
  useEffect(() => {
    taskFetcher(1).then((res) => setTasksList(res));
  }, []);

  return (
    <>
      <Header />
      <TaskList tasksList={tasksList} />
    </>
  );
}

export default App;
