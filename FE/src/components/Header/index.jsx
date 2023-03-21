import React from "react";
import { useState } from "react";
import { StyledHeader } from "./styled-component";
import Button from "../Button";
import Drawer from "../Drawer";
import Overlay from "../Overlay";

export default function Header() {
  const [leftTabVisible, setLeftTabVisible] = useState(false);
  const [rightTabVisible, setRightTabVisible] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

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
      <Drawer tab={"left"} display={leftTabVisible} handler={leftSideHandler} />
      <p>Future SearchBar</p>
      <Drawer
        tab={"right"}
        side="0"
        display={rightTabVisible}
        handler={rightSideHandler}
      />
      <Button displayed={"right"} handler={rightSideHandler} />
      <Overlay handler={overlayClickHandler} display={isOverlayVisible} />
    </StyledHeader>
  );
}
