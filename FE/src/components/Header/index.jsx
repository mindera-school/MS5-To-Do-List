import React, { useState, useEffect } from "react";
import AccountMenuContainer from "../AccountMenus/MenuContainer";
import Button from "../Button";
import Drawer from "../Drawer";
import Overlay from "../Overlay";
import { StyledHeader } from "./styled-component";
import SearchBar from "../SearchBar";


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

  const leftSideHandler = () => {
    setLeftTabVisible(!leftTabVisible);
    setIsOverlayVisible(!isOverlayVisible);
  };

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
      <Button displayed={"left"} handler={leftSideHandler} />
      <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
      <AccountMenuContainer rightSideHandler={rightSideHandler} rightTabVisible={rightTabVisible} />
      <Button displayed={"right"} handler={rightSideHandler} />
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
