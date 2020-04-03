// @ts-check

/* Initialize variables */

class Country {}

const countries = [];

/* Map data from json file */
for (let index = 0; index < data.length; index++) {
  countries[index] = {
    name: data[index].name,
    cases: data[index].cases,
    deaths: data[index].deaths,
    recovered: data[index].recovered,
    casesPerPop: Math.round((data[index].cases * 1000000) / data[index].population),
    deathsPerPop: Math.round((data[index].cases * 1000000) / data[index].population),
  };
}

/* Prepare data in arrays */
const chartData = {
  names: countries.map(country => country.name),
  casesPerPop: countries.map(country => country.casesPerPop),
};

/* Configuration for the chart */
const histogramConfig = {
  chart: {
    type: 'column', //Bruker kolonnekart uten padding og border for å lage et histogram
  },

  title: {text: 'Overview of cases per 1M people'},

  xAxis: {
    title: {text: 'Countries'},
    categories: chartData.names,
  },

  yAxis: {
    title: {text: 'Cases per 1M people'},
  },

  plotOptions: {
    column: {
      groupPadding: 0,
      pointPadding: 0,
      borderWidth: 0,
    },
  },

  series: [
    {
      name: 'Cases per 1M people',
      data: chartData.casesPerPop,
    },
  ],
};

/* Register HTML DOM elements by variables */

const table = document.getElementById('statisticsTable');
const selector = document.getElementById('countrySelector');
const selectTable = document.getElementById('selectTable');
const date = document.getElementById("date");

/* Add event listeners */

selector.addEventListener('change', evt => {
  selectTable.innerHTML = '';

  selectTable.innerHTML = table.querySelectorAll('tr')[0].innerHTML;
  selectTable.appendChild(countryRow(countries[selector.value]));
});

/* Initialize HTML with functions */

for (let index = 0; index < countries.length; index++) {
  /* Select options */
  const option = document.createElement('option');
  option.value = String(index);
  option.innerHTML = countries[index].name;
  selector.appendChild(option);

  /* Add row to statisticsTable */
  table.appendChild(countryRow(countries[index]));
}

table.appendChild(totalRow());

date.innerHTML = dataDate;

document.getElementById('chart').style.height = '500px';
Highcharts.setOptions(Highcharts.theme);
Highcharts.chart('chart', histogramConfig);

/* Functions */

/**
 * Makes a row
 * @param {Object} country
 */
function countryRow(country) {
  const row = document.createElement('tr');

  const countryBox = document.createElement('td');
  countryBox.innerHTML = country.name;

  const casesBox = document.createElement('td');
  casesBox.innerHTML = country.cases;

  const deathBox = document.createElement('td');
  deathBox.innerHTML = country.deaths;

  const recoveredBox = document.createElement('td');
  recoveredBox.innerHTML = country.recovered;

  const casesPerPopBox = document.createElement('td');
  casesPerPopBox.innerHTML = country.casesPerPop;

  const deathPerPopBox = document.createElement('td');
  deathPerPopBox.innerHTML = country.deathsPerPop;

  row.appendChild(countryBox);
  row.appendChild(casesBox);
  row.appendChild(deathBox);
  row.appendChild(recoveredBox);
  row.appendChild(casesPerPopBox);
  row.appendChild(deathPerPopBox);

  return row;
}

/**
 * Produces a row containing the totals of countries
 */
function totalRow() {
  const country = {
    name: 'Total',
    cases: sumAll('cases'),
    deaths: sumAll('deaths'),
    recovered: sumAll('recovered'),
    casesPerPop: null,
    deathsPerPop: null,
  };

  function sumAll(type) {
    let result = 0;
    for (let index = 0; index < countries.length; index++) {
      result += countries[index][type];
    }
    return result;
  }

  return countryRow(country);
}
