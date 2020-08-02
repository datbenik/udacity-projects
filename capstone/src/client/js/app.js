/* Global Variables */
let baseUrl = 'http://localhost:8081'

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=bba0d36172788e3db5ccff50ea894c58';	
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();


/* Function called by event listener */
export const performAction = async () => {
	const userResponse =  document.getElementById('feelings').value;
	const zipCode =  document.getElementById('zip').value;
	getWeather(zipCode)
	.then(function(data) {
		postData({
			temperature: `${data.main.temp}`,
			place: `${data.name}`,
			date: newDate,
			userResponse: userResponse
		})
	})
	.then(function(data) {
		updateUI();  
	})
	.catch(function(reason) {
		displayError(reason); 
	})
}

/* Function to GET Web API Data*/
const getWeather = async (zipCode) => {
  const res = await fetch(weatherUrl+zipCode+apiKey);
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log(`error after getWeather ${error}`);
  }
}

/* Function to POST data */
const postData = async ( data = {})=>{
    const response = await fetch(baseUrl+'/addData', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),         
    });
    try {
      const newData = await response.json();
      return newData
    } catch(error) {
      console.log(`error after post ${error}`);
    }
}

/* Update UI */
const updateUI = async () => {
  const request = await fetch(baseUrl+'/all');
  try{
    const allData = await request.json();
	const last = allData.length - 1;
    document.getElementById('date').innerHTML = allData[last].date;
	document.getElementById('place').innerHTML = allData[last].place;
    document.getElementById('temp').innerHTML = allData[last].temperature;
    document.getElementById('content').innerHTML = allData[last].userResponse;
  } catch(error) {
	console.log(`error when updating UI ${error}`);
  }
}

function displayError() {
	document.getElementById('date').innerHTML = '';
	document.getElementById('place').innerHTML = '';
    document.getElementById('temp').innerHTML = '';
    document.getElementById('content').innerHTML = 'An error occurred, please contact your administrator';
}