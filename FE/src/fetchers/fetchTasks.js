const taskFetcher = (userId) => fetch(`http://localhost:8086/todo/tasks/preview/${userId}`)
    .then(response => response.json());

export default taskFetcher;
