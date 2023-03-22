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

export const LoginDiv = styled.div`
	height: 90%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: transparent;
	

	button:first-of-type {
		background-color: transparent;
		border:none;
		color: #8D99AE;
		display: flex;
		align-items: center;
		position: absolute;
		top: 25px;
		right: 10px;
		cursor: pointer;
		&:hover {
			transform: scale(1.1);
		}
	}

	div:nth-child(3) {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items:center;
		width:100%;
		margin-top: 30px;
		color: white;
		height: 160px;
	}

	label {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width:80%;
		height: 60px;
		margin-bottom: 20px;
		font-size: 20px;
		animation: ${contentAppearAnim} 0.6s ease-in;
		input {
			height: 40px;
			border-radius: 20px;
			border: none;
			padding-left: 10px;
			outline:none;
			font-size: 16px;
			background-color: #8D99AE;
			margin-top: 6px;
		}
	}

	button:last-of-type {
		animation: ${contentAppearAnim} 0.6s ease-in;
		width: 85px;
		height: 30px;
		font-size: 20px;
		color: white;
		background-color: #8D99AE;
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

export const UserImg = styled.div`
	min-height:200px;
	min-width:200px;
	max-width: 200px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content:center;
	border-radius:50%;
	background-color: #8D99AE;
	margin-bottom: 10px;
	animation: ${contentAppearAnim} 0.6s ease;
`;

