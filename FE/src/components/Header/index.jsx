import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import AccountMenuContainer from "../AccountMenus/MenuContainer";
import Overlay from "../Overlay";
import SearchBar from "../SearchBar";
import { AccountMenuBtn, StyledHeader } from "./styled-component";
import { useTaskListContext } from "../../context";


export default function Header({
  setDisplayedTaskList,
  displayedTaskList,
  tasksList,
}) {
  const [leftTabVisible, setLeftTabVisible] = useState(false);
  const [rightTabVisible, setRightTabVisible] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    search(setDisplayedTaskList, inputValue, tasksList);
  }, [inputValue]);

  const rightSideHandler = () => {
    setRightTabVisible(!rightTabVisible);
    setIsOverlayVisible(!isOverlayVisible);
  };

  const overlayClickHandler = () => {
    setLeftTabVisible(false);
    setRightTabVisible(false);
    setIsOverlayVisible(false);
  };

  return (
    <StyledHeader>
      <div></div>
      <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
      <AccountMenuContainer rightSideHandler={rightSideHandler} rightTabVisible={rightTabVisible} />
      <AccountMenuBtn onClick={rightSideHandler}>
        <FaRegUser size={20} />
      </AccountMenuBtn>
      <Overlay handler={overlayClickHandler} display={isOverlayVisible} />
    </StyledHeader>
  );
}

function search(setDisplayedTaskList, inputValue, tasksList) {
  if (inputValue === "") {
    setDisplayedTaskList(tasksList);
  }
  setDisplayedTaskList(
    tasksList.filter((task) =>
      task.title.toLowerCase().includes(inputValue.toLowerCase())
    )
  );
}
