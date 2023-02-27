const searchBar = document.getElementById("searchBar");
const closeSearchBar = document.getElementById("eraseSearchBarBtn");

searchBar.addEventListener("input", () => {
    stateList.innerHTML = null;
    storageList.forEach((e) => {
        if (e.taskName.includes(searchBar.value) || e.description.includes(searchBar.value)) {
            createOnPg(e.taskName, e.date, e.tag, e.id);
        }
    });
});

eraseSearchBarBtn.addEventListener("click", () => {
    searchBar.value = null;
    updatePage();
});