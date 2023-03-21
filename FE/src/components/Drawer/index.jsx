import React from "react";
import { StyledDrawer } from "./styled-components";
import Button from "../Button";

export default function Drawer({side, display, handler, tab}) {
  return (
    <>
      <StyledDrawer right={side} display={display}>
        <Button handler={handler} displayed="X" />
        {tab}
      </StyledDrawer>
    </>
  );
}
