import styled from "styled-components";

export const ContainerBox = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const BoxTitle = styled.h2`
	color: white;
`;

export const ForgotPasswordForm = styled.form`
	height: 500px;
	width: 350px;
	background-color: #2C5BA1;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 25px;
	box-sizing: border-box;
`;
export const PasswordLabel = styled.label`
	width: 100%;
	display: flex; 
	flex-direction: column;
	align-items: center;
	color: white;
	margin: 20px 0;
	span {
		padding-left: 10%;
		align-self: flex-start;
	}
`;

export const PasswordInput = styled.input`
	width: 80%;
	height: 20px;
	border-radius: 5px;
	border: none;
	padding-left: 5px;
	margin: 10px 0;
`;

export const LabelsContainer = styled.div`
	width: 100%;
	height: 50%;
	justify-self: flex-end;
`;

export const PasswordAdvicer = styled.div`
	background-color: #d1e7dd;
	border: 2px solid rgb(163,207,187);
	font-weight: 100;
	width: 80%;
	padding: 8px;
	border-radius: 3px;
	height: fit-content;
	color: rgb(10,54,34);
	box-sizing: border-box;
	font-size: 15px;

	h4 {
		margin: 0 0 5px 0;
		font-size: 16px;
		font-weight: 500;
		text-decoration: underline;
	}
`;

export const SubmitButton = styled.button`
	width: 80%;
	background-color: white;
	color: #2C5BA1;
	height: 30px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-weight: 700;
	font-size: 16px;
	transition: all 0.5s;

	&:hover{
		background-color: #e9ecef;
		transform: scale(1.05);
	}

	&:active{
		background-color: gray;	
	}
`;
