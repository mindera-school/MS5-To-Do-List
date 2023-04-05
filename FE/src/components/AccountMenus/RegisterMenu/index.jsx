import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useAppContext } from "../../../context";
import { UserImg } from "../LoginMenu/styled-components.js";
import { ErrorDisplay, GoBackBtn, PasswordDetails, RegisterContainer, RegisterForm } from "./styles.js";

function checkUserValidaty(user) {
	const { email, firstName, lastName, username, password } = user;

	if (email === "" || firstName === "" || lastName === "" || username === "" || password === "") {
		return false;
	}
	return true;
}

function createUserObj(email, firstName, lastName, username, password) {
	return {
		email,
		profileImage: null,
		firstName,
		lastName,
		username,
		password
	};
}

export const RegisterMenu = () => {
	const changeMenuType = useAppContext().setMenuType;
	const [email, setEmail] = useState("");
	const [fName, setFName] = useState("");
	const [lName, setLName] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [pDetailsVisibility, setPDetailsVisibility] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	async function sendRegisterInfo(data) {
		// in the future should open error modal
		if (!checkUserValidaty(data)) {
			setErrorMessage("All fields must be filled!");
			return;
		}
		if (!checkEmail(data.email)) {
			setErrorMessage("Invalid email!");
			return;
		}
		if (!checkPassword(data.password)) {
			setErrorMessage("Password does not match the requirements!	");
			return;
		}
		fetch("http://localhost:8086/todo/users/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(data),
		})
			.then(r => r.json())
			.catch(r => console.log(r));
	}
	useEffect(() => {
		const closePDetails = setTimeout(() => setPDetailsVisibility(false), 3000);

		return () => clearTimeout(closePDetails);
	}, [password]);

	return <>
		<RegisterContainer>
			<GoBackBtn onClick={() => changeMenuType("login")} ><RiArrowGoBackLine size={30} /></GoBackBtn>
			<UserImg>
				<FaRegUser size={80} />
			</UserImg>
			<RegisterForm>
				<ErrorDisplay error={errorMessage}>{errorMessage}</ErrorDisplay>
				<label>
					<span>Email:</span>
					<input type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
				</label>
				<label>
					<span>First Name:</span>
					<input type={"text"} value={fName} onChange={(e) => setFName(e.target.value)} />
				</label>
				<label>
					<span>Last Name:</span>
					<input type={"text"} value={lName} onChange={(e) => setLName(e.target.value)} />
				</label>
				<label>
					<span>Username:</span>
					<input type={"text"} value={userName} onChange={(e) => setUserName(e.target.value)} />
				</label>
				<label>
					<span>Password:</span>
					<input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} onSelect={() => setPDetailsVisibility(true)} />
				</label>
				<PasswordDetails isDisplayed={pDetailsVisibility}>
					<h4>password must include:</h4>
					<li>between 4 and 8 characters</li>
					<li>one upper case letter</li>
					<li>one lower case letter</li>
					<li>one numeric digit</li>
				</PasswordDetails>

				<button onClick={(e) => {
					e.preventDefault();
					sendRegisterInfo(createUserObj(email, fName, lName, userName, password));
				}
				}>
					<span>Register</span>
				</button>
			</RegisterForm>
		</RegisterContainer>
	</>;
};

const checkPassword = (password) => {
	const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
	return password.match(regex);
};

const checkEmail = (email) => {
	const regex = /^[\w -.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return email.match(regex);
};


