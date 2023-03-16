import React from "react";
import {StyledButton} from "./styled-components";

export default function Button({handler, displayed}) {
  return (
    <StyledButton onClick={handler}>
      {displayed}
    </StyledButton>
  );
}