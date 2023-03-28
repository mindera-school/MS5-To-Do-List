import React from "react";
import { BiCommentAdd } from "react-icons/bi";
import { CommentButton, CommentInput, CenteredForm } from "./styles";


// Missing Add comment Post
function AddCommentForm({ taskId }) {
	return (
		<CenteredForm>
			<CommentInput />
			<CommentButton>
				<BiCommentAdd size={25} />
			</CommentButton>
		</CenteredForm>
	);
}

export default AddCommentForm;
