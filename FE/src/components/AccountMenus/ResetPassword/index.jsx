import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsCheckCircleFill, BsQuestionCircleFill } from "react-icons/bs";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useAppContext } from "../../../context";
import { GoBackBtn } from "../RegisterMenu/styles";
import { BackIcon, BackIconInner, ContentContainer, EmailForm, EmailInput, EmailLabel, FrontIcon, IconHolder, IconHolderInner, SendButton } from "./styled-components";

function ResetPassword() {
	const setMenuType = useAppContext().setMenuType;
	const [isSent, setIsSent] = useState(false);
	const [emailInput, setEmailInput] = useState("");

	const handleSendClick = (e) => {
		e.preventDefault();
		fetch("http://localhost:8086/todo/users/forgot-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify({
				email: emailInput,
			}),
		});
		setIsSent(true);
		setTimeout(() => {
			setMenuType("login");
		}, 2500);
	};

	return <>
		<GoBackBtn>
			<RiArrowGoBackLine color="white" size={30}></RiArrowGoBackLine>
		</GoBackBtn>
		<ContentContainer>
			<IconHolder sent={isSent} >
				<IconHolderInner sent={isSent}>
					<FrontIcon>
						<BsQuestionCircleFill size={150} color="white" />
						<span>Tells us the email associated to your account so we can send you a link for you to reset your password!</span>
					</FrontIcon>
					<BackIcon>
						<BackIconInner>
							<BsCheckCircleFill size={150} color="white" />
							<span>The email has been sent! Check your inbox and click the link!</span>
						</BackIconInner>
					</BackIcon>
				</IconHolderInner>
			</IconHolder>
			<EmailForm onSubmit={(e) => handleSendClick(e)}>
				<EmailLabel>
					<span>Email:</span>
					<EmailInput value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required type="email"></EmailInput>
				</EmailLabel>
				<SendButton type="submit">
					<div>
						<AiOutlineSend color="rgb(44, 91, 161)" size={30}></AiOutlineSend>
					</div>
				</SendButton>
			</EmailForm>
		</ContentContainer>
	</>;
}

export default ResetPassword;
