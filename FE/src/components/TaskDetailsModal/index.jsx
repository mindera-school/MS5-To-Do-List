import React, { useEffect, useState } from "react";
import { BiEdit, BiSave } from "react-icons/bi";
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io";
import TaskTagsList from "../TaskTagsList";
import AddCommentForm from "./AddCommentForm";
import CommentBox from "./CommentBox";
import { BoxHeader, CustomLine, DateInput, DescriptionContainer, HorizontalLine, InnerBox, InnerHeader, InnerTitle, OptionTitles, OuterBox, TagsContainer, TaskDescInput, TaskInfo, Wrapper } from "./styles";



function TaskDetailsModal({ task, display, setDisplay }) {
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);
	const [taskComments, setTaskComments] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(task.title);
	const [date, setDate] = useState(task.date);
	const [description, setDescription] = useState(task.description);

	function manageClose() {
		setIsOverlayVisible(isOverlayVisible ? false : true);
		setDisplay(false);
	}

	const updateTaskComments = (newComment) => {
		const newElement = { description: newComment };
		setTaskComments([...taskComments, newElement]);
	};

	useEffect(() => {
		setTitle(task.title);
		setDate(task.date);
		setDescription(task.description);
		fetch("http://localhost:8086/todo/comments")
			.then(r => r.json())
			.then(r => setTaskComments(r));
	}, [display, task]);

	return <>
		<Wrapper onClick={manageClose} display={display}>
			<OuterBox onClick={(e) => e.stopPropagation()}>
				<BoxHeader>
					<button onClick={manageClose}><IoMdClose size={25} /></button>
					<button onClick={() => setIsEditing(isEditing ? false : true)}>
						{isEditing ? <BiSave size={25} /> : <BiEdit size={25}></BiEdit>}
					</button>
				</BoxHeader>
				<InnerBox>
					<InnerHeader>
						<InnerTitle readOnly={isEditing ? false : true} value={title} onChange={(e) => setTitle(e.target.value)}></InnerTitle>
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
							<DateInput><input type="date" readOnly={isEditing ? false : true} value={date} onChange={(e) => setDate(e.target.value)}></input></DateInput>
						</CustomLine>
						<CustomLine>
							<span>Tags:</span>
							<TagsContainer><TaskTagsList listUrl={task.tagsURL} /><button>+ Add tag</button></TagsContainer>
						</CustomLine>
					</TaskInfo>
					<HorizontalLine />
					<DescriptionContainer>
						<h2>Description</h2>
						<TaskDescInput readOnly={isEditing ? false : true} value={description} onChange={(e) => setDescription(e.target.value)}></TaskDescInput>
					</DescriptionContainer>
					<HorizontalLine />
					<CommentBox comments={taskComments} ></CommentBox>
				</InnerBox>
				<AddCommentForm taskId={task.taskId} updateComments={updateTaskComments}></AddCommentForm>
			</OuterBox>
		</Wrapper>
	</>;
}

export default TaskDetailsModal;
