import React from "react";
import { LoginMenu, RegisterMenu, UserProfile } from "../components";

export const accountMenuMap = {
	login: {
		el: <LoginMenu />,
		key: "login"
	},
	register: {
		el: <RegisterMenu />,
		key: "register"
	},
	logged: {
		el: <UserProfile />,
		key: "logged"
	}
};

