//Oppgave a
const priceSum = 857;
const discountNum = 0.25;
const tipNum = 0.1;

//Oppgave b

/*Jeg antar at tipsen blir regnet ut før rabatten er påført*/

let totalPrice = (priceSum - (discountNum*priceSum) + (tipNum*priceSum));

//Oppgave c

const personNum = 5;
const pricePerPerson = (totalPrice/personNum).toFixed(2);

console.log("Antall personer: " + personNum);
console.log("Pris per person: " + pricePerPerson + "kr");