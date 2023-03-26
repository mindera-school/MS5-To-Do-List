import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io";
import Overlay from "../Overlay";
import TaskTagsList from "../TaskTagsList";
import { BoxHeader, DescriptionContainer, Divider, HorizontalLine, InnerBox, InnerHeader, InnerTitle, OptionTitles, OuterBox, TaskInfo } from "./styles";


function TaskDetailsModal({ listUrl }) {
	const [isOverlayVisible, setIsOverlayVisible] = useState(true);
	const [isModalVisible, setisModalVisible] = useState(true);

	function manageClose() {
		setIsOverlayVisible(isOverlayVisible ? false : true);
		setisModalVisible(isModalVisible ? false : true);
	}

	//if isModal false, do not run useEffect

	return <>
		<OuterBox display={isModalVisible} >
			<BoxHeader>
				<button onClick={manageClose}><IoMdClose size={25} /></button>
				<button >
					<BiEdit size={25}></BiEdit>
				</button>
			</BoxHeader>
			<InnerBox>
				<InnerHeader>
					<InnerTitle>Task 3</InnerTitle>
					<OptionTitles>
						<span>Add Sub Task</span>
						<button><IoIosAddCircleOutline color="white" size={20} /></button>
					</OptionTitles>
				</InnerHeader>
				<TaskInfo>
					<Divider>
						<span>Sub Tasks:</span>
						<span>Status:</span>
						<span>End Date:</span>
						<span>Tags:</span>
					</Divider>
					<Divider>
						<span>0</span>
						<span>To Do</span>
						<span>28/02/2023</span>
						<span><TaskTagsList listUrl={""} /><button>+ Add tag</button></span>
					</Divider>
				</TaskInfo>
				<HorizontalLine />
				<DescriptionContainer>
					<h2>Description</h2>
					<h5>asdasdjhashjs jahsjd ajhsjk hakjsh asjhdk jasjh jhkasjhkjsajash jhsakjd kjashdj kjasho sdkjfk alkjl hdkjhlk</h5>
				</DescriptionContainer>
				<HorizontalLine />
			</InnerBox>
		</OuterBox>
		<Overlay handler={manageClose} display={isOverlayVisible} />
	</>;
}

export default TaskDetailsModal;
