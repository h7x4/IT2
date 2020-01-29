const taskArray = tasks.tasks;
const grid = document.getElementsByClassName("textboxGrid")[0];

for (i=0; i<taskArray.length; i++) {
    let mess = '<div class=linkElement>';
    mess += '<h2><a href="' + taskArray[i]["path"] + '">' + taskArray[i]["name"] + '</a></h2>';
    mess += '</div>';

    grid.innerHTML+=mess;
}