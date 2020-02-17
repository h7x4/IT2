/* Initialize variables */

const randomData = [['I am', 'Array'], 'green', 3, true];
let newData = [];

/* Register HTML DOM elements by variables */

const getDataButton = document.getElementById('getDataButton');
const dataSpan = document.getElementById('dataSpan');
const dataTable = document.getElementById('dataTable');
const historyTable = document.getElementById('history');

/* Add event listeners */

getDataButton.addEventListener('click', getRandomDataEntry, false);

/* Init HTML */

for (const item in randomData) {
  const line = document.createElement('tr');
  dataTable.appendChild(line);

  const numberTd = document.createElement('td');
  numberTd.innerHTML = parseInt(item) + 1;
  line.appendChild(numberTd);

  const itemTd = document.createElement('td');
  itemTd.innerHTML = randomData[item];
  line.appendChild(itemTd);
}

/* Gets random Data Entry and adds it to  */
function getRandomDataEntry() {
  const randomNumber = Math.floor(Math.random() * randomData.length);
  const item = `${parseInt(randomNumber) + 1}. ${randomData[randomNumber]}`;
  dataSpan.innerHTML = item;
  newData.push(randomData[randomNumber]);
  updateHistory();
}

function updateHistory() {
  /* Clear table */
  historyTable.innerHTML = '';

  /* Add th */
  const th = document.createElement('th');
  th.innerHTML = 'Historikk';
  historyTable.appendChild(th);

  /* For each element, add tr and td */
  for (let index = 0; index < newData.length; index++) {
    const element = newData[index];

    const line = document.createElement('tr');
    historyTable.appendChild(line);

    const td = document.createElement('td');
    td.innerHTML = element;
    line.appendChild(td);
  }
}
