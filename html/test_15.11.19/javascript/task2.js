/*Input from user and convert to lower case*/
const firstName = prompt("Hva er fornavnet ditt?").toLowerCase();
const surname = prompt("Hva er etternavnet ditt?").toLowerCase();
const domain = prompt("Skriv inn et domenenavn", "eksempel.no").toLowerCase();


/*Combine the input and print it out*/
const email = firstName + "." + surname + "@" + domain;
console.log("Email: " + email);

/*Combine and add a random number between 1 and 100  with a little bit lower probability for 1 and 100*/
const mailNum = parseInt((Math.random() *100) +1);
const altEmail = firstName + "." + surname + mailNum + "@" + domain;
console.log ("Alternativ Email: " + altEmail);