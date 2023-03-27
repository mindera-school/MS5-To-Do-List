import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io";
import Overlay from "../Overlay";
import TaskTagsList from "../TaskTagsList";
import CommentBox from "./CommentBox";
import { BoxHeader, DescriptionContainer, Divider, HorizontalLine, InnerBox, InnerHeader, InnerTitle, OptionTitles, OuterBox, TaskInfo } from "./styles";


function TaskDetailsModal({ task }) {
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
					<h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum vitae justo in pellentesque. Fusce vitae sodales ligula, in euismod purus. Donec nec elit eros. Vestibulum condimentum augue sit amet mauris malesuada, at molestie turpis malesuada. Suspendisse vestibulum eleifend sapien dapibus eleifend. Donec dapibus libero vitae massa ornare mollis. Nullam aliquet ipsum nec mi pretium malesuada. Integer eu ante felis. Donec venenatis sem placerat, suscipit est vitae, auctor sem. Donec blandit vestibulum diam. Donec scelerisque interdum tempus. Aliquam lacinia, lorem ac ullamcorper lobortis, dui risus laoreet risus, ac tempor arcu nisl sed justo. Nullam faucibus nisi pharetra nulla euismod rhoncus. Aliquam lorem nibh, malesuada id nisl vel, suscipit molestie purus. Proin volutpat lorem ipsum.</h5>
				</DescriptionContainer>
				<HorizontalLine />
				<CommentBox commentsUrl="http://localhost:8086/todo/comments/1"></CommentBox>
			</InnerBox>
		</OuterBox>
		<Overlay handler={manageClose} display={isOverlayVisible} />
	</>;
}

export default TaskDetailsModal;
