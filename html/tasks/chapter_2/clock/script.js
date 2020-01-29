window.onload = updateTime;

function updateTime() {
    var time = new Date();
    var timeBox = document.getElementById("pointOfTime");
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    timeBox.innerHTML = hours+":"+minutes+":"+seconds;

/*  setTimeout(updateTime, 1000);   */
}

setInterval(updateTime, 1000);
