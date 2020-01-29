var canvas=document.getElementById("canvas");
 
document.getElementsByTagName("body")[0].style.margin="0cm";
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
 
const ctx = canvas.getContext("2d");
let canvasColor = '#000000';
let rectSize = 20;
 
 
rect(0,0,33,20);
rect(100,100,120,203);
 
 
function rect(x, y, length, height) {
    ctx.beginPath();
    ctx.rect(x, y, length, height);
    ctx.fillRect(x, y, length, height);
    ctx.stroke();
}
 
canvas.onclick = function(evt) {
    x = evt.clientX;
    y = evt.clientY;
    rect(x-(rectSize/2), y-(rectSize/2), rectSize, rectSize);
}
 
document.getElementsByTagName("body")[0].addEventListener('keydown', changeColor, false);
 
function changeColor(evt) {
    if (evt.key == "r") {
        canvasColor = '#ff0000'
    }
    if (evt.key == "B") {
        canvasColor = '#000000'
    }
    if (evt.key == "g") {
        canvasColor = '#00ff00'
    }
    if (evt.key == "b") {
        canvasColor = '#0000ff'
    }
    if (evt.key == "y") {
        canvasColor = '#ffff00'
    }
    if (evt.key == "+") {
        rectSize+=4;
    }
     
    if (evt.key == "-") {
        try {
            rectSize-=4;
            if (rectSize < 0) throw "rectSize too small"
        } catch(err) {
            rectSize+=4;
            console.error(err);
        }
    }
     
 
    ctx.strokeStyle = canvasColor;
    ctx.fillStyle = canvasColor;
}