import React from "react";
import { StyledOverlay } from "./styled-component";

export default function Overlay(props) {
  return <StyledOverlay onClick={props.handler} display={props.display} />;
}
