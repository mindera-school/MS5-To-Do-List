const description = document.getElementById("value");
const dt = document.getElementById("date");
const tit = document.getElementById("title");
document.getElementById("form").addEventListener("submit", (e) => e.preventDefault());

const edit = (item, field) => {
    let edit = prompt();
    container[container.indexOf(item)][item] = edit;
    localStorage.setItem("container", JSON.stringify(container));
}

let list = document.getElementById("list");
let container = (JSON.parse(localStorage.getItem("container")) || []);

//addItens
const addItem = (task) => {
    if (task[title] === "" || task[description] === "" || task[date] === "") {
        return;
    }


    let item = document.createElement("li");
    let des = document.createElement("h3");
    let tit = document.createElement("span");
    let dt = document.createElement("span");
    let check = document.createElement("input");
    check.type = "checkbox";
    des.innerHTML = task.description;
    tit.innerHTML = task.title;
    check.addEventListener("input", () => {
        if (check.checked) {
            item.style.opacity = "50%";
            item.style.textDecoration = "line-through";
            task.checked = true;
            localStorage.setItem("container", JSON.stringify(container));
            return;
        }
        item.style.opacity = "100%";
        item.style.textDecoration = "none";
        task.checked = false;
        localStorage.setItem("container", JSON.stringify(container));

    });
    des.addEventListener("click", () => edit(des, "description"));
    item.appendChild(des);
    tit.addEventListener("click", () => edit(tit, "title"));
    item.appendChild(check);
    item.appendChild(tit);
    dt.addEventListener("click", () => edit(dt, "date"));
    item.appendChild(dt);
    let button = document.createElement("button");
    button.innerHTML = "x";
    button.addEventListener("click", () => {

        list.removeChild(item);
        container.splice(container.indexOf(value), 1);

        localStorage.setItem("container", container);
    }
    );

    item.appendChild(button);
    list.appendChild(item);
    return {
        check: check,
        item: item
    }
}

//show the items in storage
container.forEach(e => {
    let item = addItem(e);
    if (e.checked) {
        item.check.checked = true;
        item.item.style.opacity = "50%";
        item.item.style.textDecoration = "line-through";
    }
});

//add items on button
document.getElementById("add").addEventListener("click", () => {
    let value = description.value;
    let date = dt.value;
    let title = tit.value;
    if (title === "" || description === "" || date === "") {
        alert("all fields are required");
        return;
    }
    let itemObj = {
        title: title,
        description: value,
        date: date,
        checked: false
    }
    addItem(itemObj);

    // container.push(JSON.stringify(itemObj));
    container = [itemObj, ...container];

    console.log(typeof container);
    localStorage.setItem("container", JSON.stringify(container));

});

//menu
document.getElementById("openMenu").addEventListener("click", () => {
    let menu = document.getElementById("menu");
    if (menu.innerHTML != "") {
        menu.innerHTML = "";
        return
    }
    //add buttons
    const addButtons = document.createElement("div")
    addButtons.id = "addButtons";

    //add first
    const addFirst = document.createElement("button");
    addFirst.innerHTML = "Add first";
    addFirst.addEventListener("click", () => {
        container.splice(0, 0, {
            title: tit.value,
            description: description.value,
            date: dt.value,
            checked: false
        });
        updateList();
    });
    addButtons.appendChild(addFirst);

    //add random
    const addRandom = document.createElement("button");
    addRandom.innerHTML = "Add random";
    addRandom.addEventListener("click", () => {
        let number = Math.floor(Math.random() * container.length);
        container.splice(number, 0, {
            title: tit.value,
            description: description.value,
            date: dt.value,
            checked: false
        });
        updateList();
    });
    addButtons.appendChild(addRandom);

    menu.appendChild(addButtons);
    //delete buttons
    const deleteButtons = document.createElement("div");
    deleteButtons.id = "delete";

    //delete all items
    const deleteAll = document.createElement("button");
    deleteAll.innerHTML = "Remove all";
    deleteAll.addEventListener("click", () => {
        container = [];
        localStorage.setItem("container", container);
        list.remove();
        list = document.createElement("ul");
        document.getElementById("items").appendChild(list);
    });
    deleteButtons.appendChild(deleteAll);

    //remove first
    const removeFirst = document.createElement("button");
    removeFirst.innerHTML = "Remove first";
    removeFirst.addEventListener("click", () => {
        container.splice(0, 1);
        localStorage.setItem("container", container);
        list.removeChild(list.firstChild);
    })
    deleteButtons.appendChild(removeFirst);

    //remove last
    const removeLast = document.createElement("button");
    removeLast.innerHTML = "Remove last";
    removeLast.addEventListener("click", () => {
        container.splice(container.length - 1, 1);
        localStorage.setItem("container", container);
        list.removeChild(list.lastChild);
    });
    deleteButtons.appendChild(removeLast);
    menu.appendChild(deleteButtons);

    //sort buttons
    const sortButtons = document.createElement("div");
    deleteButtons.id = "sort";

    //sortA-Z
    const sortAZ = document.createElement("button");
    sortAZ.innerHTML = "Sort A-Z";
    sortAZ.addEventListener("click", () => {
        container.sort();
        localStorage.setItem("container", container);
        list.remove();
        updateList();

    });
    sortButtons.appendChild(sortAZ);

    //sort Z-A
    const sortZA = document.createElement("button");
    sortZA.innerHTML = "Sort Z-A";
    sortZA.addEventListener("click", () => {
        container.sort();
        container.reverse();
        updateList();
    });
    sortButtons.appendChild(sortZA);

    //sort reverse
    const reverse = document.createElement("button");
    reverse.innerHTML = "Sort reverse";
    reverse.addEventListener("click", () => {
        container.reverse();
        updateList();

    });
    sortButtons.appendChild(reverse);

    //Random sort
    const random = document.createElement("button")
    random.innerHTML = "Randomizer";
    random.addEventListener("click", () => {
        container.sort(() => { return 0.5 - Math.random() });
        updateList();
    });
    sortButtons.appendChild(random);
    menu.appendChild(sortButtons);
});

function updateList() {
    localStorage.setItem("container", JSON.stringify(container));
    list.remove();
    list = document.createElement("ul");
    document.getElementById("items").appendChild(list);
    container.forEach(e => addItem(e));
}

