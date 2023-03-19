import React, { createContext, useState } from "react";
import Header from "./components/Header";
import { GlobalStyle } from "./globalStyles";


function App() {
  const [tasksList, setTasksList] = useState([]);
  const [accMenuType, setAccMenuType] = useState();
  const AccTypeContext = createContext(null);

  //Fills the tasks state list. In the future the fetch url will be coming from the user object.
  //The rest of the structure is built down from here fully autonomously to fetch the tasks
  /*  useEffect(() => {
     taskFetcher(1).then((res) => setTasksList(res));
   }, []); */


  return (
    <>
      <GlobalStyle />
      <AccTypeContext.Provider value={"teste"}>
        <Header />
      </AccTypeContext.Provider>
    </>
  );
}

export default App;
