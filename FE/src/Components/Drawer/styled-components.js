import styled from "styled-components";

export const StyledDrawer = styled.div`
  display: block;
  right: ${(props) => props.position};
  position: absolute;
  top: 0;
  height: 100vh;
  width: ${(props) => (props.display ? "390px" : "0")}; 
  background-color: #17425e;
  z-index: 2;
  transition: width 0.4s;
  overflow-x: hidden;
  padding-top: 10px;
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
