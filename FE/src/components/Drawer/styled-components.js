import styled from "styled-components";

export const StyledDrawer = styled.div`
  display: ${({ isShowing }) => isShowing ? "block" : "none"};
  right: ${({ position }) => position};
  position: absolute;
  top: 0;
  height: 100vh;
  width: 390px; 
  transform: translate(${({ display }) => display ? "0" : "100%"});
  background-color: #17425e;
  z-index: 2;
  transition: width 0.4s;
  overflow-x: hidden;
  padding-top: 10px;
  transition: transform 0.4s ease-out;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.4s;

  &:hover {
    transform: translate(15px);
  }
`;
