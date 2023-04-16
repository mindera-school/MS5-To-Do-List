import styled, { css, keyframes } from "styled-components";

const heartbeatAnim = keyframes`
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
`;

export const StyledFavHeart = styled.button`
  @media (max-width: 425px) {
    --size: 20px;
    transform: translate(0,2vh);
    z-index:6;
  }
  --size: 25px;
  margin: 30px 20px 0px 0px;
  position: relative;
  width: var(--size);
  height: calc(var(--size) * 0.3);
  border: none;
  background-color: transparent;
  transform: translate(0,-50%);
  cursor: pointer;

  ${(props) =>
    props.isFilled &&
    css`
      animation: ${heartbeatAnim} 1s ease-in-out;
    `}

  &:before,
  &:after {
    position: absolute;
    content: "";
    left: calc(var(--size) * 0.55);
    top: 0;
    width: calc(var(--size) * 0.55);
    height: calc(var(--size) * 0.85);
    border-radius: calc(var(--size) * 0.55) calc(var(--size) * 0.55) 0 0;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
    background-color: ${(props) => (props.isFilled ? "red" : props.theme.fontColor)};
  }

  &:after {
    left: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
  }
`;

export const StyledTaskPreview = styled.div`
  display: flex;
  position: relative;
  width: 690px;
  height: 100px;
  background-color: ${({ theme }) => (theme.taskColor)};
  border: ${(props) => props.border};
  border-radius: 15px;
  box-sizing: border-box;
  margin: ${({ isParent }) => (isParent ? "15px" : "0")};
  padding: ${(props) => props.padding};
  font-family: Roboto;
  color: ${({ theme }) => (theme.fontColor)};
  transform: scale(${({ isParent }) => (isParent ? "1" : "0.85")});

  @media (max-width: 425px) {
    width: 80vw;
    height: 120px;
    aling-items: center;
}
`;

export const NameAndDone = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 150px;
  margin: 10px 0px 0px 0px;
    h3 {
    margin-left: 5px;
  }
    input {
    cursor: pointer;
  }

   @media (max-width: 425px) {
    width: fit-content;
    font-size: 14px;
    margin: 0px;
}
`;

export const VerticalLine = styled.div`
  background-color: ${({ theme }) => (theme.fontColor)};
  width: 1px;
  height: 75%;
  align-self: center;

  @media (max-width: 425px) {
    display: none;
  }
`;

export const ExtendDiv = styled.div`
  height: 100%;
  width: 170px;

  @media (max-width: 425px) {
    width: 10px;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  width: 200px;
  color: ${({ theme }) => (theme.fontColor)};
  margin-right: 25px;
  align-items: center;
  
  @media (max-width: 425px) {
    width: 220px;
    font-size: 12px;
    margin-right:10px;
  }
`;

export const TaskDetailsBtn = styled.button`
  align-self: center;
  background-color: transparent;
  border: none;
  margin-left: 15px;
  cursor: pointer;

  @media (max-width: 425px) {
    display: none;
  }
`;

export const DeleteBtn = styled.button`
  color: #d01010;
  background-color: transparent;
  border: none;
  cursor: pointer;

   @media (max-width: 425px) {
    display: none;
  }
`;

export const EdgeButtonsContainer = styled.div`
  display: flex;
  justify-content: space - around;
  width: 120px;
  padding: 15px;

  @media (max-width: 425px) {
    display: none;
  }
`;

export const DraggerContainer = styled.div`
  margin-right: 15px;
  align-self: center;
  @media (max-width: 425px) {
    margin-right: 5px;
  }
`;

export const SubtasksBtns = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  bottom: 0;
  right: 50%;
  cursor: pointer;
  transform: rotate(${({ show }) => (show ? "180deg" : "0deg")});
  transition: transform 0.7s;
`;

export const SubtasksList = styled.div`
  max-height: ${({ show }) => (show ? "500px" : "0px")};
  overflow-y: hidden;
  transition: max-height 0.7s ease-in;

  @media (max-width: 1180px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

`;

export const CustomDiv = styled.div`
  @media (max-width: 425px) {
    width: fit-content;
  }
`;
