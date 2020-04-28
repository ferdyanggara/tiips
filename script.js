const http = new App();

// Define UI Vars
const form = document.getElementById('form');
const stockName = document.getElementById('stockname');
const duration = document.getElementById('duration');
const amount = document.getElementById('amount');
const newsList = document.getElementById('news-list');
const stocksMovement = document.getElementById('stocksmovement');
const yourStock = document.getElementById('yourstock');
const weekMonth = document.getElementById('weekmonth');

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
  'rgba(100, 50, 211, 1)',
];
var index = 0;

// create stock dom
function stockDom() {
  console.log(color);
  console.log(index);
  showstock.innerHTML += `<div class = 'col-md-2'>
  <div class="card" style="width:200px;background-color:${color[index]}">
  <div class="card-body">
  
  
    <h2>${stockName.value}<h2>
    <p style='font-size:20px;'>Period : ${duration.value} ${weekMonth.value} </p>
    <p style='font-size:20px;'>Investment Amount : $ ${amount.value}</p>

  </div>
</div>
</div>`;
}

// fetch news
function retrieve(e) {
  const apiKey = '40fb5e0404e345999353d4db49879216';

  let topic = stockName.value;

  let apiCall = `https://newsapi.org/v2/everything?q=${topic}&from=2020-04-27&to=2020-04-27&sortBy=popularity&pageSize=5&apiKey=${apiKey}`;

  // get news
  https: http
    .get(apiCall)
    .then(function (data) {
      displayResults(data, 3);
      //   data.articles.forEach((article) => {
      //     let li = document.createElement('li');
      //     let a = document.createElement('a');

      //     a.setAttribute('href', article.url);
      //     a.setAttribute('target', '_blank');
      //     a.textContent = article.title;
      //     li.appendChild(a);
      //     newsList.appendChild(li);
      //   });
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
  stockDom();
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
        text: 'Stocks Graph',
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
  $('#x').removeClass('hidden');

  e.preventDefault();
}

// function retrieve(e) {
//   const apiKey = '40fb5e0404e345999353d4db49879216';

// }

let topic = stockName.value;

const apiKey = '522569483aea47dbb6d9061205fcd0df';

const searchURL = `http://newsapi.org/v2/everything?q=${topic}&from=2020-04-27&to=2020-04-27&sortBy=popularity&apiKey=${apiKey}`;

// function formatQueryParams(params) {
//   const queryItems = Object.keys(params).map(
//     (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
//   );
//   return queryItems.join('&');
// }

const resultList = document.getElementById('results-list');
function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; (i < responseJson.articles.length) & (i < maxResults); i++) {
    // for each video object in the articles
    //array, add a list item to the results
    //list with the article title, source, author,
    //description, and image
    resultList.innerHTML += `<div class="card mt-5" style="width:350px" >
  <img class="card-img-top" src="${responseJson.articles[i].urlToImage}"alt="Image">
  <div class="card-body">
    <h5 class="card-title">By ${responseJson.articles[i].author}</h5>
    <p class="card-text">${responseJson.articles[i].description}</p>
     <p class=card-text>${responseJson.articles[i].source.name}</p>
    <a href="${responseJson.articles[i].url}" class="btn btn-primary" target="_blank">Read more</a>
  </div>
</div> 
`;
  }
  //display the results section
  $('#results').removeClass('hidden');
}
