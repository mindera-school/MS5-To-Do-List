import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import Overlay from "../Overlay";
import { BoxHeader, OuterBox } from "./styles";


function TaskDetailsModal() {
	const [isOverlayVisible, setIsOverlayVisible] = useState(true);
	const [isModalVisible, setisModalVisible] = useState(true);

	function manageClose() {
		setIsOverlayVisible(isOverlayVisible ? false : true);
		setisModalVisible(isModalVisible ? false : true);
	}

	return <>
		<OuterBox display={isModalVisible} >
			<BoxHeader>
				<button onClick={manageClose}><IoMdClose size={25} /></button>
				<button >
					<BiEdit size={25}></BiEdit>
				</button>
			</BoxHeader>
		</OuterBox>
		<Overlay handler={manageClose} display={isOverlayVisible} />
	</>;
}

export default TaskDetailsModal;
