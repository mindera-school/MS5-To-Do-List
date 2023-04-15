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
	background-color: ${({ theme }) => theme.taskColor};
	z-index: 2;
	animation: ${slideIn} 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	padding: 15px;
	color: ${({ theme }) => theme.fontColor};
	 @media (max-width: 425px) {
		width: 400px;
  	}
`;

export const BoxHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: fit-content;
	color: ${({ theme }) => theme.fontColor};

	button {
		background-color: transparent;
		border: none;
		${({ theme }) => theme.fontColor};
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
	color: ${({ theme }) => theme.fontColor};
	width: 100%;
	box-sizing: border-box;
`;

export const InnerTitle = styled.input`
	font-size: 40px;
	color: ${({ readOnly, theme }) => readOnly ? theme.fontColor : "white"};
	text-decoration: underline;
	background-color: ${({ readOnly }) => readOnly ? "transparent" : "#2C5BA1"};
	border: ${({ readOnly }) => readOnly ? "none" : "white 2px solid"};
	border-radius: 10px;
	padding-left: 10px;
	outline: none;
	::placeholder {
		color: ${({ theme }) => theme.fontColor};
	}
`;

export const OptionTitles = styled.h4`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 15px;
	${({ theme }) => theme.fontColor};
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
	${({ theme }) => theme.fontColor};
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
	justify-content: flex-start;
	overflow-y: scroll;
	width: 100%;
	height: 180px;
	padding-bottom: 20px;
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
`;

export const Comment = styled.span`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 50px;
	font-size: 15px;
	background-color: ${({ theme }) => theme.searchBarBg};
	color: ${({ theme }) => theme.fontColor};
	margin-bottom: 8px;
	box-sizing: border-box;
	padding: 8px 0px 8px 8px;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

export const CommentInput = styled.input`
	width: 270px;
	border-radius: 5px;
	background-color: ${({ theme }) => theme.searchBarBg};
	border: none;
	height: 34px;
	padding-left: 15px;
	box-sizing: border-box;
	font-size: 16px;
`;

export const CommentButton = styled.button`
	background-color: transparent;
	border: none;
	color: ${({ theme }) => theme.fontColor};
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
		color: ${({ theme }) => theme.searchBarBg};
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

export const TaskDescInput = styled.textarea`
	background-color: ${(props) => props.readOnly ? "transparent" : "#2C5BA1"};
	border: ${({ readOnly }) => readOnly ? "none" : "white 2px solid"};
	border-radius: 10px;
	height: 100%;
	font-size: 18px;
	color: ${({ readOnly, theme }) => readOnly ? theme.fontColor : "white"};
	padding: 15px;
	overflow-y: scroll;
	outline: none;
`;

export const DateInput = styled.div`
	color: ${({ theme }) => theme.menuFontColor};
	border: ${({ readOnly }) => readOnly ? "none" : "2px white solid"};
	border-radius: 5px;
	*,
	*:before,
	*:after{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	input[type="date"]{
		background-color: ${({ readOnly }) => readOnly ? "transparent" : "#2C5BA1"};
		color: ${({ theme }) => theme.fontColor};
		font-size: 18px;
		border: none;
		outline: none;
		border-radius: 5px;
		width: fit-content;
		padding-left: 10px;
	}
	::-webkit-calendar-picker-indicator{
		background-color: #ffffff;
		padding: 5px;
		cursor: pointer;
		border-radius: 3px;
	}
`;

export const SubtaskFormBox = styled.div`
	max-height: ${({ opened }) => (opened ? "500px" : "0px")};
	box-sizing: border-box;
	padding: ${({ opened }) => (opened ? "10px" : "0px")};
	width: 200px;
	background-color: #2C5BA1;
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	right: 5%;
	top: 12%;
	transition: max-height 0.4s;
	border-radius: 5px;
	overflow: hidden;
	color: ${({ theme }) => theme.menuFontColor};
`;

export const SubtaskInput = styled.input`
	width: 170px;
	background-color: WHITE;
	border: none;
	border-radius: 4px;
	padding: 5px;
`;

export const CustomLabel = styled.label`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 5px;
	padding: 4px;
`;

export const SaveBtn = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
`;
