const taskFetcher = (userId) => fetch(`https://todo/tasks/user/${userId}`)
.then(response => response.json());

export default taskFetcher;