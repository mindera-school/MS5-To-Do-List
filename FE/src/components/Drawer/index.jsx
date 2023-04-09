import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useAppContext } from "../../context";
import { CloseButton, StyledDrawer } from "./styled-components";


export default function Drawer({ position, display, handler, children }) {
  const [isShowing, setIsShowing] = useState(display);
  const theme = useAppContext().themeMode;

  useEffect(() => {
    if (display) {
      setIsShowing(true);
    } else {
      setTimeout(() => setIsShowing(false), 500);
    }
  }, [display]);

  return (
    <>
      <StyledDrawer theme={theme} position={position} display={display} isShowing={isShowing}>
        <CloseButton onClick={handler} theme={theme}> {position === "0" ? <MdOutlineKeyboardArrowRight size={60} /> : <MdOutlineKeyboardArrowLeft />} </CloseButton>
        {children}
      </StyledDrawer>
    </>
  );
}
