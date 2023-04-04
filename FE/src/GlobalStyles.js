import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  html {
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    background-color: #13293D;
    margin: 0;
    overflow: hidden;
    max-width: 100vw;
    overflow-x: hidden;
  }

  #root { 
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
`;

export const CentralDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: visible;
  flex: 3;
  height: 100vh;
  z-index: 2;
`;

export const LateralDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1;
  height: 100vh;
`;
