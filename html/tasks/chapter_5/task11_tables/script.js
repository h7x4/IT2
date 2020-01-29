const table = document.getElementById("table");
const globalAmount = document.getElementById("amount");
const globalRange = document.getElementById("range");
const reloadButton = document.getElementById("reload");

const listHeader = table.innerHTML;

globalAmount.addEventListener("input", updateList, false);
globalRange.addEventListener("input", updateList, false);
reloadButton.addEventListener("click", updateList, false);

function updateList() {
	addToList(generateNums(globalAmount.value, globalRange.value), table);
}

function addToList(numArray, table) {
	rows = '';
	for (i in numArray) {
		rows += '<tr><td>' + numArray[i] + '</td></tr>';
	}
	table.innerHTML = listHeader + rows;
}

function generateNums(amount, range) {
	let array = [];
	for (i=0; i<amount; i++) {
		array[i] = Math.ceil(Math.random()*range);
	}
	return array;
}

function sumTable(table) {
	
}