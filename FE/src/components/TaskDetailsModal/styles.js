import styled, { keyframes } from "styled-components";

export const slideIn = keyframes`
  0% {
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${({ display }) => display ? "flex" : "none"};
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 60;
`;

export const OuterBox = styled.div`
	display: flex;
	flex-direction: column;
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
	flex-direction: column;
	height: 120px;
	width: 100%;
	color: white;
	box-sizing: border-box;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
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
	justify-content: space-around;
	overflow-y: scroll;
	width: 100%;
	height: 180px;
	color: white;
	padding-top: 20px;
	h2,
	h5 {
		margin: 0;
	}

	h2 {
		margin: 15px 0 15px 0;
	}
`;

export const CommentContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 150px;
	width: 100%;
	overflow-y: scroll;
	color: white;

`;

export const Comment = styled.span`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 50px;
	font-size: 15px;
	background-color: #D9D9D9;
	color: black;
	margin-bottom: 8px;
	box-sizing: border-box;
	padding: 8px 0px 8px 8px;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

export const CommentInput = styled.input`
	width: 270px;
	border-radius: 5px;
	background-color: #D9D9D9;
	border: none;
	height: 34px;
	padding-left: 15px;
	box-sizing: border-box;
	font-size: 16px;
`;

export const CommentButton = styled.button`
	background-color: transparent;
	border: none;
	color: white;
	cursor: pointer;
`;

export const CenteredForm = styled.form`
	align-self: center;
`;

export const TagsContainer = styled.span`
	display: flex;
	width: 100%;
	button {
		background-color: transparent;
		border: none;
		color: white;
		cursor: pointer;
	}
`;

export const CustomLine = styled.div`
	display: flex;
	padding: 5px;

	span:first-of-type {
		margin-right: 10px;
		font-weight: 900;
		color: #17425E;
	}
`;
