/* Global Variables */
let baseUrl = 'http://localhost:8081';
let result;

// Attributes of destination
let travelAttributes = {};

// Calculating time until departure
const timeUntilDeparture = (date) => {
    const total = Date.parse(date) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return days;
  };
  
// Calculating duration
const durationOfTrip = (onDate, toDate) => {
    const total = Date.parse(toDate) - Date.parse(onDate);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return days;
  };

/* Function called by event listener */
export const performAction = async () => {
	const destination =  document.getElementById('destination').value;
	const travelDate = document.getElementById('travelDate').value;
	const returnDate = document.getElementById('returnDate').value;
    // check destination
    result = Client.checkDestination(destination);
	if (result != null) {
		document.getElementById('message').innerHTML = result
		return
	} else {
		document.getElementById('message').innerHTML = ''
	}
    // check travel date
    result = Client.checkTravelDate(travelDate);
	if (result != null) {
		document.getElementById('message').innerHTML = result
		return
	} else {
		document.getElementById('message').innerHTML = ''
	}
	// check return date
    result = Client.checkReturnDate(travelDate, returnDate);
	if (result != null) {
		document.getElementById('message').innerHTML = result
		return
	} else {
		document.getElementById('message').innerHTML = ''
	}
	travelAttributes.destination = destination;
	travelAttributes.travelDate = travelDate;
	travelAttributes.returnDate = returnDate;
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
			
			getImage(encodeURI(travelAttributes.destination))
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
	document.getElementById('days').innerHTML = timeUntilDeparture(travelAttributes.travelDate);
	if (travelAttributes.returnDate) {
		document.getElementById('duration').innerHTML = ` and will take ${durationOfTrip(travelAttributes.travelDate,travelAttributes.returnDate)} days`;
	}
	document.getElementById('img').src = travelAttributes.imageUrl;
	document.getElementById('result').style.display = 'block';
	
}

function displayError(reason) {
    document.getElementById('message').innerHTML = `An error occurred, please contact your administrator (reason ${reason})`;
}