new Chart(document.getElementById('line-chart'), {
  type: 'line',
  data: {
    labels: stockChartXValuesFunction,
    datasets: [
      {
        data: stockChartYValuesFunction,
        label: `${stockName.value} stock`,
        borderColor: '#3e95cd',
        fill: false,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: 'Your Stock',
    },
  },
});
