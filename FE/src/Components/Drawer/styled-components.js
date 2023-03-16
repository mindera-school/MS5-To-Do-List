import styled from "styled-components";

export const StyledDrawer = styled.div`
  display: ${(props) => (!props.display ? "none" : "block")};
  right: ${(props) => props.right};
  position: absolute;
  top: 0;
  height: 100vh;
  width: 390px;
  background-color: #17425e;
  z-index: 2;
`;
