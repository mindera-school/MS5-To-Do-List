import styled, { keyframes } from "styled-components";

export const scaleUpAnim = keyframes`
   0% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1.2);
            transform: scale(1.2);
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  background-color: #17425e;
  margin-bottom: 10px;
`;

export const AccountMenuBtn = styled.button`
  border: none;
  background-color: #8D99AE;
  justify-self: flex-end;
  align-self: center;
  border-radius: 50%;
  min-height: 50px;
  min-width: 50px;
  margin-right: 20px;
  cursor:pointer;
  transition: transform 0.4s;

  &:hover {
    animation: ${scaleUpAnim} 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  }

  &:active {
    background-color:#4B566A;
  }
`;


