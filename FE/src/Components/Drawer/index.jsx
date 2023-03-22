import React from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CloseButton, StyledDrawer } from "./styled-components";


export default function Drawer({ position, display, handler, children }) {

  return (
    <>
      <StyledDrawer position={position} display={display}>
        <CloseButton onClick={handler}> {position === "0" ? <MdOutlineKeyboardArrowRight size="60px" color="#8D99AE" /> : <MdOutlineKeyboardArrowLeft />} </CloseButton>
        {children}
      </StyledDrawer>
    </>
  );
}
