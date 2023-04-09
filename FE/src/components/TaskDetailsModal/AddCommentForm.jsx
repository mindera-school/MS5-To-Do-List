import React, { useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { useAppContext } from "../../context";
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

function AddCommentForm({ taskId, updateComments }) {
	const [inputContent, setInputContent] = useState("");
	const theme = useAppContext().themeMode;

	return (
		<CenteredForm theme={theme}>
			<CommentInput theme={theme} value={inputContent} onChange={(e) => { setInputContent(e.target.value); }} />
			<CommentButton theme={theme} onClick={(e) => {
				e.preventDefault();
				updateComments(inputContent);
				sendComment(inputContent, taskId);
				setInputContent("");
			}}>
				<BiCommentAdd size={25} />
			</CommentButton>
		</CenteredForm>
	);
}

export default AddCommentForm;
