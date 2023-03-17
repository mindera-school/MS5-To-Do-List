import React from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CloseButton, StyledDrawer } from "./styled-components";



export default function Drawer({ side, display, handler, tab }) {
  return (
    <>
      <StyledDrawer right={side} display={display}>
        <CloseButton onClick={handler}> {side === "0" ? <MdOutlineKeyboardArrowRight /> : <MdOutlineKeyboardArrowLeft />} </CloseButton>
        {tab}
      </StyledDrawer>
    </>
  );
}
