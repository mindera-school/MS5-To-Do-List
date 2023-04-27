import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppContext } from "../context";
import { BoxTitle, ContainerBox, ForgotPasswordForm, LabelsContainer, PasswordAdvicer, PasswordInput, PasswordLabel, SubmitButton } from "./forgotpasspage-components";


function ForgotPassword() {
	const params = useParams();
	const token = params.token;
	const theme = useAppContext().themeMode;
	const [firstInput, setFirstInput] = useState("");
	const [secondInput, setSecondInput] = useState("");
	const nav = useNavigate();

	const checkPassword = (password) => {
		const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
		return password.match(regex);
	};

	const createDTO = () => {
		if (firstInput !== secondInput || !checkPassword(secondInput)) {
			return;
		}

		return {
			newPassword: secondInput,
			token
		};
	};

	const handleSubmit = (e) => {
		createDTO();
		e.preventDefault();
		fetch("http://localhost:8086/todo/users/reset-password", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(createDTO()),
		}).then(nav("/MS5-To-Do-List"));
	};

	return <>
		<ContainerBox>
			<ForgotPasswordForm onSubmit={(e) => handleSubmit(e)}>
				<BoxTitle>Reset Password</BoxTitle>
				<PasswordAdvicer>
					<h4>Your password needs to have:</h4>
					<li>Between 4 and 8 characters</li>
					<li>One upper case letter</li>
					<li>One lower case letter</li>
					<li>One numeric digit</li>
				</PasswordAdvicer>
				<LabelsContainer>
					<PasswordLabel>
						<span>New Password</span>
						<PasswordInput type="password" value={firstInput} onChange={(e) => setFirstInput(e.target.value)} />
					</PasswordLabel>
					<PasswordLabel>
						<span>Confirm the New Password</span>
						<PasswordInput type="password" value={secondInput} onChange={(e) => setSecondInput(e.target.value)} />
					</PasswordLabel>
				</LabelsContainer>
				<SubmitButton type="submit">Reset Password</SubmitButton>
			</ForgotPasswordForm>
		</ContainerBox>
	</>;
}

export default ForgotPassword;
