import React from "react";
import { accountMenuMap } from "../../../configs/accountMenu";
import { useAppContext } from "../../../context";
import Drawer from "../../Drawer";


export default function AccountMenuContainer({ rightTabVisible, rightSideHandler }) {
	const menuType = useAppContext().menuType;
	console.log(menuType);

	return <>
		<Drawer
			position="0"
			display={rightTabVisible}
			handler={rightSideHandler}
		>{accountMenuMap[menuType].el}</Drawer>
	</>;
}

