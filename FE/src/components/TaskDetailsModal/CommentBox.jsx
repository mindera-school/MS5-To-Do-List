import React from "react";
import { useAppContext } from "../../context";
import { Comment, CommentContainer } from "./styles";

function CommentBox({ comments }) {
	const theme = useAppContext().themeMode;
	return <>
		<CommentContainer theme={theme}>
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
