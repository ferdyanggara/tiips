class App {
  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }
}

// async function fetchStock() {
// 	const API_KEY = 'LCBLU10TT28NF5NQ';
// 	let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName.value}&outputsize=compact&apikey=${API_KEY}`;
// 	console.log(API_CALL);
// 	stockChartXValuesFunction = [];
// 	stockChartYValuesFunction = [];
// 	await fetch(API_CALL)
// 		.then((response) => response.json())
// 		.then(function (data) {
// 			console.log(data);
// 			for (var key in data['Time Series (Daily)']) {
// 				stockChartXValuesFunction.push(key);
// 				stockChartYValuesFunction.push(
// 					data['Time Series (Daily)'][key]['1. open']
// 				);
// 			}
// 		});

// 	console.log(stockChartXValuesFunction);
// 	console.log(stockChartYValuesFunction);
// }
