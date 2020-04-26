// Define UI Vars
const form = document.getElementById('form');
const stockName = document.getElementById('stockname');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // add new stocks
  form.addEventListener('submit', addStock);
}

function addStock(e) {
  let stockLabelArray = [];
  let stockLabel = stockName.value;
  if (stockLabel === '') {
    alert('add a stock!');
    stockLabelArray.push(stockLabel);
    console.log(stockLabel);
    console.log(stockLabelArray);
  }

  e.preventDefault();
  // Fetch API
  var stockChartXValuesFunction = [];
  var stockChartYValuesFunction = [];
  function fetchStock() {
    const API_KEY = 'LCBLU10TT28NF5NQ';
    let StockSymbol = stockName.value;
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    fetch(API_CALL)
      .then((response) => response.json())
      .then(function (data) {
        //console.log(data);
        for (var key in data['Time Series (Daily)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data['Time Series (Daily)'][key]['1. open']
          );
        }
      });

    console.log(stockChartXValuesFunction);
    console.log(stockChartYValuesFunction);
  }

  fetchStock();

  // Doughnut Chart
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['FB'],

      datasets: [
        {
          label: '# of Votes',
          data: [12, 25, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 0,
        },
      ],
    },
  });

  // Line Chart
  var ctx1 = document.getElementById('lineChart').getContext('2d');
  var myChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: stockChartXValuesFunction,
      datasets: [
        {
          label: `${stockName.value} stock`,
          data: stockChartYValuesFunction,

          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 3,
        },
      ],
    },
  });
}
