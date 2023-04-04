const tagFetcher = (userId) => fetch(`http://localhost:8086/todo/tags/v1/users/${userId}`)
	.then(response => response.json());

export default tagFetcher;
