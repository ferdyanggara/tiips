// Define UI Vars
const form = document.getElementById('form');
const stockName = document.getElementById('stockname');
const duration = document.getElementById('duration');
const amount = document.getElementById('amount');

form.addEventListener('submit', addStock);

let stockLabelArray = [];
let investmentAmount = [];
let investmentDuration = [];

function addStock(e) {
  stockLabelArray.push(stockName.value);
  investmentAmount.push(amount.value);

  // Fetch API

  function fetchStock() {
    const API_KEY = 'LCBLU10TT28NF5NQ';
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName.value}&outputsize=compact&apikey=${API_KEY}`;
    console.log(API_CALL);
    var stockChartXValuesFunction = [];
    var stockChartYValuesFunction = [];
    fetch(API_CALL)
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
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
  // var ctx = document.getElementById('myChart').getContext('2d');
  // new Chart(ctx, {
  //   type: 'doughnut',
  //   data: {
  //     labels: stockLabelArray,

  //     datasets: [
  //       {
  //         label: '# of Votes',
  //         data: investmentAmount,
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)',
  //         ],
  //         borderColor: [
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)',
  //         ],
  //         borderWidth: 0,
  //       },
  //     ],
  //   },
  // });

  // let data = [
  //   {
  //     data: stockChartYValuesFunction,
  //     label: `${stockName.value} stock`,
  //     borderColor: '#3e95cd',
  //     fill: false,
  //   },
  // ];

  // data.push(obj);

  // console.log(data);

  // Line Chart
  // new Chart(document.getElementById(`line-chart`), {
  //   type: 'line',
  //   data: {
  //     labels: stockChartXValuesFunction,
  //     datasets: [
  //       {
  //         data: stockChartYValuesFunction,
  //         label: `${stockName.value} stock`,
  //         borderColor: '#3e95cd',
  //         fill: false,
  //       },
  //     ],
  //   },
  //   options: {
  //     title: {
  //       display: true,
  //       text: 'Your Stock',
  //     },
  //   },
  // });

  // lanjutan atas
  stockName.remove(stockName.selectedIndex);

  stockName.value = '';
  duration.value = '';
  amount.value = '';

  e.preventDefault();
}

// function createJson() {
//   let obj = {
//     data: stockChartYValuesFunction,
//     label: `AMZN stock2`,
//     borderColor: '#3e95cd',
//     fill: false,
//   };
// }

// function storeTaskInLocalStorage(task) {
//   let tasks;
//   if (localStorage.getItem('tasks') === null) {
//     tasks = [];
//   } else {
//     tasks = JSON.parse(localStorage.getItem('tasks')); //the "|| []" replaces possible null from localStorage with empty array
//     if (tasks.indexOf(task) == -1) {
//       tasks.push(task);
//       localStorage.setItem('tasks', JSON.stringify(tasks));
//     }
//   }
//   tasks.push(task);
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function getTasks() {
//   let tasks;
//   if (localStorage.getItem('tasks') === null) {
//     tasks = [];
//   } else {
//     tasks = JSON.parse(localStorage.getItem('tasks'));
//   }

//   tasks.forEach(function (task) {
//     // create li elemnt
//     const p = document.createElement('p');
//     console.log(!localStorage.getItem('tasks').includes(task));
//     if (!localStorage.getItem('tasks').includes(task)) {
//       p.appendChild(document.createTextNode(task));
//       output.appendChild(p);
//     }
//   });
// }

// function removeTask(e) {
//   if (e.target.parentElement.classList.contains('delete-item')) {
//     if (confirm('are you sure')) {
//       e.target.parentElement.parentElement.remove();

//       //   remove from lS
//       removeTaskFromLocalStorage(e.target.parentElement.parentElement);
//     }
//   }
// }
