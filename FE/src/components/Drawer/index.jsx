import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CloseButton, StyledDrawer } from "./styled-components";


export default function Drawer({ position, display, handler, children }) {
  const [isShowing, setIsShowing] = useState(display);

  useEffect(() => {
    if (display) {
      setIsShowing(true);
    } else {
      setTimeout(() => setIsShowing(false), 500);
    }
  }, [display]);

  return (
    <>
      <StyledDrawer position={position} display={display} isShowing={isShowing}>
        <CloseButton onClick={handler}> {position === "0" ? <MdOutlineKeyboardArrowRight size={60} color="#8D99AE" /> : <MdOutlineKeyboardArrowLeft />} </CloseButton>
        {children}
      </StyledDrawer>
    </>
  );
}
