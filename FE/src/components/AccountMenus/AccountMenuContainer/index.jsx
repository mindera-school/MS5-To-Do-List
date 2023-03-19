import React, { useContext, useState } from "react";
import AccTypeContext from "../../../App.js";
import Drawer from "../../Drawer";
import LoginMenu from "../LoginMenu/index.jsx";


export default function AccountMenuContainer({ rightTabVisible, rightSideHandler }) {
	const accMenuType = useContext(AccTypeContext);
	const [menuType, setMenuType] = useState(accMenuType);

	return <>
		<Drawer
			tab={<LoginMenu></LoginMenu>}
			side="0"
			display={rightTabVisible}
			handler={rightSideHandler}
		/>
	</>;
}
