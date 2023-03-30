import React from "react";
import { Comment, CommentContainer } from "./styles";

function CommentBox({ comments }) {
	return <>
		<CommentContainer>
			<h2>Comments</h2>
			{comments?.map((e, i) => {
				return <Comment key={i}>{
					e.description
				}</Comment>;
			})}
		</CommentContainer>
	</>;
}

export default CommentBox;
