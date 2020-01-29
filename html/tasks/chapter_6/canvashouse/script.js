const houseC = document.getElementById("House");
const colorC = document.getElementById("color");
const colorPick = document.getElementById("colorPicker");

/*Define dimensions of canvas */
houseC.width = 480;
houseC.height = 480;
colorC.width = 480;
colorC.height = 480;

/*Initialize canvas contexts */
const house = houseC.getContext("2d");
const color = colorC.getContext("2d");

/*Define points for house */
const housePoints = [
    {x: houseC.width/2, y: houseC.height/3},
    {x: houseC.width/3, y: houseC.height/2},
    {x: houseC.width/3, y: houseC.height/4*3},
    {x: houseC.width/3*2, y: houseC.height/4*3},
    {x: houseC.width/3*2, y: houseC.height/2}
];

/*Initialize script */
clearCanvas();
drawHouseOutline();
drawHouse("#ffffff");
drawColors();


colorC.addEventListener("click", chooseColor, false);

/*Changes color of the house depending on clicked color on colorCanvas */
function chooseColor(evt) {
    x = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; //BUG: goes from -1 to 479
    y = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;

    x -= colorC.offsetLeft;
    y -=colorC.offsetTop;

    if (((x>colorC.width/5) && (x<colorC.width/5*2)) && ((y>colorC.height/5*2) && (y<colorC.height/5*3))) {
        drawHouse("#ff0000");
    }
    if (((x>colorC.width/5*2) && (x<colorC.width/5*3)) && ((y>colorC.height/5*2) && (y<colorC.height/5*3))) {
        drawHouse("#00ff00");
    }
    if (((x>colorC.width/5*3) && (x<colorC.width/5*4)) && ((y>colorC.height/5*2) && (y<colorC.height/5*3))) {
        drawHouse("#0000ff");
    }
}

/*Add color from colorPicker to house */
colorPick.addEventListener("input", pickColor, false);
function pickColor() {
    drawHouse(colorPick.value);
}

/*Fills canvases with white at init*/
function clearCanvas() {
    house.beginPath();
    house.fillStyle='#ffffff';
    house.fillRect(0, 0, houseC.width, houseC.height);
    house.stroke();

    color.beginPath();
    color.fillStyle='#ffffff';
    color.fillRect(0, 0, colorC.width, colorC.height);
    color.stroke(); 
}

/*Draws the color boxes in colorCanvas at init*/
function drawColors() {

    for(i=0; i<3; i++) {
        color.beginPath();
        switch (i) {
            case 0:
                color.fillStyle="#ff0000";
                break;
            case 1:
                color.fillStyle="#00ff00";
                break;
            case 2:
                color.fillStyle="#0000ff";
                break;
        }
        x = colorC.width/5*(i+1);
        y = colorC.height/5*2;
        size = colorC.width/5;
        color.fillRect(x, y, size, size);
        color.stroke();
    }
    
}

/*Draws the outline of the house at init */
function drawHouseOutline() {
    house.beginPath();
    house.lineJoin = "round";
    house.strokeStyle = '#000000';
    house.lineWidth = 20;
    for (points in housePoints) {
        house.lineTo(housePoints[points].x, housePoints[points].y);
    }
    house.closePath();
    house.stroke();
}

/*Fills the house with a color*/
function drawHouse(color) {
    house.beginPath();
    house.fillStyle=color;
    for (points in housePoints) {
        house.lineTo(housePoints[points].x, housePoints[points].y);
    }
    house.fill();
}