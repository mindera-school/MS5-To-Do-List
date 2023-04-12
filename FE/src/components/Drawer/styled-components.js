import styled from "styled-components";

export const StyledDrawer = styled.div`
  display: ${({ isShowing }) => isShowing ? "block" : "none"};
  right: ${({ position }) => position};
  position: absolute;
  top: 0;
  height: 100vh;
  width: 390px; 
  transform: translate(${({ display }) => display ? "0" : "100%"});
  background-color: ${({ theme }) => (theme.secondaryColor)};
  z-index: 5;
  transition: width 0.4s;
  overflow-x: hidden;
  padding-top: 10px;
  transition: transform 0.4s ease-out;

  @media (max-width: 425px) {
      width: 100vw;
    }

  @media (max-width: 1180px) {
      width: 100vw;
    }
`;

export const CloseButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => (theme.menuFontColor)};
  border: none;
  cursor: pointer;
  transition: transform 0.4s;

  &:hover {
    transform: translate(15px);
  }
`;
