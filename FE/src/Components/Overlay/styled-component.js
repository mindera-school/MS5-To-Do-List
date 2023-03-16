import styled from "styled-components";

export const StyledOverlay = styled.div`
  display: ${(props) => (!props.display ? "none" : "block")};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  background-color: black;
  opacity: 70%;
  z-index: 1;
`;
