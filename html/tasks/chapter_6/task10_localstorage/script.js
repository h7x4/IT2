authorTextBox = document.getElementById("author");
titleTextBox = document.getElementById("title");
inputButton = document.getElementById("input");
sendLocalstorageButton = document.getElementById("send");
getLocalstorageButton = document.getElementById("get");
grid = document.getElementsByClassName("textboxGrid")[0]

inputButton.addEventListener("click", addTextBoxLocal, false);
sendLocalstorageButton.addEventListener("click", sendLocalstorage, false);
getLocalstorageButton.addEventListener("click", getLocalstorage, false);

function addTextBoxLocal() {
    addTextBox(authorTextBox.value, titleTextBox.value);
    authorTextBox.value = "";
    titleTextBox.value = "";
}

function addTextBox(author, title) {
    box = '<div class="textboxGridElement">';
    box+= '<h2>' + author + '</h2>';
    box += '<p>' + title + '</p>';
    box += '</div>';
    grid.innerHTML += box;
}

function sendLocalstorage() {
    const elements = document.getElementsByClassName("textboxGridElement");

    // Make array of objects that contain title and author, and send to localstorage
    let objectArray = [];
    for (i=0; i<elements.length; i++) {
        let author = elements[i].querySelector("h2").innerHTML;
        let title = elements[i].querySelector("p").innerHTML;
        objectArray[i] = {author: author, title: title};
    }
    localStorage.setItem('messages', JSON.stringify(objectArray));
    grid.innerHTML = "";
}

function getLocalstorage() {

    let objectArray = JSON.parse(localStorage.getItem('messages'));
    for (i=0; i<objectArray.length; i++) {
        addTextBox(objectArray[i].author, objectArray[i].title);
    }
}
