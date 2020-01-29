var postData = document.getElementById("postData");
var postText = document.getElementById("postText");
var charNum = document.getElementById("charNum");
var captchaDate = document.getElementById("date");
var dateError = document.getElementById("dateError");
var captchaText = document.getElementById("captchaQuestion");
var captchaAnswer = document.getElementById("captchaAnswer");
var captchaError = document.getElementById("captchaError");

let captchaNum;

captchaText.onload = generateCaptcha();

postData.onsubmit=function(evt){
    evt.preventDefault();

    if (!checkCaptcha()) {
        captchaError.style.visibility = "visible";
        generateCaptcha();
        return false;
    }
    if (!checkDate()) {
        dateError.style.visibility = "visible";
        return false;
    }

    clearPost();
    
}

postText.oninput=function(){
charNum.innerHTML = postText.value.length;
}


function generateCaptcha() {
    let Num1 = Math.ceil(Math.random()*5);
    let Num2 = Math.ceil(Math.random()*5);
    captchaNum = Num1+Num2;
    captchaText.innerHTML = (String(Num1) + " + " + String(Num2));
}

function checkCaptcha() {
    return (captchaAnswer.value == captchaNum) ? true : false;
}

function checkDate() {
    var today = new Date();

    var month = String(today.getMonth()+1);
    if (month.length != 2) {
        month = "0" + month;
    }

    var date = today.getFullYear() + "-" + month + "-" + today.getDate();
    return (date == captchaDate.value) ? true : false;
}

function clearPost() {
    postText.value = "";
    captchaError.style.visibility = "hidden";
    dateError.style.visibility = "hidden";
    date.value = "";
    captchaAnswer.value = "";
    charNum.innerHTML = "0";
    generateCaptcha();
}