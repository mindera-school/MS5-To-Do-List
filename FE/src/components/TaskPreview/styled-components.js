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
  --size: 25px;
  margin: 30px 10px 0px 0px;
  position: relative;
  width: var(--size);
  height: calc(var(--size) * 0.3);
  border: none;
  background-color: transparent;
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
    background-color: ${(props) => (props.isFilled ? "red" : "black")};
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
  height: 80px;
  background-color: #8d99ae;
  border: ${(props) => props.border};
  border-radius: 30px;
  box-sizing: border - box;
  margin: ${({ isParent }) => (isParent ? "15px" : "0")};
  padding: ${(props) => props.padding};
  color: $tasks - font - color;
  font-family: Roboto;
  color: white;
  transform: scale(${({ isParent }) => (isParent ? "1" : "0.85")})
`;

export const NameAndDone = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin: 10px 0px 0px 0px;
    h3 {
    margin-left: 5px;
  }
    input {
    cursor: pointer;
  }
`;

export const VerticalLine = styled.div`
  background-color: white;
  width: 1px;
  height: 75%;
  align-self: center;
`;

export const ExtendDiv = styled.div`
  height: 100%;
  width: 170px;
`;

export const DateContainer = styled.div`
  display: flex;
  width: 200px;
  margin-right: 25px;
  align-items: center;
`;

export const TaskDetailsBtn = styled.button`
  align-self: center;
  background-color: transparent;
  border: none;
  margin-left: 15px;
  cursor: pointer;
`;

export const DeleteBtn = styled.button`
  color: #d01010;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const EdgeButtonsContainer = styled.div`
  display: flex;
  justify-content: space - around;
  width: 120px;
  padding: 15px;
`;

export const DraggerContainer = styled.div`
  margin-right: 15px;
  align-self: center;
`;

export const SubtasksBtns = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  bottom: 0;
  right: 50%;
`;
