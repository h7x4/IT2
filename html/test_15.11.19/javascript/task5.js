/*Input and variables */
const routePrice = [150, 250, 50];
const ageDiscount = [0.0, 0.5, 1.0, 0.3];

let route = prompt("Hvilken reisestrekning skal du reise? Skriv inn et tall \n 1 = By-Sjø \n 2 = Sjø-Fjell \n 3 = Fjell-By", "1");

let pris = 0;
let totalsum = 0;

let age = parseInt(prompt("Hvor mange år er du?"));

/*Jeg antar at 0-2 betyr fra og med 0 til (ikke med) 2 */

/*Process what discount should be chosen based on age */
if ( age >= 0 && age < 2) {
    discountNum = 0;
} else if (age < 16) {
    discountNum = 1;
} else if (age < 65) {
    discountNum = 2;
} else if (age >= 65) {
    discountNum = 3;
}

/*I dette punktet i pseudokoden står det at
* den rabatterte prisen ut ifra alder og rute
* skal stå i variabel "pris", men jeg går ut
* ifra at "pris" er ment som standard pris og at
* "totalsum" er den rabatterte prisen.
*/

pris = routePrice[route];
totalsum = routePrice[route]*ageDiscount[discountNum];


/*Output */
let ageBox = document.getElementById("age");
ageBox.innerHTML = age;

let standardPriceBox = document.getElementById("standardPrice");
standardPriceBox.innerHTML = pris;

let discountBox = document.getElementById("discount");
discountBox.innerHTML = (1.0-ageDiscount[discountNum])*100;

let endPriceBox = document.getElementById("endPrice");
endPriceBox.innerHTML = totalsum;