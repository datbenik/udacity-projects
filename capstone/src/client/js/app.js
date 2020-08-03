/* Global Variables */
let baseUrl = 'http://localhost:8081';

// Attributes of destination
let travelAttributes = {};

/* Function called by event listener */
export const performAction = async () => {
	const destination =  document.getElementById('destination').value;
	const travelDate = document.getElementById('travelDate').value;
	// TODO add validation of date and destination
	travelAttributes.destination = destination;
	travelAttributes.travelDate =  travelDate;
	getGeonames(destination)
	.then(function(data) {
		travelAttributes.countryName = data.countryName;
		travelAttributes.destination = data.name;  
		travelAttributes.population = data.population;
		getWeather(data.lat, data.lng, travelDate)
		.then(function(data) {
			console.log("client back from weather app");
			travelAttributes.temp = data.data.temp;
			travelAttributes.description = data.data.description;
			updateUI(data);  
		})
		.catch(function(reason) {
			console.log(`error in performAction 1 ${reason}`);
			displayError(reason); 
		})
	})
	.catch(function(reason) {
		console.log(`error in performAction 2 ${reason}`);
		displayError(reason); 
	})
}

/* Function to GET Geonames */
const getGeonames = async (destination) => {
  console.log('client getGeonames');	
  const response = await fetch(baseUrl+'/getGeonames?destination='+destination, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },      
    });
  try {
    const data = await response.json();
	console.log('response of getGeonames', data);
    return data;
  } catch(error) {
    console.log(`error after getGeonames ${error}`);
  }
}

/* Function to GET Weather */
const getWeather = async (latitude, longitude, travelDate) => {
  console.log('client getWeather');	
  const response = await fetch(baseUrl+'/getWeather?latitude='+latitude+'&longitude='+longitude+'&date='+travelDate, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },      
    });
  try {
    const data = await response.json();
	console.log('response of getWeather', data);
    return data;
  } catch(error) {
    console.log(`error after getWeather ${error}`);
  }
}

/* Update UI */
function updateUI(data) {
	document.getElementById('content').innerHTML = `On ${travelAttributes.travelDate} the weather in ${travelAttributes.destination} (${travelAttributes.countryName}) is expected to be "${travelAttributes.description}" with a temperature around ${travelAttributes.temp} degrees.`;
}

function displayError(reason) {
    document.getElementById('content').innerHTML = `An error occurred, please contact your administrator (reason ${reason})`;
}