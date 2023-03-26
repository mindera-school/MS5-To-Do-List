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
	flex-direction: column;
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

export const InnerBox = styled.div`
	padding: 0 60px 0 60px;
	height: 1000px;
`;

export const InnerHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: white;
	width: 100%;
	box-sizing: border-box;
`;

export const InnerTitle = styled.h2`
	font-size: 40px;
	color: white;
	text-decoration: underline;
`;

export const OptionTitles = styled.h4`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 15px;
	color: white;
	width: 135px;
	button {
		cursor: pointer;
		background: transparent;
		cursor: pointer;
		border: none;
		padding: 0px;
	}
`;

export const TaskInfo = styled.div`
	display: flex;
	height: 120px;
	width: 100%;
	color: white;
	box-sizing: border-box;
`;

export const Divider = styled.div`
	display: flex;
	flex-direction: column;	
	height: 100%;
	font-weight: bolder;
	& > span {
		padding: 6px;
		margin: 0px;
		height: 19px;
	}

	button {
		background-color: transparent;
		border: none;
		color: white;
		cursor: pointer;
	}

	&:first-of-type {
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		color: #17425E;
		font-weight: 50px;
	}
`;

export const HorizontalLine = styled.div`
	background-color: white;
	width: 100%;
	height: 2px;
	margin-top: 25px;
`;

export const DescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 190px;
	color: white;
`;
