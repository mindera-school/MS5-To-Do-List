import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { AppContext, useCreateAppContext } from "./context";
import taskFetcher from "./fetchers/fetchTasks";


function App() {
  const [tasksList, setTasksList] = useState([]);
  const appContext = useCreateAppContext();

  //Fills the tasks state list. In the future the fetch url will be coming from the user object.
  //The rest of the structure is built down from here fully autonomously to fetch the tasks
  useEffect(() => {
    taskFetcher(1).then((res) => setTasksList(res));
  }, []);

  return (
    <>
      <AppContext.Provider value={appContext}>
        <Header />
      </AppContext.Provider>
    </>
  );
}


export default App;
