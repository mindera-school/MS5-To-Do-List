import React from "react";
import { LoginMenu, RegisterMenu, UserProfile } from "../components";

export const accountMenuMap = {
	login: <LoginMenu />,
	register: <RegisterMenu />,
	logged: <UserProfile />
};

