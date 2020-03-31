const data = [
  {
    name: 'Banana',
    data: [1,2,3,4,5]
  },
  {
    name: 'Apple',
    data: [3,2,5,6,2]
  }
]

const config = {
  title: { text: 'Tittel'},
  subtitle: { text: 'Undertittel'},
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

Highcharts.chart('container', config);