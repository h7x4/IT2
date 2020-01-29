/*Initialize variables */
let numbers = [0];
let statement1Counter = 0;
let statement2Counter = 0;

/*Add numbers to the array and check if the number is 6 or equal to/bigger than 50 */
for(i=0; i<1000; i++) {
    numbers[i] = Math.floor(Math.random()*101);
    if (numbers[i] == 6) {
        statement1Counter++;
    } else if (numbers[i] >= 50) {
        statement2Counter++;
    }
}

/*Output */
const statement1Box = document.getElementById("6s");
statement1Box.innerHTML = statement1Counter;

const statement2Box = document.getElementById("biggerThan50Amount");
statement2Box.innerHTML = statement2Counter;

const statement2Box2 = document.getElementById("biggerThan50Percent");
statement2Box2.innerHTML = ((statement2Counter/numbers.length)*100);