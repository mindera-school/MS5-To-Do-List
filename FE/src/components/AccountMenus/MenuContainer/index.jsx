import React, { useState } from "react";
import { useAppContext } from "../../../context";
import Drawer from "../../Drawer";



export default function AccountMenuContainer({ rightTabVisible, rightSideHandler, type }) {
	const [menuType, setMenuType] = useState();
	const x = useAppContext();

	console.log(x);
	return <>
		<Drawer
			position="0"
			display={rightTabVisible}
			handler={rightSideHandler}
		>{ }</Drawer>
	</>;
}

