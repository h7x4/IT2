/* https://www.youtube.com/watch?v=Mus_vwhTCq0 */





/*Debugging */
const person1 = { name: 'Tom', age:30};
const person2 = { name: 'Bernie', age:40};
const person3 = { name: 'Harry', age:35};

console.log('%c People', 'color: orange; font-weight: bold;');
console.log({person1, person2, person3});
console.debug('People in a table'); //Show verbose
console.table([person1, person2, person3]);

console.trace('Trace me');





/*String with variables */
let name = 'me'
console.log(`I am ${name}`);





/*Variable destructuring */
let parameter = {
    num1: 1,
    num2: 2,
    num3: 3,
    otherNums: [4,5,6]
};

function execute(parameter) {
    let {num1, num2, num3, otherNums} = parameter;
    console.log(`${num1}, ${num2} and ${num3} and even ${otherNums.join(' and ')}`);
}

execute({num1: 1, num2: 2, num3: 3, otherNums: [4, 5, 6]});





/*Spread syntax */
const species = {name: 'Pikachu'};
const stats = {hp: 40, attack:60, defense:45};

const pikachu = {...species, ...stats};

pokemon = ['Bulbasaur', 'Ivysaur', 'Venusaur'];
pokemon = [...pokemon, 'Charmander', 'Charmeleon', 'Charizard'];





/*Loops */
const orders = [199, 50, 123, 229, 40];

let total = 0; //Sum everything
let withTax = []; //Add tax to every price
let highValue = []; //Filter out the high value orders
for (let i=0; i<orders.length; i++) {
    
    //Reduce
    total+=orders[i];

    //Map
    withTax.push(orders[i]*1.1);

    //Filter
    if (orders[i] > 100) {
        highValue.push(orders[i]);
    }
}

console.log([total, withTax, highValue]);

//Reduce
total = orders.reduce((accumulatedValue, currentValue) => accumulatedValue + currentValue);

//Map
withTax = orders.map(v => v*1.1);

//Filter
highValue = orders.filter(v => v>100);

console.log([total, withTax, highValue]);