import styled from "styled-components";
import Button from "../Button";

export const StyledDrawer = styled.div`
  display: block;
  right: ${(props) => props.right};
  position: absolute;
  top: 0;
  height: 100vh;
  width: ${(props) => (props.display ? "390px" : "0")}; 
  background-color: #17425e;
  z-index: 2;
  transition: width 0.4s;
  overflow-x: hidden;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
`;
