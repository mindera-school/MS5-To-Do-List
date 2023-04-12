import styled, { createGlobalStyle } from "styled-components";
import Roboto from "./font/Roboto-Regular.ttf";

export const TaskListContainer = styled.div`
  height: 80vh;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 750px;
  
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .5);
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}

@media (max-width: 1180px) {
  overflow-y: scroll;
  height: 80vh;
}

`;

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${Roboto});
  }
  ;

  html {
    max-width: 100vw;
    max-height: 100vh;
    overflow-x: hidden;
    font-family: Roboto;
  }

  body {
    background-color: ${({ theme }) => (theme.primaryColor)};
    margin: 0;
    max-width: 100vw;
    overflow-x: hidden;
    overflow-y: hidden;

    @media (max-width: 1180px) {
      overflow-y: scroll;
    }
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

   @media (max-width: 1180px) {
    flex-direction: column-reverse;
  }
`;

export const CentralDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  flex: 3;
  height: 100vh;
  
  @media (max-width: 1180px) {
    margin-bottom: 30px;
    height: 30px;
  }
`;

export const LateralDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1;
  height: 100vh;
  z-index: 0;

  @media (max-width: 1180px) {
    display: ${({ dummy }) => (dummy ? "none" : "flex")};
  }
`;


