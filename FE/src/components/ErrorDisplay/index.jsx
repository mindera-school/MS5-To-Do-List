import styled from "styled-components";

export const ErrorDisplay = styled.div`
	color: red;
	width: 100%;
	
	text-align: center;
	background-color: rgba(255, 0, 0, 0.27);
	padding: 1px;
	box-sizing: content-box;
	display: ${({ error }) => error === "" ? "none" : "block"};
	margin-bottom: 10px;
	z-index: 100;

`;

