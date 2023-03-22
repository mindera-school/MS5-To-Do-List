import styled from "styled-components";

export const UserProfileContainer = styled.div`
	width: 100%;
	height: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;

	button {
		position: absolute;
		top: 20px;
		right: 10px;
		border: none;
		color: red;
		background-color: transparent;
		cursor: pointer;
	}

	h3 {
		display: flex;
		flex-direction: column;
		color: white;
		margin-top: 20px;
	}

	h4 {
		color: white;
		margin-top: 8px;
		font-size: 18px;
	}

	div {
		position: relative;
		text-align: center;
	}
`;

export const StatsHolder = styled.div`
	width: 100%;
	height: 88px;
	display: flex;
	justify-content: space-evenly;
	margin-top: 30px;
	margin-left: 40px;
	font-size: 16px;
`;

export const VerticalLine = styled.div`
	background-color: white;
	height: 100%;
	width: 2px;
`;
