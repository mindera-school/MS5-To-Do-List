import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BiMove } from "react-icons/bi";
import TaskPreview from "./index";
import { SubtasksList } from "./styled-components";

function SubtaskList({ list, show }) {
	const [stateList, setStateList] = useState(list);

	function handleOnDragEnd(result) {
		if (result.destination === "") {
			return;
		}
		const tempTasks = Array.from(stateList);
		const [reorderedTask] = tempTasks.splice(result.source.index, 1);
		tempTasks.splice(result.destination.index, 0, reorderedTask);
		const updatedPositionTasks = tempTasks.map((e, i) => {
			return { ...e, position: i };
		});
		setStateList(updatedPositionTasks);
	}

	useEffect(() => {
		setStateList(list);
	}, [list]);

	const subtasks = stateList.map((e, index) => {
		return (<Draggable key={e.taskId} draggableId={e.taskId.toString()} index={index}>
			{(providedDraggable) => (
				<div
					{...providedDraggable.draggableProps}
					ref={providedDraggable.innerRef}
				>
					<TaskPreview
						id={e.taskId}
						title={e.title}
						isDone={e.isDone}
						dueDate={e.date}
						isFavorite={e.isFavorite}
						position={e.position}
						tagsListUrl={e.tagsURL}
						isParent={false}
						fullTaskURL={e.fullTaskURL}
						dragger={
							<div {...providedDraggable.dragHandleProps}>
								<BiMove size={25} />
							</div>
						}
					></TaskPreview>
				</div>
			)}
		</Draggable>);
	});

	return <>
		<SubtasksList show={show}>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="subtaskList">
					{(providedDroppable) => (
						<div
							className="subtasksList"
							{...providedDroppable.droppableProps}
							ref={providedDroppable.innerRef}
						>
							{subtasks}
							{providedDroppable.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</SubtasksList>
	</>;
}

export default SubtaskList;
