const taskArray = tasks.tasks;
const grid = document.getElementsByClassName("textboxGrid")[0];

for (i=0; i<taskArray.length; i++) {

    const linkGridElement = document.createElement("div");
    linkGridElement.className = "linkGridElement";
    const path = taskArray[i]["path"];

    linkGridElement.addEventListener("click", function () {
        window.location.href = path;
    } )

    const h2 = document.createElement("h2");
    const link = document.createElement("a");
    link.href = taskArray[i]["path"];
    link.innerHTML = taskArray[i]["name"];

    h2.appendChild(link);
    linkGridElement.appendChild(h2);
    grid.appendChild(linkGridElement);
}