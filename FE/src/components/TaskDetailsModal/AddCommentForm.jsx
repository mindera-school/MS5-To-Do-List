import React, { useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { CenteredForm, CommentButton, CommentInput } from "./styles";


function sendComment(comment, taskId) {
	if (comment === "") {
		console.log("Data is empty");
		return;
	}
	const data = {
		description: comment,
		taskId: taskId
	};
	fetch("http://localhost:8086/todo/comments/create-comment", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: data
	});
}

// Missing Add comment Post
function AddCommentForm({ taskId }) {
	const [inputContent, setInputContent] = useState("");

	return (
		<CenteredForm>
			<CommentInput value={inputContent} onChange={(e) => { setInputContent(e.target.value); }} />
			<CommentButton onClick={(e) => {
				e.preventDefault();
				sendComment(inputContent, taskId);
			}}>
				<BiCommentAdd size={25} />
			</CommentButton>
		</CenteredForm>
	);
}

export default AddCommentForm;
