import styled, { keyframes } from "styled-components";

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

export const fixedAppearAnim = keyframes`
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
`;


export const wobbleAnim = keyframes`
	0%,
  100% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
  }
  15% {
    -webkit-transform: translateX(-30px) rotate(-6deg);
            transform: translateX(-30px) rotate(-6deg);
  }
  30% {
    -webkit-transform: translateX(15px) rotate(6deg);
            transform: translateX(15px) rotate(6deg);
  }
  45% {
    -webkit-transform: translateX(-15px) rotate(-3.6deg);
            transform: translateX(-15px) rotate(-3.6deg);
  }
  60% {
    -webkit-transform: translateX(9px) rotate(2.4deg);
            transform: translateX(9px) rotate(2.4deg);
  }
  75% {
    -webkit-transform: translateX(-6px) rotate(-1.2deg);
            transform: translateX(-6px) rotate(-1.2deg);
  }
`;

export const RegisterBtn = styled.button`
	background-color: transparent;
		border: none;
		color: ${({ theme }) => (theme.terciaryColor)};
		display: flex;
		align-items: center;
		position: absolute;
		top: 25px;
		right: 10px;
		cursor: pointer;
		&:hover {
			transform: scale(1.1);
		}
`;

export const LoginContent = styled.form`
	position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin-top: 30px;
		color: ${({ theme }) => (theme.menuFontColor)};
		height: 160px;
`;

export const LoginDiv = styled.div`
	height: 90%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: transparent;

	label {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 80%;
		height: 60px;
		margin-bottom: 20px;
		font-size: 20px;
		animation: ${contentAppearAnim} 0.6s ease-in;
		input {
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
 `;

export const LoginBtn = styled.button`
	animation: ${contentAppearAnim} 0.6s ease-in;
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
`;

export const UserImg = styled.div`
	min-height:200px;
	min-width:200px;
	max-width: 200px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content:center;
	border-radius:50%;
	background-color: ${({ theme }) => (theme.terciaryColor)};
	margin-bottom: 10px;
	animation: ${contentAppearAnim} 0.6s ease;
`;

export const ConnectWarning = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: white;
	display:  ${({ show }) => (show ? "flex" : "none")};
	flex-direction: column;
	animation: ${fixedAppearAnim} 0.6s ease-in;
	padding: 15px;
`;

export const CloseWarningBtn = styled.button`
	background-color: transparent;
	border: none;
	align-self: flex-end;
	cursor: pointer;
`;

export const WarningContent = styled.div`
	flex-grow: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	top: 25%;
`;

export const WarningText = styled.span`
	width:50%;
	margin-top: 20px;
	padding-left: 40px;
`;

export const IconHolder = styled.div`
	animation: ${wobbleAnim} 0.8s 0.8s both;
`;

export const LoginWarning = styled.div`
	width: 100%;
	max-height: ${({ open }) => (open ? "500px" : "0px")};
	background-color: rgba(255, 0, 0, 0.27);
	transition: max-height 0.4s;
	display: flex;
	align-items: center;
	padding: ${({ open }) => (open ? "10px" : "0px")};
	box-sizing: border-box;
	overflow: hidden;
`;

export const LoginWarningText = styled.h5`
	color: red;
	margin-left: 10px;
`;

export const ThemeSwitchHolder = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	bottom: 5%;
	justify-self: flex-end;
	align-items: center;
	color: ${({ theme }) => (theme.menuFontColor)};
	label {
		width: 100%;
		height: fit-content;
	}
`;
