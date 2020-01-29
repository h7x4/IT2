const questions = [
    "Hvor mange centimeter er det i en meter", //Dette spørsmålet mangler spørsmålstegn med vilje
    "Hvor mange mennesker bor det i verden?",
    "Hvilke toner finnes i en C-dur skala?",
    "Hvem har verdensrekorden i 100-meter løping?"
];

/*Set a random question from "questions[]" into "questionbox" */
let questionBox = document.getElementById("question");
let randomNum = Math.floor((Math.random()*questions.length));
questionBox.innerHTML = questions[randomNum];

/*Check for question marks in the current question (no need to search at the last character as this is a one sentence question) */
if (!(questions[randomNum].includes("?"))){
    questionBox.style = "color: red";
    questionBox.innerHTML = "Spørsmålet kan ikke bli vist frem ettersom det mangler spørsmålstegn. Kontakt administrator.";
}

/*Button function */
function refresh(){
    window.location.assign(window.location.hostname); // Kilde: https://www.w3schools.com/js/js_window_location.asp
}

let refreshBut = document.getElementById("refreshButton");
refreshBut.onclick = refresh;