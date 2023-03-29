const taskFetcher = (userId) => fetch(`http://localhost:8086/todo/tasks/${userId}`)
    .then(response => response.json());

export default taskFetcher;
