const histogramConfig = {
  chart: {
    type: 'column',
  },

  xAxis: {
    title: {text: 'Test'},
    categories: chartData.names,
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
      data: chartData.casesPerPop,
    },
  ],
};
