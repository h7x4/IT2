// @ts-check

/* Initialize variables */

const data = [
  {
    name: 'Banana',
    data: [1,2,3,4,5]
  },
  {
    name: 'Apple',
    data: [3,2,5,6,2]
  }
];

Highcharts.setOptions(Highcharts.theme);

/* Register HTML DOM elements by variables */

const fruitForm = document.getElementById("fruitForm");
const bananas = document.getElementById("bananaInput");
const apples = document.getElementById("appleInput");
const table1 = document.getElementById("table1");
const errorBox1 = document.getElementById("errorBox");

/* Add event listeners */

fruitForm.querySelector('input[type=submit]').addEventListener('click', (evt) => {
  evt.preventDefault();

  errorBox1.innerHTML = '';

  try {
    if (bananas.value < 0 || bananas.value > 100) throw 'Bananas must be between 0 and 100';
    if (apples.value < 0 || apples.value > 100) throw 'Apples must be between 0 and 100';
    if (bananas.value === '' || apples.value === '') throw 'A value is missing';
  } catch (error) {
    const htmlError = createError(error);
    errorBox1.appendChild(htmlError);
    return;
  }

  data[0].data.push(parseInt(bananas.value));
  data[1].data.push(parseInt(apples.value));
  bananas.value='';
  apples.value='';
  updateCharts();
});

/* Initialize HTML with functions */

/* chart1 config */
const config = {
  title: { text: 'Chart 1'},
  subtitle: { text: 'Fruits'},
  xAxis: {
    title: {
      text: 'Numbers'
    }
  },
  yAxis: {
    title: {
      text: 'Amount'
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },

  plotOptions: {
    series: {
      pointStart: 5000
    }
  },

  series: data
  
}

/* Create chart */
Highcharts.chart('chart1', config);

/* Make HTML table rows */
for (let i = 0; i < data[0].data.length; i++) {
  const row = document.createElement("tr");

  const bananaData = document.createElement("td");
  bananaData.innerHTML = data[0].data[i].toString();
  row.appendChild(bananaData);
  
  const appleData = document.createElement("td");
  appleData.innerHTML = data[1].data[i].toString();
  row.appendChild(appleData);

  table1.appendChild(row);

}

/* Functions */

function updateCharts() {
  
  Highcharts.chart('chart1', config);

  const row = document.createElement("tr");

  const bananaData = document.createElement("td");
  bananaData.innerHTML = data[0].data[data[0].data.length-1].toString();
  row.appendChild(bananaData);
  
  const appleData = document.createElement("td");
  appleData.innerHTML = data[1].data[data[1].data.length-1].toString();
  row.appendChild(appleData);

  table1.appendChild(row);
}

function createError(errorMessage) {
  const error = document.createElement("div");
  error.setAttribute('class', 'error');
  
  const errorBold = document.createElement("b");
  errorBold.innerHTML = 'ERROR:';
  error.appendChild(errorBold);

  errorBold.after(errorMessage);

  return error;
}