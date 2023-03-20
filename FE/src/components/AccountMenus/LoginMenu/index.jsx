import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { LoginDiv, UserImg } from "./styled-components";

async function sendLoginInfo(data) {
	if (data.username === "" || data.password === "") {
		return console.log("Data is empty");
	}
	fetch("http://localhost:8086/todo/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(data),
	})
		.then(r => r.json())
		.then(r => console.log(r))
		.catch(r => console.log(r))
		;
}


function createSendObj(username, password) {
	return {
		username: username,
		password: password
	};
}

export const LoginMenu = () => {
	const [userContent, setUserContent] = useState("");
	const [passwordContent, setPasswordContent] = useState("");


	return <>
		{console.log(userContent)}
		<LoginDiv>
			<UserImg>
				<FaRegUser size="80px" />
			</UserImg>
			<div>
				<label>
					Username:
					<input type="text" value={userContent} onChange={(e) => setUserContent(e.target.value)} />
				</label>
				<label>
					Password:
					<input type="password" value={passwordContent} onChange={(e) => { setPasswordContent(e.target.value); }} />
				</label>
			</div>
			<button onClick={() => sendLoginInfo(createSendObj(userContent, passwordContent))}>Login</button>
		</LoginDiv>
	</>;
};

