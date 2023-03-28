import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { useAppContext } from "../../../context";
import { LoginDiv, UserImg } from "./styled-components";

async function sendLoginInfo(data, logger) {
	console.log(data);
	if (data.username === "" || data.password === "") {
		return console.log("Data is empty");
	}

	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	await fetch("http://localhost:8086/todo/users/login", {
		method: "POST",
		mode: "no-cors",
		headers: headers,
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(data)
	})
		.then(r => r.json())
		.then(r => logger(r))
		.catch(r => console.log(r));
}

function createSendObj(username, password) {
	return { username, password };
}

export const LoginMenu = () => {
	const [userContent, setUserContent] = useState("");
	const [passwordContent, setPasswordContent] = useState("");
	const setUser = useAppContext().setCurrentUser;
	const setMenuType = useAppContext().setMenuType;

	return (
		<LoginDiv>
			<button onClick={() => setMenuType("register")} >Sign Up<FiUserPlus size={25} /></button>
			<UserImg>
				<FaRegUser size={80} />
			</UserImg>
			<div>
				<label>
					<span>Username:</span>
					<input type="text" value={userContent} onChange={(e) => setUserContent(e.target.value)} />
				</label>
				<label>
					<span>Password:</span>
					<input type="password" value={passwordContent} onChange={(e) => { setPasswordContent(e.target.value); }} />
				</label>
			</div>
			<button onClick={() => sendLoginInfo(createSendObj(userContent, passwordContent), setUser)}>Login</button>
		</LoginDiv>
	);
};

