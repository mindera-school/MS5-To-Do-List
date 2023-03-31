import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import AccountMenuContainer from "../AccountMenus/MenuContainer";
import Overlay from "../Overlay";
import SearchBar from "../SearchBar";
import { useTaskListContext } from "../../context";
import { AccountMenuBtn, LeftDummy, StyledHeader } from "./styled-component";

export default function Header() {
  const [rightTabVisible, setRightTabVisible] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const tasksList = useTaskListContext();

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
    <StyledHeader>
      <LeftDummy></LeftDummy>
      <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
      <AccountMenuContainer
        rightSideHandler={rightSideHandler}
        rightTabVisible={rightTabVisible}
      />
      <AccountMenuBtn onClick={rightSideHandler}>
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
