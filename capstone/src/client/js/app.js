/* Global Variables */
let baseUrl = 'http://localhost:8081';
let result;

// Attributes of destination
let travelAttributes = {};

/* Function called by event listener */
export const performAction = async () => {
	const destination =  document.getElementById('destination').value;
	const travelDate = document.getElementById('travelDate').value;
    // check destination
    result = Client.checkDestination(destination);
	if (result != null) {
		document.getElementById('message').innerHTML = result
		return
	} else {
		document.getElementById('message').innerHTML = ''
	}
    // check date
    result = Client.checkDate(travelDate);
	if (result != null) {
		document.getElementById('message').innerHTML = result
		return
	} else {
		document.getElementById('message').innerHTML = ''
	}
	travelAttributes.destination = destination;
	travelAttributes.travelDate =  travelDate;
	getGeonames(encodeURI(destination))
	.then(function(data) {
		travelAttributes.countryName = data.countryName;
		travelAttributes.destination = data.name;  
		travelAttributes.population = data.population;
		getWeather(data.lat, data.lng, travelDate)
		.then(function(data) {
			console.log("client back from weather api");
			travelAttributes.temp = data.temp;
			travelAttributes.description = data.description;
			
			getImage(encodeURI(destination))
			.then(function(data) {
				console.log("client back from image api");
				travelAttributes.imageUrl = data.imageUrl;
				updateUI();  
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
	})
	.catch(function(reason) {
		console.log(`error in performAction 3 ${reason}`);
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

/* Function to GET Image */
const getImage = async (destination) => {
  console.log('client getImage');	
  const response = await fetch(baseUrl+'/getImage?destination='+destination, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },      
    });
  try {
    const data = await response.json();
	console.log('response of getImage', data);
    return data;
  } catch(error) {
    console.log(`error after getImage${error}`);
  }
}

/* Update UI */
function updateUI(data) {
	document.getElementById('date').innerHTML = travelAttributes.travelDate;
	document.getElementById('dest').innerHTML = `${travelAttributes.destination} (${travelAttributes.countryName})`;
	document.getElementById('weather').innerHTML = travelAttributes.description;
	document.getElementById('temp').innerHTML = travelAttributes.temp;
	document.getElementById('img').src = travelAttributes.imageUrl;
	document.getElementById('result').style.display = 'block';
	
}

function displayError(reason) {
    document.getElementById('content').innerHTML = `An error occurred, please contact your administrator (reason ${reason})`;
}