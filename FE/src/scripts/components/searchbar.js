const searchBar = document.getElementById("searchBar");
const closeSearchBar = document.getElementById("eraseSearchBarBtn");


//Only creates on page tasks which the name or description contains what value is on the search bar input
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