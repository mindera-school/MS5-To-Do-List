import styled, { keyframes } from "styled-components";

export const slideIn = keyframes`
	0% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
`;

export const OuterBox = styled.div`
	display: ${({ display }) => display ? "flex" : "none"};
	position: fixed;
	align-self: center;
	height: 740px;
	width: 812px;
	box-sizing: border-box;
	border-radius: 30px;
	background-color: #8D99AE;
	z-index: 2;
	animation: ${slideIn} 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	padding: 15px;
`;

export const BoxHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: fit-content;
	color: white;

	button {
		background-color: transparent;
		border: none;
		color: white;
		cursor: pointer;
	}
`;
