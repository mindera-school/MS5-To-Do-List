import styled, { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`

  body {
    background-color: #13293D;
    margin: 0;
    overflow: hidden;
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
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: auto;
  flex: 1;
`;