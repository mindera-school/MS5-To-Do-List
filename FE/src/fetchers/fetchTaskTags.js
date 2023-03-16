const taskTagsFetcher = listUrl =>
    fetch(listUrl)
        .then(response => response.json());


export default taskTagsFetcher;