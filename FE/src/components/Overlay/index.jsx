import React from "react";
import { StyledOverlay } from "./styled-component";

export default function Overlay({handler, display}) {
  return <StyledOverlay onClick={handler} display={display} />;
}
