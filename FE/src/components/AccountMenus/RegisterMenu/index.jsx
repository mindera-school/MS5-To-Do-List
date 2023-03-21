import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { UserImg } from "../LoginMenu/styled-components.js";
import { RegisterContainer, RegisterForm } from "./styles.js";


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

	const [email, setEmail] = useState("");
	const [fName, setFName] = useState("");
	const [lName, setLName] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	async function sendRegisterInfo(data) {
		// in the future should open error modal
		if (!checkUserValidaty(data)) {
			console.log("All fields must be filled");
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
			.catch(r => console.log(r))
			;
	}

	return <>
		<RegisterContainer>
			<UserImg>
				<FaRegUser size="80px" />
			</UserImg>
			<RegisterForm>
				<label>
					Email:
					<input type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
				</label>
				<label>
					First Name:
					<input type={"text"} value={fName} onChange={(e) => setFName(e.target.value)} />
				</label>
				<label>
					Last Name:
					<input type={"text"} value={lName} onChange={(e) => setLName(e.target.value)} />
				</label>
				<label>
					Username:
					<input type={"text"} value={userName} onChange={(e) => setUserName(e.target.value)} />
				</label>
				<label>
					Password:
					<input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
				</label>

				<button onClick={(e) => {
					e.preventDefault();
					sendRegisterInfo(createUserObj(email, fName, lName, userName, password));
				}
				}>
					Register
				</button>
			</RegisterForm>
		</RegisterContainer>
	</>;
};


