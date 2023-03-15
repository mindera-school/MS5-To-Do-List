import styled, { keyframes, css } from "styled-components";


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
  
  ${props =>
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
    background-color: ${props => props.isFilled ? "red" : "black"};
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
background-color: #8D99AE;
border-radius: 30px;
box-sizing: border-box;
margin: 15px;
padding-left: 15px;
color: $tasks-font-color;
font-family:Roboto;
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
position: absolute;
right: 10%;
background-color: white;
width: 1px;
height: 75%;
align-self: center;
margin-left: 15px;
`;

export const ExtendDiv = styled.div`
  height: 100%;
  width: 170px;
`;

export const DateContainer = styled.div`
  display: flex;
  width: 120px;
  align-items: center;
  & img {
      margin-right: 10px;
  }
`;

export const TaskMover = styled.div`
  position: absolute;
  right: 12%;
  align-self: center;
  margin-left: 10px;
  & button {
    background-color: transparent;
    border: none;
    cursor: grab;
  }
`;

export const TaskDetailsBtn = styled.button`
  position: absolute;
  right: 3%;
  align-self: center;
  background-color: transparent;
  border: none;
  margin-left: 15px;
  cursor: pointer;
`;


