import React from "react";
import {StyledButton} from "./styled-components";

export default function Button(props) {
  return (
    <StyledButton onClick={props.handler}>
      {props.displayed}
    </StyledButton>
  );
}