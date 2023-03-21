import styled from "styled-components";

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

label {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width:80%;
		height: 60px;
		margin-bottom: 20px;
		font-size: 20px;
		color: white;
		input {
			color:white;
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

	button {
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


