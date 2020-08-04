// Import required modules
const path = require('path');
const express = require('express');
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const cors = require('cors');

// Require dotenv to have system properties in separate file
const dotenv = require('dotenv');
dotenv.config();

// Geonames api
const urlGeonames = 'http://api.geonames.org/searchJSON?';
const useridGeonames = process.env["USERID_GEONAMES"];

// Weather api
const urlWeatherbitCurrent = 'http://api.weatherbit.io/v2.0/current?';
const urlWeatherbitForecast = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const keyWeatherbit = process.env["KEY_WEATHERBIT"];

// Pixabay api
const urlPixabay = 'https://pixabay.com/api/?';
const keyPixabay = process.env["KEY_PIXABAY"];

// Start up an instance of app
const app = express();

// Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

app.get('/', function (req, res) {
	res.sendFile(path.resolve('dist/index.html'))
})

// Setup Server
const port = 8081;

const server = app.listen(port, ()=>{
	console.log(`running on localhost: ${port}`)})
	
	
// Get Geonames 	
app.get('/getGeonames', function (req, res) {
	console.log("Get geonames with destination: ", req.query.destination);
    getDataGeonames(req.query.destination)
	.then(function(data) {
		res.send(data);
	})
	.catch(function(reason) {
		console.log(`error in server getting geonames ${reason}`); 
	});
})

const getDataGeonames = async (destination) => {
	console.log('getDataGeonames in server');
	const res = await fetch(`${urlGeonames}q=${destination}&maxRows=5&username=${useridGeonames}`, {
        method: 'GET'
	});
	try {
		const data = await res.json();
		console.log(data.geonames[0])
		return data.geonames[0];
	} catch(error) {
		console.log(`error in server when calling geonames api ${error}`);
	}
}
	
// Get Weather
app.get('/getWeather', function (req, res) {
    getDataWeather(req.query.latitude, req.query.longitude, req.query.date)
	.then(function(data) {
		res.send(data);
	})
	.catch(function(reason) {
		console.log(`error in server getting weather ${reason}`); 
	});
})

// If the trip is within a week, get the current weather forecast. If the trip is in the future, get a predicted forecast.
const getDataWeather = async (latitude, longitude, date) => {
	const today = new Date();
	const onDate = new Date(date);
	const length = onDate.getTime() - today.getTime();
	let url;
	if (length / (1000 * 60 * 60 * 24) > 7 ) {
		return getDataWeatherForecast(latitude, longitude, date);
	} else {
		return getDataWeatherCurrent(latitude, longitude);
	}
}

const getDataWeatherCurrent = async (latitude, longitude) => {
	console.log('getDataWeatherCurrent in server');
    const res = await fetch(`${urlWeatherbitCurrent}key=${keyWeatherbit}&lat=${latitude}&lon=${longitude}`, {
        method: 'GET'
    });
    try {
		const data = await res.json();
		console.log(data);
		return ({
				temp: data.data[0].temp,
				description: data.data[0].weather.description,
				});
	} catch(error) {
		console.log(`error in server when calling weather current api ${error}`);
	}
}

const getDataWeatherForecast = async (latitude, longitude, date) => {
	console.log('getDataWeatherForecast in server');
    const res = await fetch(`${urlWeatherbitForecast}key=${keyWeatherbit}&lat=${latitude}&lon=${longitude}`, {
        method: 'GET'
    });
    try {
		const data = await res.json();
		console.log(data);
		// Determine the closest date in the response
		let index = data.data.length - 1;
		for (let i = index; i >= 0; i--) {
			if (data.data[i].valid_date === date) {
				index = i;
				break;
			};
			if (date > data.data[i].valid_date) {
				break;
			}
		}
		return ({
				temp: data.data[index].temp,
				description: data.data[index].weather.description,
				});
	} catch(error) {
		console.log(`error in server when calling weather forecast api ${error}`);
	}
}
	
// Get Images	
app.get('/getImage', function (req, res) {
	console.log("Get image with destination: ", req.query.destination);
    getDataPixabay(req.query.destination)
	.then(function(data) {
		res.send(data);
	})
	.catch(function(reason) {
		console.log(`error in server getting pixabay ${reason}`); 
	});
})

const getDataPixabay = async (destination) => {
	console.log('getDataPixabay in server');
	const res = await fetch(`${urlPixabay}key=${keyPixabay}&q=${destination}&image_type=photo`, {
        method: 'GET'
	});
	try {
		const data = await res.json();
		console.log(data);
		if (data.hits.length > 0) {
			return ({imageUrl: data.hits[0].webformatURL});
		}
		else {
			return ({imageUrl: 'https://pixabay.com/get/5ee2d54b4e54b10ff3d8992cc62f3078133fd6e74e507440732a7fd7904ec2_640.jpg'});
		}
		
		
	} catch(error) {
		console.log(`error in server when calling pixabay api ${error}`);
	}
}
	
