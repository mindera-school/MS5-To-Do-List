import styled from "styled-components";

export const GoBackButton = styled.button`
	position: absolute;
	top: 25px;
	right: 10px;
`;

export const ContentContainer = styled.div`
	height: 80%;
	width: 90%;
	padding: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const EmailForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 50%;
	width: 100%;
	padding: 0 0 50px 0;
`;

export const EmailLabel = styled.label`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	color: white;
	span {
		align-self: flex-start;
		margin: 0 0 12px 45px;
		font-size: 18px;
	}
`;

export const EmailInput = styled.input`
	width: 80%;
	border-radius: 15px;
	border: none;
	height: 25px;
	box-sizing: border-box;
	padding-left: 10px;
	font-size: 16px;
`;

export const SendButton = styled.button`
	position:relative;
	border-radius: 100%;
	min-height: 50px;
	min-width: 50px;
	border: none;
	background-color: white;
	margin-top: 35px;
	padding-right: -20px;
	box-shadow: inset 0px 0px 6px 0.5px rgba(0,0,0,0.3);
	transition: all 0.3s;
	&:hover{
		background-color: #e9ecef;
		transform: scale(1.1);
	}
	cursor: pointer;

	div {
		position: absolute;
		top: 20%;
		right: 14%;
	}
`;

export const IconHolder = styled.div`
	margin-top: 60px;
	width: 100%;
	height: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	color: white;
	perspective: 1000px;
	transform: ${({ sent }) => sent ? "rotateY(180deg)" : "rotateY(0deg)"};
	transition: transform 0.8s;

	span{
		margin-top: 15px;
	}
`;

export const FrontIcon = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	position: absolute;
  	width: 100%;
  	height: 100%;
  	backface-visibility: hidden;
`;

export const BackIcon = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
  	width: 100%;
  	height: 100%;
  	backface-visibility: hidden;
	transform: rotateY(180deg);
`;

export const IconHolderInner = styled.div`
  	position: relative;
	width: 100%;
	height: 100%;
	text-align: center;
	transition: transform 0.8s;
	transform-style: preserve-3d;
	transform: ${({ sent }) => sent ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

export const BackIconInner = styled.div`
	transform: rotateY(180deg);
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: rgb(163,207,187);
	box-sizing: border-box;
	padding: 15px;
	border-radius: 15px;
`;
