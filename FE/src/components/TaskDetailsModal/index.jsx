import React, { useEffect, useState } from "react";
import { BiEdit, BiSave } from "react-icons/bi";
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io";
import { useAppContext, useTaskListContext } from "../../context.js";
import TaskTagsList from "../TaskTagsList";
import AddCommentForm from "./AddCommentForm";
import CommentBox from "./CommentBox";
import { BoxHeader, CustomLabel, CustomLine, DateInput, DescriptionContainer, HorizontalLine, InnerBox, InnerHeader, InnerTitle, OptionTitles, OuterBox, SaveBtn, SubtaskFormBox, SubtaskInput, TagsContainer, TaskDescInput, TaskInfo, Wrapper } from "./styles";

function TaskDetailsModal({ task, display, setDisplay }) {
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);
	const [taskComments, setTaskComments] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(task.title);
	const [date, setDate] = useState(task.date);
	const [description, setDescription] = useState(task.description);
	const currentUser = useAppContext().currentUser;
	const updateTask = useTaskListContext().updateTask;
	const addChildren = useTaskListContext().addChildrenToTask;
	const [isCreateSubOpen, setIsCreateSubOpen] = useState(false);
	const [subtaskTitle, setSubtaskTitle] = useState("");
	const [subtaskDate, setSubtaskDate] = useState("");
	const teupai = useTaskListContext();

	function saveSubtask() {
		const data = {
			title: subtaskTitle,
			description: "",
			date: subtaskDate.replaceAll("-", "/"),
			userId: currentUser === null ? null : currentUser.userId,
			parentId: task.taskId,
			//dps colocar aqui a posição no array de subtasks
			position: 0
		};

		if (currentUser === null) {
			addChildren(task.taskId, {
				...data,
				taskId: Date.now().toString(36)
			});
			return;
		}

		fetch("http://localhost:8086/todo/tasks/v1", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			redirect: "follow",
			referrerPolicy: "no-referrer",
		})
			.then(r => r.json())
			.then(r => {
				console.log(data);
				addChildren(task.taskId, {
					...data,
					taskId: r.id
				});

				if (r === undefined) {
					console.log("Couldn't add subtask");
				}
				console.log(teupai.subtasksList);
			})
			.catch(console.log("Couldn't connect"));

		setSubtaskDate("");
		setSubtaskTitle("");
	}

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
		if (display === true && task.commentsURL !== undefined) {
			fetch(task.commentsURL)
				.then(r => r.json())
				.then(r => setTaskComments(r));
		}
	}, [task.commentsURL, display, task]);

	const createDataObj = () => {
		return {
			taskId: task.taskId,
			title: title,
			description: description,
			isDone: task.isDone,
			date: date,
			isFavorite: task.isFavorite,
			disabled: false
		};
	};

	const saveEdition = (data) => {
		fetch(`http://localhost:8086/todo/tasks/v1/${task.taskId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(data)
		});
	};

	return <>
		<Wrapper onClick={manageClose} display={display}>
			<OuterBox onClick={(e) => e.stopPropagation()}>
				<BoxHeader>
					<button onClick={manageClose}><IoMdClose size={25} /></button>
					<button onClick={() => {
						if (isEditing) {
							const updatedTask = createDataObj();
							const id = task.taskId;
							if (currentUser !== null) {
								saveEdition(updatedTask);
							}
							updateTask(id, updatedTask);
						}
						setIsEditing(isEditing ? false : true);
					}}>
						{isEditing ? <BiSave size={25} /> : <BiEdit size={25}></BiEdit>}
					</button>
				</BoxHeader>
				<InnerBox>
					<InnerHeader>
						<InnerTitle readOnly={isEditing ? false : true} value={title} onChange={(e) => setTitle(e.target.value)}></InnerTitle>
						<OptionTitles>
							<span>Add Sub Task</span>
							<button><IoIosAddCircleOutline color="white" size={20} onClick={() => setIsCreateSubOpen(isCreateSubOpen ? false : true)} /></button>
						</OptionTitles>
						<SubtaskFormBox opened={isCreateSubOpen}>
							<CustomLabel>
								<span>Title of Subtask</span>
								<SubtaskInput value={subtaskTitle} onChange={(e) => setSubtaskTitle(e.target.value)}></SubtaskInput>
							</CustomLabel>
							<CustomLabel>
								<span>Due Date</span>
								<input type={"date"} value={subtaskDate} onChange={(e) => setSubtaskDate(e.target.value)}></input>
							</CustomLabel>
							<SaveBtn onClick={() => {
								setIsCreateSubOpen(false);
								saveSubtask();
							}}>
								<BiSave size={25} color={"white"} />
							</SaveBtn>
						</SubtaskFormBox>
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
							<DateInput readOnly={isEditing ? false : true}><input type="date" readOnly={isEditing ? false : true} value={date} onChange={(e) => setDate(e.target.value)}></input></DateInput>
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
