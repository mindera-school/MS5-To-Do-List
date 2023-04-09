import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useAppContext, useTaskListContext } from "../../context";
import AccountMenuContainer from "../AccountMenus/MenuContainer";
import Overlay from "../Overlay";
import SearchBar from "../SearchBar";
import { AccountMenuBtn, LeftDummy, StyledHeader } from "./styled-component";

export default function Header() {
  const [rightTabVisible, setRightTabVisible] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const tasksList = useTaskListContext();
  const theme = useAppContext().themeMode;

  useEffect(() => {
    search(inputValue, tasksList);
  }, [inputValue]);

  const rightSideHandler = () => {
    setRightTabVisible(rightTabVisible ? false : true);
    setIsOverlayVisible(isOverlayVisible ? false : true);
  };

  const overlayClickHandler = () => {
    setRightTabVisible(false);
    setIsOverlayVisible(false);
  };

  return (
    <StyledHeader theme={theme}>
      <LeftDummy></LeftDummy>
      <SearchBar theme={theme} inputValue={inputValue} setInputValue={setInputValue} />
      <AccountMenuContainer
        theme={theme}
        rightSideHandler={rightSideHandler}
        rightTabVisible={rightTabVisible}
      />
      <AccountMenuBtn onClick={rightSideHandler} theme={theme}>
        <FaRegUser size={20} />
      </AccountMenuBtn>
      <Overlay handler={overlayClickHandler} display={isOverlayVisible} />
    </StyledHeader>
  );
}

function search(inputValue, tasksList) {
  if (inputValue === "") {
    tasksList.setDisplayedTaskList(tasksList.list);
  }
  tasksList.setDisplayedTaskList(
    tasksList.list.filter((task) =>
      task.title.toLowerCase().includes(inputValue.toLowerCase())
    )
  );
}
