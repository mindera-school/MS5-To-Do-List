import React from "react";
import { useParams } from "react-router";
import { useAppContext } from "../context";
import { BoxTitle, ContainerBox, ForgotPasswordForm, LabelsContainer, PasswordAdvicer, PasswordInput, PasswordLabel, SubmitButton } from "./forgotpasspage-components";


function ForgotPassword() {
	const params = useParams();
	const token = params.token;
	const theme = useAppContext().themeMode;


	return <>
		<ContainerBox>
			<ForgotPasswordForm>
				<BoxTitle>Reset Password</BoxTitle>
				<PasswordAdvicer>
					<li>Between 4 and 8 characters</li>
					<li>One upper case letter</li>
					<li>One lower case letter</li>
					<li>One numeric digit</li>
				</PasswordAdvicer>
				<LabelsContainer>
					<PasswordLabel>
						<span>New Password</span>
						<PasswordInput type="password" />
					</PasswordLabel>
					<PasswordLabel>
						<span>Confirm the New Password</span>
						<PasswordInput type="password" />
					</PasswordLabel>
				</LabelsContainer>
				<SubmitButton type="submit">Reset Password</SubmitButton>
			</ForgotPasswordForm>
		</ContainerBox>
	</>;
}

export default ForgotPassword;
