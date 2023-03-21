import { createContext, useCallback, useContext, useState } from "react";

export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export const useCreateAppContext = () => {
	const [appState, setAppState] = useState(
		{
			menuType: "login"
		}
	);

	const setMenuType = useCallback((type) => {
		setAppState((oldState) => ({
			...oldState,
			menuType: type
		}
		));
	}, []);

	return {
		...appState,
		setMenuType
	};
};


