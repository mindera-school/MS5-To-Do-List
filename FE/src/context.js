import { createContext, useCallback, useContext, useState } from "react";
import { accountMenuMap } from "./configs/accountMenu.jsx";

export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const mockUser = {
	userId: 1,
	profileImage: null,
	firstName: "Adan",
	lastName: "Oliveira",
	username: "gorillaz",
	email: "adank69@gmail.com",
	tasksPreviewsURL: "https://todo/tasks/user/1"
};

export const useCreateAppContext = () => {
	const [appState, setAppState] = useState(
		{
			menuType: "login",
			currentUser: null
		}
	);

	const setMenuType = useCallback((type) => {
		setAppState((oldState) => ({
			...oldState,
			menuType: type
		}
		));
	}
		, []);

	const setCurrentUser = useCallback((user) => {
		setAppState((oldState) => ({
			...oldState,
			currentUser: user,
			menuType: user ? accountMenuMap.logged.key : accountMenuMap.login.key
		}
		));
	}
		, []);

	return {
		...appState,
		setMenuType,
		setCurrentUser
	};
};


