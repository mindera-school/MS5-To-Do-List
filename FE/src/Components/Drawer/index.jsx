import React from "react";
import { StyledDrawer } from "./styled-components";
import Button from "../Button";

export default function Drawer(props) {
  return (
    <>
      <StyledDrawer right={props.side} display={props.display}>
        <Button handler={props.handler} displayed="X" />
        {props.tab}
      </StyledDrawer>
    </>
  );
}
