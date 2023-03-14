import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskPreview from "./components/TaskPreview";

function App() {
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    fetch("https://todo/tasks")
      .then(response => response.json())
      .then(response => setTasksList(response));
  },[]);

  return <>
    <TaskList tasksList={tasksList}></TaskList>
  </>;
}

export default App;
