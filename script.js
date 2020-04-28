const http = new App();

// Define UI Vars
const form = document.getElementById('form');
const stockName = document.getElementById('stockname');
const duration = document.getElementById('duration');
const amount = document.getElementById('amount');
const newsHolder = document.getElementById('news-holder');
const stocksMovement = document.getElementById('stocksmovement');

form.addEventListener('submit', addStock);

let stockLabelArray = [];
let investmentAmount = [];
let investmentDuration = [];
var stockChartXValuesFunction = [];
var stockChartYValuesFunction = [];
var test = [];

var color = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(153, 102, 255, 1)',
];
var index = 0;

// fetch news
function retrieve(e) {
  const apiKey = '40fb5e0404e345999353d4db49879216';

  let topic = stockName.value;

  let apiCall = `http://newsapi.org/v2/everything?q=${topic}&from=2020-04-27&to=2020-04-27&sortBy=popularity&pageSize=5&apiKey=${apiKey}`;

  // get news
  https: http
    .get(apiCall)
    .then(function (data) {
      data.articles.forEach((article) => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        let div = document.createElement('div');
        let div2 = document.createElement('div');

        a.setAttribute('href', article.url);
        a.setAttribute('target', '_blank');
        a.textContent = article.title;
        li.appendChild(a);
        div2.appendChild(li);
        div.appendChild(div2);
      });

      div.setAttribute('class', 'container mt-2 card');
      div2.setAttribute('class', 'card-body');
      newsHolder.innerHTML += div;
    })
    .catch((err) => console.log(err));
}

// fetch stock
function fetchStock() {
  const API_KEY = 'MWXNGW5ZXCM5N88P';
  let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName.value}&outputsize=compact&apikey=${API_KEY}`;

  // Get Users
  http
    .get(API_CALL)
    .then(function (data) {
      for (var key in data['Time Series (Daily)']) {
        stockChartXValuesFunction.unshift(key);
        stockChartYValuesFunction.push(
          data['Time Series (Daily)'][key]['1. open']
        );
      }
    })
    .catch((err) => console.log(err));
}

function addStock(e) {
  stockChartYValuesFunction = [];
  stockChartXValuesFunction = [];
  fetchStock();
  retrieve();
  stockLabelArray.push(stockName.value);
  investmentAmount.push(amount.value);
  // Doughnut Chart
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: stockLabelArray,

      datasets: [
        {
          label: '# of Votes',
          data: investmentAmount,
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

  var data = {
    data: stockChartYValuesFunction,
    borderColor: color[index],
    label: `${stockName.value} stock`,
    fill: false,
  };
  function addData(chart, label, color, data) {
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  test.push(data);

  // Line Chart
  var lineChart = new Chart(document.getElementById(`line-chart`), {
    type: 'line',
    data: {
      labels: stockChartXValuesFunction,
      datasets: test,
    },
    options: {
      title: {
        display: true,
        text: 'Your Stock',
      },
    },
  });
  addData(lineChart, stockName.value, stockChartYValuesFunction);
  // lanjutan atas

  index += 1;
  // if(index => 5){
  //   index = 0;
  // }
  stockName.remove(stockName.selectedIndex);
  stockName.value = '';
  duration.value = '';
  amount.value = '';

  e.preventDefault();
}

// function retrieve(e) {
//   const apiKey = '40fb5e0404e345999353d4db49879216';

//   let topic = stockName.value;

//   let url = `http://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;
// }
