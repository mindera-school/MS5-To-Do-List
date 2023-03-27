import React from "react";
import { BiCommentAdd } from "react-icons/bi";
import { CommentButton, CommentInput } from "./styles";

function AddCommentForm() {
	return (
		<form>
			<CommentInput />
			<CommentButton>
				<BiCommentAdd size={25} />
			</CommentButton>
		</form>
	);
}

export default AddCommentForm;
