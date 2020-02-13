
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
addParticipantForm.addEventListener("submit", addParticipant, false);
updateResultsForm.addEventListener("submit", updateResults, false);
printResultsButton.addEventListener("click", printResults, false);
nameSelector.addEventListener("change", updateSelector, false);


/* Init HTML */
updateParticipants();

/* Oppdaterer HTML og selector med ny deltakerliste og score */
function updateParticipants() {

    /* Reset inner HTML data */
    participantTable.innerHTML = participantTableHeaders;
    nameSelector.innerHTML = "";
    
    for (participant in participants) {


        /* Update HTML table from participant array */
        let newTable =
        `<tr>` + 
        `<td>${participants[participant].name}</td>` +
        `<td>${participants[participant].age}</td>`;

        for (result in participants[participant].results) {
            if (participants[participant].results[result] != undefined) {
                newTable += `<td>${participants[participant].results[result]}</td>`;
            }
        }

        /* Add sum to object and add to table if all 3 results exist */
        if (!participants[participant].results.includes(undefined)) {
            participants[participant].sum = participants[participant].results.reduce((a, b) => parseInt(a) + parseInt(b), 0);
            newTable += `<td>${participants[participant].sum}</td>`;
        }

        newTable += `</tr>`;
        participantTable.innerHTML += newTable;

        /* Update selector */
        nameSelector.innerHTML += `<option value=${participant}>${participants[participant].name}</option>`

    }
    updateSelector();
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

/* Redigerer poenglisten til den gjeldende deltakeren og kjører updateParticipants */
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
    activity1Input.value = (participant.results[0] == undefined) ? "" : participant.results[0]; //Cant set number to undefined -> Set ""
    activity2Input.value = (participant.results[1] == undefined) ? "" : participant.results[1];
    activity3Input.value = (participant.results[2] == undefined) ? "" : participant.results[2];
}

/* Printer ut resultater */
function printResults() {

    /* Remove participants without full score */
    let resultParticipants = participants.filter((participant) => participant.sum > 0);

    /* Sort participants by result */
    resultParticipants.sort((a, b) => b.sum-a.sum);

    /* Add to HTML result table*/
    resultTable.innerHTML = "<tr>" +
        "<th>Plassering</th>" +
        "<th>Navn</th>" +
        "<th>Aktivitet 1</th>" +
        "<th>Aktivitet 2</th>" +
        "<th>Aktivitet 3</th>" +
        "<th>Total Poengsum</th>" +
        "</tr>"

    for (participant in resultParticipants) {
        resultTable.innerHTML += `<tr>` +
        `<td>${parseInt(participant) + 1}</td>` +
        `<td>${resultParticipants[participant].name}</td>` +
        `<td>${resultParticipants[participant].results[0]}</td>` +
        `<td>${resultParticipants[participant].results[1]}</td>` +
        `<td>${resultParticipants[participant].results[2]}</td>` +
        `<td>${resultParticipants[participant].sum}</td>` +
        `</tr>`;
    }

}