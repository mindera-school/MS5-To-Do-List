import React, { useEffect, useState } from "react";
import { Comment, CommentContainer } from "./styles";

function CommentBox({ commentsUrl }) {
	const [commentsList, setCommentsList] = useState([]);

	useEffect(() => {
		fetch(commentsUrl)
			.then(r => r.json())
			.then(r => setCommentsList(r));
	}, []);

	return <>
		<CommentContainer>
			<h2>Comments</h2>
			{commentsList.map((e, i) => {
				return <Comment key={i}>{e.description}</Comment>;
			})}
		</CommentContainer>

	</>;
}

export default CommentBox;
