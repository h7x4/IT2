
/* Hardcoded participant list */
let participants = [
    {
        name: "Harald",
        age: "33",
        results: [undefined, undefined, undefined],
        resultSum: 0
    }, {
        name: "Borghild",
        age: "25",
        results: [undefined, undefined, undefined],
        resultSum: 0
    }, {
        name: "Ola",
        age: "12",
        results: [undefined, undefined, undefined],
        resultSum: 0
    }, {
        name: "Knut",
        age: "62",
        results: [undefined, undefined, undefined],
        resultSum: 0
    }, {
        name: "Lise",
        age: "46",
        results: [undefined, undefined, undefined],
        resultSum: 0
    }
]

/* Add HTML DOM reference variables */
const graphicsBox = document.getElementById("graphics");

const addParticipantForm = document.getElementById("addParticipantForm");
const nameRegistrationInput = document.getElementById("nameRegistration");
const ageRegistrationInput = document.getElementById("ageRegistration");
const addParticipantButton = document.getElementById("addParticipant");

const updateResultsForm = document.getElementById("updateResultsForm");
const nameSelector = document.getElementById("nameSelector");
const activity1Input = document.getElementById("activity1");
const activity2Input = document.getElementById("activity2");
const activity3Input = document.getElementById("activity3");
const updateResultsButton = document.getElementById("updateResults");

const participantTable = document.getElementById("participants");
const participantTableHeaders = participantTable.innerHTML;

const printResultsButton = document.getElementById("printResultsButton");
const resultTable = document.getElementById("results");

/* Add event listeners */
addParticipantButton.addEventListener("click", addParticipant, false);
updateResultsButton.addEventListener("click", updateResults, false);
printResultsButton.addEventListener("click", printResults, false);
nameSelector.addEventListener("onchange", updateSelector, false);


/* Init HTML */
updateParticipants();

/* Oppdaterer HTML og selector med ny deltakerliste og score */
function updateParticipants() {

    /* Reset inner HTML data */
    participantTable.innerHTML = participantTableHeaders;
    nameSelector.innerHTML = "";
    
    for (participant in participants) {


        /* Update HTML */
        participantTable.innerHTML+=
        `<tr>` + 
        `<td>${participants[participant].name}</td>` +
        `<td>${participants[participant].age}</td>`;

        for (result in participants[participant].results) {
            if (participants[participant].results[result] != undefined) {
                participantTable.innerHTML += `<td>${participants[participant].results[result]}</td>`;
            }
        }
    
        participantTable.innerHTML += `</tr>`;

        /* Update selector */
        nameSelector.innerHTML += `<option value=${participant}>${participants[participant].name}</option>`

    }
}

/* Legger til deltaker og kjører updateParticipants */
function addParticipant(evt) {
    evt.preventDefault();

    participants = [...participants, {
        name: nameRegistrationInput.value,
        age: ageRegistrationInput.value,
        results: [undefined, undefined, undefined],
        resultSum: 0
    }]

    updateParticipants();

}

/* Redigerer poenglisten og kjører updateParticipants */
function updateResults(evt) {
    evt.preventDefault();

    const  participantNum = nameSelector.value;
    participants[participantNum].results[0] = activity1Input.value;
    participants[participantNum].results[1] = activity2Input.value;
    participants[participantNum].results[2] = activity3Input.value;

    updateParticipants();

}

/* Oppdaterer poengvelgerne etter valgt deltaker */
function updateSelector() {
    const participant = participants[nameSelector.value];
    if (participant.results[0] != undefined) {
        activity1Input.value = participant.results[0];
    }
    if (participant.results[1] != undefined) {
        activity2Input.value = participant.results[1];
    }
    if (participant.results[2] != undefined) {
        activity3Input.value = participant.results[2];
    }
}

/* Printer ut resultater */
function printResults() {

    /* Remove participants without full score */
    // const resultParticipants = participants.map(() =>)

    /* Sort participants by result */

    resultTable.innerHTML = "<tr>" +
        "<th>Plassering</th>" +
        "<th>Navn</th>" +
        "<th>Aktivitet 1</th>" +
        "<th>Aktivitet 2</th>" +
        "<th>Aktivitet 3</th>" +
        "<th>Total Poengsum</th>" +
        "</tr>"

}