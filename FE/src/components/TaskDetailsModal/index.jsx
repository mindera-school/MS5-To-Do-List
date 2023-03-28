import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io";
import Overlay from "../Overlay";
import TaskTagsList from "../TaskTagsList";
import AddCommentForm from "./AddCommentForm";
import CommentBox from "./CommentBox";
import { BoxHeader, CustomLine, DescriptionContainer, Divider, HorizontalLine, InnerBox, InnerHeader, InnerTitle, OptionTitles, OuterBox, TagsContainer, TaskInfo } from "./styles";


function TaskDetailsModal({ task, display, setDisplay }) {
	const [isOverlayVisible, setIsOverlayVisible] = useState(true);

	function manageClose() {
		setIsOverlayVisible(isOverlayVisible ? false : true);
		setDisplay(false);
	}

	return <>
		<OuterBox display={display}>
			<BoxHeader>
				<button onClick={manageClose}><IoMdClose size={25} /></button>
				<button >
					<BiEdit size={25}></BiEdit>
				</button>
			</BoxHeader>
			<InnerBox>
				<InnerHeader>
					<InnerTitle>{task.title}</InnerTitle>
					<OptionTitles>
						<span>Add Sub Task</span>
						<button><IoIosAddCircleOutline color="white" size={20} /></button>
					</OptionTitles>
				</InnerHeader>
				<TaskInfo>
						<CustomLine>
							<span>Sub Tasks:</span>
							<span>0</span>
						</CustomLine>
						<CustomLine>
							<span>Status:</span>
							<span>{task.isDone ? "Completed" : "Still to do"}</span>
						</CustomLine>
						<CustomLine>
						<span>End Date:</span>
						<span>{task.date}</span>
						</CustomLine>
						<CustomLine>
						<span>Tags:</span>
						<TagsContainer><TaskTagsList listUrl={task.tagsURL} /><button>+ Add tag</button></TagsContainer>
						</CustomLine>
				</TaskInfo>
				<HorizontalLine />
				<DescriptionContainer>
					<h2>Description</h2>
					<h5>{task.description}</h5>
				</DescriptionContainer>
				<HorizontalLine />
				<CommentBox commentsUrl="http://localhost:8086/todo/comments/1"></CommentBox>
			</InnerBox>
			<AddCommentForm taskId={task.taskId}></AddCommentForm>
		</OuterBox>
		<Overlay handler={manageClose} display={display} />
	</>;
}

export default TaskDetailsModal;
