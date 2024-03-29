import styled, { keyframes } from "styled-components";


export const jelloAnim = keyframes`
	0% {
		-webkit-transform: scale3d(1, 1, 1);
				transform: scale3d(1, 1, 1);
	}
	30% {
		-webkit-transform: scale3d(0.75, 1.25, 1);
				transform: scale3d(0.75, 1.25, 1);
	}
	40% {
		-webkit-transform: scale3d(1.25, 0.75, 1);
				transform: scale3d(1.25, 0.75, 1);
	}
	50% {
		-webkit-transform: scale3d(0.85, 1.15, 1);
				transform: scale3d(0.85, 1.15, 1);
	}
	65% {
		-webkit-transform: scale3d(1.05, 0.95, 1);
				transform: scale3d(1.05, 0.95, 1);
	}
	75% {
		-webkit-transform: scale3d(0.95, 1.05, 1);
				transform: scale3d(0.95, 1.05, 1);
	}
	100% {
		-webkit-transform: scale3d(1, 1, 1);
				transform: scale3d(1, 1, 1);
	}
`;

export const contentAppearAnim = keyframes`
	0% {
		opacity: 0;
		transform: scale(0.9); 
	}

	100% {
		opacity: 1;
		transform: scale(1);
	}
`;

export const RegisterContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 90%;
	width: 100%;
	align-items: center;
`;

export const RegisterForm = styled.form`
	display:flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	margin-top: 20px;
	animation: ${contentAppearAnim} 0.6s ease-in;

	label {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 80%;
		height: 60px;
		margin-bottom: 20px;
		font-size: 20px;
		color: white;
		input {
			color: ${({ theme }) => (theme.fontColor)};
			height: 40px;
			border-radius: 20px;
			border: none;
			padding-left: 10px;
			outline: none;
			font-size: 16px;
			background-color: ${({ theme }) => (theme.inputColor)};
			margin-top: 6px;
		}
	}

	button {
		width: 85px;
		height: 30px;
		font-size: 20px;
		color: ${({ theme }) => (theme.fontColor)};
		background-color: ${({ theme }) => (theme.terciaryColor)};
		border: none;
		border-radius: 5px;
		cursor: pointer;
		&:hover {
			transform: scale(1.05);
		}
		&:active {
			background-color: #5f6d85;
		}
	}
`;

export const GoBackBtn = styled.button`
	position: absolute;
	color: ${({ theme }) => (theme.terciaryColor)};
	border: none;
	background-color: transparent;
	top: 20px;
	right: 10px;
	cursor: pointer;

	&:hover {
		animation: ${jelloAnim} 0.8s ease-in both;
	}
`;

export const PasswordDetails = styled.ul`
	margin: 0;
	color: ${({ theme }) => (theme.menuFontColor)};
	transition: height 0.8s;
	height: ${({ isDisplayed }) => isDisplayed ? "30%" : 0};
	overflow-y: hidden;
	position: relative;
	top: -5%;
	left: -15%;
`;

export const SuccessMessage = styled.div`
	max-height: ${({ open }) => (open ? "500px" : "0px")};
	width: 100%;
	background: rgba(4, 218, 4, 0.59);
	color: black;
	transition: max-height 0.5s;
	padding: ${({ open }) => (open ? "15px" : "0px")};
	width: 100%;
	display: flex;
	justify-content:center;
	overflow: hidden;
`;
