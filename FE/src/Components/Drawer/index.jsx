import React from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CloseButton, StyledDrawer } from "./styled-components";



export default function Drawer({ side, display, handler, tab }) {
  return (
    <>
      <StyledDrawer right={side} display={display}>
        <CloseButton onClick={handler}> {side === "0" ? <MdOutlineKeyboardArrowRight size="60px" color="#8D99AE" /> : <MdOutlineKeyboardArrowLeft />} </CloseButton>
        {tab}
      </StyledDrawer>
    </>
  );
}
